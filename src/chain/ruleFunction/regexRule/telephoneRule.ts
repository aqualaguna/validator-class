export default function telephoneRule (data: any, params: any) {
  if (typeof data == "string") {
    let regex = /^((\+\d{2,4})|\(?\d{3,4}\)?)?([ -]?\d{3,4})+([ -]?\d+)?$/;
    return data.match(regex) ? true : false;
  } else {
    return false;
  }
}


telephoneRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must match telephone format.`;
}
