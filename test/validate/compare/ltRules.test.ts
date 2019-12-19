import Validator from '../../../src/index';

describe('ltRules', () => {



  it('should success lt rules', async () => {
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
      val1: 'lt:2', // true
      val2: 'lt:1.2', // false
      val3: 'lt:100', // true
      val4: 'lt:1', //false
      val5: 'lt:1', // false
      val6: 'lt:1', // false object or array cannot be compared
      val7: 'lt:1', // false object or array cannot be compared
      val8: 'lt:1', // false object or array cannot be compared
      val9: 'lt:val1', // true compare other attr
      val11: 'lt:1', // false
      val12: 'lt:0.5', // false
      val13: 'lt:0|lt:0.5', // always false
      val14: 'lt:2|lt:2.5', // always true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(9);
    expect(err).toEqual(expect.objectContaining({
      val2: ['val2 must less than 1.2'],
      val4: ['val4 must less than 1'],
      val5: ['val5 must less than 1'],
      val6: ['val6 must less than 1'],
      val7: ['val7 must less than 1'],
      val8: ['val8 must less than 1'],
      val11: ['val11 must less than 1'],
      val12: ['val12 must less than 0.5'],
      val13: [
        'val13 must less than 0',
        'val13 must less than 0.5'
      ]
    }
    ))

  });

  it('nested lt', async () => {
    let data = {
      temp: {
        val1: 10,
        val2: 1.4,
      }
    };
    let rules = {
      temp: {
        val1: 'lt:1|yo', // unexpected rule
        val2: 'lt:1.3' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: [
          'val1 must less than 1',
          "'yo' does not exists in rule definition."
        ],
        'val2': ['val2 must less than 1.3']
      },

    }));
  });
});