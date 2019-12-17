export default function numberRule (data: any, params: any): boolean {
  return typeof data == "number";
}

numberRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must type of number.`;
}