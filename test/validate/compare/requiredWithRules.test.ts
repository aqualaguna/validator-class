import Validator from '../../../src/index';

describe('requiredWithRules', () => {



  it('should success required_with rules', async () => {
    let data = {
      val1: 1,
      val2: 'test',
    };
    let rules = {
      val1: 'required_with:val2', // true
      val2: 'required_with:val1', // true
      val3: 'required_with:val5,val4', // true all member not present
      val4: 'required_with:val1,val2,val3' // false val3 undefined
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "val4": ["val4 is required."]
    }))

  });

  it('nested required_with', async () => {
    let data = {
      temp: {
        val1: 10,
      }
    };
    let rules = {
      temp: {
        val1: 'required_with:val1,10|yo', // unexpected rule
        val2: 'required_with:val1,10' // invalid rule
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