import Validator from '../../../src/index';

describe('sizeRules', () => {



  it('should success size rules', async () => {
    let data = {
      val1: 1,
      val2: 'sizetemp'
    };
    let rules = {
      val1: 'size:9', // false size only valid for string
      val2: 'size:8' // true
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);

    expect(err).toEqual(expect.objectContaining({
      val1: ['val1 must have length 9']
    }));

  });

  it('nested size', async () => {
    let data = {
      temp: {
        val1: 10,
      }
    };
    let rules = {
      temp: {
        val1: 'size|yo', // unexpected rule
        val2: 'size' // invalid rule
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      temp: {
        val1: [
          'val1 must have length undefined',
          "'yo' does not exists in rule definition."
        ],
        val2: ['val2 must have length undefined']
      }
    }));
  });
});