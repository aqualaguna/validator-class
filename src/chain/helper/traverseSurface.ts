export default function traverseSurface (o: any, func: Function, ancestor: any = []) {
  for (var i in o) {
    func(i, o[i], ancestor);
  }
}