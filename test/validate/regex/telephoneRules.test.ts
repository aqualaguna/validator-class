import Validator from '../../../src/index';

describe('telephoneRules', () => {

  it('should success telephone rules', async () => {

    let data = {
      val1: "+62 361 222777",
      val2: "+62 813-444-5555",
      val3: "+62 812-3333-3333",
      val4: "+62 811 391 2103",
      val5: "+62 361-2277777",
      val6: "(0361) 227337",
      val7: "+62 8113912103",
      val8: "08134455555",
      val9: "0361-2277777",
      val10: "+62 812 3333 3333",
      val11: "+62 877 80803550",
      val12: "081339222111",
      val13: "081 339 222 111",
      val14: "+62 811338429196",
      val15: "+62811338429196",
      val16: "+6281 1338429196",
      val17: "+6281-1338429196",
      val18: "+62811338429196",
      val19: [],
      val20: {},
      val21: 22,
      val22: 2.2,
      val23: false,
      val24: '22',
      val25: undefined,
      val26: [1, 2, 3],
      val27: '22-2-2-2-2',
      val28: '3234555-s-234',
    };
    let rules = {
      val1: 'telephone', // true
      val2: 'telephone', // true
      val3: 'telephone', // true
      val4: 'telephone', // true
      val5: 'telephone', // true
      val6: 'telephone', // true
      val7: 'telephone', // true
      val8: 'telephone', // true
      val9: 'telephone', // true
      val10: 'telephone', // true
      val11: 'telephone', // true
      val12: 'telephone', // true
      val13: 'telephone', // true
      val14: 'telephone', // true
      val15: 'telephone', // true
      val16: 'telephone', // true
      val17: 'telephone', // true
      val18: 'telephone', // true
      val19: 'telephone', // true
      val20: 'telephone', // false
      val21: 'telephone', // false
      val22: 'telephone', // false
      val23: 'telephone', // false
      val24: 'telephone', // false
      val25: 'telephone', // false
      val26: 'telephone', // false
      val27: 'telephone', // false
      val28: 'telephone', // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(9);
    expect(err).toEqual(expect.objectContaining({
      "val20": ["val20 must match telephone format."],
      "val21": ["val21 must match telephone format."],
      "val22": ["val22 must match telephone format."],
      "val23": ["val23 must match telephone format."],
      "val24": ["val24 must match telephone format."],
      "val25": ["val25 must match telephone format."],
      "val26": [
        { "val26": ["val26 must match telephone format."] },
        { "val26": ["val26 must match telephone format."] },
        { "val26": ["val26 must match telephone format."] }
      ],
      "val27": ["val27 must match telephone format."],
      "val28": ["val28 must match telephone format."]
    }
    ));
  });

  it('nested telephone', async () => {
    let data = {
      temp: {
        val1: 'test',
        val2: '0813322208746',
      }
    };
    let rules = {
      temp: {
        val1: 'telephone', // false
        val2: 'telephone' // true
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: ['val1 must match telephone format.']
      }
    }))
  });
});