import { isIOS } from './utils';
import ThreadPool from './utils/ThreadPool';
import { BlobMessageEvent } from './utils/imageToBlob';

const onScreenCanvas = async (file: File) => {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext('bitmaprenderer');
  if (ctx) {
    // transfer the ImageBitmap to it
    ctx.transferFromImageBitmap(imageBitmap);
  } else {
    canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
  }
  return await new Promise<Blob>(resolve => {
    canvas.toBlob(resolve);
  });
};

const offScreenCanvas = (file: File) => {
  const threadPool = new ThreadPool((navigator.hardwareConcurrency || 3) - 1);
  threadPool.init();

  return new Promise<Blob>(resolve => {
    threadPool.addWorkerTask({ file, callback: ({ data }: BlobMessageEvent) => resolve(data) });
  });
};

const imageToBlob: (file: File) => Promise<Blob> =
  'OffscreenCanvas' in window ? offScreenCanvas : onScreenCanvas;

const exifCleaner = async (files: File[]): Promise<Map<File, Blob>> => {
  const map = new Map<File, Blob>();
  if (isIOS) {
    // Since iOS will always strip EXIF from uploaded photos, just return image url directly
    files.forEach(file => {
      map.set(file, file);
    });
  } else {
    // drawImage to canvas to strip EXIF
    const blobs = await Promise.all(files.map(imageToBlob));
    files.forEach((file, index) => {
      map.set(file, blobs[index]);
    });
  }
  return map;
};

export default exifCleaner;
