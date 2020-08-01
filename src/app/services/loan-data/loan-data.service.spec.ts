import { TestBed } from '@angular/core/testing';

import { LoanDataService } from './loan-data.service';

describe('LoanDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoanDataService = TestBed.get(LoanDataService);
    expect(service).toBeTruthy();
  });
});
