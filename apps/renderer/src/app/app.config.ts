import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app.routes';
import { Ellipsis, LucideAngularModule } from 'lucide-angular';
import {
  Minus,
  Square,
  SquareArrowOutDownLeft,
  X,
  EllipsisVertical,
  FileWarning,
  Maximize,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes, withHashLocation()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Minus,
        Square,
        SquareArrowOutDownLeft,
        X,
        Ellipsis,
        EllipsisVertical,
        FileWarning,
        Maximize,
      }),
    ),
  ],
};
