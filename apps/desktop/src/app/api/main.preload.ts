import { contextBridge, ipcRenderer } from 'electron';
import type { openFolderDialog } from './dialog';
import type { getFileInfo } from './fs';
import type { maximize, minimize, close, isMaximized } from './window';

export function exposeFromRenderer<T extends (...args: any) => any>(
  channel: string
) {
  return (...args: Parameters<T>): ReturnType<T> => {
    return ipcRenderer.invoke(channel, ...args) as ReturnType<T>;
  };
}

contextBridge.exposeInMainWorld('__GLYPH_API__', {
  dialog: {
    openFolder:
      exposeFromRenderer<typeof openFolderDialog>('dialog:open-folder'),
  },
  fs: {
    getFileInfo: exposeFromRenderer<typeof getFileInfo>('fs:get-file-info'),
  },

  window: {
    minimize: exposeFromRenderer<typeof minimize>('window:minimize'),
    maximize: exposeFromRenderer<typeof maximize>('window:maximize'),
    close: exposeFromRenderer<typeof close>('window:close'),
    isMaximized: exposeFromRenderer<typeof isMaximized>('window:is-maximized'),
    openWorkspace: (path: string) =>
      ipcRenderer.invoke('window:open-workspace', path),
  },
});
