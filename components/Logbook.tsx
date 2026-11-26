"use client";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES } from "@/lib/parts";
import { NotLoggedIn, photoUrl, postJson, uploadPhoto } from "@/lib/photo";
import type { LogEntry } from "@/lib/store";

const today = () => new Date().toISOString().slice(0, 10);

export function Logbook() {
  const [entries, setEntries] = useState<LogEntry[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [filter, setFilter] = useState("Alla");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [date, setDate] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function load() {
    try {
      const r = await fetch("/api/logg", { cache: "no-store" });
      if (r.status === 401) { location.href = "/logga-in?till=/logg"; return; }
      if (!r.ok) throw new Error();
      setEntries(await r.json());
    } catch {
      setLoadError(true);
    }
  }
  useEffect(() => { setDate(today()); load(); }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = new FormData(form);
    const body: Record<string, unknown> = {};
    for (const k of ["title", "date", "cat", "text"]) body[k] = String(raw.get(k) ?? "");
    const files = (raw.getAll("photos") as File[]).filter((f) => f.size > 0).slice(0, 8);
    setBusy(true);
    try {
      const photos: string[] = [];
      for (let i = 0; i < files.length; i++) {
        setStatus(`Laddar upp foto ${i + 1} av ${files.length}…`);
        photos.push(await uploadPhoto(files[i]));
      }
      setStatus("Sparar…");
      await postJson("/api/logg", { ...body, photos });
      form.reset();
      setDate(today());
      setStatus("Sparat i loggen.");
      await load();
    } catch (err) {
      if (err instanceof NotLoggedIn) location.href = "/logga-in?till=/logg";
      else setStatus(err instanceof Error && err.message ? err.message : "Kunde inte spara. Försök igen.");
    }
    setBusy(false);
  }

  async function logout() {
    await fetch("/api/logga-ut", { method: "POST" });
    location.href = "/";
  }

  const shown = (entries ?? []).filter((e) => filter === "Alla" || e.cat === filter);

  return (
    <>
      <form className="form" ref={formRef} onSubmit={submit} autoComplete="off">
        <div className="row">
          <label className="f">Rubrik<input id="lg-title" name="title" required maxLength={120} placeholder="T.ex. Bytte packning i köksblandaren" /></label>
          <label className="f" style={{ flex: "0 1 170px" }}>Datum<input id="lg-date" name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
        </div>
        <div className="row">
          <label className="f">Kategori<select id="lg-cat" name="cat">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></label>
          <label className="f">Foton<input id="lg-files" name="photos" type="file" accept="image/*" multiple /></label>
        </div>
        <label className="f">Vad gjorde du / vad lärde du dig?
          <textarea id="lg-text" name="text" maxLength={8000} placeholder="Delar, mått, var du köpte saker, vad som var svårt, vad du skulle göra annorlunda." />
        </label>
        <div className="row" style={{ alignItems: "center" }}>
          <div style={{ flex: "0 0 auto" }}><button type="submit" disabled={busy}>Spara i loggen</button></div>
          <span className="status" style={{ flex: "3 1 200px" }} aria-live="polite">{status}</span>
          <div style={{ flex: "0 0 auto" }}><button type="button" className="ghost small" onClick={logout}>Logga ut</button></div>
        </div>
      </form>

      <div className="filterbar">
        {["Alla", ...CATEGORIES].map((c) => (
          <button key={c} type="button" aria-pressed={c === filter} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      <div className="stack">
        {loadError && <div className="empty">Kunde inte läsa loggen. Försök igen om en stund.</div>}
        {!entries && !loadError && <div className="empty">Loggen laddas…</div>}
        {entries && shown.length === 0 && (
          <div className="empty">Inga anteckningar här än. Skriv den första ovanför, till exempel vad manometern visar idag.</div>
        )}
        {shown.map((e) => <Entry key={e.id} e={e} onDeleted={load} />)}
      </div>
    </>
  );
}

function Entry({ e, onDeleted }: { e: LogEntry; onDeleted: () => void }) {
  const [armed, setArmed] = useState(false);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);

  async function del() {
    if (!armed) return setArmed(true);
    const r = await fetch(`/api/logg/${e.id}`, { method: "DELETE" });
    if (r.ok) onDeleted();
    else setMsg("Gick inte att ta bort.");
  }

  return (
    <article className="entry">
      <div className="meta">
        <span className="mono">{e.date}</span>
        <span className="chip">{e.cat}</span>
        <button className="ghost small" type="button" onClick={del}>{armed ? "Klicka igen för att ta bort" : "Ta bort"}</button>
        {msg && <span>{msg}</span>}
      </div>
      <h4>{e.title}</h4>
      {e.text && <p className="txt">{e.text}</p>}
      {e.photos.length > 0 && (
        <div className="thumbs">
          {e.photos.map((p) => (
            <a key={p} href={photoUrl(p)} target="_blank" rel="noopener"><img src={photoUrl(p)} alt={`Foto till: ${e.title}`} loading="lazy" /></a>
          ))}
        </div>
      )}
    </article>
  );
}
