import Validator from '../../../src/index';

describe('ccRules', () => {



  it('should success cc rules', async () => {
    let data = {
      val1: '481111111111111111111111111111114',
      val2: '4111111111111111',
      val3: '340000000000009',
      val4: '30000000000004',
      val5: '4111111111111111',
      val6: 'test',
      val7: true,
      val8: 98,
      val9: [],
      val10: {},
      val11: '48iii42102212',
      val12: undefined,
      val13: '###42210022##~21',
      val14: 1.2,
      val15: '98'
    };
    let rules = {
      val1: 'credit_card', // false
      val2: 'credit_card', // true
      val3: 'credit_card', // true
      val4: 'credit_card', // true
      val5: 'credit_card', // true
      val6: 'credit_card', // false
      val7: 'credit_card', // false
      val8: 'credit_card', // false
      val9: 'credit_card', // false
      val10: 'credit_card', // false
      val11: 'credit_card', // false
      val12: 'credit_card', // false
      val13: 'credit_card', // false
      val14: 'credit_card', // false
      val15: 'credit_card', // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(11);
    expect(err).toEqual(expect.objectContaining({
      val1: ['val1 must match credit card format.'],
      val6: ['val6 must match credit card format.'],
      val7: ['val7 must match credit card format.'],
      val8: ['val8 must match credit card format.'],
      val9: ['val9 must match credit card format.'],
      val10: ['val10 must match credit card format.'],
      val11: ['val11 must match credit card format.'],
      val12: ['val12 must match credit card format.'],
      val13: ['val13 must match credit card format.'],
      val14: ['val14 must match credit card format.'],
      val15: ['val15 must match credit card format.']
    }))
  });

  it('nested cc', async () => {
    let data = {
      temp: {
        val1: '4811 1111 1111 1111',
        val2: '4811111111111111',
      }
    };
    let rules = {
      temp: {
        val1: 'credit_card', // unexpected rule
        val2: 'credit_card' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp.val1': ['temp.val1 must match credit card format.']
    }));
  });
});