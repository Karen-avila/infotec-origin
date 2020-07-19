import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickAddressComponent } from './pick-address.component';

describe('PickAddressComponent', () => {
  let component: PickAddressComponent;
  let fixture: ComponentFixture<PickAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
