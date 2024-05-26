import { TestBed } from '@angular/core/testing';

import { IdleEventService } from './idle-event.service';

describe('IdleEventService', () => {
  let service: IdleEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdleEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
