import type { Metadata } from "next";
import { BankDetailsPage } from "@/components/account/CollectionPages";

export const metadata: Metadata = { title: "Bank details — Taggy" };

export default function Page() {
  return <BankDetailsPage />;
}
