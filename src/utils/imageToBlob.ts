export interface BlobMessageEvent extends MessageEvent {
  data: Blob;
}

interface ImageMessageEvent extends MessageEvent {
  data: File;
}

self.onmessage = async (e: ImageMessageEvent) => {
  const file = e.data;
  const imageBitmap = await createImageBitmap(file);
  const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
  const ctx = canvas.getContext('bitmaprenderer');
  if (ctx) {
    // transfer the ImageBitmap to it
    ctx.transferFromImageBitmap(imageBitmap);
  } else {
    canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
  }
  const blob = await canvas.convertToBlob();
  self.postMessage(blob);
};
