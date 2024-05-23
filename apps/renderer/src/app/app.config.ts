import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { appRoutes } from './app.routes';
import { Ellipsis, LucideAngularModule } from 'lucide-angular';
import {
  Minus,
  Square,
  SquareArrowOutDownLeft,
  X,
  EllipsisVertical,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withHashLocation()),
    importProvidersFrom(
      LucideAngularModule.pick({
        Minus,
        Square,
        SquareArrowOutDownLeft,
        X,
        Ellipsis,
        EllipsisVertical,
      })
    ),
  ],
};
