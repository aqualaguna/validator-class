export default function booleanRule (data: any, params: any): boolean {
  if (typeof data == 'string') {
    let temp = Number(data);
    return isNaN(temp) ? Boolean(temp) : false;
  } else if (typeof data == 'number') {
    return isNaN(data) ? Boolean(data) : false;
  } else {
    return Boolean(data);
  }
}

booleanRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must type of boolean.`;
}