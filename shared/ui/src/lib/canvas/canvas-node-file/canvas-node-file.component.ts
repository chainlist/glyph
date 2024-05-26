import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreService } from '@glyph/services';
import { JSONCanvasFileNode } from '@glyph/models';
import { CanvasNodeFileNotFoundComponent } from './canvas-node-file-not-found/canvas-node-file-not-found.component';
import { CanvasNodeFileNoteComponent } from './canvas-node-file-note/canvas-node-file-note.component';
import { CanvasNodeFileFolderComponent } from './canvas-node-file-folder/canvas-node-file-folder.component';

@Component({
  selector: 'lib-canvas-node-file',
  standalone: true,
  imports: [
    CommonModule,
    CanvasNodeFileNotFoundComponent,
    CanvasNodeFileNoteComponent,
    CanvasNodeFileFolderComponent,
  ],
  templateUrl: './canvas-node-file.component.html',
  styleUrl: './canvas-node-file.component.css',
})
export class CanvasNodeFileComponent {
  node = input.required<JSONCanvasFileNode>();

  file = computed(() =>
    this.store.workspace
      .files()
      .find((f) => `${f.name}${f.ext}` === this.node()?.file()),
  );

  isDirectory = computed(() => this.file()?.isDirectory);

  constructor(private store: StoreService) {}
}
