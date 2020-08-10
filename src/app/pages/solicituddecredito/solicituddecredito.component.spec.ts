import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicituddecreditoComponent } from './solicituddecredito.component';

describe('SolicituddecreditoComponent', () => {
  let component: SolicituddecreditoComponent;
  let fixture: ComponentFixture<SolicituddecreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicituddecreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicituddecreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
