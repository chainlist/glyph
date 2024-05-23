import { signal } from '@angular/core';

export class Size {
  width = signal<number>(0);
  height = signal<number>(0);

  constructor(width: number, height: number) {
    this.width.set(width);
    this.height.set(height);
  }
}
