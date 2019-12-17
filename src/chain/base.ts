export default class Base {
  protected data: any;
  protected rules: any;
  constructor(data: any, rules: any) {
    this.data = data;
    this.rules = rules;
  }
}