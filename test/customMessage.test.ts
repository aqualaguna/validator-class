import Validator from '../src/index';

describe('Validate Custom Message Test', () => {

  it('should success set custom message', async () => {
    let data = {
      name: '',
      dob: '',
      email: ''
    };
    let rules = {
      name: 'string|required',
      dob: 'date',
      email: 'email|string',
    };
    let t = new Validator(data, rules, {
      custom_message: {
        email: function (key: any, params: any) {
          return `${key} is not an email type please insert it again with correct format.`;
        }
      }
    });
    expect(t.passes()).toBeFalsy();
    let err = t.getAllErrors();
    expect(Object.keys(err).length).toBe(3);
    expect(err).toEqual({
      "name": ["name is required."],
      "dob": ["dob must type of date."],
      "email": ["email is not an email type please insert it again with correct format."],
    });


  });

});