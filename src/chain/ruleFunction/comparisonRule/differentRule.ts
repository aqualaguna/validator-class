export default function differentRule (data: any, params: any) {
  let field: string = params.value[0];
  let other_field_value = params.root[field];
  return typeof other_field_value != "object" && (other_field_value != data);
}

differentRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must be different with ${params.value[0]}`;
}