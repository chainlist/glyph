/* eslint-disable @typescript-eslint/no-empty-function */
import { WritableSignal, signal } from '@angular/core';
import { CanvasState } from '@glyph/types';

export interface IEvent<T> {
  name: CanvasState;
  payload: WritableSignal<T | undefined>;

  onmousedown(e: MouseEvent): void;
  onmousemove(e: MouseEvent): void;
  onmouseup(e: MouseEvent): void;
  ondblclick(e: MouseEvent): void;
}

export class BaseEvent<T> implements IEvent<T> {
  name: CanvasState;
  payload = signal<T | undefined>(undefined);

  constructor(name: CanvasState, payload: T) {
    this.name = name;
    this.payload.set(payload);
  }

  onmousedown(e: MouseEvent): void {}
  onmousemove(e: MouseEvent): void {}
  onmouseup(e: MouseEvent): void {}
  ondblclick(e: MouseEvent): void {}
}
