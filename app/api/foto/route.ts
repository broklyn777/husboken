import { NextResponse } from "next/server";
import { savePhoto } from "@/lib/store";
import { isAuthed, unauthorized } from "@/lib/auth";

/** Laddar upp ett foto i taget (Vercel tar emot högst 4,5 MB per anrop). */
export async function POST(req: Request) {
  if (!(await isAuthed(req))) return unauthorized();
  try {
    const form = await req.formData();
    const f = form.get("photo");
    if (!(f instanceof File) || f.size === 0) return NextResponse.json({ error: "Inget foto." }, { status: 400 });
    return NextResponse.json({ name: await savePhoto(f) }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Kunde inte spara fotot." }, { status: 400 });
  }
}
