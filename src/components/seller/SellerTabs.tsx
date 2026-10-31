"use client";

import { useState } from "react";
import { ProductGrid } from "@/components/sections";
import { Stars } from "@/components/ui/Avatar";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs } from "@/components/ui/Tabs";
import type { Product, Review } from "@/lib/types";

export function SellerTabs({
  listings,
  reviews,
  totalListings,
}: {
  listings: Product[];
  reviews: Review[];
  totalListings: number;
}) {
  const [tab, setTab] = useState("listings");

  return (
    <div>
      <Tabs
        label="Seller sections"
        value={tab}
        onChange={setTab}
        items={[
          { id: "listings", label: "Listings" },
          { id: "reviews", label: "Reviews" },
        ]}
        className="[&>button]:flex-1 md:[&>button]:flex-none md:[&>button]:px-10"
      />

      {tab === "listings" ? (
        <div role="tabpanel" className="pt-6">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-powder-900">{totalListings} listings</p>
            <label className="flex items-center gap-2 text-sm text-powder-900">
              <span className="sr-only">Filter by category</span>
              <select className="h-10 rounded-md border border-grey-600 bg-white px-3 text-sm text-black">
                <option>Designerwear</option>
                <option>Dresses</option>
                <option>Tops</option>
                <option>Bags</option>
              </select>
            </label>
          </div>
          <ProductGrid products={listings} />
        </div>
      ) : (
        <div role="tabpanel" className="pt-6">
          {reviews.length === 0 ? (
            <p className="py-16 text-center text-md text-powder-900">No reviews yet.</p>
          ) : (
            <ul className="mx-auto flex max-w-3xl flex-col divide-y divide-grey-500">
              {reviews.map((r) => (
                <li key={r.id} className="flex gap-4 py-5">
                  <Avatar name={r.author} size={40} />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold">{r.author}</p>
                      <p className="text-xs text-muted">{r.date}</p>
                    </div>
                    <Stars rating={r.rating} />
                    <p className="mt-2 text-md text-powder-900">{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
