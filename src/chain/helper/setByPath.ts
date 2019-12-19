export default function setByPath (data: any, path: string[], value: any) {
  let temppath = path[path.length - 1];
  let temp = data;
  for (let i = 0; i < path.length - 1; i++) {
    const p = path[i];
    if (typeof temp[p] == 'undefined') {
      temp[p] = {};
    } else {
      temp = temp[p];
    }
  }
  if (temppath) {
    temp[temppath] = value;
  }
}