"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function LoginForm() {
  const params = useSearchParams();
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const till = params.get("till");
  const dest = till && /^\/[a-z0-9/-]*$/.test(till) ? till : "/logg";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setStatus("Kontrollerar…");
    const losenord = String(new FormData(e.currentTarget).get("losenord") ?? "");
    const r = await fetch("/api/logga-in", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ losenord }) });
    if (r.ok) {
      location.href = dest;
      return;
    }
    setStatus("Fel lösenord. Försök igen.");
    setBusy(false);
  }

  return (
    <form className="form" onSubmit={submit} style={{ maxWidth: 420 }}>
      <label className="f">
        Familjelösenord
        <input id="losenord" name="losenord" type="password" autoComplete="current-password" required autoFocus />
      </label>
      <div className="row" style={{ alignItems: "center" }}>
        <div style={{ flex: "0 0 auto" }}><button type="submit" disabled={busy}>Logga in</button></div>
        <span className="status" aria-live="polite">{status}</span>
      </div>
    </form>
  );
}
