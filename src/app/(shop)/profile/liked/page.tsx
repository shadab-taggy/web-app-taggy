import type { Metadata } from "next";
import { ProductTabsPage } from "@/components/account/ProductTabsPage";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "My Liked Items — Taggy" };

export default function LikedPage() {
  return (
    <ProductTabsPage
      title="My Liked Items"
      defaultView="grid"
      tabs={[{ id: "liked", label: "Liked", items: products.slice(4, 10), emptyText: "Items you like will appear here." }]}
    />
  );
}
