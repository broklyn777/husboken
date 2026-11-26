import type { Metadata } from "next";
import { Logbook } from "@/components/Logbook";
export const metadata: Metadata = { title: "Vår logg" };
export default function Page() {
  return (
    <>
      <div className="stack">
        <h2>Vår logg</h2>
        <p className="lede">
          Skriv ner vad ni gör och vad ni lär er: vilket filter som passade, vad sotaren sa, vilket tryck pannan brukar ha. Lägg
          till foton.
        </p>
      </div>
      <Logbook />
    </>
  );
}
