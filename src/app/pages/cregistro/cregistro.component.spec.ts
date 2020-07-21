import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CregistroComponent } from './cregistro.component';

describe('CregistroComponent', () => {
  let component: CregistroComponent;
  let fixture: ComponentFixture<CregistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CregistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
