import { signal } from '@angular/core';
import { JSONCanvasEdge, JSONCanvasNode } from '@glyph/models';
import { CavnasState } from '@glyph/types';

export class CanvasStore {
  nodes = signal<JSONCanvasNode[]>([]);
  edges = signal<JSONCanvasEdge[]>([]);

  state = signal<CavnasState>('idle');
  selected = signal<string[]>([]);
  opened = signal<string[]>([]);
}
