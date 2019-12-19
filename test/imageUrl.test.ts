import Validator from '../src/index';

describe('Image url Input Test', () => {

  it('should success a input array inside against normal string rules', async () => {
    let data = {
      name: '',
      dob: '',
      email: '',
      image_url: [
        'test1',
        'https://google.com/test.png',
        'yo1'
      ]
    };
    let rules = {
      name: 'string|required',
      dob: 'date',
      email: 'email|string',
      image_url: 'url'
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
      "image_url": [
        { "image_url": ["image_url must match url format."] },
        {},
        { "image_url": ["image_url must match url format."] }
      ]
    });


  });

});