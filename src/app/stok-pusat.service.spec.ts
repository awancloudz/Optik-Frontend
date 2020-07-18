import { TestBed } from '@angular/core/testing';

import { StokPusatService } from './stok-pusat.service';

describe('StokPusatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StokPusatService = TestBed.get(StokPusatService);
    expect(service).toBeTruthy();
  });
});
