export default function integerRule (data: any, params: any): boolean {
  return typeof data == "number" && Number.isInteger(data);
}

integerRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must type of integer.`;
}
