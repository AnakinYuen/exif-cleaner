import { sleep } from './index';
import { Action, State, updateMultipleImageProgress, Progress } from '../globalState';
import exifCleaner from '../exifCleaner';
import { Dispatch } from './useThunkReducer';

export const asyncUpdateMultipleImageProgress = (files: File[]) => async (
  dispatch: Dispatch<Action, State>,
) => {
  await sleep(1000);
  const map = await exifCleaner(files);
  const progresses = new Map<File, Progress>();
  map.forEach((blob, file) => {
    progresses.set(file, { progress: 1, blob });
  });
  dispatch(updateMultipleImageProgress(progresses));
};

export const sumIterable = (iterator: IterableIterator<{ progress: number }>) => {
  let sum = 0;
  for (const obj of iterator) {
    sum += obj.progress;
  }
  return sum;
};
