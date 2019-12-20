import Validator from '../../../src/index';

describe('requiredUnlessRules', () => {



  it('should success required_unless rules', async () => {
    let data = {
      val1: 1,
      val2: 'test',
    };
    let rules = {
      val1: 'required_unless:val2,test', // true
      val2: 'required_unless:val2,test', // true
      val3: 'required_unless:val5,undefined', // false undefined == 'undefined'
      val4: 'required_unless:val2,test' // true test != 'test'
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "val3": ["val3 is required."]
    }))

  });

  it('nested required_unless', async () => {
    let data = {
      temp: {
        val1: 10,
      }
    };
    let rules = {
      temp: {
        val1: 'required_unless:val1,10|yo', // unexpected rule
        val2: 'required_unless:val1,9' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();

    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      temp: {
        val1: ["'yo' does not exists in rule definition."],
        val2: ['val2 is required.']
      }
    }));
  });
});