import Validator from '../../../src/index';

describe('alphaDashRules', () => {



  it('should success alphaDash rules', async () => {
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
      val1: 'alpha_dash', // true
      val2: 'alpha_dash', // true
      val3: 'alpha_dash', // true
      val4: 'alpha_dash', // true
      val5: 'alpha_dash', // false
      val6: 'alpha_dash', // false
      val7: 'alpha_dash', // true
      val8: 'alpha_dash', // true
      val9: 'alpha_dash', // false
      val10: 'alpha_dash', // false
      val11: 'alpha_dash', // false
      val12: 'alpha_dash', // true
      val13: 'alpha_dash', // false
      val14: 'alpha_dash', // false
      val15: 'alpha_dash', // false
      val16: 'alpha_dash', // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(9);
    expect(err).toEqual(expect.objectContaining({
      val5: ['val5 must match alphadash |a-z,A-Z,0-9,-,_| .'],
      val6: ['val6 must match alphadash |a-z,A-Z,0-9,-,_| .'],
      val9: ['val9 must match alphadash |a-z,A-Z,0-9,-,_| .'],
      val10: ['val10 must match alphadash |a-z,A-Z,0-9,-,_| .'],
      val11: ['val11 must match alphadash |a-z,A-Z,0-9,-,_| .'],
      val13: ['val13 must match alphadash |a-z,A-Z,0-9,-,_| .'],
      val14: ['val14 must match alphadash |a-z,A-Z,0-9,-,_| .'],
      val15: ['val15 must match alphadash |a-z,A-Z,0-9,-,_| .'],
      val16: ['val16 must match alphadash |a-z,A-Z,0-9,-,_| .'],
    }))
  });

  it('nested alphaDash', async () => {
    let data = {
      temp: {
        val1: 'test_123',
        val2: '/\/\test-123/\/',
      }
    };
    let rules = {
      temp: {
        val1: 'alpha_dash', // unexpected rule
        val2: 'alpha_dash' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "temp.val2": ['temp.val2 must match alphadash |a-z,A-Z,0-9,-,_| .'],
    }))
  });
});