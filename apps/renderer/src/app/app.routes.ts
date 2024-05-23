import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@glyph/startup').then((m) => m.StartupComponent),
  },
  {
    path: 'workspace',
    loadComponent: () =>
      import('@glyph/workspace').then((m) => m.WorkspaceComponent),
  },
];
