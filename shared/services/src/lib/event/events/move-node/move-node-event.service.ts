import { Injectable, computed, signal } from '@angular/core';
import { BaseEventService } from '../BaseEventService';
import { JSONCanvasNode } from '@glyph/models';
import { CanvasService } from '../../../canvas/canvas.service';
import { WorkspaceService } from '../../../workspace/workspace.service';

@Injectable({
  providedIn: 'root',
})
export class MoveNodeEventService extends BaseEventService<JSONCanvasNode> {
  scale = computed(() => this.canvasSvc.scale());
  hasMove = signal<boolean>(false);
  nodes = signal<JSONCanvasNode[]>([]);

  constructor(private canvasSvc: CanvasService) {
    super('dragging');
  }

  override onmousedown(e: MouseEvent): void {
    const payload = this.payload();
    if (!payload) return;

    if (this.canvasSvc.isSelected(payload)) {
      if (e.ctrlKey) {
        this.nodes.set([payload]);
      } else {
        this.nodes.set(this.canvasSvc.getSelectedNodes());
      }
    } else {
      this.nodes.set([payload]);
    }
  }

  override onmousemove(e: MouseEvent): void {
    if (!this.hasMove()) {
      this.canvasSvc.selectAll(this.nodes());
    }

    this.hasMove.set(true);

    for (const item of this.nodes()) {
      item.rect.coords.x.update((x) => x + e.movementX / this.scale());
      item.rect.coords.y.update((y) => y + e.movementY / this.scale());
    }
  }

  override onmouseup(e: MouseEvent): void {
    const target = this.payload();
    // We want to select the node(s) if we didn't move it
    if (!this.hasMove()) {
      if (!e.ctrlKey && target) {
        this.canvasSvc.selectAll([target]);
      } else if (target) {
        if (this.canvasSvc.isSelected(target)) {
          this.canvasSvc.unselect(target);
        } else {
          this.canvasSvc.select(target);
        }
      }
    } else {
      // Save workspace
    }

    this.hasMove.set(false);
  }
}
