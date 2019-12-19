var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var Validator = require('../lib/index').default;
let ValidatorJS = require('validatorjs');


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
let rules2 = {
  name: 'string|required',
  dob: 'date',
  email: 'email|string',
  'badge.*.id': 'string|required',
  'badge.*.name': 'string|min:4',
  'badge.*.date': 'date'
};

// add tests
suite.add('validator-class#test', function () {

  let t = new Validator(data, rules);
  t.passes();
})
  .add('validatorjs#test', function () {

    let t = new ValidatorJS(data, rules2);
    t.passes();
  })
  // add listeners
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });