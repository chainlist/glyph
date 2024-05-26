import { BaseEvent } from './BaseEvent';

export class IdleEvent extends BaseEvent<void> {
  constructor() {
    super('idle', void 0);
  }
}
