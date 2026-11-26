import { NextResponse } from "next/server";
import { deleteLog } from "@/lib/store";

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const ok = await deleteLog(id);
  return ok ? new NextResponse(null, { status: 204 }) : NextResponse.json({ error: "Hittades inte." }, { status: 404 });
}
