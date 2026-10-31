import type { Metadata } from "next";
import { HolidaysPage } from "@/components/account/CollectionPages";

export const metadata: Metadata = { title: "Holidays — Taggy" };

export default function Page() {
  return <HolidaysPage />;
}
