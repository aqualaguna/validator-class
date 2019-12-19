import Validator from '../../../src/index';

describe('dateRules', () => {



  it('should success date rules', async () => {
    let data = {
      val1: undefined, // undefined
      val2: {}, // empty object
      val3: [], // empty date
      val4: 1000, // time in milliseconds after 1970
      val5: null,
      val6: 1,
      val7: 0,
      val8: -1,
      val9: true,
      val10: false,
      val11: 'test',
      val12: '2019-12-11',
      val13: '2019-12-17T08:40:12.436Z'
    };
    let rules = {
      val1: 'date', // false
      val2: 'date', // false
      val3: 'date', // false
      val4: 'date', // true
      val5: 'date', // false
      val6: 'date', // true
      val7: 'date', // true
      val8: 'date', // false
      val9: 'date', // false
      val10: 'date', // false
      val11: 'date', // false
      val12: 'date', // true
      val13: 'date', // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(7);
    expect(err).toEqual(expect.objectContaining({
      val1: ['val1 must type of date.'],
      val2: ['val2 must type of date.'],
      val5: ['val5 must type of date.'],
      val8: ['val8 must type of date.'],
      val9: ['val9 must type of date.'],
      val10: ['val10 must type of date.'],
      val11: ['val11 must type of date.']
    }));
    expect(data['val4']).toBeInstanceOf(Date);
    expect(data['val6']).toBeInstanceOf(Date);
    expect(data['val7']).toBeInstanceOf(Date);
    expect(data['val12']).toBeInstanceOf(Date);
    expect(data['val13']).toBeInstanceOf(Date);
  });

  it('nested date', async () => {
    let data = {
      temp: {
        val1: {}, // empty object
        val2: [], // empty date
        val3: '2019-12-11',
        val4: '2019-12-17T08:40:12.436Z'
      }
    };

    let rules = {
      temp: {
        val1: 'date|yo', // unexpected rule
        val2: 'date', // true
        val3: 'date', // true
        val4: 'date',  // true
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val1: [
          'val1 must type of date.',
          "'yo' does not exists in rule definition."
        ],
      },
    }));
    expect(data.temp['val3']).toBeInstanceOf(Date);
    expect(data.temp['val4']).toBeInstanceOf(Date);
  });
});