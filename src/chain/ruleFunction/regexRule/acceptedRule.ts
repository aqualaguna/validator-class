import inRule from "./inRule";
// [1, 'on', 'yes', true]
export default function acceptedRule (data: any, params: any) {
  return (typeof data == "number" && data == 1) ||
    (typeof data == "string" && (data == 'on' || data == 'yes')) ||
    (typeof data == "boolean" && data);
}

acceptedRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must contains accepted term [1, 'on', 'yes', true].`;
}
