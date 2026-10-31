"use client";

import { useSearchParams } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { OtpForm } from "@/components/auth/OtpForm";

/** Reads ?email= / ?flow= in the browser so the page works as a static export. */
export function VerifyContent() {
  const params = useSearchParams();
  const email = params.get("email");
  const flow = params.get("flow");
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
