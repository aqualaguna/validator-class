import Rule from '../src/chain/rules';

describe('insert', () => {



  it('should insert a doc into collection', async () => {
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
    let t = new Rule(data, rules);
    console.log(t.validateRules());
  });
});