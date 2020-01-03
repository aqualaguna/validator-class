export default function nullableRule (data: any, params: any): boolean {
  return true;
}

nullableRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} can be empty.`;
}
