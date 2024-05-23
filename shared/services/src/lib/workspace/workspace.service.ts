import { Injectable, effect, signal } from '@angular/core';
import { KnownWorkspaces } from '../models/KnownWorkspace';

@Injectable({
  providedIn: 'root',
})
export class WorkspaceService {
  knownWorkspaces = new KnownWorkspaces();
}
