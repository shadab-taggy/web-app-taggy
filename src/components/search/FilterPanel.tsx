"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const groups = [
  { id: "department", label: "Department", options: ["Women", "Men", "Children"] },
  { id: "category", label: "Category", options: ["Dresses", "Tops", "Bottoms", "Shoes", "Bags"] },
  { id: "size", label: "Size", options: ["XS / UK 6", "S / UK 8-10", "M / UK 10-12", "L / UK 12-14"] },
  { id: "condition", label: "Condition", options: ["New with tags", "Like new", "Very good", "Worn once"] },
];

/** Facet filters. State is local until the search API is connected. */
export function FilterPanel({ onApply }: { onApply?: () => void }) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const total = Object.values(selected).reduce((n, a) => n + a.length, 0);

  function toggle(group: string, option: string) {
    setSelected((s) => {
      const cur = s[group] ?? [];
      return {
        ...s,
        [group]: cur.includes(option) ? cur.filter((o) => o !== option) : [...cur, option],
      };
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onApply?.();
      }}
      className="flex flex-col gap-6"
    >
      {groups.map((g) => (
        <fieldset key={g.id} className="flex flex-col gap-2.5">
          <legend className="mb-1 font-serif text-md font-semibold">{g.label}</legend>
          {g.options.map((o) => (
            <label key={o} className="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-black">
              <input
                type="checkbox"
                checked={(selected[g.id] ?? []).includes(o)}
                onChange={() => toggle(g.id, o)}
                className="size-5 rounded-xs border-grey-800 accent-black"
              />
              {o}
            </label>
          ))}
        </fieldset>
      ))}

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-1 font-serif text-md font-semibold">Price (AED)</legend>
        <div className="grid grid-cols-2 gap-3">
          <Input aria-label="Minimum price" placeholder="Min" inputMode="numeric" />
          <Input aria-label="Maximum price" placeholder="Max" inputMode="numeric" />
        </div>
      </fieldset>

      <div className="flex gap-3">
        <Button type="submit" fullWidth>
          Apply{total ? ` (${total})` : ""}
        </Button>
        <Button type="button" variant="outline" onClick={() => setSelected({})}>
          Clear
        </Button>
      </div>
    </form>
  );
}
