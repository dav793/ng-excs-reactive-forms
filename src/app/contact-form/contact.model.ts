
export class Contact {

  fullName: string;
  email: string;
  dietaryPreferences: string;
  isMarried: string;
  ageRange: string;
  addresses: Address[];

  constructor(data: any) {
    this.fullName = data.fullName || '';
    this.email = data.email || '';
    this.dietaryPreferences = data.dietaryPreferences || '';
    this.isMarried = data.isMarried || '';
    this.ageRange = data.ageRange || '';
    this.addresses = data.addresses || [];
  }

  static get DietaryPreferences(): string[] {
    return [
      'None',
      'Vegetarian',
      'Vegan',
      'Raw vegan'
    ];
  }

  static get AgeRanges(): string[] {
    return [
      '0-18',
      '18-30',
      '30-50',
      '50-60',
      '60-75',
      'Over 75'
    ];
  }

}

export class Address {

  building: string;
  street: string;
  city: string;
  zip: string;

  constructor(data: {[key: string]: string}) {
    this.building = data.building || '';
    this.street = data.street || '';
    this.city = data.city || '';
    this.zip = data.zip || '';
  }

}
