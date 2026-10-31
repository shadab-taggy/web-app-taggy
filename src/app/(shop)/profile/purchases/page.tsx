import type { Metadata } from "next";
import { ProductTabsPage } from "@/components/account/ProductTabsPage";
import { ProductGrid } from "@/components/sections";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "My Purchases — Taggy" };

export default function PurchasesPage() {
  return (
    <ProductTabsPage
      title="My Purchases"
      action={{ href: "/sell/new", label: "Add new listing" }}
      statusLabel={{ all: "Purchased" }}
      tabs={[{ id: "all", label: "Purchases", items: products.slice(2, 4) }]}
      footer={
        <section className="mt-12 border-t border-powder-200 pt-8">
          <h2 className="mb-5 font-serif text-display-xs font-medium">Recommended items</h2>
          <ProductGrid products={products.slice(0, 4)} columns={4} />
        </section>
      }
    />
  );
}
