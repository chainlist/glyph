import { Component, importProvidersFrom, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { WindowService } from '@glyph/services';

@Component({
  selector: 'lib-topbar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  disableMaximize = input(false);
  isMaximized = signal(false);

  constructor(private windowSvc: WindowService) {}

  minimize() {
    this.windowSvc.minimize();
  }

  async maximize() {
    const isMaximized = await this.windowSvc.maximize();
    this.isMaximized.set(isMaximized);
  }

  close() {
    this.windowSvc.close();
  }
}
