import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JSONCanvasNode } from '@glyph/models';
import { StoreService } from '@glyph/services';

@Component({
  selector: 'lib-blocking-layer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blocking-layer.component.html',
  styleUrl: './blocking-layer.component.css',
})
export class BlockingLayerComponent {
  node = input.required<JSONCanvasNode>();

  constructor(private store: StoreService) {}

  setActive() {
    this.store.canvas.active.set(this.node().id());
  }
}
