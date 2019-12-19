import Validator from '../../../src/index';

describe('maxRules', () => {



  it('should success max rules', async () => {
    let data = {
      val1: 1, // number
      val2: 1.2, // float
      val3: '10', // string number
      val4: 'test', // random string
      val5: undefined, // undefined
      val6: {}, // empty object
      val7: [], // empty array
      val8: [1, 2, 3], // not empty array
      val9: -1,
      val10: 1,
      val11: 1,
      val12: 1,
      val13: 1,
      val14: 1,
    };
    let rules = {
      val1: 'max:2', // true
      val2: 'max:1.2', // true
      val3: 'max:100', // true
      val4: 'max:1', //false
      val5: 'max:1', // false
      val6: 'max:1', // false object or array cannot be compared
      val7: 'max:1', // false object or array cannot be compared
      val8: 'max:1', // false object or array cannot be compared
      val9: 'max:val1', // true compare other attr
      val11: 'max:1', // true
      val12: 'max:0.5', // false
      val13: 'max:0|max:0.5', // always false
      val14: 'max:2|max:2.5', // always true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(7);
    expect(err).toEqual(expect.objectContaining({
      val4: ['val4 maximum value is 1'],
      val5: ['val5 maximum value is 1'],
      val6: ['val6 maximum value is 1'],
      val7: ['val7 maximum value is 1'],
      val8: ['val8 maximum value is 1'],
      val12: ['val12 maximum value is 0.5'],
      val13: ['val13 maximum value is 0', 'val13 maximum value is 0.5']
    }));

  });

  it('nested max', async () => {
    let data = {
      temp: {
        val1: 10,
        val2: 1.4,
      }
    };
    let rules = {
      temp: {
        val1: 'max:1|yo', // unexpected rule
        val2: 'max:1.3' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: [
          'val1 maximum value is 1',
          "'yo' does not exists in rule definition."
        ],
        'val2': ['val2 maximum value is 1.3']
      },
    }));
  });
});