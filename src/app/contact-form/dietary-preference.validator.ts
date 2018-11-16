import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { DietaryPreferenceValidationService } from './dietary-preference-validation.service';

@Injectable({ providedIn: 'root' })
export class DietaryPreferenceValidator {
  constructor(private dietValidationService: DietaryPreferenceValidationService) {}

  static createValidator(dietCheckerService: DietaryPreferenceValidationService) {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

      return dietCheckerService.checkAvailableMenu(control.value)
        .pipe(
          map(isAvailable => (!isAvailable ? { dietaryPreference: true } : null)),
          catchError(() => null)
        );

    };
  }
}
