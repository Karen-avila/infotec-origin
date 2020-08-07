import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudcontratacionComponent } from './solicitudcontratacion.component';

describe('SolicitudcontratacionComponent', () => {
  let component: SolicitudcontratacionComponent;
  let fixture: ComponentFixture<SolicitudcontratacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudcontratacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudcontratacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
