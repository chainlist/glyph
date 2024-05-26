import { Component, computed, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFileInfo } from '@glyph/types';
import { JSONCanvasFileNode } from '@glyph/models';
import { StoreService, VFSService } from '@glyph/services';
import { MarkdownViewerComponent } from '../../../markdown-viewer/markdown-viewer.component';

@Component({
  selector: 'lib-canvas-node-file-note',
  standalone: true,
  imports: [CommonModule, MarkdownViewerComponent],
  templateUrl: './canvas-node-file-note.component.html',
  styleUrl: './canvas-node-file-note.component.css',
})
export class CanvasNodeFileNoteComponent {
  file = input.required<IFileInfo>();
  node = input.required<JSONCanvasFileNode>();
  content = signal<string>('');

  name = computed(() => this.node().file());

  displayFilenames = computed(() => this.store.settings.displayFilenames());

  constructor(
    private vfsSvc: VFSService,
    private store: StoreService,
  ) {
    effect(async () => {
      if (this.file()) {
        const content = await this.vfsSvc.readFile(this.file().path);

        this.content.set(content);

        return;
      }
    });
  }
}
