import Validator from '../../../src/index';

describe('gtRules', () => {



  it('should success gt rules', async () => {
    let data = {
      val1: 1, // number
      val2: 1.2, // float
      val3: '10', // string number
      val4: 'test', // random string
      val5: undefined, // undefined
      val6: {}, // empty object
      val7: [], // empty array
      val8: [1, 2, 3], // not empty array
      val9: 3,
      val10: 1,
      val11: 1,
      val12: 1,
      val13: 1,
      val14: 1,
    };
    let rules = {
      val1: 'gt:1', // false
      val2: 'gt:1', // true
      val3: 'gt:1', // true
      val4: 'gt:1', //false string comparison
      val5: 'gt:1', // false undefined object
      val6: 'gt:1', // false object or array cannot be compared
      val7: 'gt:1', // true
      val8: 'gt:1', // false
      val9: 'gt:val1', // true compare other attr
      val11: 'gt:0.5', // true
      val12: 'gt:1.5', // false
      val13: 'gt:0.7|gt:0.5', // true
      val14: 'gt:2|gt:2.5', // always false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(7);
    expect(err).toEqual(expect.objectContaining({
      val1: ['val1 must greater than 1'],
      val4: ['val4 must greater than 1'],
      val5: ['val5 must greater than 1'],
      val6: ['val6 must greater than 1'],
      val8: [{ val8: ['val8 must greater than 1'] }, {}, {}],
      val12: ['val12 must greater than 1.5'],
      val14: ['val14 must greater than 2', 'val14 must greater than 2.5']
    }));

  });

  it('nested gt', async () => {
    let data = {
      temp: {
        val1: 10,
        val2: 1.4,
      }
    };
    let rules = {
      temp: {
        val1: 'gt:10|yo', // unexpected rule
        val2: 'gt:1.5' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: [
          'val1 must greater than 10',
          "'yo' does not exists in rule definition."
        ],
        'val2': ['val2 must greater than 1.5']
      },

    }));
  });
});