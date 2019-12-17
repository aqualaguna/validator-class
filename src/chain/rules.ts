import Base from "./base";
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
    string: stringRule
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
}