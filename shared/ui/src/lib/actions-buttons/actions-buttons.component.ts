import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'lib-actions-buttons',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './actions-buttons.component.html',
  styleUrl: './actions-buttons.component.css',
})
export class ActionsButtonsComponent {}
