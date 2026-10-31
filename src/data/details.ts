import { products } from "@/data/products";
import type {
  ChatMessage,
  Conversation,
  ProductDetail,
  Review,
  Seller,
} from "@/lib/types";

// Mock detail data mirroring the Figma sample content. Replace with API calls later.
export const sellers: Seller[] = [
  {
    id: "w2",
    handle: "Lucydahlin",
    displayName: "Lucydahlin Healin",
    avatar: "/images/wardrobe-house.png",
    department: "Women",
    bio: "Happy shopping! Any questions I am here to help anytime anywhere.",
    followers: 50,
    following: 2,
    rating: 4.7,
    reviews: 52,
    tags: ["Making connections", "Covered & chic", "Social butterfly", "Transparent", "Gray"],
  },
  {
    id: "w1",
    handle: "ThreeRs",
    displayName: "ThreeRs Wardrobe",
    avatar: "/images/avatar-seller.png",
    department: "Women",
    bio: "Curated designer pieces, lovingly worn once.",
    followers: 128,
    following: 12,
    rating: 4.9,
    reviews: 87,
    tags: ["Classic & Clean", "Bold & Confident"],
  },
  {
    id: "w3",
    handle: "MaisonNoor",
    displayName: "Maison Noor",
    avatar: "/images/avatar-seller.png",
    department: "Women",
    bio: "Evening wear and occasion dresses.",
    followers: 64,
    following: 9,
    rating: 4.6,
    reviews: 31,
    tags: ["Evenings Out", "Laid-Back Luxe"],
  },
];

export function getSeller(id: string) {
  return sellers.find((s) => s.id === id);
}

interface Copy { title: string; description: string; color: string; category: string; fabric: string }

// Copy written to match each product photo. Replace with API data later.
const copy: Record<string, Copy> = {
  p1: { title: "Zimmermann floral silk maxi dress", description: "Pale green maxi dress with a painted orchid print and a high side split.", color: "Green", category: "Dresses", fabric: "Silk" },
  p2: { title: "Polo Ralph Lauren lace maxi dress", description: "Powder-blue lace gown with a strapless neckline and a fitted bodice.", color: "Blue", category: "Dresses", fabric: "Lace" },
  p3: { title: "Zimmermann off-shoulder sheer gown", description: "Burgundy gown with long sleeves, an off-the-shoulder neckline and sheer panels.", color: "Burgundy", category: "Dresses", fabric: "Polyester" },
  p4: { title: "Polo Ralph Lauren wide-leg trouser set", description: "Cream sleeveless shirt with matching wide-leg trousers. Sold as a set.", color: "Cream", category: "Co-ord sets", fabric: "Linen blend" },
  p5: { title: "Zimmermann satin halter gown", description: "Navy satin halter gown with a keyhole front and a thigh-high split.", color: "Navy", category: "Dresses", fabric: "Satin" },
  p6: { title: "Polo Ralph Lauren draped satin gown", description: "Olive one-shoulder gown with a ruched waist and a side split.", color: "Olive", category: "Dresses", fabric: "Satin" },
  p7: { title: "Zimmermann ruched satin dress", description: "Lilac strapless dress with a ruched bodice and a front slit.", color: "Lilac", category: "Dresses", fabric: "Satin" },
  p8: { title: "Polo Ralph Lauren rose satin gown", description: "Dusty-rose one-shoulder gown with soft draped detailing.", color: "Pink", category: "Dresses", fabric: "Satin" },
  p9: { title: "Zimmermann cut-out maxi dress", description: "Black maxi dress with sculpted cut-outs and a high split.", color: "Black", category: "Dresses", fabric: "Crepe" },
  p10: { title: "Polo Ralph Lauren teal halter gown", description: "Teal satin halter gown with a floor-length skirt and a side split.", color: "Teal", category: "Dresses", fabric: "Satin" },
};

export const productDetails: ProductDetail[] = products.map((p) => {
  const c = copy[p.id];
  return {
    ...p,
    title: c.title,
    description: c.description,
    deliveryNote: "3 days delivery (seller dependent)",
    sellerId: "w2",
    details: [
      { label: "Department", value: "Female" },
      { label: "Fit", value: "True to size" },
      { label: "Color", value: c.color },
      { label: "Category", value: c.category },
      { label: "Brand", value: p.brand },
      { label: "Size", value: p.size },
      { label: "Condition", value: p.condition },
      { label: "Fabric", value: c.fabric },
    ],
    tags: ["Making connections", "Covered & chic", "Social butterfly", "Transparent", "Gray"],
  };
});

export function getProduct(id: string) {
  return productDetails.find((p) => p.id === id);
}

export const reviews: Review[] = [
  { id: "r1", author: "Alex", rating: 5, date: "2 weeks ago", text: "Exactly as described and arrived quickly. Lovely packaging too." },
  { id: "r2", author: "Jordan", rating: 5, date: "1 month ago", text: "Great communication, dress was in perfect condition." },
  { id: "r3", author: "Taylor", rating: 4, date: "2 months ago", text: "Lovely piece. Slightly longer delivery than expected but worth it." },
];

export const conversations: Conversation[] = [
  { id: "c1", name: "Christina", preview: "What styles of overcoats do you have in your collection?", time: "2h", unread: true },
  { id: "c2", name: "Alex", preview: "I'm interested in seeing the different styles of overcoats you offer.", time: "5h" },
  { id: "c3", name: "Jordan", preview: "Could you provide some insights into your overcoat selection?", time: "7h" },
  { id: "c4", name: "Taylor", preview: "I'm excited to discover the overcoats available for purchase.", time: "1d" },
  { id: "c5", name: "Morgan", preview: "I can't wait to explore your range of overcoat styles.", time: "1d" },
  { id: "c6", name: "Riley", preview: "I'd appreciate more information about your overcoat collection.", time: "2d" },
  { id: "c7", name: "Casey", preview: "I'm keen to check out the overcoats you have in stock.", time: "3d" },
];

export const threads: Record<string, ChatMessage[]> = {
  c1: [
    { id: "m1", from: "them", text: "What styles of overcoats do you have in your collection?", time: "10:02" },
    { id: "m2", from: "them", text: "I am interested to buy one,", time: "10:02" },
    {
      id: "m3",
      from: "me",
      text: "Hi Christina, yes I can share some of my overcoat listings here.",
      time: "10:02",
      product: {
        brand: "BURBERRY",
        title: "Kensington Trench Coat",
        price: 150,
        condition: "Excellent",
        image: "/images/set-cream.png",
      },
    },
  ],
};
