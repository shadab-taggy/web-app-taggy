import type { Metadata } from "next";
import { ProductTabsPage } from "@/components/account/ProductTabsPage";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Sold Items — Taggy" };

export default function SoldPage() {
  return (
    <ProductTabsPage
      title="Sold Items"
      action={{ href: "/sell/new", label: "Add new listing" }}
      statusLabel={{ pending: "Pending collection", delivered: "Delivered" }}
      tabs={[
        { id: "pending", label: "Pending collection", items: products.slice(0, 2) },
        { id: "delivered", label: "Collected & delivered", items: [], emptyText: "No delivered items yet." },
      ]}
    />
  );
}
