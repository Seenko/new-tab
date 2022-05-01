export const swapArrayIndexes = (array: Array<unknown>, fromIndex: number, toIndex: number) => {
  [array[fromIndex], array[toIndex]] = [array[toIndex], array[fromIndex]]
}

export const moveToArrayIndex = (array: Array<unknown>, fromIndex: number, toIndex: number) => {
  const element = array[fromIndex];
  array.splice(fromIndex, 1);
  array.splice(toIndex, 0, element);
}