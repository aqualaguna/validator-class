import setByPath from "../../helper/setByPath";

export default function numberRule (data: any, params: any): boolean {
  let result = (typeof data == "number") || (typeof data == "string" && !isNaN(Number(data)));
  if (result && typeof data != "number") {
    setByPath(params.root, params.path, Number(data));
  }
  return result;
}

numberRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must type of number.`;
}