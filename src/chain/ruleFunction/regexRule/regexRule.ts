export default function regexRule (data: any, params: any) {
  if (typeof data == "string") {
    try {
      let regex = new RegExp(params.value.join(','));
      return data.match(regex) ? true : false;
    } catch (e) {
      // just return false if any error happen
      return false;
    }

  } else {
    return false;
  }
}


regexRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must match regex ${params.value} .`;
}
