import { TestBed } from '@angular/core/testing';

import { NominatimServiceService } from './nominatim-service.service';

describe('NominatimServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NominatimServiceService = TestBed.get(NominatimServiceService);
    expect(service).toBeTruthy();
  });
});
