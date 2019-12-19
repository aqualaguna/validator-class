import Validator from '../../../src/index';

describe('alphaNumRules', () => {



  it('should success alphaNum rules', async () => {
    let data = {
      val1: 'test',
      val2: 'test123',
      val3: 'test-123',
      val4: 'test_123',
      val5: '/\/\test_123/\/\*$',
      val6: '\/$%$',
      val7: '123_',
      val8: 't_e_s',
      val9: '$#!@!',
      val10: 1, // number
      val11: 1.2, // float
      val12: '10', // string number
      val13: undefined, // undefined
      val14: {}, // empty object
      val15: [], // empty array
      val16: [1, 2, 3] // not empty array
    };
    let rules = {
      val1: 'alpha_num', // true
      val2: 'alpha_num', // true
      val3: 'alpha_num', // false
      val4: 'alpha_num', // false
      val5: 'alpha_num', // false
      val6: 'alpha_num', // false
      val7: 'alpha_num', // false
      val8: 'alpha_num', // false
      val9: 'alpha_num', // false
      val10: 'alpha_num', // false
      val11: 'alpha_num', // false
      val12: 'alpha_num', // true
      val13: 'alpha_num', // false
      val14: 'alpha_num', // false
      val15: 'alpha_num', // false
      val16: 'alpha_num', // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(13);
    expect(err).toEqual(expect.objectContaining({
      val3: ['val3 must match alpha numeric |a-z,A-Z,0-9|.'],
      val4: ['val4 must match alpha numeric |a-z,A-Z,0-9|.'],
      val5: ['val5 must match alpha numeric |a-z,A-Z,0-9|.'],
      val6: ['val6 must match alpha numeric |a-z,A-Z,0-9|.'],
      val7: ['val7 must match alpha numeric |a-z,A-Z,0-9|.'],
      val8: ['val8 must match alpha numeric |a-z,A-Z,0-9|.'],
      val9: ['val9 must match alpha numeric |a-z,A-Z,0-9|.'],
      val10: ['val10 must match alpha numeric |a-z,A-Z,0-9|.'],
      val11: ['val11 must match alpha numeric |a-z,A-Z,0-9|.'],
      val13: ['val13 must match alpha numeric |a-z,A-Z,0-9|.'],
      val14: ['val14 must match alpha numeric |a-z,A-Z,0-9|.'],
      val15: ['val15 must match alpha numeric |a-z,A-Z,0-9|.'],
      val16: ['val16 must match alpha numeric |a-z,A-Z,0-9|.'],
    }))
  });

  it('nested alphaNum', async () => {
    let data = {
      temp: {
        val1: 'test123',
        val2: '/\/\test-123/\/',
      }
    };
    let rules = {
      temp: {
        val1: 'alpha_num', // unexpected rule
        val2: 'alpha_num' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "temp": {
        val2: ['val2 must match alpha numeric |a-z,A-Z,0-9|.']
      },
    }))
  });
});