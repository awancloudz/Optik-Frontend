import { TestBed } from '@angular/core/testing';

import { DistributorService } from './distributor.service';

describe('DistributorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DistributorService = TestBed.get(DistributorService);
    expect(service).toBeTruthy();
  });
});
