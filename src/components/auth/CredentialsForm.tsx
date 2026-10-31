"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { AppleIcon, GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Shared email + password form for sign in and sign up. */
export function CredentialsForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const verb = mode === "login" ? "Login" : "Sign up";

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const next: typeof errors = {};
    if (!emailPattern.test(email)) next.email = "Enter a valid email address";
    if (password.length < 8) next.password = "Password must be at least 8 characters";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    // TODO: replace with the real auth call when the backend is connected.
    setTimeout(() => {
      router.push(mode === "login" ? "/" : `/verify?email=${encodeURIComponent(email)}`);
    }, 400);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <Input
        name="email"
        type="email"
        label="Email"
        placeholder="email@company.com"
        autoComplete="email"
        error={errors.email}
      />
      <div className="flex flex-col gap-2">
        <PasswordInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          error={errors.password}
        />
        <Link href="/forgot-password" className="self-end py-1 text-sm font-medium hover:underline">
          Forgot password?
        </Link>
      </div>

      <div className="flex items-center gap-4 text-sm text-powder-900" aria-hidden>
        <span className="h-px flex-1 bg-grey-600" />
        OR
        <span className="h-px flex-1 bg-grey-600" />
      </div>

      <div className="flex flex-col gap-3">
        <Button type="button" variant="outline" size="lg" fullWidth className="border-grey-600 font-medium">
          <GoogleIcon /> {verb} with Google
        </Button>
        <Button type="button" variant="outline" size="lg" fullWidth className="border-grey-600 font-medium">
          <AppleIcon /> {verb} with Apple
        </Button>
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <Button type="submit" size="lg" fullWidth loading={loading}>
          Continue
        </Button>
        <Link
          href="/"
          className="inline-flex h-10 w-full items-center justify-center rounded-md border border-black text-sm font-semibold transition-colors hover:bg-grey-500"
        >
          Shop as a guest
        </Link>
      </div>
    </form>
  );
}
