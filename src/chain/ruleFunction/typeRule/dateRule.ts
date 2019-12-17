import setByPath from "../../helper/setByPath";

export default function dateRule (data: any, params: any): boolean {
  if ((typeof data == 'number' && data < 0) || typeof data == "boolean" || data == null) {
    return false;
  }
  let date = new Date(data);
  let result = !isNaN(date.getTime());
  if (result && !(data instanceof Date)) {
    setByPath(params.root, params.path, date);
  }
  return result;
}

dateRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must type of date.`;
}