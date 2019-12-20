export default function presentRule (data: any, params: any) {
  if (data == undefined) {
    return false;
  }
  return true;
}

presentRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must be present.`;
}