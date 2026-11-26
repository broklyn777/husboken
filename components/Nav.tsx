"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  ["/", "Start"],
  ["/varme", "Värmesystemet"],
  ["/vedpanna", "Vedpannan"],
  ["/guider", "Gör-det-själv"],
  ["/underhall", "Underhåll"],
  ["/ordlista", "Ordlista"],
  ["/logg", "Vår logg"],
] as const;

export function Nav() {
  const path = usePathname();
  return (
    <nav className="tabs" aria-label="Avsnitt">
      {LINKS.map(([href, label]) => (
        <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>
          {label}
        </Link>
      ))}
    </nav>
  );
}
