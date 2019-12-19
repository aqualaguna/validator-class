import Validator from '../../../src/index';

describe('inRules', () => {



  it('should success in rules', async () => {
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
      val1: 'in:1', // false
      val2: 'in:1', // false
      val3: 'in:1', // false
      val4: 'in:10,11', // true
      val5: 'in:10,11', // true
      val6: 'in:1,test', // true
      val7: 'in:1,3', // false
      val8: 'in:male,female', // true
      val9: 'in:male,female', // false
      val10: 'in:false,true', //true
      val11: 'in:false', // false
      val12: 'in:10' //true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(6);
    expect(err).toEqual(expect.objectContaining({
      val1: ['val1 must one of [1]'],
      val2: ['val2 must one of [1]'],
      val3: ['val3 must one of [1]'],
      val7: ['val7 must one of [1, 3]'],
      val9: ['val9 must one of [male, female]'],
      val11: ['val11 must one of [false]']
    }));
  });

  it('nested in', async () => {
    let data = {
      temp: {
        val1: [],
        val2: {},
        val3: 'male'
      }
    };
    let rules = {
      temp: {
        val1: 'in:1', // unexpected rule
        val2: 'in:1', // invalid rule
        val3: 'in:male,female', // true

      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: ['val1 must one of [1]'],
        'val2': ['val2 must one of [1]']
      },

    }))
  });
});