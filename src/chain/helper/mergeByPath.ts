import getByPath from "./getByPath";
import setByPath from "./setByPath";

export default function mergeByPath (data: any, path: string[], value: any[]) {
  let error = getByPath(data, path);
  if (error) {
    setByPath(data, path, error.concat(value));
  } else {
    setByPath(data, path, value);
  }
}