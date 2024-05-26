import { Injectable, computed, signal } from '@angular/core';
import { BaseEventService } from '../BaseEventService';
import { JSONCanvasNode } from '@glyph/models';
import { CanvasService } from '../../../canvas/canvas.service';
import { WorkspaceService } from '../../../workspace/workspace.service';

@Injectable({
  providedIn: 'root',
})
export class MoveNodeEventService extends BaseEventService<{
  target: JSONCanvasNode;
  selectedNodes: JSONCanvasNode[];
}> {
  scale = computed(() => this.canvasSvc.scale());
  hasMove = signal<boolean>(false);

  constructor(private canvasSvc: CanvasService) {
    super('dragging');
  }

  override onmousemove(e: MouseEvent): void {
    const { target, selectedNodes } = this.payload() ?? {
      node: undefined,
      selectedNodes: [],
    };

    this.hasMove.set(true);

    for (const item of selectedNodes) {
      item.rect.coords.x.update((x) => x + e.movementX / this.scale());
      item.rect.coords.y.update((y) => y + e.movementY / this.scale());
    }
  }

  override onmouseup(e: MouseEvent): void {
    const target = this.payload()?.target;
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
