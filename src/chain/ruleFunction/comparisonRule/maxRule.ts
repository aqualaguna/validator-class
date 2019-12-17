import lteRule from "./lteRule";
import sizeRule from "./sizeRule";

export default function maxRule (data: any, params: any) {
  if (typeof data == 'string') {
    return sizeRule(data, params);
  } else {
    return lteRule(data, params);
  }
}

maxRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} maximum value is ${params.value}`;
}