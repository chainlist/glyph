import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JSONCanvasFileNode } from '@glyph/models';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'lib-canvas-node-file-not-found',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './canvas-node-file-not-found.component.html',
  styleUrl: './canvas-node-file-not-found.component.css',
})
export class CanvasNodeFileNotFoundComponent {
  node = input.required<JSONCanvasFileNode>();
}
