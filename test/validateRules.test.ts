import Validator from '../src/index';

describe('Validate Rule Test', () => {



  it('should success a valid rules', async () => {
    let data = {
      name: '',
      dob: '',
      email: '',
    };
    let rules = {
      name: 'string|required',
      dob: 'date',
      email: 'email|string'
    };
    let t = new Validator(data, rules);
    let err = t.validateRules();
    expect(Object.keys(err).length).toBe(0);
  });


  it('should fail a not valid rules', async () => {
    let data = {
      name: '',
      dob: '',
      email: '',
    };
    let rules = {
      name: 'string|required',
      dob: 'date|yo',
      email: 'email|string'
    };
    let t = new Validator(data, rules);
    let err = t.validateRules();
    expect(Object.keys(err).length).toBe(1);
    expect(err['dob']).toBeDefined();
    expect(err['dob'][0]).toEqual(`'yo' does not exists in rule definition.`)
  });

  it('should success a nested valid rules', async () => {
    let data = {
      name: '',
      dimension: {
        length: 1,
        height: 1,
        width: 1
      },
      email: '',
    };
    let rules = {
      name: 'string|required',
      dimension: {
        length: 'number|required',
        height: 'number|required',
        width: 'number|required'
      },
      email: 'email|string'
    };
    let t = new Validator(data, rules);
    let err = t.validateRules();
    expect(Object.keys(err).length).toBe(0);
  });


  it('should fail a nested not valid rules', async () => {
    let data = {
      name: '',
      dimension: {
        length: 1,
        height: 1,
        width: 1
      },
      email: '',
    };
    let rules = {
      name: 'string|required',
      dimension: {
        length: 'number|required|yo',
        height: 'number|required',
        width: 'number|required'
      },
      email: 'email|string'
    };
    let t = new Validator(data, rules);
    let err = t.validateRules();
    expect(Object.keys(err).length).toBe(1);
    expect(err['dimension.length']).toBeDefined();
    expect(err['dimension.length'][0]).toEqual(`'yo' does not exists in rule definition.`); ``
  });


});