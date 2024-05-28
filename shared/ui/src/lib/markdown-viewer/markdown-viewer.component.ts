import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Marked } from 'marked';

@Component({
  selector: 'lib-markdown-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './markdown-viewer.component.html',
  styleUrl: './markdown-viewer.component.css',
})
export class MarkdownViewerComponent {
  editable = input<boolean>(false);
  content = input.required<string>();
  parser = new Marked().use({ breaks: true, gfm: true });
  markdown = computed(() => this.parser.parse(this.content()));
}
