import setByPath from "../../helper/setByPath";

export default function booleanRule (data: any, params: any): boolean {
  let result = false;
  let setData;
  if (typeof data == 'string') {
    if (data == 'true' || data == 'false') {
      result = true;
      setData = data == 'true' ? true : false;
    } else {
      let temp = Number(data);
      result = !isNaN(temp);
      setData = Boolean(temp);
    }

  } else if (typeof data == 'number') {
    result = !isNaN(data);
    setData = Boolean(data);
  } else if (typeof data == 'object' || typeof data == 'undefined') {
    result = false;
    setData = false;
  } else if (typeof data == 'boolean') {
    // if boolean
    result = true;
    setData = Boolean(data);
  } else {
    result = false;
    setData = false;
  }
  if (result && typeof data != "boolean") {
    setByPath(params.root, params.path, setData);
  }
  return result;
}

booleanRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must type of boolean.`;
}