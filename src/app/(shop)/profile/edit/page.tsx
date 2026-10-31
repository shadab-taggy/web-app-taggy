import type { Metadata } from "next";
import { EditProfileForm } from "@/components/account/EditProfileForm";

export const metadata: Metadata = { title: "Edit profile — Taggy" };

export default function Page() {
  return <EditProfileForm />;
}
