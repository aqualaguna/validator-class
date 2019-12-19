export default function alphaDashRule (data: any, params: any) {
  if (typeof data == "string") {
    let regex = /^[a-zA-Z0-9-_]*$/;
    return data.match(regex) ? true : false;
  } else {
    return false;
  }
}

alphaDashRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must match alphadash |a-z,A-Z,0-9,-,_|.`;
}
