import { TestBed } from '@angular/core/testing';

import { JsoncanvasService } from './board.service';

describe('JsoncanvasService', () => {
  let service: JsoncanvasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsoncanvasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
