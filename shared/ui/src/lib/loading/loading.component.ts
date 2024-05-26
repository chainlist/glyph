import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '@glyph/services';

@Component({
  selector: 'lib-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent {
  isLoading = computed(() => this.loadingSvc.isLoading());
  step = computed(() => this.loadingSvc.step());
  percentage = computed(() => this.loadingSvc.percentage());

  constructor(private loadingSvc: LoadingService) {}
}
