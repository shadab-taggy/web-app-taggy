"use client";

import { useState } from "react";
import { Badge, CountBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import { ProductCard } from "@/components/ui/ProductCard";
import { Tabs } from "@/components/ui/Tabs";
import { products } from "@/data/products";

const swatches = [
  ["black", "#000000"],
  ["grey-500", "#edece7"],
  ["grey-600", "#d8d7d2"],
  ["grey-800", "#82827f"],
  ["blue-400", "#c2d2ed"],
  ["blue-500", "#b3c7e8"],
  ["powder-200", "#dce5f4"],
  ["powder-900", "#4b5461"],
  ["brown-100", "#fef8f1"],
  ["papaya-500", "#d17750"],
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t border-grey-500 py-8">
      <h2 className="font-serif text-display-xs font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  const [tab, setTab] = useState("new");
  const [dialog, setDialog] = useState(false);
  const [drawer, setDrawer] = useState(false);

  return (
    <main id="main" className="mx-auto w-full max-w-[var(--container-page)] px-8 py-10">
      <header className="flex items-center justify-between pb-6">
        <Logo />
        <h1 className="text-sm text-muted">Design system · Phase 1</h1>
      </header>

      <Section title="Colour">
        <div className="grid grid-cols-5 gap-3">
          {swatches.map(([name, hex]) => (
            <div key={name} className="overflow-hidden rounded-lg border border-grey-500">
              <div className="h-16" style={{ background: hex }} />
              <div className="px-3 py-2 text-xs">
                <p className="font-medium">{name}</p>
                <p className="text-muted">{hex}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <p className="font-serif text-display-md font-semibold">Playfair Display — headings</p>
        <p className="text-display-xs font-semibold">Work Sans display xs semibold</p>
        <p className="text-md">Text md regular — body copy for descriptions and forms.</p>
        <p className="text-sm text-powder-900">Text sm — meta information · XS / UK 6 · Very good</p>
        <p className="text-xs text-muted">Text xs — captions and helper text</p>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Buy Now</Button>
          <Button variant="secondary">Message seller</Button>
          <Button variant="outline">Add to cart</Button>
          <Button variant="ghost">View more</Button>
          <Button variant="danger">Delete</Button>
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid max-w-3xl grid-cols-2 gap-5">
          <Input label="Email" placeholder="email@company.com" />
          <Input label="Password" type="password" defaultValue="hunter2hunter2" />
          <Input label="With error" error="Enter a valid email address" defaultValue="oops" />
          <Input label="Disabled" disabled defaultValue="Locked" />
        </div>
      </Section>

      <Section title="Badges & tabs">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Followed</Badge>
          <Badge tone="peach">Classic &amp; Clean</Badge>
          <Badge tone="grey">Men</Badge>
          <Badge tone="papaya">New</Badge>
          <span className="relative ml-4 inline-block size-6 rounded bg-grey-500">
            <CountBadge count={10} />
          </span>
        </div>
        <Tabs
          label="Categories"
          value={tab}
          onChange={setTab}
          items={[
            { id: "new", label: "New in" },
            { id: "luxury", label: "Luxury" },
            { id: "women", label: "Women" },
            { id: "men", label: "Men" },
            { id: "children", label: "Children" },
          ]}
        />
      </Section>

      <Section title="Cards">
        <div className="grid grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Section>

      <Section title="Overlays">
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setDialog(true)}>Open dialog</Button>
          <Button variant="outline" onClick={() => setDrawer(true)}>Open drawer</Button>
        </div>
        <Modal open={dialog} onClose={() => setDialog(false)} title="Delete listing?">
          <p className="mb-5 text-md text-powder-900">This listing will be removed from your wardrobe.</p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDialog(false)}>Cancel</Button>
            <Button onClick={() => setDialog(false)}>Delete</Button>
          </div>
        </Modal>
        <Modal open={drawer} onClose={() => setDrawer(false)} title="Filters" variant="drawer">
          <p className="text-md text-powder-900">Filter controls will live here.</p>
        </Modal>
      </Section>
    </main>
  );
}
