/** Krymper mobilfoton till max 1600 px JPEG innan uppladdning. */
export async function shrinkPhoto(file: File): Promise<Blob> {
  try {
    const bmp = await createImageBitmap(file);
    const s = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * s);
    c.height = Math.round(bmp.height * s);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    return await new Promise<Blob>((r) => c.toBlob((b) => r(b ?? file), "image/jpeg", 0.85));
  } catch {
    return file;
  }
}

export const photoUrl = (name: string) => `/api/foto/${encodeURIComponent(name)}`;
