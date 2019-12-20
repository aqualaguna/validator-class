import Validator from '../../../src/index';

describe('afterEqualRules', () => {



  it('should success after_or_equal rules', async () => {
    let tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let data = {
      val1: undefined, // undefined
      val2: {}, // empty object
      val3: [], // empty date
      val4: 1000, // time in milliseconds after_or_equal 1970
      val5: null,
      val6: 1,
      val7: 0,
      val8: -1,
      val9: true,
      val10: false,
      val11: 'test',
      val12: tommorow.toISOString(),
      val13: yesterday.toISOString(),
      val14: (new Date()).toISOString(),
    };
    let rules = {
      val1: 'after_or_equal:tomorrow', // false
      val2: 'after_or_equal:tomorrow', // false
      val3: 'after_or_equal:tomorrow', // true
      val4: 'after_or_equal:tomorrow', // false
      val5: 'after_or_equal:tomorrow', // false
      val6: 'after_or_equal:tomorrow', // false
      val7: 'after_or_equal:tomorrow', // false
      val8: 'after_or_equal:tomorrow', // false
      val9: 'after_or_equal:tomorrow', // false
      val10: 'after_or_equal:tomorrow', // false
      val11: 'after_or_equal:tomorrow', // false
      val12: 'after_or_equal:tomorrow', // true
      val13: 'after_or_equal:yesterday', // false difference in ms
      val14: 'after_or_equal:val13' // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(11);
    expect(err).toEqual(expect.objectContaining({
      "val1": ["val1 must be after or equal tomorrow."],
      "val2": ["val2 must be after or equal tomorrow."],
      "val4": ["val4 must be after or equal tomorrow."],
      "val5": ["val5 must be after or equal tomorrow."],
      "val6": ["val6 must be after or equal tomorrow."],
      "val7": ["val7 must be after or equal tomorrow."],
      "val8": ["val8 must be after or equal tomorrow."],
      "val9": ["val9 must be after or equal tomorrow."],
      "val10": ["val10 must be after or equal tomorrow."],
      "val11": ["val11 must be after or equal tomorrow."],
      "val13": ["val13 must be after or equal yesterday."]
    }));
  });

});