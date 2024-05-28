import { Injectable, signal } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  JSONCanvasEdge,
  JSONCanvasNode,
  Point,
  Rect,
  Size,
} from '@glyph/models';
import { StoreService } from '../store/store.service';
import { CanvasState, IJSONCanvasEdgeSide } from '@glyph/types';
import * as uuid from 'short-uuid';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  root = signal<HTMLElement | null>(null);
  dimensions = new Size(0, 0);
  center = new Point(0, 0);
  offset = new Point(0, 0);
  scale = signal<number>(1);

  constructor(private store: StoreService) {
    fromEvent(window, 'resize')
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.refresh());
  }

  setRoot(root: HTMLElement) {
    this.root.set(root);
    this.refresh();
  }

  refresh() {
    this.#refreshSize();
    this.#refreshCenter();
  }

  pan(x: number, y: number) {
    this.offset.x.update((offset) => offset + x / this.scale());
    this.offset.y.update((offset) => offset + y / this.scale());
  }

  #refreshSize() {
    const root = this.root();
    if (!root) return;

    const { width, height } = root.getBoundingClientRect();
    this.dimensions.width.set(width);
    this.dimensions.height.set(height);
  }

  #refreshCenter() {
    this.center.x.set(this.dimensions.width() / 2);
    this.center.y.set(this.dimensions.height() / 2);
  }

  #fitScale(rect: Rect, margin: number) {
    const { width, height } = rect.size;
    const scaleX = this.dimensions.width() / (width() + margin);
    const scaleY = this.dimensions.height() / (height() + margin);

    return Math.min(Math.min(scaleX, scaleY), 1);
  }

  toCoordinates(point: Point) {
    const rect = this.root()?.getBoundingClientRect();

    if (!rect) return point;

    const offsetX = this.offset.x() * this.scale();
    const offsetY = this.offset.y() * this.scale();
    const centerX = this.center.x();
    const centerY = this.center.y();
    const rectLeft = rect.left;
    const rectTop = rect.top;
    const scale = this.scale();

    // Apply all adjustments in one update for each axis
    point.x.update((x) => (x - centerX - offsetX - rectLeft) / scale);
    point.y.update((y) => (y - centerY - offsetY - rectTop) / scale);

    return point;
  }

  fit(nodes: JSONCanvasNode[] = this.store.canvas.nodes()) {
    const rect = Rect.getRectFrom(nodes.map((node) => node.rect));
    const scale = this.#fitScale(rect, 100);
    const rectCenter = rect.getCenter();

    this.scale.set(scale);
    this.offset.x.set(-rectCenter.x());
    this.offset.y.set(-rectCenter.y());
  }

  /**
   * Putting multiple states in the parameter will return true if the current state is one of them. (acting as an OR operator)
   * @param states State name
   */
  is(...states: CanvasState[]) {
    return states.includes(this.store.canvas.state());
  }

  selectAll(nodes: JSONCanvasNode[]) {
    this.store.canvas.selected.set(nodes.map((node) => node.id()));
  }

  select(node: JSONCanvasNode) {
    this.store.canvas.selected.update((s) => [...s, node.id()]);
  }

  unselect(node: JSONCanvasNode) {
    this.store.canvas.selected.update((selected) =>
      selected.filter((id) => id !== node.id()),
    );
  }

  unselectAll() {
    this.store.canvas.selected.set([]);
  }

  isSelected(node: JSONCanvasNode) {
    return this.store.canvas.selected().includes(node.id());
  }

  getSelectedNodes() {
    return this.store.canvas
      .nodes()
      .filter((node) => this.store.canvas.selected().includes(node.id()));
  }

  connect(
    from: JSONCanvasNode,
    fromEdge: IJSONCanvasEdgeSide,
    to: JSONCanvasNode,
    toEdge: IJSONCanvasEdgeSide,
  ) {
    this.store.canvas.edges.update((edges) => [
      ...edges,
      new JSONCanvasEdge({
        id: uuid.generate(),
        fromNode: from.id(),
        toNode: to.id(),
        fromSide: fromEdge,
        toSide: toEdge,
        toEnd: 'arrow',
      }),
    ]);
  }

  disconnect(from: JSONCanvasEdge, to: JSONCanvasEdge) {
    this.store.canvas.edges.update((edges) =>
      edges.filter(
        (edge) => edge.fromNode() !== from.id() && edge.toNode() !== to.id(),
      ),
    );
  }
}
