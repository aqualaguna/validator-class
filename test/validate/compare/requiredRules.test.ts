import Validator from '../../../src/index';

describe('requiredRules', () => {



  it('should success required rules', async () => {
    let data = {
      val1: 1,
      val3: ''
    };
    let rules = {
      val1: 'required', // true
      val2: 'required', // false
      val3: 'required' // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(2);
    expect(err).toEqual(expect.objectContaining({
      val2: ['val2 is required.'],
      val3: ['val3 is required.']
    }))

  });

  it('nested required', async () => {
    let data = {
      temp: {
        val1: 10,
      }
    };
    let rules = {
      temp: {
        val1: 'required|yo', // unexpected rule
        val2: 'required' // invalid rule
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