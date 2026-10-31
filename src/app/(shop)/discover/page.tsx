import type { Metadata } from "next";
import {
  CategoryTiles,
  Container,
  ProductGrid,
  PromoBanner,
  Section,
  WardrobeCard,
} from "@/components/sections";
import { categoryTiles, products, wardrobes } from "@/data/products";

export const metadata: Metadata = { title: "Discover — Taggy" };

export default function DiscoverPage() {
  return (
    <Container>
      <h1 className="sr-only">Discover</h1>

      <Section title="Discover ThreeRs Wardrobe." href="/seller/w1">
        <WardrobeCard
          wide
          wardrobe={{ ...wardrobes[0], items: products.slice(0, 5) }}
        />
      </Section>

      <Section title="Items we think you'll love" className="border-t border-powder-200">
        <CategoryTiles tiles={categoryTiles} />
      </Section>

      <Section title="New arrivals" href="/search?sort=new">
        <ProductGrid products={products.slice(4, 9)} />
      </Section>

      <PromoBanner
        title="Boost your Items or Feature your Wardrobe"
        description="Your items will appear on the homepage and across our social media for more visibility."
        href="/profile/boost"
      />

      <Section title="Featured Wardrobes" href="/discover" className="border-t border-powder-200 mt-10">
        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {wardrobes.map((w) => (
            <li key={w.id}>
              <WardrobeCard wardrobe={w} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Items you saved" href="/profile/liked" className="border-t border-powder-200">
        <ProductGrid products={products.slice(5, 10)} />
      </Section>
    </Container>
  );
}
