"use client";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-dvh place-items-center px-4 py-16">
      <div role="alert" className="flex max-w-md flex-col items-center text-center">
        <Logo width={130} className="mb-10" />
        <h1 className="font-serif text-display-md font-semibold">Something went wrong</h1>
        <p className="mt-3 text-md text-powder-900">
          An unexpected error occurred. Please try again — if it keeps happening, contact hello@taggy.ae.
        </p>
        {error.digest && <p className="mt-2 text-xs text-muted">Reference: {error.digest}</p>}
        <Button size="lg" className="mt-8" onClick={reset}>
          Try again
        </Button>
      </div>
    </main>
  );
}
