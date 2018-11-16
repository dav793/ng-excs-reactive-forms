import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietaryPreferenceValidationService {

  private _availableMenus = {
    'None': 12,
    'Vegetarian': 3,
    'Vegan': 0,
    'Raw vegan': 0
  };

  constructor() { }

  checkAvailableMenu(dietaryPreference: string): Observable<boolean> {
    return new Observable<boolean>(observer => {

      setTimeout(() => {
        if (this._availableMenus[dietaryPreference] > 0)
          observer.next(true);
        else
          observer.next(false);
        observer.complete();
      }, 1000);

    });
  }

}
