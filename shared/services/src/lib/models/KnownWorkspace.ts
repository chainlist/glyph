import { effect, signal } from '@angular/core';

export class KnownWorkspaces {
  #knownWorkspaces = signal<any[]>([]);

  constructor() {
    this.#loadFromStorage();

    effect(() => {
      this.#save();
    });
  }

  #save() {
    localStorage.setItem('workspaces', JSON.stringify(this.#knownWorkspaces()));
  }

  #loadFromStorage() {
    const workspaces = localStorage.getItem('workspaces');
    if (workspaces) {
      this.#knownWorkspaces.update(() => {
        try {
          return JSON.parse(workspaces);
        } catch {
          return [];
        }
      });
    }
  }

  getAll() {
    return this.#knownWorkspaces();
  }

  addWorkspace(workspace: any) {
    if (this.exists(workspace.path)) {
      return;
    }

    this.#knownWorkspaces.update((workspaces) => [...workspaces, workspace]);
  }

  exists(path: string) {
    return this.#knownWorkspaces().some((ws) => ws.path === path);
  }

  getByPath(path: string) {
    return this.#knownWorkspaces().filter((ws) => ws.path === path);
  }
}
