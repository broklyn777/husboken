/** Krymper mobilfoton till max 1600 px JPEG innan uppladdning. Tar också bort platsdata (EXIF). */
export async function shrinkPhoto(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file).catch(() => null);
  if (!bmp) throw new Error("Fotot gick inte att läsa. Prova att ta det som JPEG.");
  const s = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * s);
  c.height = Math.round(bmp.height * s);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  const blob = await new Promise<Blob | null>((r) => c.toBlob(r, "image/jpeg", 0.85));
  if (!blob) throw new Error("Fotot gick inte att förbereda.");
  return blob;
}

export class NotLoggedIn extends Error {}

async function check(r: Response) {
  if (r.status === 401) throw new NotLoggedIn("Logga in med familjelösenordet först.");
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || "Något gick fel.");
  return j;
}

/** Laddar upp ett foto och returnerar dess namn. */
export async function uploadPhoto(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("photo", await shrinkPhoto(file), "foto.jpg");
  return (await check(await fetch("/api/foto", { method: "POST", body: fd }))).name;
}

export const postJson = async (url: string, body: unknown) =>
  check(await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }));

export const photoUrl = (name: string) => `/api/foto/${encodeURIComponent(name)}`;
