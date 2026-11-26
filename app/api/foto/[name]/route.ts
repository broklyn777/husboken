import { readPhoto } from "@/lib/store";
import { isAuthed, unauthorized } from "@/lib/auth";

export async function GET(req: Request, ctx: { params: Promise<{ name: string }> }) {
  if (!(await isAuthed(req))) return unauthorized();
  const { name } = await ctx.params;
  const photo = await readPhoto(name);
  if (!photo) return new Response("Hittades inte", { status: 404 });
  return new Response(photo.body as BodyInit, {
    headers: { "Content-Type": photo.type, "Cache-Control": "private, max-age=31536000, immutable" },
  });
}
