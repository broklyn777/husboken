import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "content");

/** Byter <!--illu:namn--> mot illustrationen i content/illu/namn.svg. */
function withIllustrations(html: string) {
  return html.replace(/<!--illu:([a-z0-9-]+)-->/g, (_, name: string) => {
    try {
      return fs.readFileSync(path.join(dir, "illu", `${name}.svg`), "utf8");
    } catch {
      return "";
    }
  });
}

/** Renderar en av våra egna, statiska innehållsfiler i content/. */
export function Content({ name }: { name: string }) {
  const html = withIllustrations(fs.readFileSync(path.join(dir, `${name}.html`), "utf8"));
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
