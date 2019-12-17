export default function urlRule (data: any, params: any) {
  if(typeof data == "string") {
    let regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    return data.match(regex) ? true : false;
  } else {
    return false;
  }
}

urlRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must match url format.`;
}
