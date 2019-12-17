import Validator from '../../../src/index';

describe('gteRules', () => {



  it('should success gte rules', async () => {
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
      val1: 'gte:1', // true
      val2: 'gte:1', // true
      val3: 'gte:1', // true
      val4: 'gte:1', //false
      val5: 'gte:1', // false
      val6: 'gte:1', // false object or array cannot be compared
      val7: 'gte:1', // false object or array cannot be compared
      val8: 'gte:1', // false object or array cannot be compared
      val9: 'gte:val1', // true compare other attr
      val11: 'gte:0.5', // true
      val12: 'gte:1.5', // false
      val13: 'gte:1|gte:0.5', // true
      val14: 'gte:2|gte:2.5', // always false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(7);
    expect(err).toEqual(expect.objectContaining({
      val4: ['val4 must greater than or equal 1'],
      val5: ['val5 must greater than or equal 1'],
      val6: ['val6 must greater than or equal 1'],
      val7: ['val7 must greater than or equal 1'],
      val8: ['val8 must greater than or equal 1'],
      val12: ['val12 must greater than or equal 1.5'],
      val14: [
        'val14 must greater than or equal 2',
        'val14 must greater than or equal 2.5'
      ]
    }
    ))
  });

  it('nested gte', async () => {
    let data = {
      temp: {
        val1: 10,
        val2: 1.4,
      }
    };
    let rules = {
      temp: {
        val1: 'gte:10|yo', // unexpected rule
        val2: 'gte:1.5' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(2);
    expect(err).toEqual(expect.objectContaining({
      'temp.val1': ["'yo' does not exists in rule definition."],
      'temp.val2': ['temp.val2 must greater than or equal 1.5']
    }))
  });
});