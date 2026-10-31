import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, ProductGrid } from "@/components/sections";
import { FilterDrawer } from "@/components/search/FilterDrawer";
import { FilterPanel } from "@/components/search/FilterPanel";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Search — Taggy" };

type Params = Promise<{ q?: string; category?: string; sort?: string }>;

async function Results({ searchParams }: { searchParams: Params }) {
  const { q, category } = await searchParams;
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
            {items.length
              ? `${items.length} items`
              : "No exact matches — showing items you might like"}
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

export default function SearchPage({ searchParams }: { searchParams: Params }) {
  return (
    <Container className="grid gap-10 py-8 lg:grid-cols-[240px_1fr]">
      <aside aria-label="Filters" className="hidden lg:block">
        <FilterPanel />
      </aside>
      <div>
        <Suspense fallback={<p className="text-sm text-muted">Loading results…</p>}>
          <Results searchParams={searchParams} />
        </Suspense>
      </div>
    </Container>
  );
}
