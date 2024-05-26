import { Injectable, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JSONCanvasNode, Point, Rect, Size } from '@glyph/models';
import { StoreService } from '../store/store.service';

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

  fit(nodes: JSONCanvasNode[] = this.store.canvas.nodes()) {
    const rect = Rect.getRectFrom(nodes.map((node) => node.rect));
    const scale = this.#fitScale(rect, 100);
    const rectCenter = rect.getCenter();

    this.scale.set(scale);
    this.offset.x.set(-rectCenter.x());
    this.offset.y.set(-rectCenter.y());
  }
}
