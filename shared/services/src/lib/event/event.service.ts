/* eslint-disable no-cond-assign */
import { DestroyRef, ElementRef, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IEvent } from '@glyph/types';
import { Subscription, fromEvent } from 'rxjs';
import { CanvasService } from '../canvas/canvas.service';
import { Point } from '@glyph/models';
import { IdleEventService } from './events/idle-event/idle-event.service';
import { PanEventService } from './events/pan-event/pan-event.service';
import { MoveNodeEventService } from './events/move-node/move-node-event.service';
import { StoreService } from '../store/store.service';
import { SelectNodesService } from './events/select-nodes/select-nodes.service';
import { BaseEventService } from './events/BaseEventService';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event = signal<IEvent<any> | undefined>(this.idleEvent);
  downPoint = signal<Point | undefined>(undefined);
  mouseUpSubscription?: Subscription;

  constructor(
    private destroyRef: DestroyRef,
    private store: StoreService,
    private canvasSvc: CanvasService,
    private idleEvent: IdleEventService,
    private panEvent: PanEventService,
    private moveNode: MoveNodeEventService,
    private selectNodes: SelectNodesService,
  ) {}

  startListening(ref: HTMLElement) {
    fromEvent(ref, 'pointerdown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        const event = e as PointerEvent;
        this.downPoint.set(new Point(event.clientX, event.clientY));
        this.#guessEvent(event);
        this.event()?.onmousedown(event);

        this.mouseUpSubscription = fromEvent(document, 'pointerup').subscribe(
          this.#onmouseup.bind(this),
        );
      });

    fromEvent(document, 'pointermove')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(this.#onmousemove.bind(this));
  }

  #guessEvent(event: MouseEvent) {
    const target = event.target as HTMLElement;
    let nodeRef: HTMLElement | null;

    // No matter the node we are hovering we want to drag the canvas if right click is pressed or middle click
    if ([1, 2].includes(event.button)) {
      this.#setEvent(this.panEvent);
      return;
    }

    // If we are hovering a node we want to drag it
    if (event.button === 0 && (nodeRef = target.closest('.canvas-node'))) {
      const id = nodeRef.dataset['id'];
      const node = this.store.canvas.nodes().find((n) => n.id() === id);

      if (!node) return;

      this.#setEvent(this.moveNode);
      this.moveNode.setPayload(node);
      return;
    }

    if (event.button === 0 && target.closest('#canvas-wrapper')) {
      this.#setEvent(this.selectNodes);
      this.event()?.setPayload(
        this.canvasSvc.toCoordinates(new Point(event.clientX, event.clientY)),
      );
      return;
    }
  }

  #onmousemove(e: Event) {
    const event = e as PointerEvent;
    const upPoint = this.canvasSvc.toCoordinates(
      new Point(event.clientX, event.clientY),
    );

    requestAnimationFrame(() => {
      const currentPoint = new Point(event.clientX, event.clientY);
      const downPoint = this.downPoint();

      if (downPoint && downPoint.dist(currentPoint) < 5) return;
      this.event()?.onmousemove(event);
    });
  }

  #onmouseup(e: Event) {
    const event = e as MouseEvent;
    this.event()?.onmouseup(event);

    this.#eventCleanup(event);

    this.mouseUpSubscription?.unsubscribe();
  }

  #eventCleanup(_: MouseEvent) {
    this.event()?.setPayload(undefined);
    this.event.set(this.idleEvent);
    this.store.canvas.state.set('idle');
  }

  #setEvent(event: BaseEventService<any>) {
    this.event.set(event);
    this.store.canvas.state.set(event.name);
  }
}
