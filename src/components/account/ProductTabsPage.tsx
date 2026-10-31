"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/account/PageHeader";
import { SearchIcon } from "@/components/icons";
import { ProductCard } from "@/components/ui/ProductCard";
import { Tabs } from "@/components/ui/Tabs";
import { formatAED } from "@/lib/format";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/cn";

export interface ProductTab {
  id: string;
  label: string;
  items: Product[];
  emptyText?: string;
}

type View = "table" | "grid";

function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  const base = "grid size-9 place-items-center rounded-md transition-colors";
  return (
    <div role="group" aria-label="Layout" className="hidden rounded-lg border border-grey-600 p-0.5 md:flex">
      <button type="button" aria-pressed={view === "table"} aria-label="Table view" onClick={() => onChange("table")} className={cn(base, view === "table" ? "bg-black text-white" : "hover:bg-grey-500")}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <button type="button" aria-pressed={view === "grid"} aria-label="Grid view" onClick={() => onChange("grid")} className={cn(base, view === "grid" ? "bg-black text-white" : "hover:bg-grey-500")}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden><rect x="4" y="4" width="6.5" height="6.5" rx="1" /><rect x="13.500" y="4" width="6.500" height="6.500" rx="1" /><rect x="4" y="13.500" width="6.500" height="6.500" rx="1" /><rect x="13.500" y="13.500" width="6.500" height="6.500" rx="1" /></svg>
      </button>
    </div>
  );
}

/**
 * Account page with optional tabs, search and a table/grid toggle.
 * `overlay="listing"` adds boost and share actions (My Listings).
 * Below md the table falls back to cards.
 */
export function ProductTabsPage({
  title,
  action,
  tabs,
  intro,
  searchable = true,
  overlay,
  footer,
  defaultView = "table",
  statusLabel,
}: {
  title: string;
  action?: { href: string; label: string; icon?: boolean };
  tabs: ProductTab[];
  intro?: string;
  searchable?: boolean;
  overlay?: "listing";
  footer?: React.ReactNode;
  defaultView?: View;
  /** Column header + value for a status column, keyed by tab id. */
  statusLabel?: Record<string, string>;
}) {
  const [tab, setTab] = useState(tabs[0].id);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>(defaultView);
  const current = tabs.find((t) => t.id === tab) ?? tabs[0];
  const items = current.items.filter((p) =>
    `${p.brand} ${p.size}`.toLowerCase().includes(query.toLowerCase()),
  );
  const status = statusLabel?.[current.id];

  const grid = (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
      {items.map((p) => (
        <li key={p.id} className="relative">
          <ProductCard product={p} hideLike={overlay === "listing"} />
          {overlay === "listing" && (
            <>
              <Link href="/profile/boost" aria-label={`Boost ${p.brand}`} className="absolute left-3 top-3 grid size-8 place-items-center rounded-full bg-white/50 backdrop-blur-sm hover:bg-white/80">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>
              </Link>
              <button type="button" aria-label={`Share ${p.brand}`} className="absolute right-3 top-3 grid size-8 place-items-center rounded-full text-papaya-700 hover:bg-white/30">
                <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden><path d="M14 4v4.5C8 9 4.500 12 4 19c2.500-3 5.500-4.500 10-4.500V19l7-7.500L14 4Z" /></svg>
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );

  const table = (
    <div className="overflow-hidden rounded-xl border border-grey-500 bg-white shadow-card">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{`${title} — ${current.label}`}</caption>
        <thead className="border-b border-grey-500 bg-brown-100 text-xs uppercase tracking-wider text-muted">
          <tr>
            <th scope="col" className="px-5 py-3 font-semibold">Item</th>
            <th scope="col" className="px-3 py-3 font-semibold">Size</th>
            <th scope="col" className="px-3 py-3 font-semibold">Condition</th>
            <th scope="col" className="px-3 py-3 text-right font-semibold">Price</th>
            {status && <th scope="col" className="px-3 py-3 font-semibold">Status</th>}
            <th scope="col" className="px-5 py-3 text-right font-semibold"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-grey-500">
          {items.map((p) => (
            <tr key={p.id} className="transition-colors hover:bg-grey-500/30">
              <td className="px-5 py-3">
                <Link href={`/product/${p.id}`} className="flex items-center gap-4">
                  <span className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-grey-500">
                    {p.image && <Image src={p.image} alt="" fill sizes="48px" className="object-cover" />}
                  </span>
                  <span className="font-medium text-black">{p.brand}</span>
                </Link>
              </td>
              <td className="px-3 py-3 text-powder-900">{p.size}</td>
              <td className="px-3 py-3 text-powder-900">{p.condition}</td>
              <td className="px-3 py-3 text-right font-bold">{formatAED(p.price)}</td>
              {status && (
                <td className="px-3 py-3">
                  <span className="rounded-md bg-blue-500 px-2 py-0.5 text-xs font-medium">{status}</span>
                </td>
              )}
              <td className="px-5 py-3">
                <div className="flex justify-end gap-2">
                  {overlay === "listing" && (
                    <Link href="/profile/boost" className="inline-flex h-9 items-center rounded-md border border-grey-600 px-3 text-xs font-semibold hover:bg-grey-500">
                      Boost
                    </Link>
                  )}
                  <Link href={`/product/${p.id}`} className="inline-flex h-9 items-center rounded-md border border-black px-3 text-xs font-semibold hover:bg-grey-500">
                    View
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <PageHeader title={title} action={action} />

      {tabs.length > 1 && (
        <Tabs
          label={`${title} sections`}
          value={tab}
          onChange={setTab}
          items={tabs.map(({ id, label }) => ({ id, label }))}
          className="mb-6 [&>button]:flex-1 md:[&>button]:flex-none md:[&>button]:px-10"
        />
      )}

      {intro && <p className="mb-6 max-w-2xl text-md text-powder-900">{intro}</p>}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        {searchable ? (
          <label className="flex h-10 w-full max-w-md items-center gap-2.5 rounded-full border border-grey-600 px-4 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
            <SearchIcon className="size-5 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              aria-label={`Search ${title}`}
              className="h-full min-w-0 flex-1 bg-transparent text-base outline-none md:text-md placeholder:text-muted"
            />
          </label>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-4">
          <p className="text-sm text-powder-900" aria-live="polite">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
          <ViewToggle view={view} onChange={setView} />
        </div>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-grey-600 py-16 text-center text-md text-powder-900">
          {current.emptyText ?? "Nothing here yet."}
        </p>
      ) : (
        <>
          <div className={cn(view === "table" ? "hidden md:block" : "hidden")}>{table}</div>
          <div className={cn(view === "table" ? "md:hidden" : "")}>{grid}</div>
        </>
      )}

      {footer}
    </div>
  );
}
