import { Component, OnInit } from '@angular/core';

import { Contact, Address } from '../shared/models/contact.model';

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

  constructor() {}

  ngOnInit() {}

}
