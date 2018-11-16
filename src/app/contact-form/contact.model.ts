
export class Contact {

  firstName: string;
  lastName: string;
  dietaryPreferences: string;
  isMarried: string;
  ageRange: string;

  constructor(data: any) {
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.dietaryPreferences = data.dietaryPreferences || '';
    this.isMarried = data.isMarried || '';
    this.ageRange = data.ageRange || '';
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
