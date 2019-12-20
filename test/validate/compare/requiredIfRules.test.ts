import Validator from '../../../src/index';

describe('requiredIfRules', () => {



  it('should success required_if rules', async () => {
    let data = {
      val1: 1,
      val2: 'test',
      val3: undefined
    };
    let rules = {
      val1: 'required_if:val2,test', // true
      val2: 'required_if:val2,test', // true
      val3: 'required_if:val5,undefined', // true undefined == 'undefined'
      val4: 'required_if:val1,1' // false 1 == '1'
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "val4": ["val4 is required."]
    }))

  });

  it('nested required_if', async () => {
    let data = {
      temp: {
        val1: 10,
      }
    };
    let rules = {
      temp: {
        val1: 'required_if:val1,10|yo', // unexpected rule
        val2: 'required_if:val1,10' // invalid rule
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