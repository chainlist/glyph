import { Component, computed, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFileInfo } from '@glyph/types';
import { JSONCanvasFileNode } from '@glyph/models';
import { VFSService } from '@glyph/services';
import { Marked, marked } from 'marked';

@Component({
  selector: 'lib-canvas-node-file-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas-node-file-note.component.html',
  styleUrl: './canvas-node-file-note.component.css',
})
export class CanvasNodeFileNoteComponent {
  file = input.required<IFileInfo>();
  node = input.required<JSONCanvasFileNode>();
  content = signal<string>('');

  parser = new Marked().use({ breaks: true, gfm: true });

  md = computed(() => this.parser.parse(this.content()));

  constructor(private vfsSvc: VFSService) {
    effect(async () => {
      if (this.file()) {
        const content = await this.vfsSvc.readFile(this.file().path);

        this.content.set(content);

        return;
      }
    });
  }
}
