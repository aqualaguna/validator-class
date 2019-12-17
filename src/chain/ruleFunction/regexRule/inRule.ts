export default function inRule (data: any, params: any) {
  return params.value.includes(data);
}

inRule.getErrorMessage = function (attribute_name: string, params: any) {
  if (Array.isArray(params.value)) { 
    return `${attribute_name} must one of [${params.value.join(', ')}]`
  } else {
    return `${attribute_name} must one of [${params.value}]`
  }
}