import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyContent } from "@/components/auth/VerifyContent";

export const metadata: Metadata = { title: "Verify your email — Taggy" };

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyContent />
    </Suspense>
  );
}
