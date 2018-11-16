import { AbstractControl, ValidatorFn } from '@angular/forms';

export function legalAgeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (control.value !== '0-18')
      return null;
    return {'legalAge': {value: control.value}};
  };
}
