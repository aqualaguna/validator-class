interface OptionsValidator {
  custom_message: any;
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