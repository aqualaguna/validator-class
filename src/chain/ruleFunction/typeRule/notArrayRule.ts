export default function notArrayRule (data: any, params: any): boolean {
  return !Array.isArray(data);
}

notArrayRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must not type of array.`;
}
