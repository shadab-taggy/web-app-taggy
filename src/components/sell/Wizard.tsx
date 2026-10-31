"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Shared chrome for multi-step flows: title row, papaya progress, footer actions. */
export function WizardShell({
  title,
  step,
  total,
  heading,
  headingLink,
  headerAction,
  children,
  onCancel,
  onNext,
  nextLabel = "Next",
  nextLoading,
  extraAction,
}: {
  title: string;
  step: number;
  total: number;
  heading: string;
  headingLink?: { href: string; label: string };
  headerAction?: React.ReactNode;
  children: React.ReactNode;
  onCancel: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextLoading?: boolean;
  extraAction?: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-3xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-md font-semibold">{title}</h1>
        {headerAction}
      </div>

      <div className="mb-8">
        <div className="mb-2 text-sm">
          Step {step}/{total}
        </div>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={step}
          aria-label={`${title} progress`}
          className="h-2.5 overflow-hidden rounded-full bg-papaya-500/20"
        >
          <div
            className="h-full rounded-full bg-papaya-500 transition-[width] duration-300"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 className="font-serif text-display-xs font-semibold">{heading}</h2>
        {headingLink && (
          <Link href={headingLink.href} className="text-sm underline hover:text-powder-900">
            {headingLink.label}
          </Link>
        )}
      </div>

      <div className="flex flex-col gap-6">{children}</div>

      <div className={cn("sticky bottom-0 -mx-4 mt-10 flex gap-3 border-t border-grey-500 bg-white/95 px-4 py-4 backdrop-blur md:mx-0 md:px-0")}>
        <Button type="button" variant="outline" size="lg" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
        {extraAction}
        <Button type="button" size="lg" className="flex-1" onClick={onNext} loading={nextLoading}>
          {nextLabel}
        </Button>
      </div>
    </div>
  );
}
