import { TestBed } from '@angular/core/testing';

import { KategoriProdukService } from './kategori-produk.service';

describe('KategoriProdukService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KategoriProdukService = TestBed.get(KategoriProdukService);
    expect(service).toBeTruthy();
  });
});
