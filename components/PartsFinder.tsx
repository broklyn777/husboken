"use client";
import { useEffect, useState } from "react";
import { PARTS, type Part } from "@/lib/parts";
import { photoUrl, shrinkPhoto } from "@/lib/photo";

type Saved = Record<string, { note: string; photo?: string }>;

export function PartsFinder() {
  const [saved, setSaved] = useState<Saved | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/delar")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setSaved)
      .catch(() => setError("Kunde inte läsa era sparade foton. Är servern igång?"));
  }, []);

  return (
    <div className="stack">
      {error && <p className="status">{error}</p>}
      {!saved && !error && <p className="status">Laddar era foton…</p>}
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

  async function send(fd: FormData, msg: string) {
    setBusy(true);
    setStatus(msg);
    try {
      const r = await fetch(`/api/delar/${part.key}`, { method: "POST", body: fd });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      onSaved(j);
      setStatus("Sparat");
    } catch (e) {
      setStatus(e instanceof Error && e.message ? e.message : "Kunde inte spara. Försök igen.");
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
            const fd = new FormData();
            fd.append("photo", await shrinkPhoto(f), "foto.jpg");
            fd.append("note", note);
            await send(fd, "Laddar upp…");
            e.target.value = "";
          }} />
        <textarea id={`note-${part.key}`} aria-label={`Var sitter ${part.name} hos oss?`} placeholder="Var sitter den hos oss?"
          value={note} onChange={(e) => setNote(e.target.value)} disabled={!ready} />
        <div className="row" style={{ alignItems: "center" }}>
          <div style={{ flex: "0 0 auto" }}>
            <button className="ghost small" type="button" disabled={!ready || busy || note === (saved?.note ?? "")}
              onClick={() => { const fd = new FormData(); fd.append("note", note); send(fd, "Sparar…"); }}>Spara text</button>
          </div>
          <span className="status">{status}</span>
        </div>
      </div>
    </div>
  );
}
