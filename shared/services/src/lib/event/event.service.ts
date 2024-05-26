import { DestroyRef, ElementRef, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IEvent } from '@glyph/types';
import { Subscription, fromEvent } from 'rxjs';
import { CanvasService } from '../canvas/canvas.service';
import { Point } from '@glyph/models';
import { IdleEventService } from './events/idle-event/idle-event.service';
import { PanEventService } from './events/pan-event/pan-event.service';

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
    private canvasSvc: CanvasService,
    private idleEvent: IdleEventService,
    private panEvent: PanEventService,
  ) {}

  startListening(ref: HTMLElement) {
    fromEvent(ref, 'pointerdown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        const event = e as PointerEvent;
        this.downPoint.set(new Point(event.clientX, event.clientY));
        this.#guessEvent(event);

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

    // No matter the node we are hovering we want to drag the canvas if right click is pressed
    if (event.button === 2) {
      this.event.set(this.panEvent);
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
    this.event.set(this.idleEvent);
    this.mouseUpSubscription?.unsubscribe();
  }
}
