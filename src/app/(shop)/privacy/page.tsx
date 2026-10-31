import type { Metadata } from "next";
import { LegalPage } from "@/components/content/LegalPage";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = { title: "Privacy Policy — Taggy" };

export default function PrivacyPage() {
  return <LegalPage doc={privacyPolicy} />;
}
