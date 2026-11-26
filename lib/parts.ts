export type Part = { key: string; name: string; what: string; look: string };

export const PARTS: Part[] = [
  { key: "huvudkran", name: "Huvudkran för vatten", what: "Stänger av allt inkommande vatten. Den viktigaste kranen i huset.", look: "Där vattenröret kommer in i källaren, ofta vid vattenmätaren (en liten mätare med siffror). Ett vred eller en ratt." },
  { key: "elcentral", name: "Elcentral och jordfelsbrytare", what: "Huvudbrytare, säkringar och jordfelsbrytaren som slår av strömmen vid fel.", look: "Ett skåp i källaren eller hallen. Jordfelsbrytaren har en testknapp märkt T." },
  { key: "panna", name: "Vedpannan (Baxi Bonus Light)", what: "Värmer vattnet. Den har ingen elpatron i sig själv, den laddar tanken.", look: "Det stora i pannrummet med luckor fram, en fläkt upptill och rökrör in i skorstenen. Märkskylten berättar årsmodell." },
  { key: "manometer", name: "Manometer (tryckmätare)", what: "Visar trycket i värmesystemet i bar. Det viktigaste att titta på.", look: "En rund mätare på pannan eller på ett rör nära den. Visar 0–4 eller 0–6 bar, ofta med röd visare för max." },
  { key: "expansion", name: "Expansionskärl", what: "Tar upp vattnet när det utvidgas av värmen.", look: "Slutet system: en röd eller vit 'gasolflaska' på väggen eller pannan. Öppet system: en tank högst upp på vinden." },
  { key: "sakerhetsventil", name: "Säkerhetsventil", what: "Släpper ut vatten om trycket blir för högt (ofta 1,5 eller 2,5 bar).", look: "En liten mässingsventil med vred eller ratt, nära pannan, med ett rör som leder ner mot golvbrunnen." },
  { key: "tank", name: "Ackumulatortank", what: "Stor tank som lagrar värmen från elden. Bonus Light kräver en, minst 1000 liter. Här sitter troligen också elpatronen och varmvattnet.", look: "En stor isolerad cylinder, ofta lika hög som en människa, med många rör och termometrar på olika höjder." },
  { key: "laddautomatik", name: "Laddautomatik / laddpump", what: "Pumpar vatten från pannan till tanken och ser till att pannan inte får för kallt vatten tillbaka.", look: "En pump med en ventil intill på rören mellan pannan och tanken, ibland ihopbyggt i ett isolerat block (t.ex. Termovar eller Laddomat)." },
  { key: "shunt", name: "Shuntventil", what: "Blandar varmt och svalt vatten så att elementen får rätt temperatur.", look: "En ventil med ett vred eller en motor med siffror (t.ex. 0–10), på framledningen ut mot huset." },
  { key: "pump", name: "Cirkulationspump", what: "Pumpar runt vattnet till elementen.", look: "En liten motor på ett rör, ofta med märket Grundfos eller Wilo. Den surrar lite när den går." },
  { key: "varmvatten", name: "Varmvatten", what: "Hur kranvattnet värms upp: i tanken eller i en egen varmvattenberedare.", look: "Leta efter röret märkt VV eller ett kallvattenrör (KV) som går in i tanken." },
  { key: "fyllning", name: "Påfyllningskran", what: "Kranen där man fyller på vatten i värmesystemet när trycket är lågt.", look: "En kran mellan kallvattnet och värmesystemet, ofta nära pannan, ibland med en slang." },
  { key: "golvbrunn", name: "Golvbrunn i källaren", what: "Tar hand om vatten från säkerhetsventil och tvättmaskin.", look: "I golvet i pann- eller tvättrummet." },
];

export const PART_KEYS = new Set(PARTS.map((p) => p.key));

export const CATEGORIES = ["Värme & panna", "VVS & kranar", "El", "Källare", "Tak & fasad", "Trädgård", "Övrigt"];
