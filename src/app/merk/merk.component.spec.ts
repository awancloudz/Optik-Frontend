import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerkComponent } from './merk.component';

describe('MerkComponent', () => {
  let component: MerkComponent;
  let fixture: ComponentFixture<MerkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
