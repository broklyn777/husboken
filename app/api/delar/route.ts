import { NextResponse } from "next/server";
import { getParts } from "@/lib/store";
import { isAuthed, unauthorized } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!(await isAuthed(req))) return unauthorized();
  return NextResponse.json(await getParts());
}
