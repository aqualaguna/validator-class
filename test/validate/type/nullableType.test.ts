import Validator from '../../../src/index';

describe('not_arrayRules', () => {



  it('should success nullable rules', async () => {
    let data = {
      val1: undefined, // undefined
      val2: {}, // empty object
      val3: [], // empty array
      val4: null,
      val5: 1,
      val6: 'str',
      val7: 1.2,
    };
    let rules = {
      val1: 'nullable|string', // true
      val2: 'nullable|string', // false
      val3: 'nullable|string', // true
      val4: 'string|nullable', // true
      val5: 'nullable|string', // false
      val6: 'string|nullable', // true
      val7: 'string|nullable', // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(3);
    expect(err).toEqual(expect.objectContaining({
      val2: ['val2 must type of string.'],
      val5: ['val5 must type of string.'],
      val7: ['val7 must type of string.'],
    }))
  });

  it('nested not_array', async () => {
    let data = {
      temp: {
        val1: {}, // empty object
        val2: [], // empty not_array
        val3: 'test'
      }
    };
    let rules = {
      temp: {
        val1: 'nullable|yo', // unexpected rule => true
        val2: 'nullable|array', // true
        val3: 'nullable|number', // false
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: [
          "'yo' does not exists in rule definition."
        ],
        'val3': ['val3 must type of number.']
      },
    }));
  });
});