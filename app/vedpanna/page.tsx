import type { Metadata } from "next";
import { Content } from "@/lib/content";
export const metadata: Metadata = { title: "Vedpannan" };
export default function Page() {
  return <Content name="vedpanna" />;
}
