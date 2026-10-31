import type { Metadata } from "next";
import { ChangePasswordForm } from "@/components/account/ChangePasswordForm";

export const metadata: Metadata = { title: "Change Password — Taggy" };

export default function Page() {
  return <ChangePasswordForm />;
}
