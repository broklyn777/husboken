import type { Metadata } from "next";
import { Content } from "@/lib/content";
export const metadata: Metadata = { title: "Underhåll" };
export default function Page() {
  return <Content name="underhall" />;
}
