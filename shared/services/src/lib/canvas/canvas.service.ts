import { Injectable, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JSONCanvasNode, Point, Rect, Size } from '@glyph/models';
import { StoreService } from '../store/store.service';
import { CanvasState } from '@glyph/types';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  root = signal<HTMLElement | null>(null);
  dimensions = new Size(0, 0);
  center = new Point(0, 0);
  offset = new Point(0, 0);
  scale = signal<number>(1);

  constructor(private store: StoreService) {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.refresh());
  }

  setRoot(root: HTMLElement) {
    this.root.set(root);
    this.refresh();
  }

  refresh() {
    this.#refreshSize();
    this.#refreshCenter();
  }

  pan(x: number, y: number) {
    this.offset.x.update((offset) => offset + x);
    this.offset.y.update((offset) => offset + y);
  }

  #refreshSize() {
    const root = this.root();
    if (!root) return;

    const { width, height } = root.getBoundingClientRect();
    this.dimensions.width.set(width);
    this.dimensions.height.set(height);
  }

  #refreshCenter() {
    this.center.x.set(this.dimensions.width() / 2);
    this.center.y.set(this.dimensions.height() / 2);
  }

  #fitScale(rect: Rect, margin: number) {
    const { width, height } = rect.size;
    const scaleX = this.dimensions.width() / (width() + margin);
    const scaleY = this.dimensions.height() / (height() + margin);

    return Math.min(Math.min(scaleX, scaleY), 1);
  }

  toCoordinates(point: Point) {
    const rect = this.root()?.getBoundingClientRect();

    if (!rect) return point;

    const offsetX = this.offset.x() * this.scale();
    const offsetY = this.offset.y() * this.scale();
    const centerX = this.center.x();
    const centerY = this.center.y();
    const rectLeft = rect.left;
    const rectTop = rect.top;
    const scale = this.scale();

    // Apply all adjustments in one update for each axis
    point.x.update((x) => (x - centerX - offsetX - rectLeft) / scale);
    point.y.update((y) => (y - centerY - offsetY - rectTop) / scale);

    return point;

    // // Reajusting the point to the center of the canvas
    // point.x.update((x) => x - this.center.x());
    // point.y.update((y) => y - this.center.y());

    // // Removing the offset from the point
    // point.x.update((x) => x - this.offset.x() * this.scale());
    // point.y.update((y) => y - this.offset.y() * this.scale());

    // // Reajusting the point to the top left of the canvas
    // point.x.update((x) => x - rect.left);
    // point.y.update((y) => y - rect.top);

    // // Reajusting the point to the scale
    // point.x.update((x) => x / this.scale());
    // point.y.update((y) => y / this.scale());
  }

  fit(nodes: JSONCanvasNode[] = this.store.canvas.nodes()) {
    const rect = Rect.getRectFrom(nodes.map((node) => node.rect));
    const scale = this.#fitScale(rect, 100);
    const rectCenter = rect.getCenter();

    this.scale.set(scale);
    this.offset.x.set(-rectCenter.x());
    this.offset.y.set(-rectCenter.y());
  }

  /**
   * Putting multiple states in the parameter will return true if the current state is one of them. (acting as an OR operator)
   * @param states State name
   */
  is(...states: CanvasState[]) {
    return states.includes(this.store.canvas.state());
  }
}
