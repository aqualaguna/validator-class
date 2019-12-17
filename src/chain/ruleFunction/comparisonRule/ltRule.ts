import getByPath from "../../helper/getByPath";

export default function ltRule (data: any, params: any) {
  let value = Number(params.value);
  data = Array.isArray(data) ? NaN : Number(data);
  if (isNaN(value)) {
    // its a string of other field
    // get other field in the same ancestor
    let path = [...params.ancestor];
    path.pop();
    path.push(params.value);
    let tempdata = Number(getByPath(params.root, path));
    if (isNaN(tempdata)) {
      return false;
    } else {
      return data < tempdata;
    }
  } else {
    // its number
    if (isNaN(data)) {
      return false;
    } else {
      return data < value;
    }
  }
}

ltRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must less than ${params.value}`;
}