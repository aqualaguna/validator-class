import Validator from '../../../src/index';

describe('afterRules', () => {



  it('should success after rules', async () => {
    let tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let data = {
      val1: undefined, // undefined
      val2: {}, // empty object
      val3: [], // empty date
      val4: 1000, // time in milliseconds after 1970
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
      val1: 'after:tomorrow', // false
      val2: 'after:tomorrow', // false
      val3: 'after:tomorrow', // true
      val4: 'after:tomorrow', // false
      val5: 'after:tomorrow', // false
      val6: 'after:tomorrow', // false
      val7: 'after:tomorrow', // false
      val8: 'after:tomorrow', // false
      val9: 'after:tomorrow', // false
      val10: 'after:tomorrow', // false
      val11: 'after:tomorrow', // false
      val12: 'after:tomorrow', // true
      val13: 'after:yesterday', // false difference in ms
      val14: 'after:val13' // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(11);
    expect(err).toEqual(expect.objectContaining({
      "val1": ["val1 must be after tomorrow."],
      "val2": ["val2 must be after tomorrow."],
      "val4": ["val4 must be after tomorrow."],
      "val5": ["val5 must be after tomorrow."],
      "val6": ["val6 must be after tomorrow."],
      "val7": ["val7 must be after tomorrow."],
      "val8": ["val8 must be after tomorrow."],
      "val9": ["val9 must be after tomorrow."],
      "val10": ["val10 must be after tomorrow."],
      "val11": ["val11 must be after tomorrow."],
      "val13": ["val13 must be after yesterday."]
    }));
  });

});