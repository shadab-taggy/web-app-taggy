import type { Product } from "@/lib/types";

// Mock data mirroring the Figma sample content. Replace with API calls later.
const img = (name: string) => `/images/${name}.webp`;

export const products: Product[] = [
  { id: "p1", brand: "Zimmermann", size: "XS / UK 6", condition: "Very good", price: 225, image: img("dress-floral") },
  { id: "p2", brand: "Polo Ralph Lauren", size: "S / UK 8-10", condition: "Very good", price: 45, image: img("dress-blue-lace") },
  { id: "p3", brand: "Zimmermann", size: "XS / UK 6", condition: "Very good", price: 225, image: img("dress-maroon") },
  { id: "p4", brand: "Polo Ralph Lauren", size: "S / UK 8-10", condition: "Very good", price: 45, image: img("set-cream") },
  { id: "p5", brand: "Zimmermann", size: "XS / UK 6", condition: "Very good", price: 225, image: img("dress-navy") },
  { id: "p6", brand: "Polo Ralph Lauren", size: "S / UK 8-10", condition: "Very good", price: 45, image: img("dress-olive") },
  { id: "p7", brand: "Zimmermann", size: "XS / UK 6", condition: "Very good", price: 225, image: img("dress-lilac") },
  { id: "p8", brand: "Polo Ralph Lauren", size: "S / UK 8-10", condition: "Very good", price: 45, image: img("dress-rose") },
  { id: "p9", brand: "Zimmermann", size: "XS / UK 6", condition: "Very good", price: 225, image: img("dress-black") },
  { id: "p10", brand: "Polo Ralph Lauren", size: "S / UK 8-10", condition: "Very good", price: 45, image: img("dress-teal") },
];

export const categories = [
  { id: "new", label: "New in", href: "/" },
  { id: "luxury", label: "Luxury", href: "/search?category=luxury" },
  { id: "women", label: "Women", href: "/search?category=women" },
  { id: "men", label: "Men", href: "/search?category=men" },
  { id: "children", label: "Children", href: "/search?category=children" },
];

export const categoryTiles = [
  { id: "tops", label: "Tops", count: 28, image: img("dress-teal") },
  { id: "bottoms", label: "Bottoms", count: 28, image: img("dress-lilac") },
  { id: "dresses", label: "Dresses", count: 28, image: img("dress-rose") },
  { id: "shoes", label: "Shoes", count: 28, image: img("trousers-beige") },
  { id: "bags", label: "Bags", count: 28, image: img("bag-orange") },
];

export const wardrobes = [
  {
    id: "w1",
    name: "ThreeRs",
    avatar: img("avatar-seller"),
    items: [products[8], products[1]],
  },
  {
    id: "w2",
    name: "Lucy Dahlin",
    avatar: img("wardrobe-house"),
    items: [products[0], products[2]],
  },
  {
    id: "w3",
    name: "Maison Noor",
    avatar: img("avatar-seller"),
    items: [products[4], products[5]],
  },
];

export const searchSuggestions = [
  "New Arrivals",
  "New pants",
  "New shirts",
  "New Shoes",
  "New Skirts",
  "New tops",
];
