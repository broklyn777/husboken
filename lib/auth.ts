/**
 * Familjelösenord. Sätts i miljövariabeln HUSBOKEN_LOSENORD (i Vercel: Settings → Environment Variables).
 * Utan variabeln är inloggningen avstängd, som när appen körs hemma på datorn.
 * Fungerar både i proxy.ts och i route handlers (Web Crypto, inga Node-moduler).
 */
export const COOKIE = "husboken";
const password = () => process.env.HUSBOKEN_LOSENORD ?? "";
export const authEnabled = () => password().length > 0;

async function hmac(key: string, msg: string) {
  const k = await crypto.subtle.importKey("raw", new TextEncoder().encode(key), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(msg));
  return Array.from(new Uint8Array(sig), (b) => b.toString(16).padStart(2, "0")).join("");
}

function same(a: string, b: string) {
  if (a.length !== b.length) return false;
  let d = 0;
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}

/** Värdet i kakan. Byts automatiskt om lösenordet byts, så gamla inloggningar slutar gälla. */
export const sessionToken = () => hmac(password(), "husboken-inloggad-v1");

export async function checkPassword(given: string) {
  if (!authEnabled()) return true;
  return same(await hmac("jamfor", given), await hmac("jamfor", password()));
}

/** Sant om förfrågan får läsa och skriva loggen. */
export async function isAuthed(req: Request) {
  if (!authEnabled()) return true;
  const cookie = req.headers.get("cookie") ?? "";
  const m = cookie.match(/(?:^|;\s*)husboken=([0-9a-f]{64})/);
  return !!m && same(m[1], await sessionToken());
}

export const unauthorized = () =>
  Response.json({ error: "Logga in med familjelösenordet först." }, { status: 401 });
