import Validator from '../src/index';

describe('Validate Array Input Test', () => {

  it('should success a input array inside an object', async () => {
    let data = {
      name: '',
      dob: '',
      email: '',
      badge: [
        {
          id: 'test',
          name: 'tes',
          created_at: new Date()
        },
        {
          id: 'test2',
          name: 'hello',
          created_at: new Date()
        }
      ]
    };
    let rules = {
      name: 'string|required',
      dob: 'date',
      email: 'email|string',
      badge: {
        id: 'string|required',
        name: 'string|min:4',
        created_at: 'date'
      }
    };
    let t = new Validator(data, rules);
    expect(t.passes()).toBeFalsy();
    expect(t.fail()).toBeTruthy();
    let err = t.getAllErrors();
    expect(Object.keys(err).length).toBe(4);
    expect(err).toEqual({
      "name": ["name is required."],
      "dob": ["dob must type of date."],
      "email": ["email must match email format."],
      "badge": [
        { "name": ["name minimum value is 4"] },
        {}
      ]
    });


  });

  it('should success a input array', async () => {
    let data = [
      {
        id: 'test',
        name: 'tes',
        created_at: new Date()
      },
      {
        id: 'test2',
        name: 'hello',
        created_at: new Date()
      }
    ]
    let rules = {
      id: 'string|required',
      name: 'string|min:4',
      created_at: 'date'
    };
    let t = new Validator(data, rules);
    expect(t.passes()).toBeFalsy();
    expect(t.fail()).toBeTruthy();
    let err = t.getAllErrors();
    expect(Array.isArray(err)).toBeTruthy()
    expect(Object.keys(err).length).toBe(2);
    expect(err[0]).toEqual({ "name": ["name minimum value is 4"] });
    expect(err[1]).toEqual({});
  });

});