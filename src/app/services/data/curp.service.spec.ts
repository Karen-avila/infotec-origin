import { TestBed } from '@angular/core/testing';

import { CurpService } from './curp.service';

describe('CurpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurpService = TestBed.get(CurpService);
    expect(service).toBeTruthy();
  });
});
