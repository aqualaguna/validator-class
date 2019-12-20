export default function requiredWithAllRule (data: any, params: any) {

  let fields = params.value;
  let isAllPresent = true;
  for (const field of fields) {
    if (params.root[field] == undefined) {
      isAllPresent = false
    }
  }

  if (isAllPresent) {
    if (data == undefined || data == null) {
      return false;
    }
    if (typeof data == 'string' && data.length == 0) {
      return false;
    }
  }

  return true;
}

requiredWithAllRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} is required.`;
}