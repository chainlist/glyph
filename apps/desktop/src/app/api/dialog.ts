import { dialog } from 'electron';

export function openFolderDialog() {
  return dialog.showOpenDialog({ properties: ['openDirectory'] });
}
