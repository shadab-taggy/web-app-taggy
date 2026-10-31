import type { Metadata } from "next";
import { LegalPage } from "@/components/content/LegalPage";
import { terms } from "@/data/legal";

export const metadata: Metadata = { title: "Terms & Conditions — Taggy" };

export default function TermsPage() {
  return <LegalPage doc={terms} />;
}
