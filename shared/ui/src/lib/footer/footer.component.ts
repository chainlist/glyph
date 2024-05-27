import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasService, StoreService } from '@glyph/services';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  state = computed(() => this.store.canvas.state());

  constructor(private store: StoreService) {}
}
