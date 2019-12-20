interface OptionsValidator {
  custom_message?: any;
  custom_rule?: any;
}

export default class Base {
  protected data: any;
  protected rules: any;
  protected options: OptionsValidator | undefined;
  constructor(data: any, rules: any, options?: OptionsValidator) {
    this.data = data;
    this.rules = rules;
    if (options) {
      this.options = options;
    }
  }
}

export {
  OptionsValidator
}