import { Injectable } from '@angular/core';
import { BaseEventService } from '../BaseEventService';
import { CanvasService } from '../../../canvas/canvas.service';

@Injectable({
  providedIn: 'root',
})
export class PanEventService extends BaseEventService<void> {
  constructor(private canvasSvc: CanvasService) {
    super('panning');
  }

  override onmousemove(e: MouseEvent): void {
    this.canvasSvc.pan(e.movementX, e.movementY);
  }
}
