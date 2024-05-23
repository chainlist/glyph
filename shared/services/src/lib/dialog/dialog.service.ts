import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  api = (window as any).__GLYPH_API__;

  async openFolder() {
    const result = await this.api.dialog.openFolder();

    if (result.canceled) {
      return null;
    }

    const path = result.filePaths[0];

    const fileInfo = await this.api.fs.getFileInfo(path);

    return fileInfo;
  }
}
