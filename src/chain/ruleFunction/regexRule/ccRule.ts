

export default function ccRule (data: any, params: any) {
  let regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  return data.match(regex) ? true : false;
}

ccRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must match credit card format.`;
}
