import { computed, signal } from '@angular/core';
import { IFileInfo } from '@glyph/types';

export class WorkspaceStore {
  root = signal<undefined | IFileInfo>(undefined);
  directory = signal<undefined | IFileInfo>(undefined);
  vfs = signal<IFileInfo[]>([]);
  board = signal<any>(null);
  files = computed(() =>
    this.vfs().filter((file) => file.directory === this.directory()?.path)
  );
}
