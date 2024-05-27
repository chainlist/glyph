import { TestBed } from '@angular/core/testing';

import { SelectNodesService } from './select-nodes.service';

describe('SelectNodesService', () => {
  let service: SelectNodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectNodesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
