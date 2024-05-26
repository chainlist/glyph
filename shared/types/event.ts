import { CanvasState } from './canvas';

export interface IEvent<T> {
  name: CanvasState;
  payload: T | undefined;

  onmousedown(e: MouseEvent): void;
  onmousemove(e: MouseEvent): void;
  onmouseup(e: MouseEvent): void;
  ondblclick(e: MouseEvent): void;
}
