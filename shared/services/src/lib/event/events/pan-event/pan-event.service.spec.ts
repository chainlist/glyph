import { TestBed } from '@angular/core/testing';

import { PanEventService } from './pan-event.service';

describe('PanEventService', () => {
  let service: PanEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
