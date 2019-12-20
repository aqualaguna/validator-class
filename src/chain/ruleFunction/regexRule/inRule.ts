export default function inRule (data: any, params: any) {
  if (typeof data == 'string' || typeof data == 'number' || typeof data == 'boolean') {
    return params.value.includes(data.toString());
  }
  return false;
}

inRule.getErrorMessage = function (attribute_name: string, params: any) {
  let value = params.value;
  if (!Array.isArray(value)) {
    value = [value];
  }
  return `${attribute_name} must one of [${value.join(', ')}]`;
}