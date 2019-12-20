import Base, { OptionsValidator } from "./base";
import lteRule from "./ruleFunction/comparisonRule/lteRule";
import gtRule from "./ruleFunction/comparisonRule/gtRule";
import gteRule from "./ruleFunction/comparisonRule/gteRule";
import minRule from "./ruleFunction/comparisonRule/minRule";
import maxRule from "./ruleFunction/comparisonRule/maxRule";
import sizeRule from "./ruleFunction/comparisonRule/sizeRule";
import acceptedRule from "./ruleFunction/regexRule/acceptedRule";
import inRule from "./ruleFunction/regexRule/inRule";
import notInRule from "./ruleFunction/regexRule/notInRule";
import emailRule from "./ruleFunction/regexRule/emailRule";
import urlRule from "./ruleFunction/regexRule/urlRule";
import ccRule from "./ruleFunction/regexRule/ccRule";
import hashtagRule from "./ruleFunction/regexRule/hashtagRule";
import alphaRule from "./ruleFunction/regexRule/alphaRule";
import alphaNumRule from "./ruleFunction/regexRule/alphaNumRule";
import alphaDashRule from "./ruleFunction/regexRule/alphaDashRule";
import arrayRule from "./ruleFunction/typeRule/arrayRule";
import booleanRule from "./ruleFunction/typeRule/booleanRule";
import dateRule from "./ruleFunction/typeRule/dateRule";
import integerRule from "./ruleFunction/typeRule/integerRule";
import numberRule from "./ruleFunction/typeRule/numberRule";
import stringRule from "./ruleFunction/typeRule/stringRule";
import traverse from "./helper/traverse";
import ipRule from "./ruleFunction/regexRule/ipRule";
import requiredRule from "./ruleFunction/comparisonRule/requiredRule";
import ltRule from "./ruleFunction/comparisonRule/ltRule";
import telephoneRule from "./ruleFunction/regexRule/telephoneRule";
import regexRule from "./ruleFunction/regexRule/regexRule";
import notRegexRule from "./ruleFunction/regexRule/notRegexRule";
import presentRule from "./ruleFunction/comparisonRule/presentRule";
import afterRule from "./ruleFunction/comparisonRule/afterRule";
import afterEqualRule from "./ruleFunction/comparisonRule/afterEqualRule";
import beforeRule from "./ruleFunction/comparisonRule/beforeRule";
import beforeEqualRule from "./ruleFunction/comparisonRule/berforeEqualRule";
import sameRule from "./ruleFunction/comparisonRule/sameRule";
import differentRule from "./ruleFunction/comparisonRule/differentRule";
import confirmedRule from "./ruleFunction/comparisonRule/confirmedRule";
import requiredUnlessRule from "./ruleFunction/comparisonRule/requiredUnlessRule";
import requiredWithoutAllRule from "./ruleFunction/comparisonRule/requiredWithoutAllRules";
import requiredWithoutRule from "./ruleFunction/comparisonRule/requiredWithoutRules";
import requiredWithAllRule from "./ruleFunction/comparisonRule/requiredWithAllRule";
import requiredWithRule from "./ruleFunction/comparisonRule/requiredWithRules";
import requiredIfRule from "./ruleFunction/comparisonRule/requiredIfRule";

export default class Rule extends Base {
  protected rulesFunction: any = {
    lt: ltRule,
    lte: lteRule,
    gt: gtRule,
    gte: gteRule,
    min: minRule,
    max: maxRule,
    size: sizeRule,
    required: requiredRule,
    required_if: requiredIfRule,
    required_unless: requiredUnlessRule,
    required_with: requiredWithRule,
    required_with_all: requiredWithAllRule,
    required_without: requiredWithoutRule,
    required_without_all: requiredWithoutAllRule,
    accepted: acceptedRule,
    email: emailRule,
    in: inRule,
    not_in: notInRule,
    url: urlRule,
    credit_card: ccRule,
    hashtag: hashtagRule,
    alpha: alphaRule,
    alpha_num: alphaNumRule,
    alpha_dash: alphaDashRule,
    ip: ipRule,
    array: arrayRule,
    boolean: booleanRule,
    date: dateRule,
    integer: integerRule,
    number: numberRule,
    string: stringRule,
    telephone: telephoneRule,
    regex: regexRule,
    not_regex: notRegexRule,
    present: presentRule,
    after: afterRule,
    after_or_equal: afterEqualRule,
    before: beforeRule,
    before_or_equal: beforeEqualRule,
    same: sameRule,
    different: differentRule,
    confirmed: confirmedRule,
  };
  validateRules () {
    let err: any = {};
    let tis = this;
    traverse(this.rules, function (key: any, value: any, ancestor: any) {
      let errkey = ((ancestor.length > 0) ? (ancestor.join('.') + '.') : '') + key
      if (typeof value == "string") {
        let rule: any = value.split('|');
        rule = rule.map((r: any) => r.split(':'))
        rule.forEach((r: any) => {
          if (!tis.rulesFunction[r[0]]) {

            if (err[errkey]) {
              err[errkey].push(`'${r[0]}' does not exists in rule definition.`);
            } else {
              err[errkey] = [`'${r[0]}' does not exists in rule definition.`];
            }

          }
        })
      } else {
        err[ancestor.join('.') + '.' + key] = ['must be string'];
      }
    })
    return err;
  }

  constructor(data: any, rules: any, options?: OptionsValidator) {
    super(data, rules, options);
    if (options && options.custom_rule) {
      this.rulesFunction = {
        ...this.rulesFunction,
        ...options.custom_rule
      }
    }
  }
}