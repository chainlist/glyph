/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { app, ipcMain } from 'electron';
import { environment } from '../../environments/environment';
import { openFolderDialog } from '../api/dialog';
import { getFileInfo, getVirtualFileSystem, readDirectory } from '../api/fs';
import { close, isMaximized, maximize, minimize } from '../api/window';
import App from '../app';

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }

  static handle<T extends (...args: any) => any>(channel: string, obj: T) {
    ipcMain.handle(channel, async (_, ...args) => {
      return obj(...args);
    });
  }
}

ElectronEvents.handle('dialog:open-folder', openFolderDialog);
ElectronEvents.handle('fs:get-file-info', getFileInfo);
ElectronEvents.handle('fs:get-virtual-file-system', getVirtualFileSystem);
ElectronEvents.handle('fs:read-directory', readDirectory);
ElectronEvents.handle('window:minimize', minimize);
ElectronEvents.handle('window:maximize', maximize);
ElectronEvents.handle('window:close', close);
ElectronEvents.handle('window:is-maximized', isMaximized);
ElectronEvents.handle('window:open-workspace', App.openWorkspaceWindow);

// Retrieve app version
ipcMain.handle('get-app-version', (event) => {
  console.log(`Fetching application version... [v${environment.version}]`);

  return environment.version;
});

// Handle App termination
ipcMain.on('quit', (event, code) => {
  app.exit(code);
});
