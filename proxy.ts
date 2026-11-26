import { NextResponse, type NextRequest } from "next/server";
import { isAuthed } from "@/lib/auth";

/** Skickar den som inte är inloggad till inloggningen. API-anropen kontrollerar också själva. */
export async function proxy(req: NextRequest) {
  if (await isAuthed(req)) return NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Logga in med familjelösenordet först." }, { status: 401 });
  }
  const url = new URL("/logga-in", req.url);
  url.searchParams.set("till", req.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/logg", "/api/logg/:path*", "/api/delar/:path*", "/api/foto/:path*"],
};
