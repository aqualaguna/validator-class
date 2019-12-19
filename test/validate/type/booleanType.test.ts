import Validator from '../../../src/index';

describe('booleanRules', () => {



  it('should success boolean rules', async () => {
    let data = {
      val1: undefined, // undefined
      val2: {}, // empty object
      val3: [], // empty boolean
      val4: 1000,
      val5: null,
      val6: 1,
      val7: 0,
      val8: -1,
      val9: true,
      val10: false,
      val11: 'false',
      val12: 'true',
    };
    let rules = {
      val1: 'boolean', // false
      val2: 'boolean', // false
      val3: 'boolean', // true
      val4: 'boolean', // true
      val5: 'boolean', // false
      val6: 'boolean', // true
      val7: 'boolean', // true
      val8: 'boolean', // true
      val9: 'boolean', // true
      val10: 'boolean', // true
      val11: 'boolean', // true
      val12: 'boolean', // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(3);
    expect(err).toEqual(expect.objectContaining({
      val1: ['val1 must type of boolean.'],
      val2: ['val2 must type of boolean.'],
      val5: ['val5 must type of boolean.']
    }));
    expect(typeof data['val4']).toEqual('boolean');
    expect(typeof data['val6']).toEqual('boolean');
    expect(typeof data['val7']).toEqual('boolean');
    expect(typeof data['val8']).toEqual('boolean');
    expect(typeof data['val9']).toEqual('boolean');
    expect(typeof data['val10']).toEqual('boolean');
    expect(typeof data['val11']).toEqual('boolean');
    expect(typeof data['val12']).toEqual('boolean');
  });

  it('nested boolean', async () => {
    let data = {
      temp: {
        val1: {}, // empty object
        val2: [], // empty boolean
        val3: [1, 2, 3], // not empty boolean
        val4: 1,
        val5: true
      }
    };

    let rules = {
      temp: {
        val1: 'boolean|yo', // unexpected rule
        val2: 'boolean', // true
        val3: 'boolean', // true
        val4: 'boolean',  // true
        val5: 'boolean' // true
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: [
          'val1 must type of boolean.',
          "'yo' does not exists in rule definition."
        ],
        'val3': [{}, {}, {}]
      },
    }));
    expect(typeof data.temp['val4']).toEqual('boolean');
    expect(typeof data.temp['val5']).toEqual('boolean');

  });
});