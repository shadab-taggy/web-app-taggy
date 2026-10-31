"use client";

import { useState } from "react";
import { SearchIcon } from "@/components/icons";
import type { FaqGroup } from "@/lib/content";

/** Searchable FAQ accordion using native <details> for built-in a11y. */
export function FaqView({ groups }: { groups: FaqGroup[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const filtered = groups
    .map((g) => ({
      ...g,
      items: g.items.filter((i) => !q || `${i.question} ${i.answer.join(" ")}`.toLowerCase().includes(q)),
    }))
    .filter((g) => g.items.length);

  return (
    <div>
      <label className="mb-10 flex h-10 max-w-xl items-center gap-3 rounded-full border border-grey-600 px-5 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
        <SearchIcon className="size-5 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search FAQs"
          aria-label="Search FAQs"
          className="h-full min-w-0 flex-1 bg-transparent text-base outline-none md:text-md placeholder:text-muted"
        />
      </label>

      <p className="sr-only" aria-live="polite">
        {q ? `${filtered.reduce((n, g) => n + g.items.length, 0)} results` : ""}
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-grey-600 py-16 text-center text-md text-powder-900">
          No questions match “{query}”.
        </p>
      ) : (
        <div className="flex flex-col gap-12">
          {filtered.map((g) => (
            <section key={g.title} aria-label={g.title}>
              {g.title !== "FAQs" && (
                <h2 className="mb-4 font-serif text-display-xs font-semibold">{g.title}</h2>
              )}
              <div className="divide-y divide-grey-500 rounded-xl border border-grey-500 bg-white">
                {g.items.map((item) => (
                  <details key={item.question} className="group" open={!!q}>
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-md font-semibold marker:hidden hover:bg-grey-500/30 [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <svg viewBox="0 0 24 24" className="size-5 shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="flex flex-col gap-3 px-6 pb-6 text-md leading-relaxed text-[#3f3f3f]">
                      {item.answer.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
