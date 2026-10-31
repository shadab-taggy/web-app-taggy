import Image from "next/image";
import { cn } from "@/lib/cn";

/** Round avatar: photo when available, otherwise initials on powder blue. */
export function Avatar({
  name,
  src,
  size = 40,
  className,
}: {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-blue-400 text-sm font-semibold text-powder-900",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt="" fill sizes={`${size}px`} className="object-cover" />
      ) : (
        <span aria-hidden>{name.slice(0, 1).toUpperCase()}</span>
      )}
    </span>
  );
}

export function Stars({ rating, count }: { rating: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-black">
      <svg viewBox="0 0 24 24" className="size-4 fill-blue-500" aria-hidden>
        <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
      </svg>
      <span className="font-medium">{rating.toFixed(1)}</span>
      {count !== undefined && <span className="text-muted">({count})</span>}
      <span className="sr-only">out of 5 stars</span>
    </span>
  );
}
