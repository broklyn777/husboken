import { NextResponse } from "next/server";
import { savePhoto, setPart } from "@/lib/store";
import { PART_KEYS } from "@/lib/parts";

export async function POST(req: Request, ctx: { params: Promise<{ key: string }> }) {
  const { key } = await ctx.params;
  if (!PART_KEYS.has(key)) return NextResponse.json({ error: "Okänd del." }, { status: 404 });
  try {
    const form = await req.formData();
    const update: { note?: string; photo?: string } = {};
    const note = form.get("note");
    if (typeof note === "string") update.note = note.slice(0, 2000);
    const photo = form.get("photo");
    if (photo instanceof File && photo.size > 0) update.photo = await savePhoto(photo);
    return NextResponse.json(await setPart(key, update));
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Kunde inte spara." }, { status: 400 });
  }
}
