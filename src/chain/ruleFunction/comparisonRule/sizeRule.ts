export default function sizeRule (data: any, params: any) {
  if (typeof data != "string") {
    return false;
  } else {
    return data.length == params.value;
  }
}

sizeRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must have length ${params.value}`;
}