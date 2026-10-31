"use client";

import { useState } from "react";
import { PageHeader } from "@/components/account/PageHeader";
import { TagAccordion } from "@/components/tags/TagAccordion";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";

export function ManageTags() {
  const [tab, setTab] = useState("mine");
  // Tags are keyed per tab so each audience keeps its own picks.
  const [selected, setSelected] = useState<Record<string, Record<string, string[]>>>({});
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-3xl">
      <PageHeader title="Manage Tags" />
      <Tabs
        label="Tag audiences"
        value={tab}
        onChange={(t) => {
          setTab(t);
          setSaved(false);
        }}
        items={[
          { id: "mine", label: "My Tags" },
          { id: "men", label: "Men tag" },
          { id: "women", label: "Women tags" },
          { id: "kids", label: "Kids tags" },
        ]}
        className="mb-6"
      />
      <h2 className="font-serif text-display-xs font-semibold">My tags</h2>
      <p className="mb-6 mt-1 text-sm text-powder-900">
        Your tags are the finishing touch to your Taggy world, acting as your unique style fingerprint
        that shapes your discoveries.
      </p>
      <TagAccordion
        selected={selected[tab] ?? {}}
        onChange={(next) => {
          setSelected((s) => ({ ...s, [tab]: next }));
          setSaved(false);
        }}
      />
      <div className="mt-8 flex items-center gap-4">
        {/* TODO: persist tags via the backend. */}
        <Button size="lg" onClick={() => setSaved(true)}>
          Save tags
        </Button>
        <p role="status" className="text-sm text-powder-900">
          {saved ? "Tags saved ✓" : ""}
        </p>
      </div>
    </div>
  );
}
