import Validator from '../../../src/index';

describe('stringRules', () => {



  it('should success string rules', async () => {
    let data = {
      val1: undefined, // undefined
      val2: {}, // empty object
      val3: [], // empty string
      val4: 1000, // time in milliseconds after 1970
      val5: null,
      val6: 1,
      val7: 0,
      val8: -1,
      val9: true,
      val10: false,
      val11: 'test',
      val12: 1.2,
      val13: -1.2,
      val14: '-1.2',
      val15: '1',
    };
    let rules = {
      val1: 'string', // false
      val2: 'string', // false
      val3: 'string', // true
      val4: 'string', // false
      val5: 'string', // false
      val6: 'string', // false
      val7: 'string', // false
      val8: 'string', // false
      val9: 'string', // false
      val10: 'string', // false
      val11: 'string', // true
      val12: 'string', // false
      val13: 'string', // false
      val14: 'string', // true
      val15: 'string', // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(11);
    expect(err).toEqual(expect.objectContaining({
      val1: ['val1 must type of string.'],
      val2: ['val2 must type of string.'],
      val4: ['val4 must type of string.'],
      val5: ['val5 must type of string.'],
      val6: ['val6 must type of string.'],
      val7: ['val7 must type of string.'],
      val8: ['val8 must type of string.'],
      val9: ['val9 must type of string.'],
      val10: ['val10 must type of string.'],
      val12: ['val12 must type of string.'],
      val13: ['val13 must type of string.']
    }));
    expect(typeof data['val11']).toEqual('string');
    expect(typeof data['val14']).toEqual('string');
    expect(typeof data['val15']).toEqual('string');

  });

  it('nested string', async () => {
    let data = {
      temp: {
        val1: {}, // empty object
        val2: [], // empty array
        val3: 1,
        val4: '1',
      }
    };

    let rules = {
      temp: {
        val1: 'string|yo', // unexpected rule
        val2: 'string', // true
        val3: 'string', // false
        val4: 'string',  // true
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: [
          'val1 must type of string.',
          "'yo' does not exists in rule definition."
        ],
        'val3': ['val3 must type of string.']
      },

    }));
    expect(typeof data.temp['val4']).toEqual('string');
  });
});