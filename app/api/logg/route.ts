import { NextResponse } from "next/server";
import { addLog, cleanPhotoNames, getLog } from "@/lib/store";
import { CATEGORIES } from "@/lib/parts";
import { isAuthed, unauthorized } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!(await isAuthed(req))) return unauthorized();
  const list = await getLog();
  list.sort((a, b) => (b.date || "").localeCompare(a.date || "") || b.createdAt - a.createdAt);
  return NextResponse.json(list);
}

/** Tar emot JSON. Fotona laddas upp var för sig via /api/foto först. */
export async function POST(req: Request) {
  if (!(await isAuthed(req))) return unauthorized();
  try {
    const b = await req.json();
    const title = String(b.title ?? "").trim().slice(0, 120);
    if (!title) return NextResponse.json({ error: "Rubrik saknas." }, { status: 400 });
    const cat = String(b.cat ?? "");
    const date = String(b.date ?? "");
    const entry = await addLog({
      title,
      text: String(b.text ?? "").slice(0, 8000),
      cat: CATEGORIES.includes(cat) ? cat : "Övrigt",
      date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10),
      photos: cleanPhotoNames(b.photos),
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Kunde inte spara." }, { status: 400 });
  }
}
