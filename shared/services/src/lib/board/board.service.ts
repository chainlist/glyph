import { Injectable } from '@angular/core';
import { StoreService } from '../store/store.service';
import { VFSService } from '../fs/fs.service';
import { JSONCanvasEdge, JSONCanvasNode } from '@glyph/models';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(
    private store: StoreService,
    private vfs: VFSService,
  ) {}

  async readBoardFile(directory: string) {
    this.store.canvas.nodes.set([]);
    this.store.canvas.edges.set([]);

    const board = await this.vfs.readBoardFile(directory);

    const nodes = board?.nodes?.map((node) => JSONCanvasNode.create(node));
    const edges = board?.edges?.map((edge) => new JSONCanvasEdge(edge));

    this.store.canvas.nodes.set(nodes || []);
    this.store.canvas.edges.set(edges || []);
  }

  addNode() {
    console.log('addNode');
  }

  addEdge() {
    console.log('addEdge');
  }
}
