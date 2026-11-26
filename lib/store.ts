import { randomUUID } from "node:crypto";
import { backend } from "./backend";

const LOG = "logg.json";
const PARTS = "delar.json";
const photoKey = (name: string) => `foton/${name}`;

export type LogEntry = {
  id: string;
  title: string;
  text: string;
  cat: string;
  date: string;
  photos: string[];
  createdAt: number;
};
export type PartNote = { note: string; photo?: string; at: number };

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const text = await backend.readText(key);
  if (!text) return fallback;
  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}
const writeJson = (key: string, value: unknown) => backend.writeText(key, JSON.stringify(value, null, 2));

// En skrivning i taget, så att två samtidiga sparningar inte skriver över varandra.
let queue: Promise<unknown> = Promise.resolve();
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const next = queue.then(fn, fn);
  queue = next.catch(() => {});
  return next;
}

export const getLog = () => readJson<LogEntry[]>(LOG, []);
export const getParts = () => readJson<Record<string, PartNote>>(PARTS, {});

export function addLog(entry: Omit<LogEntry, "id" | "createdAt">) {
  return serial(async () => {
    const list = await getLog();
    const full: LogEntry = { ...entry, id: randomUUID(), createdAt: Date.now() };
    list.push(full);
    await writeJson(LOG, list);
    return full;
  });
}

export function deleteLog(id: string) {
  return serial(async () => {
    const list = await getLog();
    const hit = list.find((e) => e.id === id);
    if (!hit) return false;
    await writeJson(LOG, list.filter((e) => e.id !== id));
    await Promise.all(hit.photos.map((p) => removePhoto(p)));
    return true;
  });
}

export function setPart(key: string, value: Partial<PartNote>) {
  return serial(async () => {
    const all = await getParts();
    const old = all[key];
    const next: PartNote = { ...old, ...value, note: value.note ?? old?.note ?? "", at: Date.now() };
    all[key] = next;
    await writeJson(PARTS, all);
    if (value.photo && old?.photo && old.photo !== value.photo) await removePhoto(old.photo);
    return next;
  });
}

export const PHOTO_NAME = /^[0-9a-f-]{36}\.(jpg|png|webp|gif)$/;
const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };
/** Vercel tar emot högst 4,5 MB per anrop, så fotona krymps i webbläsaren först. */
export const MAX_PHOTO_BYTES = 4 * 1024 * 1024;

/** Sparar ett uppladdat foto och returnerar filnamnet. */
export async function savePhoto(file: File): Promise<string> {
  const ext = EXT[file.type];
  if (!ext) throw new Error("Bara JPEG, PNG, WebP eller GIF.");
  if (file.size > MAX_PHOTO_BYTES) throw new Error("Fotot är större än 4 MB.");
  const name = `${randomUUID()}.${ext}`;
  await backend.writeBinary(photoKey(name), new Uint8Array(await file.arrayBuffer()), file.type);
  return name;
}

export async function readPhoto(name: string) {
  if (!PHOTO_NAME.test(name)) return null;
  return backend.readBinary(photoKey(name));
}

async function removePhoto(name: string) {
  if (!PHOTO_NAME.test(name)) return;
  await backend.remove(photoKey(name)).catch(() => {});
}

/** Behåller bara giltiga fotonamn från klienten. */
export const cleanPhotoNames = (v: unknown) =>
  (Array.isArray(v) ? v : []).filter((n): n is string => typeof n === "string" && PHOTO_NAME.test(n)).slice(0, 8);
