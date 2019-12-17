export default function setByPath (data: any, path: string[], value: any) {
  let temppath = path.pop();
  let temp = data;
  for (const p of path) {
    temp = temp[p];
  }
  if (temppath) {
    temp[temppath] = value;
  }
}