interface OptionsValidator {
  custom_message: any;
}

export default class Base {
  protected data: any;
  protected rules: any;
  constructor(data: any, rules: any, options?: OptionsValidator) {
    this.data = data;
    this.rules = rules;
  }
}