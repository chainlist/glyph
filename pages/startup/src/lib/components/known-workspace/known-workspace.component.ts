import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularComponent, LucideAngularModule } from 'lucide-angular';
import { WindowService } from '@glyph/services';

@Component({
  selector: 'lib-known-workspace',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './known-workspace.component.html',
  styleUrl: './known-workspace.component.css',
})
export class KnownWorkspaceComponent {
  workspace = input.required<any>();
  name = computed(() => this.workspace().name);
  path = computed(() => this.workspace().path);
  directory = computed(() => this.workspace().directory);

  constructor(private windowSvc: WindowService) {}

  open() {
    this.windowSvc.openWorkspace(this.path());
  }
}
