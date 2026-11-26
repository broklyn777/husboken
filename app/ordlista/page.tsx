import type { Metadata } from "next";
import { CATEGORIES, TERMS, storeLinks, videoLink, type Term } from "@/lib/ordlista";

export const metadata: Metadata = { title: "Ordlista och verktyg" };

export default function Page() {
  return (
    <>
      <div className="stack">
        <h2>Ordlista och verktyg</h2>
        <p className="lede">
          Vad orden i guiderna betyder, hur sakerna ser ut och var man köper dem. Länkarna till butikerna öppnar deras sökning,
          så du kan jämföra pris och se bilder.
        </p>
      </div>
      <nav className="toc" aria-label="Kategorier">
        {CATEGORIES.map((c) => (
          <div key={c}>
            <b>{c}</b>
            <ul>
              {TERMS.filter((t) => t.cat === c).map((t) => (
                <li key={t.id}><a href={`#${t.id}`}>{t.term}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      {CATEGORIES.map((c) => (
        <div className="stack" key={c}>
          <h3 className="cat-h">{c}</h3>
          {TERMS.filter((t) => t.cat === c).map((t) => <TermCard key={t.id} t={t} />)}
        </div>
      ))}
    </>
  );
}

function TermCard({ t }: { t: Term }) {
  return (
    <article className={`term-card${t.img ? " has-img" : ""}`} id={t.id}>
      <div className="term-body">
        <h4>{t.term}</h4>
        {t.aka && <p className="aka">Kallas också: {t.aka}</p>}
        {t.what.map((p, i) => <p key={i}>{p}</p>)}
        {t.look && <p><b>Så känner du igen den:</b> {t.look}</p>}
        {t.price && <p><b>Ungefärligt pris:</b> <span className="mono">{t.price}</span></p>}
        {t.tip && <div className="callout"><span className="lbl">Tips</span><p>{t.tip}</p></div>}
        {(t.search || t.video) && (
          <div className="links">
            {t.search && storeLinks(t.search).map((s) => (
              <a key={s.name} className="linkbtn" href={s.href} target="_blank" rel="noopener">{s.name} ↗</a>
            ))}
            {t.video && <a className="linkbtn video" href={videoLink(t.video)} target="_blank" rel="noopener">Instruktionsfilmer ↗</a>}
          </div>
        )}
      </div>
      {t.img && (
        <figure>
          <img src={`/img/verktyg/${t.img.src}`} alt={t.img.alt} loading="lazy" />
          <figcaption><span className="src">Foto: {t.img.credit}</span></figcaption>
        </figure>
      )}
    </article>
  );
}
