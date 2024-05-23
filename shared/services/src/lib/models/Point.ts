import { signal } from '@angular/core';

export class Point {
  x = signal<number>(0);
  y = signal<number>(0);

  constructor(x: number, y: number) {
    this.x.set(x);
    this.y.set(y);
  }

  add(point: Point) {
    return new Point(this.x() + point.x(), this.y() + point.y());
  }

  sub(point: Point) {
    return new Point(this.x() - point.x(), this.y() - point.y());
  }

  mul(scalar: number) {
    return new Point(this.x() * scalar, this.y() * scalar);
  }

  div(scalar: number) {
    return new Point(this.x() / scalar, this.y() / scalar);
  }

  dist(point: Point) {
    return Math.abs(this.x() - point.x()) + Math.abs(this.y() - point.y());
  }
}
