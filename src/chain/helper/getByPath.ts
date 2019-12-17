export default function getByPath (data: any, path: string[]) {
  let temppath = path.pop();
  let temp = data;
  for (const p of path) {
    temp = temp[p];
  }
  return temppath ? temp[temppath] : undefined;
}