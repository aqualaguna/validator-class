import Validator from '../../../src/index';

describe('notInRules', () => {



  it('should success notIn rules', async () => {
    let data = {
      val1: [],
      val2: {},
      val3: undefined,
      val4: 10,
      val5: '10',
      val6: 1,
      val7: 'test',
      val8: 'male',
      val9: 'test',
      val10: false,
      val11: true,
      val12: 10,
    };
    let rules = {
      val1: 'not_in:1', // false
      val2: 'not_in:1', // false
      val3: 'not_in:1', // false
      val4: 'not_in:10,11', // true
      val5: 'not_in:10,11', // true
      val6: 'not_in:1,test', // true
      val7: 'not_in:1,3', // false
      val8: 'not_in:male,female', // true
      val9: 'not_in:male,female', // false
      val10: 'not_in:false,true', //true
      val11: 'not_in:false', // false
      val12: 'not_in:10' //true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(6);
    expect(err).toEqual(expect.objectContaining({
      val4: ['val4 must not one of [10, 11]'],
      val5: ['val5 must not one of [10, 11]'],
      val6: ['val6 must not one of [1, test]'],
      val8: ['val8 must not one of [male, female]'],
      val10: ['val10 must not one of [false, true]'],
      val12: ['val12 must not one of [10]']
    }));
  });

  it('nested notIn', async () => {
    let data = {
      temp: {
        val1: [],
        val2: {},
        val3: 'male'
      }
    };
    let rules = {
      temp: {
        val1: 'not_in:1', // unexpected rule
        val2: 'not_in:1', // invalid rule
        val3: 'not_in:male,female', // true

      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp.val3': ['temp.val3 must not one of [male, female]']
    }))
  });
});