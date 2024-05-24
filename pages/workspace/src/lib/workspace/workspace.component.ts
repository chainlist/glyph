import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '@glyph/ui';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { VFSService } from '@glyph/services';
@Component({
  selector: 'lib-workspace',
  standalone: true,
  imports: [CommonModule, TopbarComponent],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css',
})
export class WorkspaceComponent implements OnInit {
  queryParamMap = toSignal(this.route.queryParamMap);

  constructor(private route: ActivatedRoute, private fsSvc: VFSService) {}

  async ngOnInit() {
    const rootPath = this.queryParamMap()?.get('root');

    if (!rootPath) return;

    this.fsSvc.initDirectoriesTree(rootPath);
  }
}
