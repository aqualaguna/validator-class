export default function setByPath (data: any, path: string[], value: any) {
  let clone_path = [...path];
  let temppath = clone_path.pop();
  let temp = data;
  for (const p of clone_path) {
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