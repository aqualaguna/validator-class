export default function traverse (o: any, func: Function, ancestor: any = []): any {
  for (var i in o) {
    if (o[i] !== null && typeof (o[i]) == "object") {
      //going one step down in the object tree!!
      // @ts-ignore
      let result = traverse(o[i], func, ancestor.concat([i]));
      if (result == 'quit_traverse') {
        if (ancestor.length == 0) {
          break;
        } else {
          return result;
        }
      }
    } else {
      let result = func(i, o[i], ancestor);
      if (result == 'quit_traverse') {
        return result;
      }
    }
  }
}