import { Component, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ActionsButtonsComponent,
  CanvasComponent,
  LoadingComponent,
  TopbarComponent,
} from '@glyph/ui';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { WindowService, WorkspaceService } from '@glyph/services';
import { StoreService } from 'shared/services/src/lib/store/store.service';
@Component({
  selector: 'lib-workspace',
  standalone: true,
  imports: [
    CommonModule,
    TopbarComponent,
    LoadingComponent,
    CanvasComponent,
    ActionsButtonsComponent,
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css',
})
export class WorkspaceComponent implements OnInit {
  queryParamMap = toSignal(this.route.queryParamMap);
  files = computed(() => this.store.workspace.files());
  workspaceName = computed(() => this.store.workspace.root()?.name ?? 'Glyph');

  constructor(
    private route: ActivatedRoute,
    private workspaceSvc: WorkspaceService,
    private store: StoreService,
    private windowSvc: WindowService,
  ) {}

  async ngOnInit() {
    const rootPath = this.queryParamMap()?.get('root');

    if (!rootPath) return;

    this.workspaceSvc.open(rootPath);
  }

  open() {
    if (this.store.workspace.directory()?.path) {
      const directory = this.store.workspace.directory();
      if (directory?.path) {
        this.windowSvc.openExplorer(directory.path);
      }
    }
  }
}
