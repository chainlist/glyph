import { WritableSignal } from '@angular/core';
import { CanvasState } from './canvas';

export interface IEvent<T> {
  name: CanvasState;
  payload: WritableSignal<T | undefined>;

  onmousedown(e: MouseEvent): void;
  onmousemove(e: MouseEvent): void;
  onmouseup(e: MouseEvent): void;
  ondblclick(e: MouseEvent): void;
}
