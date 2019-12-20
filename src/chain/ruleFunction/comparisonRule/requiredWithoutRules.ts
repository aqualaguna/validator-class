export default function requiredWithoutRule (data: any, params: any) {

  let fields = params.value;
  let isSomeNotPresent = fields.some((field: string) => params.root[field] == undefined);

  if (isSomeNotPresent) {
    if (data == undefined || data == null) {
      return false;
    }
    if (typeof data == 'string' && data.length == 0) {
      return false;
    }
  }

  return true;
}

requiredWithoutRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} is required.`;
}