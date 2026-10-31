import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { CredentialsForm } from "@/components/auth/CredentialsForm";

export const metadata: Metadata = { title: "Create your account — Taggy" };

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-black hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <CredentialsForm mode="signup" />
    </AuthShell>
  );
}
