import { TestBed } from '@angular/core/testing';

import { KaryawanService } from './karyawan.service';

describe('KaryawanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KaryawanService = TestBed.get(KaryawanService);
    expect(service).toBeTruthy();
  });
});
