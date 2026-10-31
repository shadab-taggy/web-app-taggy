"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "@/components/icons";
import { Avatar, Stars } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatAED } from "@/lib/format";
import type { ProductDetail, Seller } from "@/lib/types";
import { cn } from "@/lib/cn";

/** Sticky purchase column of the desktop product page. */
export function BuyPanel({ product, seller }: { product: ProductDetail; seller: Seller }) {
  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(true);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-3">
        <Link href={`/seller/${seller.id}`} className="flex items-center gap-3">
          <Avatar name={seller.handle} src={seller.avatar} size={40} />
          <span className="text-md font-medium">@{seller.handle}</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-pressed={followed}
            onClick={() => setFollowed((v) => !v)}
            className={cn(
              "rounded-md px-3 py-1 text-sm font-medium transition-colors",
              followed ? "bg-blue-500" : "border border-black hover:bg-grey-500",
            )}
          >
            {followed ? "Followed" : "Follow"}
          </button>
          <Stars rating={seller.rating} count={seller.reviews} />
        </div>
      </div>

      <Badge tone="peach" className="self-start">
        {product.deliveryNote}
      </Badge>

      <div>
        <h1 className="font-serif text-display-sm font-medium">{product.title}</h1>
        <p className="mt-2 max-w-prose text-sm leading-6 text-powder-900">{product.description}</p>
      </div>

      <p className="text-display-xs font-bold">{formatAED(product.price)}</p>

      <div className="flex flex-col gap-3">
        <Button size="lg" fullWidth>
          Buy Now
        </Button>
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setAdded(true)}
            aria-live="polite"
          >
            {added ? "Added to cart ✓" : "Add to cart"}
          </Button>
          <button
            type="button"
            aria-pressed={liked}
            aria-label={liked ? "Remove from liked items" : "Add to liked items"}
            onClick={() => setLiked((v) => !v)}
            className="grid size-10 place-items-center rounded-md border border-black transition-colors hover:bg-grey-500"
          >
            <HeartIcon className={cn("size-5", liked && "fill-papaya-500 stroke-papaya-500")} />
          </button>
        </div>
        <Link
          href="/inbox"
          className="inline-flex h-10 w-full items-center justify-center rounded-md bg-blue-500 text-sm font-semibold transition-colors hover:bg-blue-400"
        >
          Message seller
        </Link>
      </div>

      <dl className="border-t border-grey-500">
        {product.details.map((d) => (
          <div key={d.label} className="flex justify-between gap-6 border-b border-grey-500 py-3.5 text-sm">
            <dt className="text-powder-900">{d.label}</dt>
            <dd className="text-right font-medium">
              {d.label === "Color" ? (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-grey-600 px-2 py-0.5">
                  <span className="size-2 rounded-full bg-black" aria-hidden />
                  {d.value}
                </span>
              ) : (
                d.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="flex flex-wrap gap-2" aria-label="Seller tags">
        {product.tags.map((t) => (
          <li key={t}>
            <Badge tone="peach" className="px-2.5 py-1">
              {t}
            </Badge>
          </li>
        ))}
      </ul>

      <button type="button" className="inline-flex items-center gap-2 self-start py-2 text-sm text-powder-900 hover:text-black">
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <path d="M5 21V4m0 0h12l-2 4 2 4H5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Report this listing
      </button>
    </div>
  );
}
