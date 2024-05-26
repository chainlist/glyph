import {
  Component,
  ElementRef,
  OnInit,
  computed,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasService, EventService, StoreService } from '@glyph/services';
import { CanvasNodeComponent } from './canvas-node/canvas-node.component';

@Component({
  selector: 'lib-canvas',
  standalone: true,
  imports: [CommonModule, CanvasNodeComponent],
  templateUrl: './canvas.component.html',
  styleUrl: './canvas.component.css',
})
export class CanvasComponent implements OnInit {
  root = viewChild.required<ElementRef<HTMLDivElement>>('root');

  center = computed(() => this.canvasSvc.center);
  scale = computed(() => this.canvasSvc.scale());
  offset = computed(() => this.canvasSvc.offset);

  centerTransform = computed(
    () => `translate(${this.center().x()}px, ${this.center().y()}px)`,
  );
  scaleTransform = computed(() => `scale(${this.scale()})`);
  offsetTransform = computed(
    () => `translate(${this.offset().x()}px, ${this.offset().y()}px)`,
  );

  nodes = computed(() => this.store.canvas.nodes());
  edges = computed(() => this.store.canvas.edges());

  constructor(
    private canvasSvc: CanvasService,
    private store: StoreService,
    private eventSvc: EventService,
  ) {}

  ngOnInit(): void {
    this.canvasSvc.setRoot(this.root().nativeElement);
    this.eventSvc.startListening(this.root().nativeElement);
  }
}
