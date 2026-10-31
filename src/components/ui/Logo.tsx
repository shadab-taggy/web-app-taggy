import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/** Taggy wordmark exported from Figma (public/logo.svg, 104×24). */
export function Logo({
  className,
  width = 104,
}: {
  className?: string;
  width?: number;
}) {
  return (
    <Link href="/" aria-label="Taggy home" className={cn("inline-block", className)}>
      <Image
        src="/logo.svg"
        alt="Taggy"
        width={width}
        height={Math.round((width * 24) / 104)}
        priority
      />
    </Link>
  );
}
