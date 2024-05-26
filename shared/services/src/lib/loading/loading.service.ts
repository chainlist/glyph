import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading = signal<boolean>(false);
  step = signal<string>('Loading things for you...');
  percentage = signal<number>(0);

  start() {
    this.isLoading.set(true);
  }

  setStep(msg: string) {
    this.step.set(msg);
  }

  stop() {
    this.isLoading.set(false);
  }
}
