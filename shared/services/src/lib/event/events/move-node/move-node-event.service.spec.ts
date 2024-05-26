import { TestBed } from '@angular/core/testing';

import { MoveNodeEventService } from './move-node-event.service';

describe('MoveNodeEventService', () => {
  let service: MoveNodeEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveNodeEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
