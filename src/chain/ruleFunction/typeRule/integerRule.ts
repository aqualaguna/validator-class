import setByPath from "../../helper/setByPath";

export default function integerRule (data: any, params: any): boolean {
  let result = (typeof data == "number" && Number.isInteger(data)) || (typeof data == "string" && Number.isInteger(Number(data)));
  if (result && typeof data != "number") {
    setByPath(params.root, params.path, Number(data));
  }
  return result;
}

integerRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must type of integer.`;
}
