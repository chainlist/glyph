import { DestroyRef, ElementRef, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IEvent } from '@glyph/types';
import { fromEvent } from 'rxjs';
import { IdleEvent, Point } from '@glyph/models';
import { CanvasService } from '../canvas/canvas.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  #idleEvent = new IdleEvent();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  event = signal<IEvent<any> | undefined>(this.#idleEvent);

  constructor(
    private destroyRef: DestroyRef,
    private canvasSvc: CanvasService,
  ) {}

  startListening(ref: ElementRef<HTMLElement>) {
    fromEvent(ref.nativeElement, 'pointerdown')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        const event = e as PointerEvent;
        const downPoint = new Point(event.clientX, event.clientY);
      });

    fromEvent(document, 'pointermove')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e) => {
        const event = e as PointerEvent;
        const upPoint = this.canvasSvc.toCoordinates(
          new Point(event.clientX, event.clientY),
        );
      });
  }
}
