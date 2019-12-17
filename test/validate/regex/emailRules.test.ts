import Validator from '../../../src/index';

describe('emailRules', () => {



  it('should success email rules', async () => {
    let data = {
      val1: 'test@yahoo.com',
      val2: 'test.yahoo.com',
      val3: 'test98;yahoo;com',
      val4: 'test98@yahoo@com',
      val5: 't3st/yahoo/com',
      val6: true,
      val7: 98,
      val8: [],
      val9: {}
    };
    let rules = {
      val1: 'email', // true
      val2: 'email', // false
      val3: 'email', // false
      val4: 'email', // false
      val5: 'email', // false
      val6: 'email', // false
      val7: 'email', // false
      val8: 'email', // false
      val9: 'email' // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(8);
    expect(err).toEqual(expect.objectContaining({
      val2: ['val2 must match email format.'],
      val3: ['val3 must match email format.'],
      val4: ['val4 must match email format.'],
      val5: ['val5 must match email format.'],
      val6: ['val6 must match email format.'],
      val7: ['val7 must match email format.'],
      val8: ['val8 must match email format.'],
      val9: ['val9 must match email format.']
    }));
  });

  it('nested email', async () => {
    let data = {
      temp: {
        val1: 'test@yahoo.com',
        val2: 'test@yahoo@com',
      }
    };
    let rules = {
      temp: {
        val1: 'email', // unexpected rule
        val2: 'email' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    console.log(err);
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp.val2': ['temp.val2 must match email format.']
    }))
  });
});