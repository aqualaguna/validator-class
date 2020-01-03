import Rule from "./rules";
import traverse from "./helper/traverse";
import getByPath from "./helper/getByPath";
import setByPath from "./helper/setByPath";
import mergeByPath from "./helper/mergeByPath";

export default class Validate extends Rule {
  protected errorsBag: any;
  /**
   * validate data and rules provided.
   * returning errorsbag;
   */
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
            rule = rule.map((r: any) => {
              let res = r.split(':');
              if (res.length > 2) {
                let temp = [];
                temp.push(res.shift());
                temp.push(res.join(':'));
                res = temp;
              }
              return res;
            })
            let nullableFlag = rule.some((t: any) => t[0] == 'nullable');
            for (const r of rule) {
              if (!this.rulesFunction[r[0]]) {
                mergeByPath(err, [key], [`'${r[0]}' does not exists in rule definition.`]);
              } else {
                // there is a definition
                let data = getByPath(real_root, [key]);
                if (nullableFlag && (data == undefined || data == null)) {
                  // return true for all of its set of other rule
                  break;
                }
                // data get ;)
                // lets validate
                let params = {
                  value: (r[1]) ? (r[1].match(',') ? r[1].split(',') : [r[1]]) : undefined,
                  ancestor: [],
                  path: [key],
                  root: real_root
                };
                if (Array.isArray(data) && !(['array', 'not_array'].includes(r[0]))) {
                  if (data.length > 0) {
                    let temperr = [];
                    for (const d of data) {
                      let terr: any = {};
                      this.checkField(key, r[0], d, params, terr);
                      temperr.push(terr);
                    }
                    setByPath(err, [key], temperr);
                  }
                } else {
                  this.checkField(key, r[0], data, params, err);
                }

              }
            }
          }
        }
      } else if (typeof value == 'object') {
        let temprules = getByPath(real_rules, [key]);
        let tempdata = getByPath(real_root, [key]);
        let temperr: any = this.validateRecursive(temprules, tempdata) || {};
        setByPath(err, [key], temperr);
      }
    }
    this.errorsBag = err;
    return err;
  }

  protected checkField (field_name: string, rule_name: string, data: any, params: any, err: any) {
    let status = this.rulesFunction[rule_name](data, params);
    if (!status) {
      let msg: string;
      if (this.options && typeof this.options.custom_message[rule_name] == 'function') {
        try {
          msg = this.options.custom_message[rule_name](field_name, params);
        } catch (e) {
          console.log(e);
          msg = this.rulesFunction[rule_name].getErrorMessage(field_name, params);
        }
      } else {
        msg = this.rulesFunction[rule_name].getErrorMessage(field_name, params);
      }
      mergeByPath(err, [field_name], [msg]);
    }
  }

  /**
   * return boolean whether validation passes.
   */
  passes (): boolean {
    let err = this.errorsBag ? this.errorsBag : this.validateRecursive();
    this.errorsBag = err;
    let flag = true;
    traverse(err, function (key: any, value: any, ancestor: any[]) {
      flag = false;
      return 'quit_traverse';
    })
    return flag;
  }

  /**
  * return boolean whether validation fail.
  */
  fail (): boolean {
    return !this.passes();
  }

  /**
   * get errorsBag
   */
  getAllErrors (): any {
    return this.errorsBag;
  }
  /**
   * set errorsbag
   * @param errors errors
   */
  setErrors (errors: any): void {
    this.errorsBag = errors;
  }
} 