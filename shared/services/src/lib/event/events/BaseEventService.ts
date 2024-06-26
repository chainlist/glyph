/* eslint-disable @typescript-eslint/no-empty-function */
import { WritableSignal, signal } from '@angular/core';
import { CanvasState, IEvent } from '@glyph/types';

export class BaseEventService<T> implements IEvent<T> {
  name: CanvasState;
  payload: WritableSignal<T | undefined> = signal<T | undefined>(undefined);

  constructor(name: CanvasState) {
    this.name = name;
  }

  setPayload(payload: T): void {
    this.payload.set(payload);
  }

  onmousedown(e: MouseEvent): void {}
  onmousemove(e: MouseEvent): void {}
  onmouseup(e: MouseEvent): void {}
  ondblclick(e: MouseEvent): void {}
}
