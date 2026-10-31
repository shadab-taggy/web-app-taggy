"use client";

import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { CameraIcon, SearchIcon } from "@/components/icons";
import { searchSuggestions } from "@/data/products";
import { cn } from "@/lib/cn";

/** Header search with typeahead dropdown (matches the "Ne…" state in Figma). */
export function SearchBox({ className }: { className?: string }) {
  const router = useRouter();
  const listId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);

  const matches = query
    ? searchSuggestions.filter((s) => s.toLowerCase().startsWith(query.toLowerCase()))
    : [];
  const showList = open && matches.length > 0;

  function submit(term: string) {
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  }

  return (
    <div className={cn("relative", className)}>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const term = active >= 0 ? matches[active] : query.trim();
          if (term) submit(term);
        }}
        className="flex h-10 items-center gap-2.5 rounded-full border border-grey-800 bg-white px-4 transition-colors focus-within:border-black focus-within:ring-1 focus-within:ring-black"
      >
        <SearchIcon className="size-5 shrink-0 text-muted" />
        <input
          type="search"
          value={query}
          placeholder="Search"
          aria-label="Search Taggy"
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-activedescendant={showList && active >= 0 ? `${listId}-opt-${active}` : undefined}
          aria-autocomplete="list"
          autoComplete="off"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => {
            if (!showList) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActive((i) => (i + 1) % matches.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActive((i) => (i <= 0 ? matches.length - 1 : i - 1));
            } else if (e.key === "Escape") setOpen(false);
          }}
          className="h-full min-w-0 flex-1 bg-transparent text-base outline-none md:text-md placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
        />
        <button
          type="button"
          aria-label="Search by image"
          className="-mr-2 grid size-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-black"
        >
          <CameraIcon className="size-5" />
        </button>
      </form>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-blue-400 bg-white shadow-popover"
        >
          {matches.map((s, i) => (
            <li
              key={s}
              id={`${listId}-opt-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault();
                submit(s);
              }}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "cursor-pointer border-b border-blue-400/60 px-5 py-3 text-md text-muted last:border-b-0",
                i === active && "bg-powder-200/60",
              )}
            >
              <strong className="font-bold text-black">{s.slice(0, query.length)}</strong>
              {s.slice(query.length)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
