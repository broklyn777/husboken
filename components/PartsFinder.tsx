"use client";
import { useEffect, useState } from "react";
import { PARTS, type Part } from "@/lib/parts";
import Link from "next/link";
import { NotLoggedIn, photoUrl, postJson, uploadPhoto } from "@/lib/photo";

type Saved = Record<string, { note: string; photo?: string }>;

export function PartsFinder() {
  const [saved, setSaved] = useState<Saved | null>(null);
  const [error, setError] = useState("");
  const [needLogin, setNeedLogin] = useState(false);

  useEffect(() => {
    fetch("/api/delar")
      .then((r) => {
        if (r.status === 401) { setNeedLogin(true); return null; }
        return r.ok ? r.json() : Promise.reject();
      })
      .then((j) => j && setSaved(j))
      .catch(() => setError("Kunde inte läsa era sparade foton. Försök igen om en stund."));
  }, []);

  return (
    <div className="stack">
      {needLogin && (
        <div className="callout"><span className="lbl">Bara för familjen</span>
          <p>Era egna foton och anteckningar syns när du har loggat in. <Link href="/logga-in?till=/varme">Logga in</Link></p></div>
      )}
      {error && <p className="status">{error}</p>}
      {!saved && !error && !needLogin && <p className="status">Laddar era foton…</p>}
      {PARTS.map((p) => (
        <PartCard key={p.key} part={p} saved={saved?.[p.key]} ready={!!saved}
          onSaved={(v) => setSaved((s) => ({ ...(s ?? {}), [p.key]: v }))} />
      ))}
    </div>
  );
}

function PartCard({ part, saved, ready, onSaved }: {
  part: Part; saved?: { note: string; photo?: string }; ready: boolean; onSaved: (v: { note: string; photo?: string }) => void;
}) {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (saved) setNote(saved.note ?? ""); }, [saved?.note]); // eslint-disable-line react-hooks/exhaustive-deps

  async function send(make: () => Promise<{ note?: string; photo?: string }>, msg: string) {
    setBusy(true);
    setStatus(msg);
    try {
      onSaved(await postJson(`/api/delar/${part.key}`, await make()));
      setStatus("Sparat");
    } catch (e) {
      setStatus(e instanceof NotLoggedIn ? "Logga in först." : e instanceof Error && e.message ? e.message : "Kunde inte spara. Försök igen.");
    }
    setBusy(false);
  }

  return (
    <div className="part">
      <div>
        <h4>{part.name}</h4>
        <p>{part.what}</p>
        <p className="look">Leta efter: {part.look}</p>
      </div>
      <div className="mine">
        {saved?.photo ? (
          <a href={photoUrl(saved.photo)} target="_blank" rel="noopener"><img src={photoUrl(saved.photo)} alt={`Vårt foto: ${part.name}`} /></a>
        ) : (
          <div className="ph">Inget foto än</div>
        )}
        <label className="status" htmlFor={`file-${part.key}`}>{saved?.photo ? "Byt foto:" : "Fota er:"}</label>
        <input id={`file-${part.key}`} type="file" accept="image/*" disabled={!ready || busy}
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            await send(async () => ({ note, photo: await uploadPhoto(f) }), "Laddar upp…");
            e.target.value = "";
          }} />
        <textarea id={`note-${part.key}`} aria-label={`Var sitter ${part.name} hos oss?`} placeholder="Var sitter den hos oss?"
          value={note} onChange={(e) => setNote(e.target.value)} disabled={!ready} />
        <div className="row" style={{ alignItems: "center" }}>
          <div style={{ flex: "0 0 auto" }}>
            <button className="ghost small" type="button" disabled={!ready || busy || note === (saved?.note ?? "")}
              onClick={() => send(async () => ({ note }), "Sparar…")}>Spara text</button>
          </div>
          <span className="status">{status}</span>
        </div>
      </div>
    </div>
  );
}
