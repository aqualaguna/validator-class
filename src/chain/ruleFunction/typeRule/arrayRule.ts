export default function arrayRule (data: any, params: any): boolean {
  return Array.isArray(data);
}

arrayRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must type of array.`;
}
