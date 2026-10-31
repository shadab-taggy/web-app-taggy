import type { Metadata } from "next";
import { AddressBookPage } from "@/components/account/CollectionPages";

export const metadata: Metadata = { title: "Address Book — Taggy" };

export default function Page() {
  return <AddressBookPage />;
}
