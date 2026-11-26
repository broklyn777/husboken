import fs from "node:fs/promises";
import path from "node:path";
import { del, get, put } from "@vercel/blob";

/**
 * Var loggen och fotona sparas.
 * - På Vercel (när BLOB_READ_WRITE_TOKEN finns): i Vercel Blob.
 * - Annars: som filer i mappen data/ på datorn.
 */
export type Backend = {
  readText(key: string): Promise<string | null>;
  writeText(key: string, text: string): Promise<void>;
  readBinary(key: string): Promise<{ body: ReadableStream<Uint8Array> | Uint8Array; type: string } | null>;
  writeBinary(key: string, data: Uint8Array, type: string): Promise<void>;
  remove(key: string): Promise<void>;
};

const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
const access = (process.env.BLOB_ACCESS === "public" ? "public" : "private") as "public" | "private";

const blobBackend: Backend = {
  async readText(key) {
    const res = await get(key, { access, useCache: false });
    if (!res || res.statusCode !== 200) return null;
    return await new Response(res.stream).text();
  },
  async writeText(key, text) {
    await put(key, text, { access, contentType: "application/json", addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60 });
  },
  async readBinary(key) {
    const res = await get(key, { access });
    if (!res || res.statusCode !== 200) return null;
    return { body: res.stream, type: res.blob.contentType };
  },
  async writeBinary(key, data, type) {
    await put(key, Buffer.from(data), { access, contentType: type, addRandomSuffix: false });
  },
  async remove(key) {
    await del(key);
  },
};

const DATA_DIR = process.env.HUSBOKEN_DATA ?? path.join(process.cwd(), "data");
const file = (key: string) => path.join(DATA_DIR, ...key.split("/"));

const fileBackend: Backend = {
  async readText(key) {
    try {
      return await fs.readFile(file(key), "utf8");
    } catch {
      return null;
    }
  },
  async writeText(key, text) {
    const f = file(key);
    await fs.mkdir(path.dirname(f), { recursive: true });
    const tmp = `${f}.${Date.now()}.tmp`;
    await fs.writeFile(tmp, text);
    await fs.rename(tmp, f);
  },
  async readBinary(key) {
    try {
      const buf = await fs.readFile(file(key));
      const ext = key.split(".").pop() ?? "";
      const type = { jpg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" }[ext] ?? "application/octet-stream";
      return { body: new Uint8Array(buf), type };
    } catch {
      return null;
    }
  },
  async writeBinary(key, data) {
    const f = file(key);
    await fs.mkdir(path.dirname(f), { recursive: true });
    await fs.writeFile(f, data);
  },
  async remove(key) {
    await fs.rm(file(key), { force: true });
  },
};

export const backend: Backend = useBlob ? blobBackend : fileBackend;
export const storageName = useBlob ? "Vercel Blob" : "filer i data/";
