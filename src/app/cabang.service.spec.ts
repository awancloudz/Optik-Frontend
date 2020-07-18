import { TestBed } from '@angular/core/testing';

import { CabangService } from './cabang.service';

describe('CabangService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CabangService = TestBed.get(CabangService);
    expect(service).toBeTruthy();
  });
});
