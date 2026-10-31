import type { Metadata } from "next";
import { ManageTags } from "@/components/account/ManageTags";

export const metadata: Metadata = { title: "Manage Tags — Taggy" };

export default function Page() {
  return <ManageTags />;
}
