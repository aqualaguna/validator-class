import Validator from '../../../src/index';

describe('ipRules', () => {



  it('should success ip rules', async () => {
    let data = {
      val1: '192.168.0.0',
      val2: '192.168.255.255',
      val3: '10.0.0.0',
      val4: '10.255.255.255',
      val5: '172.16.0.0',
      val6: '172.31.255.255',
      val7: '192.256.0.0',
      val8: '192.168.255.256',
      val9: '-1.0.0.0',
      val10: '10.255.256.255',
      val11: '1.-1.0.0',
      val12: '17.31.2556.2556',
      val13: '2001:db8:85a3:0:0:8a2e:370:7334',
      val14: '2001:db8:85a3::8a2e:370:7334',
      val15: '2x01:db8:8za3:021:047:8a2e:370:73x4',
      val16: 1, // number
      val17: 1.2, // float
      val18: '10', // string number
      val19: 'test', // random string
      val20: undefined, // undefined
      val21: {}, // empty object
      val22: [], // empty array
      val23: [1, 2, 3] // not empty array
    };
    let rules = {
      val1: 'ip', // true
      val2: 'ip', // true
      val3: 'ip', // true
      val4: 'ip', // true
      val5: 'ip', // true
      val6: 'ip', // true
      val7: 'ip', // false
      val8: 'ip', // false
      val9: 'ip', // false
      val10: 'ip', // false
      val11: 'ip', // false
      val12: 'ip', // false
      val13: 'ip', // true
      val14: 'ip', // true
      val15: 'ip', // false
      val16: 'ip', // false
      val17: 'ip', // false
      val18: 'ip', // false
      val19: 'ip', // false
      val20: 'ip', // false
      val21: 'ip', // false
      val22: 'ip', // true
      val23: 'ip', // false
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(14);
    expect(err).toEqual(expect.objectContaining({
      val7: ['val7 must match ip format.'],
      val8: ['val8 must match ip format.'],
      val9: ['val9 must match ip format.'],
      val10: ['val10 must match ip format.'],
      val11: ['val11 must match ip format.'],
      val12: ['val12 must match ip format.'],
      val15: ['val15 must match ip format.'],
      val16: ['val16 must match ip format.'],
      val17: ['val17 must match ip format.'],
      val18: ['val18 must match ip format.'],
      val19: ['val19 must match ip format.'],
      val20: ['val20 must match ip format.'],
      val21: ['val21 must match ip format.'],
      "val23": [
        {
          "val23": [
            "val23 must match ip format."
          ]
        },
        {
          "val23": [
            "val23 must match ip format."
          ]
        },
        {
          "val23": [
            "val23 must match ip format."
          ]
        }
      ]
    }));
  });

  it('nested ip', async () => {
    let data = {
      temp: {
        val1: '192.168.0.0',
        val2: '192.168.255.256',
      }
    };
    let rules = {
      temp: {
        val1: 'ip', // unexpected rule
        val2: 'ip' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      'temp': {
        val2: ['val2 must match ip format.']
      }
    }));
  });
});