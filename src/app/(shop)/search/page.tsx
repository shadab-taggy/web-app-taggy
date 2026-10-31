import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/sections";
import { FilterPanel } from "@/components/search/FilterPanel";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = { title: "Search — Taggy" };

export default function SearchPage() {
  return (
    <Container className="grid gap-10 py-8 lg:grid-cols-[240px_1fr]">
      <aside aria-label="Filters" className="hidden lg:block">
        <FilterPanel />
      </aside>
      <div>
        <Suspense fallback={<p className="text-sm text-muted">Loading results…</p>}>
          <SearchResults />
        </Suspense>
      </div>
    </Container>
  );
}
