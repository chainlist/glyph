import { signal } from '@angular/core';
import type {
  IJSONCanvasFileNode,
  IJSONCanvasGroupBackgroundStyle,
  IJSONCanvasGroupNode,
  IJSONCanvasLinkNode,
  IJSONCanvasNode,
  IJSONCanvasNodeType,
  IJSONCanvasTextNode,
} from '@glyph/types';
import * as uuid from 'short-uuid';
import { Rect } from './Rect';

export class JSONCanvasNode {
  id = signal<string>(uuid.generate());
  type = signal<IJSONCanvasNodeType>('file');
  rect = new Rect(0, 0, 0, 0);
  color = signal<string | undefined>(undefined);

  constructor(node: IJSONCanvasNode) {
    this.id.set(node.id);
    this.type.set(node.type);
    this.rect = new Rect(node.x, node.y, node.width, node.height);
  }

  static create(node: IJSONCanvasNode) {
    switch (node.type) {
      case 'text':
        return new JSONCanvasTextNode(node as IJSONCanvasTextNode);
      case 'file':
        return new JSONCanvasFileNode(node as IJSONCanvasFileNode);
      case 'link':
        return new JSONCanvasLinkNode(node as IJSONCanvasLinkNode);
      case 'group':
        return new JSONCanvasGroupNode(node as IJSONCanvasGroupNode);
    }
  }
}

export class JSONCanvasTextNode extends JSONCanvasNode {
  text = signal<string>('');

  constructor(node: IJSONCanvasTextNode) {
    super(node);
    this.type.set('text');
  }
}

export class JSONCanvasFileNode extends JSONCanvasNode {
  file = signal<string>('');
  subpath = signal<string | undefined>(undefined);

  constructor(node: IJSONCanvasFileNode) {
    super(node);
    this.type.set('file');
    this.file.set(node.file);
    this.subpath.set(node.subpath);
  }
}

export class JSONCanvasLinkNode extends JSONCanvasNode {
  url = signal<string>('');

  constructor(node: IJSONCanvasLinkNode) {
    super(node);
    this.type.set('link');
    this.url.set(node.url);
  }
}

export class JSONCanvasGroupNode extends JSONCanvasNode {
  label = signal<string | undefined>(undefined);
  background = signal<string | undefined>(undefined);
  backgroundStyle = signal<IJSONCanvasGroupBackgroundStyle | undefined>(
    'cover'
  );

  constructor(node: IJSONCanvasGroupNode) {
    super(node);
    this.type.set('group');
    this.label.set(node.label);
    this.background.set(node.background);
    this.backgroundStyle.set(node.backgroundStyle);
  }
}
