import { NextResponse } from "next/server";
import { addLog, getLog, savePhoto } from "@/lib/store";
import { CATEGORIES } from "@/lib/parts";

export const dynamic = "force-dynamic";

export async function GET() {
  const list = await getLog();
  list.sort((a, b) => (b.date || "").localeCompare(a.date || "") || b.createdAt - a.createdAt);
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const title = String(form.get("title") ?? "").trim().slice(0, 120);
    if (!title) return NextResponse.json({ error: "Rubrik saknas." }, { status: 400 });
    const cat = String(form.get("cat") ?? "");
    const date = String(form.get("date") ?? "");
    const files = form.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0).slice(0, 8);
    const photos: string[] = [];
    for (const f of files) photos.push(await savePhoto(f));
    const entry = await addLog({
      title,
      text: String(form.get("text") ?? "").slice(0, 8000),
      cat: CATEGORIES.includes(cat) ? cat : "Övrigt",
      date: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : new Date().toISOString().slice(0, 10),
      photos,
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Kunde inte spara." }, { status: 400 });
  }
}
