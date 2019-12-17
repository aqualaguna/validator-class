export default function hashtagRule (data: any, params: any) {
  if(typeof data == "string") {
    let regex = /^#[a-zA-Z0-9]*$/;
    return data.match(regex) ? true : false;
  } else {
    return false;
  }
}


hashtagRule.getErrorMessage = function (attribute_name: string, params: any) {
  return `${attribute_name} must match hashtag format. eg. #hello`;
}
