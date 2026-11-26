import { COOKIE, authEnabled, checkPassword, sessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const given = typeof body?.losenord === "string" ? body.losenord : "";
  if (!(await checkPassword(given))) {
    await new Promise((r) => setTimeout(r, 800)); // gör det långsamt att gissa
    return Response.json({ error: "Fel lösenord." }, { status: 401 });
  }
  const headers = new Headers();
  if (authEnabled()) {
    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    headers.append("Set-Cookie", `${COOKIE}=${await sessionToken()}; Path=/; HttpOnly; SameSite=Lax; Max-Age=31536000${secure}`);
  }
  return Response.json({ ok: true }, { headers });
}
