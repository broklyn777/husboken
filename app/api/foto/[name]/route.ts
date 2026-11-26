import fs from "node:fs/promises";
import path from "node:path";
import { PHOTO_NAME, UPLOAD_DIR } from "@/lib/store";

const TYPES: Record<string, string> = { jpg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" };

export async function GET(_req: Request, ctx: { params: Promise<{ name: string }> }) {
  const { name } = await ctx.params;
  if (!PHOTO_NAME.test(name)) return new Response("Hittades inte", { status: 404 });
  try {
    const buf = await fs.readFile(path.join(UPLOAD_DIR, name));
    return new Response(new Uint8Array(buf), {
      headers: { "Content-Type": TYPES[name.split(".").pop()!], "Cache-Control": "public, max-age=31536000, immutable" },
    });
  } catch {
    return new Response("Hittades inte", { status: 404 });
  }
}
