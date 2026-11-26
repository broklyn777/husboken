export type Term = {
  id: string;
  term: string;
  /** Andra namn man kan stöta på i butiken. */
  aka?: string;
  cat: Category;
  /** Vad det är och varför man behöver det. Ett stycke per rad. */
  what: string[];
  /** Hur man känner igen det. */
  look?: string;
  /** Ungefärligt pris i butik, 2026. */
  price?: string;
  /** Råd från verkligheten. */
  tip?: string;
  /** Sökord i butikernas sökrutor. Utelämna för saker man inte köper. */
  search?: string;
  /** Sökord för instruktionsfilmer på YouTube. */
  video?: string;
  /** Foto i public/img/verktyg, med fotograf och licens. */
  img?: { src: string; alt: string; credit: string };
};

export const CATEGORIES = ["Verktyg", "VVS-delar", "Värmesystemet", "Vedpannan", "El", "Material"] as const;
export type Category = (typeof CATEGORIES)[number];

export const TERMS: Term[] = [
  // ---------------- Verktyg ----------------
  {
    id: "monteringsnyckel",
    term: "Monteringsnyckel för blandare",
    aka: "blandarnyckel, kranmutternyckel, monteringsverktyg för blandare",
    cat: "Verktyg",
    what: [
      "Ett specialverktyg för att lossa och dra åt muttrarna som håller fast en blandare underifrån. De sitter högst upp under handfatet, bakom porslinet, där en vanlig skiftnyckel inte får plats och man inte kan vrida.",
      "Det finns två vanliga typer. Den ena är ett långt rör (en lång hylsnyckel) med olika storlekar i ändarna, som du trär upp över blandarens pinnbult och vrider med en skruvmejsel eller ett stag genom hålet längst ner. Den andra har ett långt skaft med en vridbar käft upptill som griper om muttern (på engelska basin wrench). Den första passar de flesta moderna blandare med en pinnbult. Den andra är bra för gamla blandare med stora muttrar.",
      "Utan verktyget går det ofta ändå, men det tar mycket längre tid och man får ligga i obekväma ställningar och skrapa knogarna.",
    ],
    look: "Ett avlångt metallrör, ungefär 25–30 cm, med en sexkant eller en öppning i varje ände och ett hål tvärs igenom för ett vridstag. Eller ett långt skaft med en liten krokformad käft som kan vinklas.",
    price: "100–250 kr",
    tip: "Ta med en bild under handfatet till butiken och fråga vilken typ som passar. Många blandare har den hylsa som behövs med i kartongen, så kolla där först.",
    search: "monteringsnyckel blandare",
    video: "monteringsnyckel blandare byta blandare tvättställ",
    img: { src: "basin-wrench.jpg", alt: "Monteringsnyckel för blandare med långt skaft och vridbar käft", credit: "Lambtron, CC BY-SA 4.0" },
  },
  {
    id: "rortang",
    term: "Rörtång",
    aka: "polygriptång, vattenpumptång",
    cat: "Verktyg",
    what: [
      "En tång med ställbar öppning som greppar runda saker: rör, muttrar, kopplingar. Den viktigaste tången för VVS-jobb.",
      "Den svenska varianten kallas ofta polygriptång eller vattenpumptång och har en räfflad led så att du kan välja hur stort gapet ska vara. Den grova amerikanska varianten med en skruv för att ställa gapet är mest för gängade järnrör.",
    ],
    look: "En tång med långa handtag och käftar som sitter snett mot handtagen. En räfflad eller knapp-justerad led i mitten.",
    price: "150–400 kr",
    tip: "Köp två. Ofta måste du hålla emot med den ena medan du vrider med den andra, annars vrider du hela röret och skadar något längre bort. Lägg en trasa mellan tång och förkromade ytor så att de inte blir repiga.",
    search: "polygriptång",
    img: { src: "pipe-wrench.jpg", alt: "Rörtång av amerikansk modell med skruv för att ställa gapet", credit: "Jayess, public domain" },
  },
  {
    id: "skiftnyckel",
    term: "Skiftnyckel",
    cat: "Verktyg",
    what: [
      "En nyckel med ställbart gap, för sexkantiga muttrar. Bättre än rörtången på muttrar eftersom den greppar på de platta sidorna och inte biter sönder dem.",
    ],
    look: "En platt nyckel med en liten skruv i huvudet som ändrar gapet.",
    price: "100–300 kr",
    tip: "Ställ gapet så att det sitter tätt mot muttern, annars rundas hörnen. Vrid åt det håll där den fasta käften tar kraften.",
    search: "skiftnyckel",
    img: { src: "adjustable-spanner.jpg", alt: "Skiftnyckel", credit: "Batholith, public domain" },
  },
  {
    id: "rorkap",
    term: "Rörkap",
    aka: "rörskärare",
    cat: "Verktyg",
    what: [
      "Ett verktyg som kapar kopparrör rakt och utan spån. Du sätter den runt röret, skruvar in hjulet lite och vevar runt. Efter några varv skruvar du in lite till, tills röret går av.",
      "Med en bågfil blir snittet snett och det blir metallspån i röret, och då tätar kopplingen sämre.",
    ],
    look: "En liten C-formad ram med ett vasst trissehjul och en skruv att dra åt med.",
    price: "100–250 kr för en liten som klarar 6–22 mm",
    tip: "En mini-rörkap är bra i trånga utrymmen. Skruva in hjulet bara lite per varv, annars blir röret ovalt.",
    search: "rörkap",
    video: "kapa kopparrör rörkap",
    img: { src: "pipe-cutter.jpg", alt: "Rörkap runt ett kopparrör", credit: "Tomwsulcer, CC0" },
  },
  {
    id: "avgradare",
    term: "Avgradare",
    cat: "Verktyg",
    what: [
      "Ett litet verktyg som tar bort den vassa kanten (graden) inne i och utanpå röret efter kapning. Utan avgradning kan kanten skära i packningar och o-ringar, och det kan läcka.",
    ],
    look: "Penna- eller päronformad, med ett vridbart blad, eller en kon med skär. Många rörkapar har en avgradare inbyggd.",
    price: "50–150 kr",
    search: "avgradare rör",
  },
  {
    id: "skjutmatt",
    term: "Skjutmått",
    cat: "Verktyg",
    what: [
      "Ett mätverktyg för att mäta rörens ytterdiameter exakt. Du behöver veta om röret är 12, 15 eller 22 mm innan du köper kopplingar, och det går inte att se med blotta ögat.",
    ],
    look: "En linjal med en skjutbar käft. Digitala visar måttet direkt i en display.",
    price: "100–250 kr (digital)",
    search: "skjutmått digitalt",
  },
  {
    id: "luftningsnyckel",
    term: "Luftningsnyckel",
    aka: "elementnyckel",
    cat: "Verktyg",
    what: [
      "En liten nyckel med ett fyrkantigt hål som passar luftningsskruven på elementen. Med den släpper du ut luft som samlats högst upp i elementet.",
    ],
    look: "Liten, ofta i mässing, ungefär som en gammal urverksnyckel. Den fyrkantiga tappen på elementet är ungefär 5 mm.",
    price: "20–40 kr",
    tip: "Köp två och häng en vid pannan. Vissa nyare element har en skåra i skruven och går att lufta med en skruvmejsel.",
    search: "luftningsnyckel",
    video: "lufta element",
    img: { src: "bleed-screw.jpg", alt: "Luftningsnyckel i luftningsskruven på ett element", credit: "Noggo, CC0" },
  },
  {
    id: "slagborr",
    term: "Slagborrmaskin och betongborr",
    cat: "Verktyg",
    what: [
      "För att borra i betong och tegel, som i källarväggar, behöver borrmaskinen hamra samtidigt som den roterar. En vanlig skruvdragare räcker inte. Använd betongborr (med hårdmetallspets) i samma diameter som pluggen.",
      "Till hårda betongväggar är en borrhammare (SDS-borr) mycket lättare att jobba med. Den går att hyra på byggvaruhus.",
    ],
    price: "Slagborr 600–1500 kr, hyra borrhammare ca 200–300 kr/dag",
    search: "slagborrmaskin",
  },
  {
    id: "plugg",
    term: "Plugg",
    cat: "Material",
    what: [
      "En plasthylsa som du sätter i borrhålet. När skruven dras in vidgas pluggen och fastnar i väggen. Utan plugg håller en skruv inte i betong eller tegel.",
      "Välj plugg efter vägg: vanlig universalplugg för betong och massivt tegel, särskild plugg för håltegel och gipsskivor. Bänkar och tunga saker behöver grövre plugg, till exempel 8 eller 10 mm.",
    ],
    search: "universalplugg",
  },
  {
    id: "vattenpass",
    term: "Vattenpass",
    cat: "Verktyg",
    what: ["Visar om något är vågrätt eller lodrätt. Bubblan ska stå mitt mellan strecken."],
    price: "100–300 kr",
    search: "vattenpass",
  },
  {
    id: "fogpistol",
    term: "Fogpistol",
    cat: "Verktyg",
    what: [
      "Håller en patron med silikon eller fogmassa och trycker ut den jämnt när du klämmer på handtaget.",
    ],
    tip: "Skär toppen på patronens munstycke snett, ungefär lika brett som fogen ska bli. Släpp trycket mellan strängarna, annars fortsätter det rinna.",
    price: "50–150 kr",
    search: "fogpistol",
    img: { src: "caulking-gun.jpg", alt: "Fogpistol med silikonpatron", credit: "Frank C. Müller, CC BY-SA 3.0" },
  },
  {
    id: "fuktmatare",
    term: "Fuktmätare för ved",
    cat: "Verktyg",
    what: [
      "En liten mätare med två spetsar som du trycker in i veden. Den visar fukthalten i procent. Bonus Light vill ha 15–20 %.",
      "Mät på ett nyklyvt vedträ, mitt i den färska ytan. Ytan utanpå är alltid torrare än insidan och ger för låga värden.",
    ],
    price: "150–400 kr",
    search: "fuktmätare ved",
  },

  // ---------------- VVS-delar ----------------
  {
    id: "avstangningsventil",
    term: "Avstängningsventil",
    aka: "kulventil, avstängning, isoleringsventil",
    cat: "VVS-delar",
    what: [
      "En liten kran som stänger av vattnet till en enda sak, till exempel en blandare eller en toalett, så att du inte behöver stänga av hela husets vatten.",
      "Under handfatet sitter det normalt en för varmt och en för kallt. Vissa har en ratt, andra en skåra som vrids med skruvmejsel: skåran längs med röret betyder öppen, tvärs över betyder stängd.",
    ],
    look: "En liten förkromad eller mässingsventil på röret som kommer ut ur väggen, med en ratt eller en skruvskåra, och en gänga där blandarens slang skruvas fast.",
    price: "100–300 kr styck",
    tip: "Vrid på dem en gång om året. Ventiler som stått orörda i många år kärvar och läcker ibland när man väl vrider. Har du en sådan, byt den när huvudkranen ändå är stängd.",
    search: "avstängningsventil blandare",
    img: { src: "isolating-valve.jpg", alt: "Avstängningsventil på kopparrör som vrids med skruvmejsel", credit: "Mike1024, public domain" },
  },
  {
    id: "flexslang",
    term: "Flexslang",
    aka: "anslutningsslang",
    cat: "VVS-delar",
    what: [
      "De böjliga slangarna mellan blandaren och avstängningsventilerna. De sitter oftast fast i blandaren när du köper den. Inuti är det en gummislang, utanpå ett flätat metallnät.",
    ],
    tip: "Vik dem aldrig skarpt. En slang som har ett veck kan spricka efter några år.",
  },
  {
    id: "ganga",
    term: "Gänga: 10 mm, 3/8\" och 1/2\"",
    cat: "VVS-delar",
    what: [
      "Gänga är spåret på skruvar och kopplingar. Två delar måste ha exakt samma gänga för att gå att skruva ihop.",
      "Blandarslangar i Sverige ansluts oftast med 10 mm klämring eller med 3/8\" (tre åttondels tum) gänga. Större kopplingar har ofta 1/2\". Tum-måttet är ett namn på gängtypen och inte rörets diameter, vilket är förvirrande även för proffs.",
    ],
    tip: "Ta med den gamla delen till butiken så kan de jämföra.",
  },
  {
    id: "pinnbult",
    term: "Pinnbult och hästskobricka",
    cat: "VVS-delar",
    what: [
      "Pinnbulten är en gängad stång som sticker ner från blandaren genom hålet i handfatet. På den trär man en hästskoformad metallbricka som spänner mot undersidan av porslinet, och sedan en mutter. När muttern dras åt sitter blandaren fast.",
    ],
  },
  {
    id: "bottenventil",
    term: "Bottenventil och dragstång",
    cat: "VVS-delar",
    what: [
      "Bottenventilen är avloppet i handfatets botten, med proppen. Dragstången är pinnen bakom blandaren som du drar upp för att stänga proppen. Bakom vattenlåset sitter en arm som kopplar ihop dem, fäst med en liten skruv.",
    ],
  },
  {
    id: "insats",
    term: "Insats (kassett)",
    aka: "keramisk insats, blandarinsats",
    cat: "VVS-delar",
    what: [
      "Hjärtat i en ettgreppsblandare: en plastdosa med två keramiska skivor inuti som glider mot varandra när du rör spaken, och på så sätt blandar varmt och kallt och stänger vattnet.",
      "När blandaren droppar eller blir trög är det nästan alltid insatsen som är sliten. Den går att byta utan att ta bort blandaren.",
    ],
    look: "En rund plastdosa, ofta 35 eller 40 mm i diameter, med en tapp upptill där spaken sitter.",
    price: "200–700 kr beroende på märke",
    tip: "Insatser är märkesspecifika. Ta med den gamla till en VVS-butik.",
    search: "blandarinsats",
    video: "byta insats blandare",
  },
  {
    id: "klamring",
    term: "Klämringskoppling",
    aka: "kompressionskoppling",
    cat: "VVS-delar",
    what: [
      "Ett sätt att skarva och ansluta kopparrör utan att löda. Kopplingen består av en mutter och en mjuk mässingsring (klämringen). När muttern dras åt pressas ringen in mot röret och tätar.",
      "Ordningen är viktig: först muttern på röret, sedan ringen, sedan in i kopplingen. Tryck in röret ända till botten innan du drar åt.",
    ],
    tip: "Dra åt med handen, sedan ungefär ett varv med nyckel medan du håller emot kopplingen med en annan nyckel. För hårt deformerar ringen och det läcker ändå. På PEX-plaströr behövs dessutom en stödhylsa inne i röret.",
    search: "klämringskoppling 15 mm",
    video: "klämringskoppling kopparrör",
  },
  {
    id: "t-ror",
    term: "T-rör",
    cat: "VVS-delar",
    what: [
      "En koppling formad som ett T, med tre anslutningar. Du sätter in den i ett befintligt rör för att få en avgrening, till exempel till en ny tvättbänk.",
    ],
    search: "t-rör klämring 15 mm",
  },
  {
    id: "vattenlas",
    term: "Vattenlås",
    cat: "VVS-delar",
    what: [
      "Den U-formade böjen under handfat och diskbänkar. Där blir det alltid stående lite vatten kvar, och det vattnet hindrar avloppslukt från att komma upp i rummet.",
      "Det är också där hår och smuts fastnar, så det är det första stället att rensa när det rinner trögt.",
    ],
    look: "En böj i vit plast eller förkromad metall under handfatet, ofta med plastmuttrar som går att skruva loss för hand.",
    price: "100–300 kr",
    search: "vattenlås 32 mm",
    img: { src: "p-trap.jpg", alt: "Vattenlås i mässing", credit: "Raquel Baranow, CC BY-SA 4.0" },
  },
  {
    id: "golvbrunn",
    term: "Golvbrunn",
    cat: "VVS-delar",
    what: [
      "Brunnen i golvet i tvättstuga, pannrum och badrum. Den har ett eget vattenlås under gallret. Om ingen häller vatten i den torkar vattenlåset ut och det börjar lukta avlopp.",
    ],
  },
  {
    id: "pp-ror",
    term: "PP-rör (avloppsrör)",
    cat: "Material",
    what: [
      "Gråa eller vita plaströr för avlopp inomhus. Rören trycks ihop med muffar som har en gummiring. Vanliga storlekar är 32, 40, 50, 75 och 110 mm.",
      "Smörj gummiringen med lite diskmedel så glider röret in lättare. Avloppsrör ska alltid luta mot avloppet.",
    ],
    search: "avloppsrör pp 40 mm",
  },
  {
    id: "cc160",
    term: "c/c 160 mm",
    cat: "VVS-delar",
    what: [
      "c/c betyder centrum till centrum, alltså avståndet mellan mitten av varmvattenanslutningen och mitten av kallvattenanslutningen. Väggblandare i Sverige har nästan alltid c/c 160 mm, så rören från väggen måste komma ut med just det avståndet.",
    ],
  },
  {
    id: "huvudkran",
    term: "Huvudkran (huvudavstängning)",
    cat: "VVS-delar",
    what: [
      "Ventilen som stänger av allt vatten som kommer in i huset. Den sitter nästan alltid nära vattenmätaren där vattenledningen kommer in, i ett hus som ert oftast i källaren.",
      "Alla i familjen bör veta var den sitter och kunna stänga den. Fota den under Värmesystemet → Hitta delarna.",
    ],
  },

  // ---------------- Värmesystemet ----------------
  {
    id: "framledning",
    term: "Framledning och retur",
    cat: "Värmesystemet",
    what: [
      "Framledningen är röret som för varmt vatten ut till elementen. Returen är röret som för tillbaka det svalare vattnet. På rören står ofta VS1 (fram) och VS2 (retur), eller så sitter en termometer på var och en.",
      "Känn med handen: framledningen är varmare. Skillnaden mellan fram och retur säger hur mycket värme huset tar.",
    ],
  },
  {
    id: "manometer",
    term: "Manometer",
    aka: "tryckmätare",
    cat: "Värmesystemet",
    what: [
      "En mätare som visar trycket i värmesystemet i bar. I ett slutet system ligger det normalt runt 1–1,5 bar när det är kallt och lite högre när det är varmt.",
      "Sjunker trycket hela tiden finns en läcka någonstans. Stiger det nästan upp till säkerhetsventilens tryck när pannan är varm är expansionskärlet ofta slut.",
    ],
    tip: "Skriv ner vad den visar när pannan är kall och när den är varm, så vet ni vad som är normalt hos er.",
    img: { src: "../manometer.jpg", alt: "Manometer på ett värmerör", credit: "Shixart1985, CC BY 2.0" },
  },
  {
    id: "expansionskarl",
    term: "Expansionskärl",
    cat: "Värmesystemet",
    what: [
      "Vatten tar större plats när det blir varmt. Expansionskärlet tar emot det extra vattnet så att trycket inte stiger för mycket.",
      "Ett slutet kärl ser ut som en röd eller vit gasolflaska. Inuti finns ett gummimembran med luft på ena sidan och vatten på andra. Ett öppet kärl är en plåttank högst upp i huset, ofta på vinden, och var vanligt i hus från 1950-talet. Har ni ett öppet kärl gäller inte samma tryckvärden.",
    ],
    img: { src: "../expansion.jpg", alt: "Slutet expansionskärl", credit: "The RedBurn, CC BY-SA 4.0" },
  },
  {
    id: "sakerhetsventil",
    term: "Säkerhetsventil",
    cat: "Värmesystemet",
    what: [
      "Släpper ut vatten automatiskt om trycket blir för högt, så att inget sprängs. Trycket den öppnar vid står på den, ofta 1,5 eller 2,5 bar.",
      "Den ska ha ett rör som leder ner mot golvbrunnen, så att varmt vatten inte sprutar ut i rummet. Det får aldrig sitta en avstängningsventil mellan pannan och säkerhetsventilen.",
    ],
    tip: "Vrid på ratten några gånger per år tills det rinner lite, och släpp. Droppar den hela tiden efteråt är den sliten och ska bytas.",
    img: { src: "../sakerhetsventil.jpg", alt: "Säkerhetsventil för värmesystem", credit: "StromBer, CC BY-SA 3.0" },
  },
  {
    id: "shuntventil",
    term: "Shuntventil",
    cat: "Värmesystemet",
    what: [
      "En blandningsventil som blandar hett vatten från tanken med svalt returvatten, så att elementen får lagom varmt vatten. Tanken kan vara 85 °C, men elementen behöver kanske bara 40–50 °C.",
      "Den kan vara manuell, med ett vred med siffror, eller styras av en motor och en utegivare som känner av utetemperaturen.",
    ],
    tip: "Är huset för kallt fast tanken är varm, kan shunten stå för lågt. Vrid lite i taget och vänta ett par timmar innan du ändrar igen. Skriv ner vad den stod på innan.",
  },
  {
    id: "cirkulationspump",
    term: "Cirkulationspump",
    cat: "Värmesystemet",
    what: [
      "En liten elektrisk pump som får vattnet att röra sig runt i elementen. Vanliga märken är Grundfos och Wilo. Utan den blir bara pannrummet varmt.",
    ],
    tip: "Lägg handen på den: den ska vara varm och surra svagt. Om den är tyst och kall har den slutat gå.",
  },
  {
    id: "laddautomatik",
    term: "Laddautomatik (laddpump)",
    aka: "Laddomat, Termovar, laddningsgrupp",
    cat: "Värmesystemet",
    what: [
      "Pump och ventil mellan vedpannan och ackumulatortanken. Pumpen flyttar varmt vatten från pannan till tanken. Ventilen ser till att vattnet som kommer tillbaka in i pannan är minst ungefär 65–70 °C, annars blir pannan för kall inuti, och då bildas tjära och rost.",
    ],
  },
  {
    id: "ackumulatortank",
    term: "Ackumulatortank",
    aka: "buffertank, ack-tank",
    cat: "Värmesystemet",
    what: [
      "En stor välisolerad vattentank som lagrar värmen från eldningen. Du eldar en gång och tanken räcker sedan i ett eller flera dygn. Varmast vatten lägger sig högst upp.",
      "Bonus Light kräver en på minst 1000 liter. Ofta sitter elpatronen och slingan eller beredaren för varmvatten i tanken.",
    ],
    img: { src: "../tank.jpg", alt: "Ackumulatortank i ett pannrum", credit: "BHKW-Info, CC BY-SA 4.0" },
  },
  {
    id: "elpatron",
    term: "Elpatron",
    cat: "Värmesystemet",
    what: [
      "Ett elektriskt värmeelement som sitter nedsänkt i vattnet, som en stor doppvärmare. Den tar över och håller värmen när elden har slocknat, till exempel när ni är bortresta. Har ofta en egen termostat och ibland ett val av effekt.",
    ],
  },
  {
    id: "termostatventil",
    term: "Termostatventil",
    cat: "Värmesystemet",
    what: [
      "Vredet med siffror på elementet. Det känner av rummets temperatur och stryper vattnet när rummet är varmt nog. 3 är ungefär 20 °C, varje steg är ungefär 3–4 grader.",
    ],
    tip: "Ställ inte möbler eller gardiner framför den, då känner den fel temperatur.",
    img: { src: "../termostat.jpg", alt: "Termostatventil på element", credit: "Santeri Viinamäki, CC BY-SA 4.0" },
  },

  // ---------------- Vedpannan ----------------
  {
    id: "primarluft",
    term: "Primärluft och sekundärluft",
    cat: "Vedpannan",
    what: [
      "Primärluften kommer in där veden brinner och styr hur fort veden förgasas, som en gaspedal. Sekundärluften blandas in med gaserna längre ner så att de brinner upp helt.",
      "På Bonus Light är det övre spjället primärluft och det nedre sekundärluft.",
    ],
  },
  {
    id: "turbulatorer",
    term: "Turbulatorer",
    cat: "Vedpannan",
    what: [
      "Spiralformade eller vridna plåtar som hänger ner i pannans rökrör (konvektionsrör). De gör att rökgaserna virvlar och lämnar mer värme till vattnet innan de går ut i skorstenen.",
      "De dras upp ur rören när du sotar, och rören borstas rena.",
    ],
  },
  {
    id: "stb",
    term: "Överhettningsskydd (STB)",
    aka: "säkerhetstermostat, temperaturbegränsare",
    cat: "Vedpannan",
    what: [
      "Ett skydd som stänger av fläkten om pannvattnet blir 100 °C. Det återställs inte av sig själv. Man skruvar av en hatt och trycker in knappen när pannan har svalnat.",
    ],
  },
  {
    id: "sotning",
    term: "Sotning och brandskyddskontroll",
    cat: "Vedpannan",
    what: [
      "Sotning (rengöring) betyder att sot tas bort från panna och skorsten. Kommunen bestämmer hur ofta och skickar sotaren.",
      "Brandskyddskontroll är en besiktning av skorsten och eldstad, vartannat eller vart fjärde år. Den kan inte göras av er själva.",
    ],
  },

  // ---------------- El ----------------
  {
    id: "jordfelsbrytare",
    term: "Jordfelsbrytare",
    cat: "El",
    what: [
      "En brytare i elcentralen som slår av strömmen på bråkdelen av en sekund om ström läcker ut där den inte ska, till exempel genom en människa. Den kan rädda liv, särskilt i hus med gammal el.",
      "Testa med testknappen (T) två gånger om året. Finns det ingen jordfelsbrytare i er elcentral är det en av de bästa saker en elektriker kan installera.",
    ],
    look: "En bredare dosa i elcentralen med en spak och en knapp märkt T eller Test.",
    img: { src: "rcd.jpg", alt: "Jordfelsbrytare", credit: "Jimbob82, public domain" },
  },
  {
    id: "propp",
    term: "Propp (säkring)",
    cat: "El",
    what: [
      "Gamla elcentraler har skruvproppar. Varje propp skyddar en grupp, till exempel köket. Färgen på pricken visar strömstyrkan: 6 A grön, 10 A röd, 16 A grå, 20 A blå. Byt alltid till samma ampere.",
      "Nyare centraler har automatsäkringar med en spak, som man bara för upp igen.",
    ],
  },

  // ---------------- Material ----------------
  {
    id: "sanitetssilikon",
    term: "Sanitetssilikon (våtrumssilikon)",
    cat: "Material",
    what: [
      "Silikon med mögelhämmande tillsats, för fogar i våtrum. Vanlig byggsilikon möglar fort i badrum.",
    ],
    search: "sanitetssilikon",
  },
  {
    id: "silikonborttagare",
    term: "Silikonborttagare",
    cat: "Material",
    what: [
      "En gel som löser upp rester av gammal silikon, så att den nya fogen fäster. Ny silikon fäster inte på gammal.",
    ],
    search: "silikonborttagare",
  },
  {
    id: "t-sprit",
    term: "T-sprit",
    cat: "Material",
    what: [
      "Rödfärgad sprit för rengöring. Tar bort fett och tvålrester före silikonering och torkar snabbt.",
    ],
  },
];

export const TERMS_BY_ID = new Map(TERMS.map((t) => [t.id, t]));

const enc = encodeURIComponent;
export const storeLinks = (q: string) => [
  { name: "Bauhaus", href: `https://www.bauhaus.se/catalogsearch/result/?q=${enc(q)}` },
  { name: "Hornbach", href: `https://www.hornbach.se/s/${enc(q)}` },
  { name: "Clas Ohlson", href: `https://www.clasohlson.com/se/search?text=${enc(q)}` },
];
export const videoLink = (q: string) => `https://www.youtube.com/results?search_query=${enc(q)}`;
