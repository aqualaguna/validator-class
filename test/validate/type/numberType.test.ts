import Validator from '../../../src/index';

describe('numberRules', () => {



  it('should success number rules', async () => {
    let data = {
      val1: undefined, // undefined
      val2: {}, // empty object
      val3: [], // empty number
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
      val1: 'number', // false
      val2: 'number', // false
      val3: 'number', // true
      val4: 'number', // true
      val5: 'number', // false
      val6: 'number', // true
      val7: 'number', // true
      val8: 'number', // true
      val9: 'number', // false
      val10: 'number', // false
      val11: 'number', // false
      val12: 'number', // true
      val13: 'number', // true
      val14: 'number', // true
      val15: 'number', // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(6);
    expect(err).toEqual(expect.objectContaining({
      val1: ['val1 must type of number.'],
      val2: ['val2 must type of number.'],
      val5: ['val5 must type of number.'],
      val9: ['val9 must type of number.'],
      val10: ['val10 must type of number.'],
      val11: ['val11 must type of number.']
    }));
    expect(typeof data['val4']).toEqual('number');
    expect(typeof data['val6']).toEqual('number');
    expect(typeof data['val7']).toEqual('number');
    expect(typeof data['val8']).toEqual('number');
    expect(typeof data['val12']).toEqual('number');
    expect(typeof data['val13']).toEqual('number');
    expect(typeof data['val14']).toEqual('number');
    expect(typeof data['val15']).toEqual('number');

  });

  it('nested number', async () => {
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
        val1: 'number|yo', // unexpected rule
        val2: 'number', // true
        val3: 'number', // true
        val4: 'number',  // true
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      temp: {
        val1: [
          'val1 must type of number.',
          "'yo' does not exists in rule definition."
        ],
      }
    }));
    expect(typeof data.temp['val3']).toEqual('number');
    expect(typeof data.temp['val4']).toEqual('number');
  });
});