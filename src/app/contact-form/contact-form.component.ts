import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';

import { DietaryPreferenceValidationService } from '../shared/services/dietary-preference-validation.service';

import { Contact, Address } from '../shared/models/contact.model';
import { legalAgeValidator } from '../shared/validators/age-range.validator';
import { DietaryPreferenceValidator } from '../shared/validators/dietary-preference.validator';

/**
 * Guía de trabajo:
 *
 *  Form Controls
 *  1. Cree un único elemento de formulario con FormControl
 *  2. Establezca el valor del elemento programáticamente
 *  3. Detecte los cambios (solo del usuario, no programáticos) en el valor del elemento
 *
 *  Form Groups
 *  4. Cree un grupo de elementos en un único formulario con FromGroup
 *  5. Detecte los cambios en cualquiera de los elementos del formulario
 *  6. Agregue funciones de validacion a los elementos
 *  7. Agregue un form array al formulario
 *  8. Agregue su propio validador
 *  9. Agregue su propio validador asincrono
 *
 *  Recursos de interés:
 *  - formas de programar async validators: https://alligator.io/angular/async-validators/
 */

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  name = new FormControl('Daniel');

  // modelo que viene del servidor
  model = new Contact({
    fullName: 'Ace Ventura',
    email: 'test@test.com',
    dietaryPreferences: 'Vegetarian',
    isMarried: true,
    ageRange: '30-50',
    addresses: [
      {
        building: 123,
        street: 'Main St.',
        city: 'Miami',
        zip: 33152
      },
      {
        building: 45,
        street: 'Second Ave.',
        city: 'New York',
        zip: 10001
      }
    ]
  });

  // opciones para propiedades del modelo
  dietaryPrefOpts = Contact.DietaryPreferences;
  ageRangeOpts = Contact.AgeRanges;

  // formulario para el DOM, creado "a mano" (4)
  form = this.createForm(this.model);

  // formulario para el DOM, creado con FormBuilder (4)
  form2 = this.createFormWithBuilder(this.model);

  constructor(
    private dietValidationService: DietaryPreferenceValidationService,
    private formBuilder: FormBuilder
  ) {


    this.name.setValue('Roberto');

    this.name.valueChanges.subscribe((newValue) => {
      console.log('cambios en control', newValue);
    });

    this.name.setValue('Pedro', {emitEvent: false});


    this.form2.valueChanges.subscribe((newValue) => {
      console.log('cambios en group', newValue);
    });

  }

  ngOnInit() {}

  createForm(model: Contact): FormGroup {
    return new FormGroup({
      fullName:             new FormControl(model.fullName, [Validators.required]),
      email:                new FormControl(model.email, [Validators.email]),
      dietaryPreferences:   new FormControl(model.dietaryPreferences),
      isMarried:            new FormControl(model.isMarried),
      ageRange:             new FormControl(model.ageRange)
    });
  }

  createFormWithBuilder(model: Contact): FormGroup {

    // return this.formBuilder.group(model);

    const addressesGroups = this.setAddresses(model.addresses);

    const group = this.formBuilder.group({
      fullName:             [ model.fullName,             [Validators.required] ],
      email:                [ model.email,                [Validators.email] ],
      dietaryPreferences:   [ model.dietaryPreferences,   [], [DietaryPreferenceValidator.createValidator(this.dietValidationService)] ],
      isMarried:            [ model.isMarried,            [] ],
      ageRange:             [ model.ageRange,             [legalAgeValidator()] ],
      addresses:            this.formBuilder.array(addressesGroups)
    });

    return group;

  }

  get addresses() {
    return this.form2.get('addresses') as FormArray;
  }

  setAddresses(addresses: Address[]) {
    const addressesGroups = addresses.map((addr: Address) => {
      return this.formBuilder.group({
        building:     [ addr.building,    [] ],
        street:       [ addr.street,      [] ],
        city:         [ addr.city,        [] ],
        zip:          [ addr.zip,         [Validators.pattern('^[0-9]{5}$')] ]
      });
    });
    return addressesGroups;
  }

  addAddress() {
    const addr = new Address({});
    this.addresses.push(this.formBuilder.group({
      building:     [ addr.building,    [] ],
      street:       [ addr.street,      [] ],
      city:         [ addr.city,        [] ],
      zip:          [ addr.zip,         [Validators.pattern('^[0-9]{5}$')] ]
    }));
    this.form2.markAsDirty();
  }

  removeAddress(index: number) {
    const addressesCopy: Address[] = Object.assign([], this.form2.value.addresses);
    addressesCopy.splice(index, 1);

    const addressesGroups = this.setAddresses(addressesCopy);
    const addressesFormArray = this.formBuilder.array(addressesGroups);

    this.form2.setControl('addresses', addressesFormArray);
    this.form2.markAsDirty();
  }

}
