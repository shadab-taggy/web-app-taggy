"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Dialog (centered) or Drawer (right side) — replaces mobile bottom sheets.
 * Uses native <dialog> for focus trapping, Esc handling and inertness.
 */
export function Modal({
  open,
  onClose,
  title,
  variant = "dialog",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  variant?: "dialog" | "drawer";
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) {
      el.showModal();
      // Start on the first form field (not the Close button) when the dialog has one.
      el.querySelector<HTMLElement>("input:not([type=hidden]),select,textarea")?.focus();
    }
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className={cn(
        "bg-white p-0 text-black shadow-popover backdrop:bg-black/60",
        variant === "dialog"
          ? "m-auto w-[min(92vw,480px)] rounded-xl"
          : "ml-auto mr-0 h-dvh max-h-none w-[min(100vw,440px)] rounded-none",
      )}
    >
      <div className="flex items-center justify-between border-b border-grey-500 px-6 py-4">
        <h2 id={titleId} className="font-serif text-xl font-semibold">
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid size-8 place-items-center rounded-md hover:bg-grey-500"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
      <div className="px-6 py-5">{children}</div>
    </dialog>
  );
}
