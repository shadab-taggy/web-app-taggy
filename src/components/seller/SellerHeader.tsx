"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Seller } from "@/lib/types";

export function SellerHeader({ seller }: { seller: Seller }) {
  const [following, setFollowing] = useState(false);
  const followers = seller.followers + (following ? 1 : 0);

  return (
    <header className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
      <Avatar name={seller.handle} src={seller.avatar} size={128} className="size-24 md:size-32" />

      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-serif text-display-xs font-semibold">{seller.handle}</h1>
          <Badge tone="peach" className="px-2.5 py-1 text-sm">
            {seller.department}
          </Badge>
        </div>

        <dl className="flex gap-10">
          {[
            ["Followers", String(followers)],
            ["Following", String(seller.following).padStart(2, "0")],
            ["Rating", seller.rating.toFixed(1)],
          ].map(([label, value]) => (
            <div key={label}>
              <dd className="text-lg font-semibold">{value}</dd>
              <dt className="text-sm text-powder-900">{label}</dt>
            </div>
          ))}
        </dl>

        <p className="max-w-xl text-md text-powder-900">{seller.bio}</p>

        <div className="grid max-w-md grid-cols-2 gap-3">
          <Button
            variant={following ? "outline" : "secondary"}
            aria-pressed={following}
            onClick={() => setFollowing((v) => !v)}
          >
            {following ? "Following" : "Follow"}
          </Button>
          <Link
            href="/inbox"
            className="inline-flex h-10 items-center justify-center rounded-md border border-black text-sm font-semibold transition-colors hover:bg-grey-500"
          >
            Message
          </Link>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="Seller tags">
          {seller.tags.map((t) => (
            <li key={t}>
              <Badge tone="peach" className="px-2.5 py-1">
                {t}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
