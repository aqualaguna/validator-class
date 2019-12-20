import Validator from '../src/index';

describe('Custom Validation Rule Test', () => {

  it('should success set custom rule', async () => {
    let data = {
      name: '',
      dob: '',
      email: '',
      gender: 'male',
      second_gender: 1,
    };
    let rules = {
      name: 'string|required',
      dob: 'date',
      email: 'email|string',
      gender: 'gender',
      second_gender: 'gender',
    };
    let t = new Validator(data, rules, {
      custom_message: {
        gender: function (key: any, params: any) {
          return `${key} must be in female or male`;
        }
      },
      custom_rule: {
        gender: function (data: any, params: any) {
          return (typeof data == 'string' && ['male', 'female'].includes(data));
        }
      }
    });
    expect(t.passes()).toBeFalsy();
    let err = t.getAllErrors();
    expect(Object.keys(err).length).toBe(4);
    expect(err).toEqual({
      "name": ["name is required."],
      "dob": ["dob must type of date."],
      "email": ["email must match email format."],
      "second_gender": ["second_gender must be in female or male"],
    });


  });

});