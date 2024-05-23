import { Injectable, signal } from '@angular/core';
import { Point } from '../models/Point';
import { Size } from '../models/Size';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  root = signal<HTMLElement | null>(null);
  dimensions = new Size(0, 0);
  center = new Point(0, 0);
  offset = new Point(0, 0);
  scale = signal<number>(1);

  setRoot(root: HTMLElement) {
    this.root.set(root);
    this.#refreshSize();
    this.#refreshCenter();
  }

  refresh() {
    this.#refreshSize();
    this.#refreshCenter();
  }

  #refreshSize() {
    const root = this.root();
    if (root) {
      const { width, height } = root.getBoundingClientRect();
      this.dimensions.width.set(width);
      this.dimensions.height.set(height);
    }
  }

  #refreshCenter() {
    this.center.x.set(this.dimensions.width() / 2);
    this.center.y.set(this.dimensions.height() / 2);
  }
}
