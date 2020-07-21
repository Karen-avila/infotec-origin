import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcontratoComponent } from './ccontrato.component';

describe('CcontratoComponent', () => {
  let component: CcontratoComponent;
  let fixture: ComponentFixture<CcontratoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcontratoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcontratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
