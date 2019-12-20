import Validator from '../../../src/index';

describe('notRegexRules', () => {



  it('should success no_regex rules', async () => {
    let data = {
      val1: "abc",
      val2: "ac",
      val3: "okay",
      val4: true,
      val5: 1,
      val6: false,
      val7: 0,
      val8: [],
      val9: {},
      val10: "hel,l",
      val11: "ok",
    };
    let rules = {
      val1: "not_regex:a?b?c", // false
      val2: "not_regex:a?b?c", // false
      val3: "not_regex:a?b?c", // true
      val4: "not_regex:a?b?c", // false
      val5: "not_regex:a?b?c", // false
      val6: "not_regex:a?b?c", // false
      val7: "not_regex:a?b?c", // false
      val8: "not_regex:a?b?c", // true
      val9: "not_regex:a?b?c", // false
      val10: "not_regex:hel,?l", // false
      val11: ["not_regex:(ok|accepted)", "string"] // false escape | 
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(9);
    expect(err).toEqual(expect.objectContaining({
      "val1": ["val1 must not match regex a?b?c ."],
      "val2": ["val2 must not match regex a?b?c ."],
      "val4": ["val4 must not match regex a?b?c ."],
      "val5": ["val5 must not match regex a?b?c ."],
      "val6": ["val6 must not match regex a?b?c ."],
      "val7": ["val7 must not match regex a?b?c ."],
      "val9": ["val9 must not match regex a?b?c ."],
      "val10": ["val10 must not match regex hel,?l ."],
      "val11": ["val11 must not match regex (ok|accepted) ."]
    }));
  });

  it('nested regex', async () => {
    let data = {
      temp: {
        val1: "ok",
        val2: "yes",
      }
    };
    let rules = {
      temp: {
        val1: ['not_regex:(ok|accepted)'], // false
        val2: 'not_regex:(ok|accepted)' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "temp": {
        "val1": [
          "val1 must not match regex (ok|accepted) ."
        ],
        "val2": [
          "val2 must not match regex (ok .",
          "'accepted)' does not exists in rule definition."
        ]
      }
    }));
  });
});