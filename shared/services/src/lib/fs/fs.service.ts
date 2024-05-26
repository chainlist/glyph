/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { IFileInfo, IJSONCanvas } from '@glyph/types';
@Injectable({
  providedIn: 'root',
})
export class VFSService {
  #api = (window as any).__GLYPH_API__.fs;

  getVirtualFileSystem(path: string): Promise<IFileInfo[]> {
    return this.#api.getVirtualFileSystem(path);
  }

  async readBoardFile(directory: string): Promise<IJSONCanvas | null> {
    return this.#api.readBoardFile(directory);
  }

  async readFile(path: string): Promise<string> {
    return this.#api.readFile(path);
  }
}
