import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const DATA_DIR = process.env.HUSBOKEN_DATA ?? path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "foton");
const LOG_FILE = path.join(DATA_DIR, "logg.json");
const PARTS_FILE = path.join(DATA_DIR, "delar.json");

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

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}
async function writeJson(file: string, value: unknown) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  const tmp = `${file}.${randomUUID()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(value, null, 2));
  await fs.rename(tmp, file);
}

// En skrivning i taget, så att två samtidiga sparningar inte skriver över varandra.
let queue: Promise<unknown> = Promise.resolve();
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const next = queue.then(fn, fn);
  queue = next.catch(() => {});
  return next;
}

export const getLog = () => readJson<LogEntry[]>(LOG_FILE, []);
export const getParts = () => readJson<Record<string, PartNote>>(PARTS_FILE, {});

export function addLog(entry: Omit<LogEntry, "id" | "createdAt">) {
  return serial(async () => {
    const list = await getLog();
    const full: LogEntry = { ...entry, id: randomUUID(), createdAt: Date.now() };
    list.push(full);
    await writeJson(LOG_FILE, list);
    return full;
  });
}

export function deleteLog(id: string) {
  return serial(async () => {
    const list = await getLog();
    const hit = list.find((e) => e.id === id);
    if (!hit) return false;
    await writeJson(LOG_FILE, list.filter((e) => e.id !== id));
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
    await writeJson(PARTS_FILE, all);
    if (value.photo && old?.photo && old.photo !== value.photo) await removePhoto(old.photo);
    return next;
  });
}

export const PHOTO_NAME = /^[0-9a-f-]{36}\.(jpg|png|webp|gif)$/;
const EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/gif": "gif" };
export const MAX_PHOTO_BYTES = 15 * 1024 * 1024;

/** Sparar ett uppladdat foto och returnerar filnamnet. */
export async function savePhoto(file: File): Promise<string> {
  const ext = EXT[file.type];
  if (!ext) throw new Error("Bara JPEG, PNG, WebP eller GIF.");
  if (file.size > MAX_PHOTO_BYTES) throw new Error("Fotot är större än 15 MB.");
  const name = `${randomUUID()}.${ext}`;
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return name;
}

async function removePhoto(name: string) {
  if (!PHOTO_NAME.test(name)) return;
  await fs.rm(path.join(UPLOAD_DIR, name), { force: true });
}
