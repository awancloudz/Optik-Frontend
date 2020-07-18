import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StokPusatComponent } from './stok-pusat.component';

describe('StokPusatComponent', () => {
  let component: StokPusatComponent;
  let fixture: ComponentFixture<StokPusatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StokPusatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StokPusatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
