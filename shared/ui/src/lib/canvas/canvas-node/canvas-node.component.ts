import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JSONCanvasFileNode, JSONCanvasNode } from '@glyph/models';
import { CanvasNodeFileComponent } from '../canvas-node-file/canvas-node-file.component';
import { CanvasNodeUnknownComponent } from '../canvas-node-unknown/canvas-node-unknown.component';
import { CanvasService, StoreService } from '@glyph/services';

@Component({
  selector: 'lib-canvas-node',
  standalone: true,
  imports: [CommonModule, CanvasNodeFileComponent, CanvasNodeUnknownComponent],
  templateUrl: './canvas-node.component.html',
  styleUrl: './canvas-node.component.css',
})
export class CanvasNodeComponent {
  node = input.required<JSONCanvasNode>();

  id = computed(() => this.node().id());
  type = computed(() => this.node().type());

  selected = computed(() => this.canvasSvc.isSelected(this.node()));

  x = computed(() => this.node().rect.coords.x());
  y = computed(() => this.node().rect.coords.y());
  width = computed(() => this.node().rect.size.width());
  height = computed(() => this.node().rect.size.height());

  transform = computed(() => `translate(${this.x()}px, ${this.y()}px)`);

  isActive = computed(() => this.store.canvas.active() === this.node().id());

  constructor(
    private canvasSvc: CanvasService,
    private store: StoreService,
  ) {}

  getFileNode() {
    return this.node() as JSONCanvasFileNode;
  }
}
