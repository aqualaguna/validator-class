export default function getByPath (data: any, path: string[]) {
  let clone_path = [...path];
  let temppath = clone_path.pop();
  let temp = data;
  for (const p of clone_path) {
    temp = temp[p];
  }
  return temppath ? temp[temppath] : undefined;
}