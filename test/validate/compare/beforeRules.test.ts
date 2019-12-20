import Validator from '../../../src/index';

describe('beforeRules', () => {



  it('should success before rules', async () => {
    let tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    let data = {
      val1: undefined, // undefined
      val2: {}, // empty object
      val3: [], // empty date
      val4: 1000, // time in milliseconds before 1970
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
      val1: 'before:tomorrow', // false
      val2: 'before:tomorrow', // false
      val3: 'before:tomorrow', // true
      val4: 'before:tomorrow', // true
      val5: 'before:tomorrow', // false
      val6: 'before:tomorrow', // true
      val7: 'before:tomorrow', // true
      val8: 'before:tomorrow', // false
      val9: 'before:tomorrow', // false
      val10: 'before:tomorrow', // false
      val11: 'before:tomorrow', // false
      val12: 'before:tomorrow', // false difff in ms
      val13: 'before:yesterday', // true
      val14: 'before:val12' // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(8);
    expect(err).toEqual(expect.objectContaining({
      "val1": ["val1 must before tomorrow."],
      "val2": ["val2 must before tomorrow."],
      "val5": ["val5 must before tomorrow."],
      "val8": ["val8 must before tomorrow."],
      "val9": ["val9 must before tomorrow."],
      "val10": ["val10 must before tomorrow."],
      "val11": ["val11 must before tomorrow."],
      "val12": ["val12 must before tomorrow."]
    }));
  });

});