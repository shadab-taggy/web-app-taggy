import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";
import { Container } from "@/components/sections";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Cart — Taggy" };

export default function CartPage() {
  return (
    <Container className="py-8">
      <h1 className="mb-8 font-serif text-display-sm font-medium">Cart</h1>
      <CartView initialItems={[products[6], products[7]]} saved={[products[0], products[1]]} />
    </Container>
  );
}
