
export default class ValueNotValid extends Error {
    constructor(message: string | undefined) {
      super(message);
      this.name = "ValueNotValid";
    }
  }
  
  