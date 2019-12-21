import Validator from '../../../src/index';

describe('not_arrayRules', () => {



  it('should success not_array rules', async () => {
    let data = {
      val1: undefined, // undefined
      val2: {}, // empty object
      val3: [], // empty array
      val4: [1, 2, 3], // not empty array
      val5: null,
      val6: 1,
      val7: 'str',
      val8: 1.2,
    };
    let rules = {
      val1: 'not_array', // true
      val2: 'not_array', // true
      val3: 'not_array', // false
      val4: 'not_array', // false
      val5: 'not_array', // true
      val6: 'not_array', // true
      val7: 'not_array', // true
      val8: 'not_array', // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(2);
    expect(err).toEqual(expect.objectContaining({
      val3: ['val3 must not type of array.'],
      val4: ['val4 must not type of array.'],
    }))
  });

  it('nested not_array', async () => {
    let data = {
      temp: {
        val1: {}, // empty object
        val2: [], // empty not_array
        val3: [1, 2, 3], // not empty not_array
        val4: 'test'
      }
    };
    let rules = {
      temp: {
        val1: 'not_array|yo', // unexpected rule
        val2: 'not_array', // false
        val3: 'not_array', // false
        val4: 'not_array' // true
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
        'val2': ['val2 must not type of array.'],
        'val3': ['val3 must not type of array.']
      },

    }));
  });
});