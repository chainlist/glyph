import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IFileInfo } from '@glyph/types';
import { JSONCanvasFileNode } from '@glyph/models';
import { WorkspaceService } from '@glyph/services';

@Component({
  selector: 'lib-canvas-node-file-folder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './canvas-node-file-folder.component.html',
  styleUrl: './canvas-node-file-folder.component.css',
})
export class CanvasNodeFileFolderComponent {
  node = input.required<JSONCanvasFileNode>();
  file = input.required<IFileInfo>();

  fontSize = computed(
    () => `${Math.max(16, this.node().rect.size.width() / 8)}px`,
  );

  constructor(private workspaceSvc: WorkspaceService) {}

  goto() {
    this.workspaceSvc.goTo(this.file());
  }
}
