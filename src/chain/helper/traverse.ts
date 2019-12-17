export default function traverse (o: any, func: Function, ancestor: any = []) {
  for (var i in o) {

    if (o[i] !== null && typeof (o[i]) == "object") {
      //going one step down in the object tree!!
      // @ts-ignore
      traverse(o[i], func, ancestor.concat([i]));
    } else {
      func(i, o[i], ancestor);
    }
  }
}