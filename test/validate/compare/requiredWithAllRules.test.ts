import Validator from '../../../src/index';

describe('requiredWithAllRules', () => {



  it('should success required_with_all rules', async () => {
    let data = {
      val1: 1,
      val2: 'test',
    };
    let rules = {
      val1: 'required_with_all:val2', // true
      val2: 'required_with_all:val1', // true
      val3: 'required_with_all:val1,val2', // false all member present
      val4: 'required_with_all:val1,val2,val3' // true val3 not present
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "val3": ["val3 is required."]
    }))

  });

  it('nested required_with_all', async () => {
    let data = {
      temp: {
        val1: 10,
      }
    };
    let rules = {
      temp: {
        val1: 'required_with_all:val1,10|yo', // unexpected rule
        val2: 'required_with_all:val1' // invalid rule
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