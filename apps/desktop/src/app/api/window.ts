import { BrowserWindow, shell } from 'electron';

export function minimize() {
  const window = BrowserWindow.getFocusedWindow();

  window.minimize();
}

export function maximize() {
  const window = BrowserWindow.getFocusedWindow();

  if (window.isMaximized()) {
    window.unmaximize();
  } else {
    window.maximize();
  }

  return window.isMaximized();
}

export function close() {
  const window = BrowserWindow.getFocusedWindow();

  window.close();
}

export function isMaximized() {
  const window = BrowserWindow.getFocusedWindow();

  return window.isMaximized();
}

export function openExplorer(path: string) {
  shell.openPath(path);
}
