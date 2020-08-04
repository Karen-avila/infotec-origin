import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditodirectoComponent } from './creditodirecto.component';

describe('CreditodirectoComponent', () => {
  let component: CreditodirectoComponent;
  let fixture: ComponentFixture<CreditodirectoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditodirectoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditodirectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
