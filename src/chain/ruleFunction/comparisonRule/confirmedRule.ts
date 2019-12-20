export default function confirmedRule (data: any, params: any) {
  let field: string = params.path[0];
  let other_field_value = params.root[field + '_confirmation'];
  return (other_field_value == data);
}

confirmedRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must be confirmed with ${params.value[0]}`;
}