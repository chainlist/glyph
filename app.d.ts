declare global {
  interface FileInfo {
    name: string;
    directory: string;
    path: string;
    isFile: boolean;
    isDirectory: boolean;
  }

  interface JSONCanvasNodeGeneric {
    id: string;
    type: 'text' | 'file' | 'link' | 'group';
    x: number;
    y: number;
    width: number;
    height: number;
    color?: JSONCanvasColor;
  }

  interface JSONCanvasTextNode extends JSONCanvasNodeGeneric {
    type: 'text';
    text: string;
  }

  interface JSONCanvasFileNode extends JSONCanvasNodeGeneric {
    type: 'file';
    file: string;
    subpath?: string;
  }

  interface JSONCanvasLinkNode extends JSONCanvasNodeGeneric {
    type: 'link';
    url: string;
  }

  interface JSONCanvasGroupNode extends JSONCanvasNodeGeneric {
    type: 'group';
    label?: string;
    background?: string;
    backgroundStyle?: 'cover' | 'ratio' | 'repeat';
  }

  type JSONCanvasEdgeSide = 'top' | 'right' | 'bottom' | 'left';
  type JSONCanvasEdgeEnd = 'none' | 'arrow';

  interface JSONCanvasEdge {
    id: string;
    fromNode: string;
    fromSide?: JSONCanvasEdgeSide;
    toNode: string;
    toSide?: JSONCanvasEdgeSide;
    toEnd?: JSONCanvasEdgeEnd;
    color?: JSONCanvasColor;
    label?: string;
  }

  enum JSONCanvasColorPreset {
    1 = 'red',
    2 = 'orange',
    3 = 'yellow',
    4 = 'green',
    5 = 'cyan',
    6 = 'purple',
  }

  type JSONCanvasColor = string | JSONCanvasColorPreset;

  type JSONCanvasNode =
    | JSONCanvasNodeGeneric
    | JSONCanvasTextNode
    | JSONCanvasFileNode
    | JSONCanvasLinkNode
    | JSONCanvasGroupNode;

  type CurveType = 'smooth' | 'straight';

  interface JSONCanvas {
    nodes: JSONCanvasNode[];
    edges: JSONCanvasEdge[];
  }
}

export {};
