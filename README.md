# Javascript/Node.js Validator Library 

The validator-class library makes data validation in JavaScript very easy in both the browser and Node.js. This library was inspired by the Laravel framework's Validator.

Build using Typescript. and tested using jest. with robust test case and solid structure over validator class and great documentation on code.

# Feature

- Typescript definition
- robust test case
- type converting for type rule. boolean, number, integer, date. will converted to type defined.

# Installation

## Using npm

```
npm install validator-class --save
```

## Using yarn

```
yarn add validator-class
```

# Basic Usage
```
import Validator from 'validator-class';
// mess this data to pop up errors
let data = {
  name: 'thomas evan',
  created_at: new Date(),
  address: 'baker street 1',
  age: 10,
  email: 'test@mail.com',
  username: 'test_username',
  accepted_terms: true,
  gender: 'male',
  dimension: {
    height: 10,
    width: 10,
    length: 100,
  },
  note: 'lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.lorem ipsum dolor sit amet.'
}

let rules = {
  name: 'string|required',
  created_at: 'date',
  address: 'string|required',
  age: 'integer|min:18',
  email: 'email|required',
  accepted_terms: 'accepted',
  gender: 'in:male,female',
  dimension: {
    height: 'number|min:1',
    width: 'number|min:1',
    height: 'number|min:1',
  },
  note: 'string|max:300',
}

let validator = new Validator(data, rules);
let err = validator.validate();
if (Object.keys(err).length > 0) {
  console.log('data validated');
} else {
  console.log(err);
}

```

# Task

There some feature that will developed in the future: 
- [x] Nested Array
- [x] accepting array input
- [ ] Custom Error Message
- [ ] i18n language

# License
Copyright © 2019 Ricardo Released under the MIT license

# Credit
validator-class created by Ricardo and Ernesto.

E-Mail:
- ricardosentinel7@gmail.com
- ernesto1@mhs.stts.edu


