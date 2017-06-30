import { TestBed, inject } from '@angular/core/testing';

import { GeocafrestService } from './geocafrest.service';

describe('GeocafrestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeocafrestService]
    });
  });

  it('should be created', inject([GeocafrestService], (service: GeocafrestService) => {
    expect(service).toBeTruthy();
  }));
});
