import Rule from "./rules";
import traverse from "./helper/traverse";
import getByPath from "./helper/getByPath";

export default class Validate extends Rule {
  validate () {
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
          } else {
            // there is a definition
            let path = [...ancestor];
            path.push(key);
            let data = getByPath(tis.data, path);

            // data get ;)
            // lets validate
            let params = {
              value: (r[1]) ? (r[1].match(',') ? r[1].split(',') : r[1]) : undefined,
              ancestor,
              path,
              root: tis.data
            };
            let status = tis.rulesFunction[r[0]](data, params);
            if (!status) {
              let tpath = [...ancestor];
              tpath.push(key);
              let msg = tis.rulesFunction[r[0]].getErrorMessage(tpath.join('.'), params);
              // add error
              if (err[errkey]) {
                err[errkey].push(msg);
              } else {
                err[errkey] = [msg];
              }
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