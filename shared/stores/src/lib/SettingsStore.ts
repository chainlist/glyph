import { signal } from '@angular/core';

export class SettingsStore {
  darkMode = signal<boolean>(false);
  fontSize = signal<number>(14);
  fontFamily = signal<string>('Helvetica');
  theme = signal<string>('default');
  language = signal<string>('en');
  reducedMotion = signal<boolean>(false);
}
