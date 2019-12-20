export default function requiredWithoutAllRule (data: any, params: any) {

  let fields = params.value;
  let isAllNotPresent = true;
  for (const field of fields) {
    if (params.root[field] != undefined) {
      isAllNotPresent = false;
    }
  }

  if (isAllNotPresent) {
    if (data == undefined || data == null) {
      return false;
    }
    if (typeof data == 'string' && data.length == 0) {
      return false;
    }
  }

  return true;
}

requiredWithoutAllRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} is required.`;
}