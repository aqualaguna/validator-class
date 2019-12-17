export default function inRule (data: any, params: any) {
  return params.value.includes(data);
}

inRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must one of [${params.value.join(', ')}]`
}