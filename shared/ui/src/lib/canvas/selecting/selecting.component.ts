import { Component, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectNodesService } from '@glyph/services';

@Component({
  selector: 'lib-selecting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './selecting.component.html',
  styleUrl: './selecting.component.css',
})
export class SelectingComponent {
  rect = computed(() => this.selectNodes.rect());

  x = computed(() => this.rect()?.coords.x());
  y = computed(() => this.rect()?.coords.y());
  width = computed(() => this.rect()?.size.width());
  height = computed(() => this.rect()?.size.height());

  transform = computed(() => `translate(${this.x()}px, ${this.y()}px)`);

  constructor(private selectNodes: SelectNodesService) {}
}
