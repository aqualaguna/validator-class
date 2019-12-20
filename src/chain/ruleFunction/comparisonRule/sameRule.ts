export default function sameRule (data: any, params: any) {
  let field: string = params.value[0];
  let other_field_value = params.root[field];
  return typeof other_field_value != "object" && (other_field_value == data);
}

sameRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must be same with ${params.value[0]}`;
}