import Validator from '../../../src/index';

describe('sameRules', () => {



  it('should success same rules', async () => {
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
      val1: 'same:val2', // false
      val2: 'same:val1', // false
      val3: 'same:val4', // true
      val4: 'same:val10', //true not strict equality
      val5: 'same:1', // true undefined == undefined
      val6: 'same:val4', // false {} == '10'
      val7: 'same:val1', // true
      val8: 'same:val1', // false
      val9: 'same:val1', // true compare other attr
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(5);
    expect(err).toEqual(expect.objectContaining({
      "val1": ["val1 must be same with val2"],
      "val2": ["val2 must be same with val1"],
      "val6": ["val6 must be same with val4"],
      "val8": [
        {},
        {
          "val8": [
            "val8 must be same with val1"
          ]
        },
        {
          "val8": [
            "val8 must be same with val1"
          ]
        }
      ],
      "val9": ["val9 must be same with val1"]
    }));

  });

  it('nested same', async () => {
    let data = {
      temp: {
        val1: 10,
        val2: '10',
      }
    };
    let rules = {
      temp: {
        val1: 'same:1|yo', // unexpected rule
        val2: 'same:val1' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();

    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "temp": {
        "val1": [
          "val1 must be same with 1",
          "'yo' does not exists in rule definition."
        ]
      }
    }));
  });
});