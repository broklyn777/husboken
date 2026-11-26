import type { Metadata, Viewport } from "next";
import { Archivo, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"], weight: ["500", "700", "800"], variable: "--font-archivo" });
const source = Source_Sans_3({ subsets: ["latin"], weight: ["400", "600", "700"], style: ["normal", "italic"], variable: "--font-source" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "Husboken 1957", template: "%s · Husboken" },
  description: "Vår informationscentral för huset: värmesystemet, vedpannan, gör-det-själv-guider och en egen logg.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${archivo.variable} ${source.variable} ${mono.variable}`}>
      <body>
        <header className="top">
          <div className="wrap">
            <div className="brand">
              <b>Husboken</b>
              <span>Vårt hus från 1957 · vedeldning · källare</span>
            </div>
            <Nav />
          </div>
        </header>
        <main className="wrap">
          <section className="view">{children}</section>
        </main>
      </body>
    </html>
  );
}
