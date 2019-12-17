export default function dateRule (data: any, params: any): boolean {
  let date = new Date(data);
  return isNaN(date.getTime());
}

dateRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must type of date.`;
}