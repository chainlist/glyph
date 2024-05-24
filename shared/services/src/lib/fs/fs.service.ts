import { Injectable, signal } from '@angular/core';
import { IFileInfo } from '@glyph/types';

@Injectable({
  providedIn: 'root',
})
export class VFSService {
  api = (window as any).__GLYPH_API__.fs;

  rootPath = signal<string>('');
  tree = signal<IFileInfo | undefined>(undefined);

  currentDirectory = signal<IFileInfo | undefined>(undefined);
  files = signal<IFileInfo[]>([]);

  async initDirectoriesTree(workspacePath: string) {
    const vfs = (await this.api.getVirtualFileSystem(
      workspacePath
    )) as IFileInfo;

    this.rootPath.set(workspacePath);
    this.tree.set(vfs);
    this.goTo(vfs);

    return vfs;
  }

  async goTo(directory: IFileInfo) {
    this.currentDirectory.set(directory);

    if (this.currentDirectory()?.files?.length) return;

    const files = await this.api.readDirectory(directory.path);
    this.files.set(files);
  }

  addDirectory(name: string, parent?: IFileInfo) {
    return this.api.mkdir(name, parent?.path);
  }

  removeDirectory(directory: IFileInfo) {
    return this.api.rmdir(directory.path);
  }

  addFile(name: string, parent?: IFileInfo) {
    return this.api.touch(name, parent?.path);
  }

  removeFile(file: IFileInfo) {
    return this.api.rm(file.path);
  }
}
