"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }
    setError(undefined);
    setLoading(true);
    // TODO: request a password reset from the backend.
    setTimeout(() => router.push(`/verify?flow=reset&email=${encodeURIComponent(email)}`), 400);
  }

  return (
    <AuthShell
      title="Forgot password?"
      subtitle="Enter your email and we’ll send you a verification code."
      footer={
        <Link href="/login" className="font-medium hover:text-black">
          ← Back to Login
        </Link>
      }
    >
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="email@company.com"
          autoComplete="email"
          error={error}
        />
        <Button type="submit" size="lg" fullWidth loading={loading}>
          Send code
        </Button>
      </form>
    </AuthShell>
  );
}
