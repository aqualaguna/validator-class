export default function requiredRule (data: any, params: any) {
  if (data == undefined || data == null) {
    return false;
  }
  if (typeof data == 'string' && data.length == 0) {
    return false;
  }
  return true;
}

requiredRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} is required.`;
}