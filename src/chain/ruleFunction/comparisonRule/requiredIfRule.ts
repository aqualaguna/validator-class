export default function requiredIfRule (data: any, params: any) {
  let field = params.value[0];
  let value = params.value[1];
  let field_value = params.root[field];
  if (field_value == value) {
    if (data == undefined || data == null) {
      return false;
    }
    if (typeof data == 'string' && data.length == 0) {
      return false;
    }
  }

  return true;
}

requiredIfRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} is required.`;
}