import { computed, signal } from '@angular/core';
import { JSONCanvasEdge, JSONCanvasNode } from '@glyph/models';
import { CanvasState } from '@glyph/types';

export class CanvasStore {
  nodes = signal<JSONCanvasNode[]>([]);
  edges = signal<JSONCanvasEdge[]>([]);

  state = signal<CanvasState>('idle');
  selected = signal<string[]>([]);
  active = signal<string | null>(null);
  opened = signal<string[]>([]);

  selectedNodes = computed(() =>
    this.nodes().filter((node) => this.selected().includes(node.id())),
  );
}
