import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { CanvasService, SearchService } from '@glyph/services';

@Component({
  selector: 'lib-actions-buttons',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './actions-buttons.component.html',
  styleUrl: './actions-buttons.component.css',
})
export class ActionsButtonsComponent {
  constructor(private canvasSvc: CanvasService) {}

  fit() {
    this.canvasSvc.fit();
  }
}
