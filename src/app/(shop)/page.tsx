import {
  CategoryTiles,
  Container,
  ProductGrid,
  PromoBanner,
  Section,
} from "@/components/sections";
import { categoryTiles, products } from "@/data/products";

export default function HomePage() {
  return (
    <Container>
      <h1 className="sr-only">Taggy — new arrivals and picks for you</h1>

      <Section title="New arrivals" href="/search?sort=new">
        <ProductGrid products={products.slice(0, 5)} />
      </Section>

      <PromoBanner
        title="Boost your Items or Feature your Wardrobe"
        description="Your items will appear on the homepage and across our social media for more visibility."
        href="/profile/boost"
      />

      <Section title="Picked for you" href="/search?sort=recommended" className="border-b border-powder-200">
        <ProductGrid products={products.slice(5, 10)} />
      </Section>

      <Section title="Shop by category" href="/discover">
        <CategoryTiles tiles={categoryTiles} />
      </Section>
    </Container>
  );
}
