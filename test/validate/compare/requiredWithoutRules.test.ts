import Validator from '../../../src/index';

describe('requiredWithoutRules', () => {



  it('should success required_without rules', async () => {
    let data = {
      val1: 1,
      val2: 'test',
    };
    let rules = {
      val1: 'required_without:val2', // true all present  => not required
      val2: 'required_without:val1', // true all present => not required
      val3: 'required_without:val5,val4', // false some not present => required
      val4: 'required_without:val1,val2,val3' // false val3 not present => required
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(2);
    expect(err).toEqual(expect.objectContaining({
      "val3": ["val3 is required."],
      "val4": ["val4 is required."]
    }))

  });

  it('nested required_without', async () => {
    let data = {
      temp: {
        val1: 10,
      }
    };
    let rules = {
      temp: {
        val1: 'required_without:val1,10|yo', // false some not present => required
        val2: 'required_without:val1' // all present => not required
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      temp: {
        val1: ["'yo' does not exists in rule definition."],
      }
    }));
  });
});