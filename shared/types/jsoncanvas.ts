export type IJSONCanvasNodeType = 'text' | 'file' | 'link' | 'group';

export interface IJSONCanvasNodeGeneric {
  id: string;
  type: IJSONCanvasNodeType;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: IJSONCanvasColor;
}

export interface IJSONCanvasTextNode extends IJSONCanvasNodeGeneric {
  type: 'text';
  text: string;
}

export interface IJSONCanvasFileNode extends IJSONCanvasNodeGeneric {
  type: 'file';
  file: string;
  subpath?: string;
}

export interface IJSONCanvasLinkNode extends IJSONCanvasNodeGeneric {
  type: 'link';
  url: string;
}

export interface IJSONCanvasGroupNode extends IJSONCanvasNodeGeneric {
  type: 'group';
  label?: string;
  background?: string;
  backgroundStyle?: IJSONCanvasGroupBackgroundStyle;
}

export type IJSONCanvasEdgeSide = 'top' | 'right' | 'bottom' | 'left';
export type IJSONCanvasEdgeEnd = 'none' | 'arrow';
export type IJSONCanvasGroupBackgroundStyle = 'cover' | 'ratio' | 'repeat';

export interface IJSONCanvasEdge {
  id: string;
  fromNode: string;
  fromSide?: IJSONCanvasEdgeSide;
  toNode: string;
  toSide?: IJSONCanvasEdgeSide;
  toEnd?: IJSONCanvasEdgeEnd;
  color?: IJSONCanvasColor;
  label?: string;
}

enum IJSONCanvasColorPreset {
  'red' = 1,
  'orange',
  'yellow',
  'green',
  'cyan',
  'purple',
}

export type IJSONCanvasColor = string | IJSONCanvasColorPreset;

export type IJSONCanvasNode =
  | IJSONCanvasNodeGeneric
  | IJSONCanvasTextNode
  | IJSONCanvasFileNode
  | IJSONCanvasLinkNode
  | IJSONCanvasGroupNode;

export type ICurveType = 'smooth' | 'straight';

export interface IJSONCanvas {
  nodes: IJSONCanvasNode[];
  edges: IJSONCanvasEdge[];
}
