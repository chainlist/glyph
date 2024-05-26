import { signal } from '@angular/core';
import { JSONCanvasEdge, JSONCanvasNode } from '@glyph/models';

export class JSONCanvasStore {
  nodes = signal<JSONCanvasNode[]>([]);
  edges = signal<JSONCanvasEdge[]>([]);
}
