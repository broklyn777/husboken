import { NextResponse } from "next/server";
import { PHOTO_NAME, setPart } from "@/lib/store";
import { PART_KEYS } from "@/lib/parts";
import { isAuthed, unauthorized } from "@/lib/auth";

/** Tar emot JSON {note?, photo?}. Fotot laddas upp via /api/foto först. */
export async function POST(req: Request, ctx: { params: Promise<{ key: string }> }) {
  if (!(await isAuthed(req))) return unauthorized();
  const { key } = await ctx.params;
  if (!PART_KEYS.has(key)) return NextResponse.json({ error: "Okänd del." }, { status: 404 });
  try {
    const b = await req.json();
    const update: { note?: string; photo?: string } = {};
    if (typeof b.note === "string") update.note = b.note.slice(0, 2000);
    if (typeof b.photo === "string" && PHOTO_NAME.test(b.photo)) update.photo = b.photo;
    return NextResponse.json(await setPart(key, update));
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Kunde inte spara." }, { status: 400 });
  }
}
