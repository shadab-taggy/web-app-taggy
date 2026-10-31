"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HeartIcon } from "@/components/icons";
import { ProductGrid } from "@/components/sections";
import { Button } from "@/components/ui/Button";
import { formatAED } from "@/lib/format";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/cn";

const FEE = 6.5; // placeholder fee until pricing comes from the backend

interface Line {
  product: Product;
  qty: number;
  liked: boolean;
}

function QtyStepper({
  qty,
  onChange,
  label,
}: {
  qty: number;
  onChange: (n: number) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={`Quantity for ${label}`}
      className="inline-flex h-10 items-center rounded-full border border-black"
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={qty <= 1}
        onClick={() => onChange(qty - 1)}
        className="grid h-full w-11 place-items-center rounded-l-full text-lg hover:bg-grey-500 disabled:opacity-40"
      >
        −
      </button>
      <span className="w-6 text-center text-md font-medium" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(qty + 1)}
        className="grid h-full w-11 place-items-center rounded-r-full text-lg hover:bg-grey-500"
      >
        +
      </button>
    </div>
  );
}

export function CartView({
  initialItems,
  saved,
}: {
  initialItems: Product[];
  saved: Product[];
}) {
  const [lines, setLines] = useState<Line[]>(
    initialItems.map((product) => ({ product, qty: 1, liked: false })),
  );
  const [savedItems, setSavedItems] = useState(saved);

  const subtotal = lines.reduce((n, l) => n + l.product.price * l.qty, 0);
  const total = lines.length ? subtotal + FEE : 0;
  const count = lines.reduce((n, l) => n + l.qty, 0);

  const update = (id: string, patch: Partial<Line>) =>
    setLines((ls) => ls.map((l) => (l.product.id === id ? { ...l, ...patch } : l)));

  function moveToCart(p: Product) {
    setSavedItems((s) => s.filter((x) => x.id !== p.id));
    setLines((ls) => [...ls, { product: p, qty: 1, liked: true }]);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
      <div className="flex flex-col gap-12">
        <section aria-label="Items in your cart">
          {lines.length === 0 ? (
            <div className="grid place-items-center gap-4 rounded-xl border border-grey-500 py-20 text-center">
              <h2 className="font-serif text-display-xs font-semibold">Your cart is empty</h2>
              <p className="text-md text-powder-900">Items you add will appear here.</p>
              <Link
                href="/"
                className="rounded-md bg-blue-500 px-5 py-2.5 text-sm font-semibold hover:bg-blue-400"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {lines.map(({ product: p, qty, liked }) => (
                <li
                  key={p.id}
                  className="grid grid-cols-[120px_1fr] overflow-hidden rounded-lg border border-grey-500 bg-white shadow-card sm:grid-cols-[160px_1fr]"
                >
                  <Link href={`/product/${p.id}`} className="relative block min-h-40 bg-grey-500">
                    {p.image && (
                      <Image src={p.image} alt="" fill sizes="160px" className="object-cover" />
                    )}
                    <span className="sr-only">{p.brand}</span>
                  </Link>
                  <div className="flex flex-col justify-between gap-4 p-4 sm:p-5">
                    <div>
                      <p className="text-md font-medium">{p.brand}</p>
                      <p className="text-sm text-powder-900">
                        {p.size} · {p.condition}
                      </p>
                      <p className="mt-3 text-lg font-bold">{formatAED(p.price)}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <QtyStepper
                        qty={qty}
                        label={p.brand}
                        onChange={(n) => update(p.id, { qty: n })}
                      />
                      <button
                        type="button"
                        aria-pressed={liked}
                        aria-label={liked ? `Unlike ${p.brand}` : `Like ${p.brand}`}
                        onClick={() => update(p.id, { liked: !liked })}
                        className="grid size-10 place-items-center rounded-full hover:bg-grey-500"
                      >
                        <HeartIcon className={cn(liked && "fill-papaya-500 stroke-papaya-500")} />
                      </button>
                      <button
                        type="button"
                        aria-label={`Remove ${p.brand} from cart`}
                        onClick={() => setLines((ls) => ls.filter((l) => l.product.id !== p.id))}
                        className="grid size-10 place-items-center rounded-full text-danger hover:bg-danger/10"
                      >
                        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {savedItems.length > 0 && (
          <section aria-labelledby="liked-heading" className="border-t border-powder-200 pt-8">
            <h2 id="liked-heading" className="mb-5 font-serif text-display-xs font-medium">
              My Liked Items
            </h2>
            <ProductGrid products={savedItems} columns={4} />
            <ul className="mt-4 flex flex-wrap gap-3">
              {savedItems.map((p) => (
                <li key={p.id}>
                  <Button variant="outline" size="sm" onClick={() => moveToCart(p)}>
                    Add {p.brand} to cart
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <aside aria-label="Order summary" className="lg:sticky lg:top-40 lg:self-start">
        <div className="flex flex-col gap-5 rounded-xl border border-grey-500 bg-brown-100 p-6">
          <h2 className="font-serif text-xl font-semibold">Order summary</h2>
          <dl className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-powder-900">Items ({count})</dt>
              <dd className="font-medium">{formatAED(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-powder-900">Fees</dt>
              <dd className="font-medium">{formatAED(lines.length ? FEE : 0)}</dd>
            </div>
            <div className="flex justify-between border-t border-grey-600 pt-4 text-md">
              <dt className="font-semibold">Total</dt>
              <dd className="font-bold">AED {total.toFixed(2)}</dd>
            </div>
          </dl>
          {/* TODO: wire to checkout once the backend is connected. */}
          <Button size="lg" fullWidth disabled={lines.length === 0}>
            Checkout - AED {total.toFixed(2)}
          </Button>
        </div>
      </aside>
    </div>
  );
}
