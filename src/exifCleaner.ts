import { isIOS } from './utils';

const imageToBlob = async (file: File) => {
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
