import gteRule from "./gteRule";

export default function minRule (data: any, params: any) {
  if (typeof data == 'string') {
    return data.length >= params.value;
  } else {
    return gteRule(data, params);
  }
}

minRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} minimum value is ${params.value}`;
}