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
- `data/` – loggen (`logg.json`), anteckningar om delarna (`delar.json`) och era foton (`foton/`) när appen körs hemma. Skapas första gången ni sparar.
- `public/img/` – referensfoton från Wikimedia Commons (fotograf och licens står under varje bild).

## Lägga upp på Vercel

Läsdelarna (guiderna, pannan, ordlistan) är öppna för alla. Loggen och "Hitta delarna" kräver familjelösenordet.

1. Logga in på [vercel.com](https://vercel.com) med ditt GitHub-konto.
2. **Add New → Project**, välj arkivet `husboken` och tryck **Deploy**. Inga inställningar behöver ändras.
3. I projektet: **Storage → Create → Blob**. Välj **Private** och koppla den till projektet. Då får appen `BLOB_READ_WRITE_TOKEN` automatiskt.
4. **Settings → Environment Variables**: lägg till `HUSBOKEN_LOSENORD` med det lösenord familjen ska använda. Välj ett långt, gärna fyra ord.
5. **Deployments → ⋯ → Redeploy**, så att appen läser in de nya inställningarna.

Varje gång du pushar till GitHub uppdateras sidan på Vercel av sig själv.

| Miljövariabel | Vad den gör |
| --- | --- |
| `HUSBOKEN_LOSENORD` | Familjelösenordet. Utan den är inloggningen avstängd (som hemma på datorn). Byts lösenordet loggas alla ut. |
| `BLOB_READ_WRITE_TOKEN` | Sätts av Vercel när Blob kopplas. Då sparas loggen och fotona i Blob i stället för i `data/`. |
| `BLOB_ACCESS` | Sätt till `public` bara om Blob-lagringen skapades som Public. Annars utelämnas den. |

Hemma på datorn sparas allt som förut i `data/`. Det som sparas på Vercel och det som sparas hemma är två separata loggar.
