import Validator from '../../../src/index';

describe('presentRules', () => {



  it('should success present rules', async () => {
    let data = {
      val1: 1,
      val3: ''
    };
    let rules = {
      val1: 'present', // true
      val2: 'present', // false
      val3: 'present' // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      val2: ['val2 must be present.'],
    }))

  });

  it('nested present', async () => {
    let data = {
      temp: {
        val1: 10,
      }
    };
    let rules = {
      temp: {
        val1: 'present|yo', // unexpected rule false
        val2: 'present' // false
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      temp: {
        val1: ["'yo' does not exists in rule definition."],
        val2: ['val2 must be present.']
      }
    }));
  });
});