import { TestBed } from '@angular/core/testing';

import { VFSService } from './fs.service';

describe('FsService', () => {
  let service: VFSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VFSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
