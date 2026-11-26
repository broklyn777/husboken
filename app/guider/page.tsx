import type { Metadata } from "next";
import { Content } from "@/lib/content";
export const metadata: Metadata = { title: "Gör-det-själv" };
export default function Page() {
  return <Content name="guider" />;
}
