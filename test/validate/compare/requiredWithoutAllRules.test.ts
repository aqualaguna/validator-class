import Validator from '../../../src/index';

describe('requiredWithAllRules', () => {



  it('should success required_without_all rules', async () => {
    let data = {
      val1: 1,
      val2: 'test',
    };
    let rules = {
      val1: 'required_without_all:val2', // true all present => not required
      val2: 'required_without_all:val3', // true all not present => required
      val3: 'required_without_all:val3', // false all not present => required
      val4: 'required_without_all:val1,val2,val3' // true val3 not present => not required
    };
    let t = new Validator(data, rules);
    let err = t.validate();

    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      "val3": ["val3 is required."]
    }))

  });

  it('nested required_without_all', async () => {
    let data = {
      temp: {
        val1: 10,
      }
    };
    let rules = {
      temp: {
        val1: 'required_without_all:val1,10', // some present => not required
        val2: 'required_without_all:val1' //  all present => not required
      }
    };
    let t = new Validator(data, rules);
    let err = t.validate();
    expect(Object.keys(err).length).toBe(1);
    expect(err).toEqual(expect.objectContaining({
      temp: {}
    }));
  });
});