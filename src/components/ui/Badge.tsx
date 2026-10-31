import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "blue" | "peach" | "grey" | "papaya";

const tones: Record<Tone, string> = {
  blue: "bg-blue-500 text-black",
  peach: "bg-[#fde8cf] text-black border border-[#f6d2ac]",
  grey: "bg-grey-500 text-black",
  papaya: "bg-papaya-700 text-white",
};

/** Pill label (tags, status chips). */
export function Badge({
  tone = "blue",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Small circular count shown on header icons (cart, likes, notifications). */
export function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-papaya-700 px-1 text-[10px] font-semibold leading-5 text-white">
      {String(count).padStart(2, "0")}
    </span>
  );
}
