"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatAED } from "@/lib/format";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/cn";

/** Listing card: 3:4 image, heart toggle, brand / size · condition / price. */
export function ProductCard({
  product,
  compact = false,
  hideLike = false,
}: {
  product: Product;
  compact?: boolean;
  /** Hide the heart (account pages render their own overlay actions). */
  hideLike?: boolean;
}) {
  const [liked, setLiked] = useState(!!product.liked);

  return (
    <article className="group relative overflow-hidden rounded-lg border border-grey-500 bg-white shadow-card transition-shadow hover:shadow-popover">
      <Link
        href={`/product/${product.id}`}
        className="block outline-offset-[-2px]"
        aria-label={`${product.brand}, ${product.size}, ${formatAED(product.price)}`}
      >
        <div className="relative aspect-[3/4] w-full bg-grey-500">
          {product.image && (
            <Image
              src={product.image}
              alt=""
              fill
              sizes={compact ? "160px" : "(min-width:1280px) 20vw, (min-width:768px) 25vw, 50vw"}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          )}
        </div>
        <div className={cn("flex flex-col gap-1", compact ? "px-3 pb-3 pt-2.5" : "px-4 pb-4 pt-3")}>
          <p className="truncate text-sm font-medium text-black">{product.brand}</p>
          <p className="truncate text-sm text-powder-900">
            {product.size} · {product.condition}
          </p>
          <p className={cn("font-bold text-black", compact ? "mt-0.5 text-sm" : "mt-1 text-md")}>
            {formatAED(product.price)}
          </p>
        </div>
      </Link>
      {!hideLike && <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? "Remove from liked items" : "Add to liked items"}
        onClick={() => setLiked((v) => !v)}
        className="absolute right-3 top-3 grid size-8 place-items-center rounded-full transition-colors hover:bg-white/30"
      >
        <svg
          viewBox="0 0 24 24"
          className={cn("size-5", liked ? "fill-papaya-500 stroke-papaya-500" : "fill-white/20 stroke-white")}
          strokeWidth="2"
          strokeLinejoin="round"
        >
          <path d="M12 20.5s-7.5-4.6-9.2-9.3C1.7 8 3.6 5 6.7 5c2 0 3.4 1.1 5.3 3.2C13.9 6.1 15.3 5 17.3 5c3.1 0 5 3 3.9 6.2-1.7 4.7-9.2 9.3-9.2 9.3z" />
        </svg>
      </button>}
    </article>
  );
}
