import { signal } from '@angular/core';
import {
  IJSONCanvasColor,
  IJSONCanvasEdge,
  IJSONCanvasEdgeEnd,
  IJSONCanvasEdgeSide,
} from '@glyph/types';
import * as uuid from 'short-uuid';

export class JSONCanvasEdge {
  id = signal<string>(uuid.generate());

  fromNode = signal<string>('');
  toNode = signal<string>('');

  fromSide = signal<IJSONCanvasEdgeSide | undefined>('top');
  toSide = signal<IJSONCanvasEdgeSide | undefined>('top');
  toEnd = signal<IJSONCanvasEdgeEnd | undefined>('arrow');

  color = signal<IJSONCanvasColor | undefined>(undefined);
  label = signal<string | undefined>(undefined);

  constructor(edge: IJSONCanvasEdge) {
    this.id.set(edge.id);
    this.fromNode.set(edge.fromNode);
    this.toNode.set(edge.toNode);
    this.fromSide.set(edge.fromSide);
    this.toSide.set(edge.toSide);
    this.toEnd.set(edge.toEnd);
    this.color.set(edge.color);
    this.label.set(edge.label);
  }
}
