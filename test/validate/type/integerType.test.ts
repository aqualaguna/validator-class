import Validator from '../../../src/index';

describe('integerRules', () => {



  it('should success integer rules', async () => {
    let data = {
      val1: undefined, // undefined
      val2: {}, // empty object
      val3: [], // empty integer
      val4: 1000, // time in milliseconds after 1970
      val5: null,
      val6: 1,
      val7: 0,
      val8: -1,
      val9: true,
      val10: false,
      val11: 'test',
      val12: 1.2,
      val13: -1.2,
      val14: '-1.2',
      val15: '1',
    };
    let rules = {
      val1: 'integer', // false
      val2: 'integer', // false
      val3: 'integer', // true
      val4: 'integer', // true
      val5: 'integer', // false
      val6: 'integer', // true
      val7: 'integer', // true
      val8: 'integer', // true
      val9: 'integer', // false
      val10: 'integer', // false
      val11: 'integer', // false
      val12: 'integer', // false
      val13: 'integer', // false
      val14: 'integer', // false
      val15: 'integer', // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(9);
    expect(err).toEqual(expect.objectContaining({
      "val1": [
        "val1 must type of integer."
      ],
      "val2": [
        "val2 must type of integer."
      ],
      "val5": [
        "val5 must type of integer."
      ],
      "val9": [
        "val9 must type of integer."
      ],
      "val10": [
        "val10 must type of integer."
      ],
      "val11": [
        "val11 must type of integer."
      ],
      "val12": [
        "val12 must type of integer."
      ],
      "val13": [
        "val13 must type of integer."
      ],
      "val14": [
        "val14 must type of integer."
      ]
    }));
    expect(typeof data['val4']).toEqual('number');
    expect(typeof data['val6']).toEqual('number');
    expect(typeof data['val7']).toEqual('number');
    expect(typeof data['val8']).toEqual('number');
    expect(typeof data['val15']).toEqual('number');

  });

  it('nested integer', async () => {
    let data = {
      temp: {
        val1: {}, // empty object
        val2: [], // empty array
        val3: 1,
        val4: '1',
      }
    };

    let rules = {
      temp: {
        val1: 'integer|yo', // false
        val2: 'integer', // true
        val3: 'integer', // true
        val4: 'integer',  // true
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();

    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: [
          'val1 must type of integer.',
          "'yo' does not exists in rule definition."
        ],
      },
    }));
    expect(typeof data.temp['val3']).toEqual('number');
    expect(typeof data.temp['val4']).toEqual('number');
  });
});