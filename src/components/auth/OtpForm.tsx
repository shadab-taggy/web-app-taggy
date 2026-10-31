"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/Button";

const LENGTH = 4;

export function OtpForm({ next }: { next: string }) {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(LENGTH).fill(""));
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function setAt(i: number, value: string) {
    setDigits((d) => d.map((x, idx) => (idx === i ? value : x)));
  }

  function onChange(i: number, raw: string) {
    const v = raw.replace(/\D/g, "").slice(-1);
    setAt(i, v);
    setError(undefined);
    if (v && i < LENGTH - 1) refs.current[i + 1]?.focus();
  }

  function onKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < LENGTH - 1) refs.current[i + 1]?.focus();
  }

  function onPaste(e: ClipboardEvent) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LENGTH);
    if (!pasted) return;
    e.preventDefault();
    setDigits(Array.from({ length: LENGTH }, (_, i) => pasted[i] ?? ""));
    refs.current[Math.min(pasted.length, LENGTH - 1)]?.focus();
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (digits.some((d) => !d)) {
      setError("Enter the 4-digit code we sent you");
      return;
    }
    setLoading(true);
    // TODO: verify the code against the backend.
    setTimeout(() => router.push(next), 400);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-center gap-6">
      <div className="flex gap-3" onPaste={onPaste} role="group" aria-label="Verification code">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={d}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1}`}
            aria-invalid={!!error || undefined}
            onChange={(e) => onChange(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onFocus={(e) => e.target.select()}
            className="size-16 rounded-lg border border-black text-center text-display-xs font-semibold outline-none transition-shadow focus:ring-2 focus:ring-black aria-[invalid=true]:border-danger"
          />
        ))}
      </div>
      {error && (
        <p role="alert" className="-mt-2 text-xs text-danger">
          {error}
        </p>
      )}
      <Button type="submit" size="lg" fullWidth loading={loading}>
        Verify OTP
      </Button>
      <p className="text-sm text-powder-900" aria-live="polite">
        Didn’t receive the email?{" "}
        <button
          type="button"
          onClick={() => setResent(true)}
          className="px-1 py-1.5 font-semibold text-black hover:underline"
        >
          {resent ? "Sent — check your inbox" : "Click to resend"}
        </button>
      </p>
      <Link href="/login" className="text-sm font-medium text-powder-900 hover:text-black">
        ← Back to Login
      </Link>
    </form>
  );
}
