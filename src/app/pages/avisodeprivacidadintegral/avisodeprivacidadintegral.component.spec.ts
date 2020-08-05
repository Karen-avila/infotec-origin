import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisodeprivacidadintegralComponent } from './avisodeprivacidadintegral.component';

describe('AvisodeprivacidadintegralComponent', () => {
  let component: AvisodeprivacidadintegralComponent;
  let fixture: ComponentFixture<AvisodeprivacidadintegralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisodeprivacidadintegralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisodeprivacidadintegralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
