import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceService } from '@glyph/services';
import { KnownWorkspaceComponent } from '../known-workspace/known-workspace.component';

@Component({
  selector: 'lib-known-workspaces',
  standalone: true,
  imports: [CommonModule, KnownWorkspaceComponent],
  templateUrl: './known-workspaces.component.html',
  styleUrl: './known-workspaces.component.css',
})
export class KnownWorkspacesComponent {
  workspaces = computed(() => this.workspacesSvc.knownWorkspaces.getAll());

  constructor(private workspacesSvc: WorkspaceService) {}
}
