import { NextResponse } from "next/server";
import { deleteLog } from "@/lib/store";
import { isAuthed, unauthorized } from "@/lib/auth";

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed(req))) return unauthorized();
  const { id } = await ctx.params;
  const ok = await deleteLog(id);
  return ok ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "Hittades inte." }, { status: 404 });
}
