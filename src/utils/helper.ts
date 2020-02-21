export const sumIterable = (iterator: IterableIterator<{ progress: number }>) => {
  let sum = 0;
  for (const obj of iterator) {
    sum += obj.progress;
  }
  return sum;
};
