export default function alphaNumRule (data: any, params: any) {
  let regex = /^[a-zA-Z0-9]*$/;
  return data.match(regex) ? true : false;
}

alphaNumRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must match alpha numeric |a-z,A-Z,0-9|.`;
}
