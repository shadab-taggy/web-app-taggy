export interface Product {
  id: string;
  brand: string;
  size: string;
  condition: string;
  /** Price in AED. */
  price: number;
  image?: string;
  liked?: boolean;
}

export interface ProductDetail extends Product {
  title: string;
  description: string;
  deliveryNote: string;
  sellerId: string;
  details: { label: string; value: string }[];
  tags: string[];
}

export interface Seller {
  id: string;
  handle: string;
  displayName: string;
  avatar: string;
  department: string;
  bio: string;
  followers: number;
  following: number;
  rating: number;
  reviews: number;
  tags: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  unread?: boolean;
}

export interface ChatMessage {
  id: string;
  from: "them" | "me";
  text?: string;
  time: string;
  product?: { brand: string; title: string; price: number; condition: string; image: string };
}
