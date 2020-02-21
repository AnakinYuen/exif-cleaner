import { sleep } from './index';
import { Action, State, updateMultipleImageProgress, Progress } from '../globalState';
import exifCleaner from '../exifCleaner';
import { Dispatch } from './useThunkReducer';
import JSZip from 'jszip';

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

export const download = (blob: Blob, name: string) => {
  const a = document.createElement('a');
  const url = URL.createObjectURL(blob);
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
};

export const sumIterable = (iterator: IterableIterator<{ progress: number }>) => {
  let sum = 0;
  for (const obj of iterator) {
    sum += obj.progress;
  }
  return sum;
};

export const downloadZip = (_: Dispatch<Action, State>, getState: () => State) => {
  const { images, selected } = getState();

  if (selected.size === 1) {
    const file = selected.values().next().value as File;
    const info = images.get(file);
    download(info.blob, 'image.png');
    return;
  }
  const zip = new JSZip();
  const selectedArray = Array.from(selected);
  const padZero = Math.max(Math.log10(selectedArray.length), 3);
  selectedArray.forEach((file, index) => {
    const info = images.get(file);
    const filename = `${index}`.padStart(padZero, '0');
    zip.file(`images/${filename}.png`, info.blob);
  });
  zip
    .generateAsync({
      type: 'blob',
    })
    .then(zipBlob => download(zipBlob, 'images.zip'));
};
