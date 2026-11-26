import type { Metadata } from "next";
import { Content } from "@/lib/content";
import { PartsFinder } from "@/components/PartsFinder";
export const metadata: Metadata = { title: "Värmesystemet" };
export default function Page() {
  return (
    <>
      <Content name="varme" />
      <div className="stack" id="delar">
        <h3>Hitta delarna i källaren</h3>
        <p className="prose">
          Gå ner med ficklampa och mobil. Leta upp en del i taget, fota den och skriv en rad om var den sitter. Bilderna sparas
          här så att hela familjen ser dem.
        </p>
        <PartsFinder />
      </div>
    </>
  );
}
