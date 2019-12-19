import Rule from "./rules";
import traverse from "./helper/traverse";
import getByPath from "./helper/getByPath";
import setByPath from "./helper/setByPath";
import mergeByPath from "./helper/mergeByPath";

export default class Validate extends Rule {
  protected errorsBag: any;
  validate () {
    return this.validateRecursive();
  }

  protected validateRecursive (rules: any = undefined, root_data: any = undefined) {
    let err: any = {};
    let real_rules = rules ? rules : this.rules;
    let real_root = root_data ? root_data : this.data;
    if (Array.isArray(real_root)) {
      let temperr: any = [];
      real_root.forEach((val) => temperr.push(this.validateRecursive(real_rules, val)));
      return temperr;
    }
    for (var i in real_rules) {
      let key = i;
      let value = real_rules[i];
      if (typeof value == "string" || (Array.isArray(value))) {
        let rule: any = typeof value == "string" ? value.split('|') : value;
        // check rule type
        if (rule[0]) {
          if (typeof rule[0] != 'string') {
            setByPath(err, [key], ['if its an Array it must be array of string']);
          } else {
            rule = rule.map((r: any) => r.split(':'))
            rule.forEach((r: any) => {
              if (!this.rulesFunction[r[0]]) {
                mergeByPath(err, [key], [`'${r[0]}' does not exists in rule definition.`]);
              } else {
                // there is a definition
                let data = getByPath(real_root, [key]);
                // data get ;)
                // lets validate
                let params = {
                  value: (r[1]) ? (r[1].match(',') ? r[1].split(',') : [r[1]]) : undefined,
                  ancestor: [],
                  path: [key],
                  root: real_root
                };

                let status = this.rulesFunction[r[0]](data, params);
                if (!status) {
                  let msg: string;
                  if (this.options && typeof this.options.custom_message[r[0]] == 'function') {
                    try {
                      msg = this.options.custom_message[r[0]](key, params);
                    } catch (e) {
                      console.log(e);
                      msg = this.rulesFunction[r[0]].getErrorMessage(key, params);
                    }
                  } else {
                    msg = this.rulesFunction[r[0]].getErrorMessage(key, params);
                  }

                  mergeByPath(err, [key], [msg]);
                }
              }
            })
          }
        }
      } else if (typeof value == 'object') {
        let temprules = getByPath(real_rules, [key]);
        let tempdata = getByPath(real_root, [key]);
        let temperr: any = this.validateRecursive(temprules, tempdata) || {};
        setByPath(err, [key], temperr);
      }
    }
    return err;
  }

  passes () {
    let err = this.errorsBag ? this.errorsBag : this.validateRecursive();
    this.errorsBag = err;
    let flag = true;
    traverse(err, function (key: any, value: any, ancestor: any[]) {
      flag = false;
      return 'quit_traverse';
    })
    return flag;
  }

  fail () {
    return !this.passes();
  }

  getAllErrors () {
    return this.errorsBag;
  }
} 