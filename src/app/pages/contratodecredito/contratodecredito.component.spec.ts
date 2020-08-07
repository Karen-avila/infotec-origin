import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratodecreditoComponent } from './contratodecredito.component';

describe('ContratodecreditoComponent', () => {
  let component: ContratodecreditoComponent;
  let fixture: ComponentFixture<ContratodecreditoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratodecreditoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratodecreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
