import inRule from "./inRule";

export default function notInRule (data: any, params: any) {
  return !inRule(data, params);
}

notInRule.getErrorMessage = function (attribute_name: string, params: any) {
  let value = params.value;
  if (!Array.isArray(value)) {
    value = [value];
  }
  return `${attribute_name} must not one of [${value.join(', ')}]`;
}