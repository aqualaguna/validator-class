import inRule from "./inRule";

export default function acceptedRule (root: any, data: any, params: any) {
  return inRule(data, {
    in: [1, 'on', 'yes', true]
  })
}

acceptedRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must contains accepted term [1, 'on', 'yes', true].`;
}
