import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '@glyph/ui';
import { KnownWorkspacesComponent } from '../components/known-workspaces/known-workspaces.component';
import {
  DialogService,
  WindowService,
  WorkspaceService,
} from '@glyph/services';

@Component({
  selector: 'lib-startup',
  standalone: true,
  imports: [CommonModule, TopbarComponent, KnownWorkspacesComponent],
  templateUrl: './startup.component.html',
  styleUrl: './startup.component.css',
})
export class StartupComponent {
  constructor(
    private dialogSvc: DialogService,
    private workspaceSvc: WorkspaceService,
    private windowSvc: WindowService
  ) {}

  async open() {
    const folder = await this.dialogSvc.openFolder();

    if (!folder) {
      return;
    }

    this.workspaceSvc.knownWorkspaces.addWorkspace(folder);
    this.windowSvc.openWorkspace(folder.path);
  }
}
