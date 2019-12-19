import Validator from '../../../src/index';

describe('lteRules', () => {



  it('should success lte rules', async () => {
    let data = {
      val1: 1, // number
      val2: 1.2, // float
      val3: '10', // string number
      val4: 'test', // random string
      val5: undefined, // undefined
      val6: {}, // empty object
      val7: [], // empty array
      val8: [1, 2, 3], // not empty array
      val9: -1,
      val10: 1,
      val11: 1,
      val12: 1,
      val13: 1,
      val14: 1,
    };
    let rules = {
      val1: 'lte:2', // true
      val2: 'lte:1.2', // true
      val3: 'lte:100', // true
      val4: 'lte:1', //false
      val5: 'lte:1', // false
      val6: 'lte:1', // false object or array cannot be compared
      val7: 'lte:1', // true
      val8: 'lte:1', // false 
      val9: 'lte:val1', // true compare other attr
      val11: 'lte:1', // true
      val12: 'lte:0.5', // false
      val13: 'lte:0|lte:0.5', // always false
      val14: 'lte:2|lte:2.5', // always true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(6);
    expect(err).toEqual(expect.objectContaining({
      "val4": [
        "val4 must less than or equal 1"
      ],
      "val5": [
        "val5 must less than or equal 1"
      ],
      "val6": [
        "val6 must less than or equal 1"
      ],
      "val8": [
        {},
        {
          "val8": [
            "val8 must less than or equal 1"
          ]
        },
        {
          "val8": [
            "val8 must less than or equal 1"
          ]
        }
      ],
      "val12": [
        "val12 must less than or equal 0.5"
      ],
      "val13": [
        "val13 must less than or equal 0",
        "val13 must less than or equal 0.5"
      ]
    }));

  });

  it('nested lte', async () => {
    let data = {
      temp: {
        val1: 10,
        val2: 1.4,
      }
    };
    let rules = {
      temp: {
        val1: 'lte:1|yo', // unexpected rule
        val2: 'lte:1.3' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: [
          'val1 must less than or equal 1',
          "'yo' does not exists in rule definition."
        ],
        'val2': ['val2 must less than or equal 1.3']
      },

    }));
  });
});