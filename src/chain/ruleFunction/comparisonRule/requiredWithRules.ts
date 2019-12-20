export default function requiredWithRule (data: any, params: any) {

  let fields = params.value;
  let isSomePresent = fields.some((field: string) => params.root[field] != undefined);

  if (isSomePresent) {
    if (data == undefined || data == null) {
      return false;
    }
    if (typeof data == 'string' && data.length == 0) {
      return false;
    }
  }

  return true;
}

requiredWithRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} is required.`;
}