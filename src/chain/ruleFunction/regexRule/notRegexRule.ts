export default function notRegexRule (data: any, params: any) {
  if (typeof data == "string") {
    try {
      let regex = new RegExp(params.value.join(','));
      return data.match(regex) ? false : true;
    } catch (e) {
      // just return false if any error happen
      return false;
    }
  } else {
    return false;
  }
}


notRegexRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must not match regex ${params.value} .`;
}
