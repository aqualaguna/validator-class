import Validator from '../../../src/index';

describe('differentRules', () => {



  it('should success different rules', async () => {
    let data = {
      val1: 1, // number
      val2: 1.2, // float
      val3: '10', // string number
      val4: '10', // random string
      val5: undefined, // undefined
      val6: {}, // empty object
      val7: [], // empty array
      val8: [1, 2, 3], // not empty array
      val9: -1,
      val10: 10,
    };
    let rules = {
      val1: 'different:val2', // true
      val2: 'different:val1', // true
      val3: 'different:val4', // false
      val4: 'different:val10', // false not strict equality
      val5: 'different:1', // false undefined == undefined
      val6: 'different:val4', // true {} == '10'
      val7: 'different:val1', // true
      val8: 'different:val1', // false
      val9: 'different:val1', // false compare other attr
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(4);
    expect(err).toEqual(expect.objectContaining({
      "val3": ["val3 must be different with val4"],
      "val4": ["val4 must be different with val10"],
      "val5": ["val5 must be different with 1"],
      "val8": [
        {
          "val8": ["val8 must be different with val1"]
        },
        {},
        {}
      ]
    }));

  });

  it('nested different', async () => {
    let data = {
      temp: {
        val1: 10,
        val2: '10',
      }
    };
    let rules = {
      temp: {
        val1: 'different:1', // 10 != undefined true
        val2: 'different:val1' // false
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "temp": {
        "val2": ["val2 must be different with val1"]
      }
    }));
  });
});