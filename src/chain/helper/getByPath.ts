export default function getByPath (data: any, path: string[]) {
  let temp = data;
  for (const p of path) {
    temp = temp[p];
  }
  // if (Array.isArray(temp)) {
  //   return temp.map(t => temppath ? t[temppath] : undefined);
  // } else {
  return temp;
  // }
}