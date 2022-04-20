export const swapArrayIndexes = (array: Array<any>, fromIndex: number, toIndex: number) => {
  [array[fromIndex], array[toIndex]] = [array[toIndex], array[fromIndex]]
}

export const moveToArrayIndex = (array: Array<any>, fromIndex: number, toIndex: number) => {
  var element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
}