"use client";

import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/sections";
import { FilterDrawer } from "@/components/search/FilterDrawer";
import { products } from "@/data/products";

/** Reads ?q= / ?category= in the browser so the page works as a static export. */
export function SearchResults() {
  const params = useSearchParams();
  const q = params.get("q") ?? undefined;
  const category = params.get("category") ?? undefined;
  const term = q?.trim().toLowerCase();
  // Placeholder matching until the backend search is connected.
  const items = term
    ? products.filter((p) => `${p.brand} ${p.size}`.toLowerCase().includes(term))
    : products;
  const heading = q ? `Results for “${q}”` : category ? `Browse ${category}` : "All items";
  const list = items.length ? items : products;

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-display-xs font-medium">{heading}</h1>
          <p className="mt-1 text-sm text-powder-900" aria-live="polite">
            {items.length ? `${items.length} items` : "No exact matches — showing items you might like"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <FilterDrawer />
          <label className="flex items-center gap-2 text-sm text-powder-900">
            Sort by
            <select className="h-10 rounded-md border border-grey-600 bg-white px-3 text-sm text-black">
              <option>Recommended</option>
              <option>Newest</option>
              <option>Price: low to high</option>
              <option>Price: high to low</option>
            </select>
          </label>
        </div>
      </div>
      <ProductGrid products={list} columns={4} />
    </>
  );
}
