import { TestBed, inject } from '@angular/core/testing';

import { DietaryPreferenceValidationService } from './dietary-preference-validation.service';

describe('DietaryPreferenceValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DietaryPreferenceValidationService]
    });
  });

  it('should be created', inject([DietaryPreferenceValidationService], (service: DietaryPreferenceValidationService) => {
    expect(service).toBeTruthy();
  }));
});
