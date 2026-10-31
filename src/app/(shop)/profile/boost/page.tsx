import type { Metadata } from "next";
import { ProductTabsPage } from "@/components/account/ProductTabsPage";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Boost Item(s) — Taggy" };

export default function BoostPage() {
  return (
    <ProductTabsPage
      title="Boost Item(s)"
      action={{ href: "/profile/listings", label: "Boost item", icon: false }}
      intro="Boosted items appear higher in Taggy's user results. You can choose a boosting period of either 3 or 7 days."
      statusLabel={{ boosted: "Boosted" }}
      tabs={[
        { id: "boosted", label: "Boosted items", items: products.slice(0, 2) },
        { id: "wardrobe", label: "Feature wardrobe", items: [], emptyText: "Your wardrobe isn't featured yet." },
      ]}
    />
  );
}
