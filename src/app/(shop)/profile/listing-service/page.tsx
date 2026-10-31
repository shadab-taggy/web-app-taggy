import type { Metadata } from "next";
import { ListingServicePage } from "@/components/account/ListingServicePage";

export const metadata: Metadata = { title: "Listing Service — Taggy" };

export default function Page() {
  return <ListingServicePage />;
}
