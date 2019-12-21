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
// first method
let err = validator.validate(); //
return err object
if (Object.keys(err).length > 0) {
  console.log('data validated');
} else {
  console.log(err);
}
// second method
// this is equal to first method
if(validator.passess()) {
  console.log('data validated');
} else {
  console.log(t.getAllErrors());
}
```

**for other feature not mentioned in basic usage you can read it in the test folder for other usage.**

## Rule List
### type
#### array
check if certain field is type array.

#### not_array
check if certain field is type not an array.
#### boolean
check if the field is a boolean.

value that valid:
- string '1', '0', 'true', 'false'
- string that can be formated to number [Boolean(Number(data))] is a boolean.
- number is a boolean.
#### date
check if certain field is a date format.

which is valid:
- "2019-12-19T06:47:57.146Z" => toIsoString()
- Date Instance
- positive number. that expect milliseconds from 1970 (idk is this wrong. but you get the idea)

#### integer
check if the field is an integer.

value that valid:
- number which is not a fraction. eg. -1, 0, 1, 2
- string which can be formated to integer number
#### string
check if the field is a string. anything that has typeof string.

#### number
check if the field is a number. any number and any string that can be converted to number.

### compare
#### after
The field under validation must be after the given date.
date comparison is using locutus.io strtotime method.

#### after_or_equal
The field under validation must be after or equal the given date.
date comparison is using locutus.io strtotime method.

#### before
The field under validation must be before the given date.
date comparison is using locutus.io strtotime method.

#### before_or_equal
The field under validation must be before or equal the given date.
date comparison is using locutus.io strtotime method.

#### confirmed 
The field under validation must have a matching field of foo_confirmation. For example, if the field under validation is password, a matching password_confirmation field must be present in the input.

#### different
The given field must be different than the field under validation.

#### present
The field under validation must be present in the input data but can be empty.


#### gte
greater than equal. this rule need 1 params which is can be any of:
- other field that can be compared.
- number type
#### gt
greater than. this rule need 1 params which is can be any of:
- other field that can be compared.
- number type

#### lte
less than equal. this rule need 1 params which is can be any of:
- other field that can be compared.
- number type

#### lt
less than. this rule need 1 params which is can be any of:
- other field that can be compared.
- number type

#### min
min rule can be applied either to string or number. only accept 1 parameter which is a number. if the field is string, then the string length must be at least x characters. if the field is a number than it must greater than or equal to x.

#### max
max rule can be applied either to string or number. only accept 1 parameter which is a number. if the field is string, then the string length must has maximum x characters. if the field is a number than it must less than or equal to x.

#### required
required validate wheter the field is not undefined or null. empty string is a invalid.

#### required_if
The field under validation must be present and not empty if the anotherfield field is equal to any value.

#### required_unless
The field under validation must be present and not empty unless the anotherfield field is equal to any value.

#### required_with
The field under validation must be present and not empty only if any of the other specified fields are present.


#### required_with_all
The field under validation must be present and not empty only if all of the other specified fields are present.


#### required_without
The field under validation must be present and not empty only when any of the other specified fields are not present.

#### required_without_all
The field under validation must be present and not empty only when all of the other specified fields are not present.

#### same
The given field must match the field under validation.





#### size
size rule only accept field with type string and the length is match to size parameter.
this rule accept 1 param which is a number.



### regex
#### accepted
accepted rule only accept value in [true, 1, 'on', 'yes'];

#### regex
The field under validation must match the given regular expression.

Note: When using the regex pattern, it may be necessary to specify rules in an array instead of using pipe delimiters, especially if the regular expression contains a pipe character. For each backward slash that you used in your regex pattern, you must escape each one with another backward slash.

#### not_regex
inverse of regex rule.

#### alpha_dash
alpha_dash accept string which only contains [ a-z, A-Z, 0-9, -, _ ]


#### alpha_num
alpha_num accept string which only contains [ a-z, A-Z, 0-9 ]

#### alpha
alpha_num accept string which only contains [ a-z, A-Z ]

#### telephone
telephone accept string which match phone format.
for test case look at telephoneRules.test.ts

``let regex = /^((\+\d{2,4})|\(?\d{3,4}\)?)?([ -]?\d{3,4})+([ -]?\d+)?$/;``



#### credit_card
credit_card accept string which match credit card visa, master, etc.

``let regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;``

#### email
email accept string which match email format.

``let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;``

#### hashtag
hashtag accept string which match hashtag format.

``let regex = /^#[a-zA-Z0-9]*$/;``

#### ip
ip accept string of ip format. valid whether ipv4 or ipv6.

```
let regex = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
```

#### url
url accept any url format.
```
let regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
```

#### in
in rule accept x number of parameters. field which validated must be one of parameters to be valid.

#### not_in
not_in is inverse of in rule.


# Benchmark
this library is benchmarked using my own old laptop. result may differ between computer. to run benchmark clone this repo and install dependency then run :

```
npm run bench
```

result :
```

> validator-class@1.1.0 bench /home/ricardo/Documents/validator-class
> node benchmark/bench.js

validator-class#test x 23,287 ops/sec ±2.22% (77 runs sampled)
validatorjs#test x 8,116 ops/sec ±2.98% (75 runs sampled)
Fastest is validator-class#test

```

# Task

There some feature that will developed in the future: 
- [x] Nested Array => look example at arrayInput.test.ts
- [x] accepting array input => look example at arrayInput.test.ts
- [x] Custom Error Message => look example at customMessage.test.ts
- [ ] ~~i18n language~~ **no need to much data to heavy for simple library**

# License
Copyright © 2019 Ricardo Released under the MIT license

# Credit
validator-class created by Ricardo and Ernesto.

E-Mail:
- ricardosentinel7@gmail.com
- ernesto1@mhs.stts.edu


