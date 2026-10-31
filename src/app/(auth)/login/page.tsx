import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { CredentialsForm } from "@/components/auth/CredentialsForm";

export const metadata: Metadata = { title: "Login — Taggy" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Login to your account"
      footer={
        <>
          Don’t have an account?{" "}
          <Link href="/signup" className="font-semibold text-black hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <CredentialsForm mode="login" />
    </AuthShell>
  );
}
