import { Injectable, signal } from '@angular/core';
import { BaseEventService } from '../BaseEventService';
import { Point, Rect } from '@glyph/models';
import { CanvasService } from '../../../canvas/canvas.service';
import { StoreService } from '../../../store/store.service';

@Injectable({
  providedIn: 'root',
})
export class SelectNodesService extends BaseEventService<Point> {
  hasMoved = signal<boolean>(false);
  rect = signal<Rect | undefined>(undefined);

  constructor(
    private canvasSvc: CanvasService,
    private store: StoreService,
  ) {
    super('selecting');
  }

  override onmousemove(e: MouseEvent): void {
    if (!this.hasMoved()) {
      this.canvasSvc.unselectAll();
      this.hasMoved.set(true);
    }

    const pointA = this.payload();
    if (!pointA) return;

    const pointB = this.canvasSvc.toCoordinates(
      new Point(e.clientX, e.clientY),
    );
    const x = Math.min(pointA.x(), pointB.x());
    const y = Math.min(pointA.y(), pointB.y());
    const width = Math.abs(pointA.x() - pointB.x());
    const height = Math.abs(pointA.y() - pointB.y());

    const rect = new Rect(x, y, width, height);
    this.rect.set(rect);

    this.store.canvas.nodes().forEach((node) => {
      if (node.rect.isIntersecting(rect, 10)) {
        this.canvasSvc.select(node);
      } else {
        this.canvasSvc.unselect(node);
      }
    });
  }

  override onmouseup(): void {
    if (!this.hasMoved()) {
      this.canvasSvc.unselectAll();
    }

    this.rect.set(undefined);
    this.hasMoved.set(false);
  }
}
