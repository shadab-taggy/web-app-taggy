import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { OtpForm } from "@/components/auth/OtpForm";

export const metadata: Metadata = { title: "Verify your email — Taggy" };

type Params = Promise<{ email?: string; flow?: string }>;

async function Content({ searchParams }: { searchParams: Params }) {
  const { email, flow } = await searchParams;
  return (
    <AuthShell
      title="Check your email"
      subtitle={
        <>
          We sent a verification link to
          <br />
          <span className="text-black">{email ?? "your email"}</span>
        </>
      }
    >
      <OtpForm next={flow === "reset" ? "/login" : "/onboarding"} />
    </AuthShell>
  );
}

export default function VerifyPage({ searchParams }: { searchParams: Params }) {
  return (
    <Suspense>
      <Content searchParams={searchParams} />
    </Suspense>
  );
}
