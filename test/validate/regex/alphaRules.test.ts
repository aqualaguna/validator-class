import Validator from '../../../src/index';

describe('alphaRules', () => {



  it('should success alpha rules', async () => {
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
        val1: 'alpha', // true
        val2: 'alpha', // false
        val3: 'alpha', // false
        val4: 'alpha', // false
        val5: 'alpha', // false
        val6: 'alpha', // false
        val7: 'alpha', // false
        val8: 'alpha', // false
        val9: 'alpha', // false
        val10 : 'alpha', // false
        val11 : 'alpha', // false
        val12 : 'alpha', // false
        val13 : 'alpha', // false
        val14 : 'alpha', // false
        val15 : 'alpha', // false
        val16 : 'alpha', // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    console.log(err);
    expect(Object.keys(err).length).toBe(15);
    expect(err).toEqual(expect.objectContaining({
      val2: ['val2 must match alpha |a-z,A-Z|.'],
      val3: ['val3 must match alpha |a-z,A-Z|.'],
      val4: ['val4 must match alpha |a-z,A-Z|.'],
      val5: ['val5 must match alpha |a-z,A-Z|.'],
      val6: ['val6 must match alpha |a-z,A-Z|.'],
      val7: ['val7 must match alpha |a-z,A-Z|.'],
      val8: ['val8 must match alpha |a-z,A-Z|.'],
      val9: ['val9 must match alpha |a-z,A-Z|.'],
      val10: ['val10 must match alpha |a-z,A-Z|.'],
      val11: ['val11 must match alpha |a-z,A-Z|.'],
      val12: ['val12 must match alpha |a-z,A-Z|.'],
      val13: ['val13 must match alpha |a-z,A-Z|.'],
      val14: ['val14 must match alpha |a-z,A-Z|.'],
      val15: ['val15 must match alpha |a-z,A-Z|.'],
      val16: ['val16 must match alpha |a-z,A-Z|.'],
    }))
  });

  it('nested alpha', async () => {
    let data = {
      temp: {
        val1: 'test',
        val2: '/\/\test-123/\/',
      }
    };
    let rules = {
      temp: {
        val1: 'alpha', // unexpected rule
        val2: 'alpha' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      val2: ['val2 must match alpha |a-z,A-Z|.'],
    }))
  });
});