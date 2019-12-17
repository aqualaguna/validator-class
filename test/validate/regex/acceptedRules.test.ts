import Validator from '../../../src/index';

describe('acceptedRules', () => {



  it('should success accepted rules', async () => {
    let data = {
      val1: "yes",
      val2: "on",
      val3: "okay",
      val4: true,
      val5: 1,
      val6: false,
      val7: 0,
      val8: [],
      val9: {}
    };
    let rules = {
      val1: "accepted", // true
      val2: "accepted", // true
      val3: "accepted", // false
      val4: "accepted", // true
      val5: "accepted", // true
      val6: "accepted", // false
      val7: "accepted", // false
      val8: "accepted", // false
      val9: "accepted" // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(5);
    expect(err).toEqual(expect.objectContaining({
      val3: ["val3 must contains accepted term [1, 'on', 'yes', true]."],
      val6: ["val6 must contains accepted term [1, 'on', 'yes', true]."],
      val7: ["val7 must contains accepted term [1, 'on', 'yes', true]."],
      val8: ["val8 must contains accepted term [1, 'on', 'yes', true]."],
      val9: ["val9 must contains accepted term [1, 'on', 'yes', true]."]
    }));
  });

  it('nested accepted', async () => {
    let data = {
      temp: {
        val1: "ok",
        val2: "yes",
      }
    };
    let rules = {
      temp: {
        val1: 'accepted', // unexpected rule
        val2: 'accepted' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp.val1': ["temp.val1 must contains accepted term [1, 'on', 'yes', true]."]
    }));
  });
});