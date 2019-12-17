export default function stringRule (data: any, params: any): boolean {
  return typeof data == "string";
}

stringRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must type of string.`;
}