# Husboken

Vår informationscentral för huset från 1957: värmesystemet, vedpannan (Baxi Bonus Light), gör-det-själv-guider, underhåll och en egen logg med foton.

## Starta

```bash
npm install
npm run dev
```

Öppna http://localhost:3000. För att andra i familjen ska nå den från mobilen på samma wifi: `npm run build && npm start -- -H 0.0.0.0`, och öppna datorns IP-adress med `:3000`.

## Var saker finns

- `content/*.html` – texterna på sidorna Start, Värmesystemet, Vedpannan, Gör-det-själv och Underhåll. Redigera direkt.
- `lib/parts.ts` – listan "Hitta delarna i källaren" och loggens kategorier.
- `data/` – loggen (`logg.json`), anteckningar om delarna (`delar.json`) och era foton (`foton/`). Skapas första gången ni sparar. Säkerhetskopiera den här mappen.
- `public/img/` – referensfoton från Wikimedia Commons (fotograf och licens står under varje bild).

## Ska den ligga på internet?

Loggen sparas som filer på datorn som kör appen. På Vercel och liknande försvinner sådana filer, så då behöver `lib/store.ts` bytas mot en databas och fillagring (t.ex. Vercel Blob eller Supabase). Sidan har ingen inloggning, så lägg den inte publikt utan att lägga till det.
