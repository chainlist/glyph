import { contextBridge, ipcRenderer } from 'electron';
import type { openFolderDialog } from './dialog';
import type {
  getVirtualFileSystem,
  getFileInfo,
  readDirectory,
  readBoardFile,
  readFile,
} from './fs';
import type {
  maximize,
  minimize,
  close,
  isMaximized,
  openExplorer,
} from './window';

export function exposeFromRenderer<T extends (...args: any) => any>(
  channel: string,
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
    getVirtualFileSystem: exposeFromRenderer<typeof getVirtualFileSystem>(
      'fs:get-virtual-file-system',
    ),
    readBoardFile:
      exposeFromRenderer<typeof readBoardFile>('fs:read-board-file'),
    getFileInfo: exposeFromRenderer<typeof getFileInfo>('fs:get-file-info'),
    readDirectory:
      exposeFromRenderer<typeof readDirectory>('fs:read-directory'),
    readFile: exposeFromRenderer<typeof readFile>('fs:read-file'),
  },

  window: {
    minimize: exposeFromRenderer<typeof minimize>('window:minimize'),
    maximize: exposeFromRenderer<typeof maximize>('window:maximize'),
    close: exposeFromRenderer<typeof close>('window:close'),
    isMaximized: exposeFromRenderer<typeof isMaximized>('window:is-maximized'),
    openExplorer: exposeFromRenderer<typeof openExplorer>(
      'window:open-explorer',
    ),
    openWorkspace: (path: string) =>
      ipcRenderer.invoke('window:open-workspace', path),
  },
});
