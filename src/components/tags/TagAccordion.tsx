"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { MAX_TAGS_PER_GROUP, tagGroups } from "@/data/tags";
import { cn } from "@/lib/cn";

/**
 * Collapsible style-tag groups. `tone` follows Figma: blue selection on
 * profile tags, papaya on listing tags.
 */
export function TagAccordion({
  tone = "blue",
  selected,
  onChange,
}: {
  tone?: "blue" | "papaya";
  selected: Record<string, string[]>;
  onChange: (next: Record<string, string[]>) => void;
}) {
  const [open, setOpen] = useState<string>(tagGroups[0].id);

  function toggle(group: string, tag: string) {
    const cur = selected[group] ?? [];
    const next = cur.includes(tag)
      ? cur.filter((t) => t !== tag)
      : [...cur, tag].slice(-MAX_TAGS_PER_GROUP);
    onChange({ ...selected, [group]: next });
  }

  return (
    <div className="flex flex-col gap-3">
      {tagGroups.map((g) => {
        const isOpen = open === g.id;
        const count = (selected[g.id] ?? []).length;
        return (
          <div
            key={g.id}
            className={cn(
              "rounded-xl border bg-white",
              tone === "papaya" ? "border-papaya-500/50" : "border-powder-200",
            )}
          >
            <h2>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`tags-${g.id}`}
                onClick={() => setOpen(isOpen ? "" : g.id)}
                className="flex w-full items-center justify-between px-5 py-3.5 text-left text-md font-semibold"
              >
                <span>
                  {g.label}
                  {count > 0 && (
                    <span className="ml-2 text-sm font-normal text-powder-900">· {count} selected</span>
                  )}
                </span>
                <ChevronDownIcon className={cn("size-5 transition-transform", isOpen && "rotate-180")} />
              </button>
            </h2>
            {isOpen && (
              <div id={`tags-${g.id}`} className="px-5 pb-5">
                <p className="mb-3 text-sm text-muted">Choose max {MAX_TAGS_PER_GROUP} tags</p>
                <div className="flex flex-wrap gap-2.5">
                  {g.tags.map((t) => {
                    const on = (selected[g.id] ?? []).includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(g.id, t)}
                        className={cn(
                          "rounded-md border px-3.5 py-2 text-sm font-medium transition-colors",
                          tone === "papaya"
                            ? on
                              ? "border-papaya-700 bg-papaya-700 text-white"
                              : "border-papaya-500/60 bg-white text-black hover:bg-brown-100"
                            : on
                              ? "border-blue-500 bg-blue-500 text-black"
                              : "border-powder-200 bg-white text-black hover:bg-grey-500",
                        )}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
