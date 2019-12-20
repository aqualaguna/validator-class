import strtotime from '../../helper/strtotime';
import dateRule from '../typeRule/dateRule';
export default function afterRule (data: any, params: any) {
  if (dateRule(data, params)) {
    let d = new Date(data);
    let ms = strtotime(params.value.join(','), (new Date()).getTime());
    if (typeof ms == "boolean" && !ms) {
      // assume its a field
      let field = params.value.join(',');
      let tempdata = params.root[field];
      let cd = new Date(tempdata);
      if (isNaN(cd.getTime())) {
        return false;
      } else {
        return d.getTime() > cd.getTime();
      }
    }
    return d.getTime() > ms;
  } else {
    return false;
  }

}

afterRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must be after ${params.value.join(',')}.`;
}