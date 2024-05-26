import { Injectable } from '@angular/core';
import { BaseEventService } from '../BaseEventService';

@Injectable({
  providedIn: 'root',
})
export class IdleEventService extends BaseEventService<void> {
  constructor() {
    super('idle');
  }
}
