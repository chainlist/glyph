/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  #api = (window as any).__GLYPH_API__.window;

  minimize() {
    return this.#api.minimize();
  }

  maximize(): Promise<boolean> {
    return this.#api.maximize();
  }

  close() {
    return this.#api.close();
  }

  isMaximized(): Promise<boolean> {
    return this.#api.isMaximized();
  }

  openWorkspace(path: string) {
    return this.#api.openWorkspace(path);
  }

  openExplorer(path: string) {
    return this.#api.openExplorer(path);
  }
}
