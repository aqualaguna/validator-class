


export default function alphaRule (data: any, params: any) {
  let regex = /^[a-zA-Z]*$/;
  return data.match(regex) ? true : false;
}

alphaRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must match alpha |a-z,A-Z|.`;
}
