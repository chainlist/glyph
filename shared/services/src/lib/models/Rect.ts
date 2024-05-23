import { Point } from './Point';
import { Size } from './Size';

export class Rect {
  coords = new Point(0, 0);
  size = new Size(0, 0);

  constructor(x: number, y: number, width: number, height: number) {
    this.coords.x.set(x);
    this.coords.y.set(y);
    this.size.width.set(width);
    this.size.height.set(height);
  }

  isInside(point: Point) {
    return (
      point.x() >= this.coords.x() &&
      point.x() <= this.coords.x() + this.size.width() &&
      point.y() >= this.coords.y() &&
      point.y() <= this.coords.y() + this.size.height()
    );
  }

  isIntersecting(rect: Rect, percentage: number) {
    const overlapingArea = this.#getArea(this, rect);
    const area = this.size.width() * this.size.height();

    return overlapingArea >= (area * percentage) / 100;
  }

  #getArea(rectA: Rect, rectB: Rect) {
    const overlapX = Math.max(
      0,
      Math.min(
        rectA.coords.x() + rectA.size.width(),
        rectB.coords.x() + rectB.size.width()
      ) - Math.max(rectA.coords.x(), rectB.coords.x())
    );
    const overlapY = Math.max(
      0,
      Math.min(
        rectA.coords.y() + rectA.size.height(),
        rectB.coords.y() + rectB.size.height()
      ) - Math.max(rectA.coords.y(), rectB.coords.y())
    );

    return overlapX * overlapY;
  }
}
