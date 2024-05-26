import { Injectable } from '@angular/core';
import { CanvasStore, SettingsStore, WorkspaceStore } from '@glyph/stores';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  workspace = new WorkspaceStore();
  settings = new SettingsStore();
  canvas = new CanvasStore();
}
