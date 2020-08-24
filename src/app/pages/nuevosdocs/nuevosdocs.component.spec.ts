import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevosdocsComponent } from './nuevosdocs.component';

describe('NuevosdocsComponent', () => {
  let component: NuevosdocsComponent;
  let fixture: ComponentFixture<NuevosdocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevosdocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevosdocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
