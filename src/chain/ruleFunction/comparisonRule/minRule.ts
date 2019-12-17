import gteRule from "./gteRule";

export default function minRule (data: any, params: any) {
  return gteRule(data, params);
}

minRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} minimum value is ${params.value}`;
}