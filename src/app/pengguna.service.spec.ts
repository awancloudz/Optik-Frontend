import { TestBed } from '@angular/core/testing';

import { PenggunaService } from './pengguna.service';

describe('PenggunaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PenggunaService = TestBed.get(PenggunaService);
    expect(service).toBeTruthy();
  });
});
