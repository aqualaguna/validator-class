import Validator from '../../../src/index';

describe('arrayRules', () => {



  it('should success array rules', async () => {
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
      val1: 'array', // false
      val2: 'array', // false
      val3: 'array', // true
      val4: 'array', // true
      val5: 'array', // false
      val6: 'array', // false
      val7: 'array', // false
      val8: 'array', // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(6);
    expect(err).toEqual(expect.objectContaining({
      val1: ['val1 must type of array.'],
      val2: ['val2 must type of array.'],
      val5: ['val5 must type of array.'],
      val6: ['val6 must type of array.'],
      val7: ['val7 must type of array.'],
      val8: ['val8 must type of array.']
    }))
  });

  it('nested array', async () => {
    let data = {
      temp: {
        val1: {}, // empty object
        val2: [], // empty array
        val3: [1, 2, 3], // not empty array
        val4: 'test'
      }
    };
    let rules = {
      temp: {
        val1: 'array|yo', // unexpected rule
        val2: 'array', // invalid rule
        val3: 'array', // invalid rule
        val4: 'array' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(2);
    expect(err).toEqual(expect.objectContaining({
      'temp.val1': [
        'temp.val1 must type of array.',
        "'yo' does not exists in rule definition."
      ],
      'temp.val4': ['temp.val4 must type of array.']
    }));
  });
});