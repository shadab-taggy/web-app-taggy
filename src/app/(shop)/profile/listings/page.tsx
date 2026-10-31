import type { Metadata } from "next";
import { ProductTabsPage } from "@/components/account/ProductTabsPage";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "My Listings — Taggy" };

export default function MyListingsPage() {
  return (
    <ProductTabsPage
      title="My Listings"
      action={{ href: "/sell/new", label: "Add new listing" }}
      overlay="listing"
      statusLabel={{ active: "Active", sold: "Sold" }}
      tabs={[
        { id: "active", label: "Active", items: products.slice(0, 4) },
        { id: "drafts", label: "Drafts", items: [], emptyText: "No drafts yet. Saved drafts appear here." },
        { id: "sold", label: "Sold", items: products.slice(4, 6) },
      ]}
    />
  );
}
