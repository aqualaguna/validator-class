import Validator from '../../../src/index';

describe('regexRules', () => {



  it('should success regex rules', async () => {
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
      val1: "regex:a?b?c", // true
      val2: "regex:a?b?c", // true
      val3: "regex:a?b?c", // false
      val4: "regex:a?b?c", // false
      val5: "regex:a?b?c", // false
      val6: "regex:a?b?c", // false
      val7: "regex:a?b?c", // false
      val8: "regex:a?b?c", // true
      val9: "regex:a?b?c", // false
      val10: "regex:hel,?l", // true
      val11: ["regex:(ok|accepted)", "string"] // true escape | 
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(6);
    expect(err).toEqual(expect.objectContaining({
      "val3": ["val3 must match regex a?b?c ."],
      "val4": ["val4 must match regex a?b?c ."],
      "val5": ["val5 must match regex a?b?c ."],
      "val6": ["val6 must match regex a?b?c ."],
      "val7": ["val7 must match regex a?b?c ."],
      "val9": ["val9 must match regex a?b?c ."]
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
        val1: ['regex:(ok|accepted)'], // true
        val2: 'regex:(ok|accepted)' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "temp": {
        "val2": [
          "val2 must match regex (ok .",
          "'accepted)' does not exists in rule definition."
        ]
      }
    }));
  });
});