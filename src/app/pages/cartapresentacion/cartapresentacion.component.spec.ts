import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartapresentacionComponent } from './cartapresentacion.component';

describe('CartapresentacionComponent', () => {
  let component: CartapresentacionComponent;
  let fixture: ComponentFixture<CartapresentacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartapresentacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartapresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
