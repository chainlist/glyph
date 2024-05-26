import { Injectable } from '@angular/core';
import { VFSService } from '../fs/fs.service';
import { IFileInfo } from '@glyph/types';
import { LoadingService } from '../loading/loading.service';
import { StoreService } from '../store/store.service';
import { BoardService } from '../board/board.service';
import { KnownWorkspaces } from '@glyph/models';
import { CanvasService } from '../canvas/canvas.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  knownWorkspaces = new KnownWorkspaces();

  constructor(
    private vfsSvc: VFSService,
    private loadingSvc: LoadingService,
    private store: StoreService,
    private boardSvc: BoardService,
    private canvasSvc: CanvasService,
    private router: Router,
  ) {}

  async open(rootPath: string, path = rootPath) {
    this.loadingSvc.start();
    const vfs = await this.vfsSvc.getVirtualFileSystem(rootPath);

    const root = vfs[0];

    const directory = vfs.find((d) => d.path === path);

    this.store.workspace.vfs.set(vfs);
    this.store.workspace.root.set(root);

    this.goTo(directory ?? root);

    this.loadingSvc.stop();
  }

  async goTo(directory: IFileInfo) {
    if (directory.isFile) return;

    this.store.workspace.directory.set(directory);
    await this.boardSvc.readBoardFile(directory.path);

    this.router.navigate([], {
      queryParams: { directory: directory.path },
      queryParamsHandling: 'merge',
    });

    this.canvasSvc.fit();
  }
}
