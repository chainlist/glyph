import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '@glyph/ui';

@Component({
  selector: 'lib-workspace',
  standalone: true,
  imports: [CommonModule, TopbarComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css',
})
export class WorkspaceComponent {}
