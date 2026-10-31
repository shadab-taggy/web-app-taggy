import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/sections";
import { SellerHeader } from "@/components/seller/SellerHeader";
import { SellerTabs } from "@/components/seller/SellerTabs";
import { getSeller, reviews, sellers } from "@/data/details";
import { products } from "@/data/products";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return sellers.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const seller = getSeller((await params).id);
  return { title: seller ? `${seller.handle} — Taggy` : "Seller — Taggy" };
}

async function SellerContent({ params }: Props) {
  const seller = getSeller((await params).id);
  if (!seller) notFound();

  return (
    <Container className="flex flex-col gap-10 py-8">
      <SellerHeader seller={seller} />
      <SellerTabs listings={products} reviews={reviews} totalListings={47} />
    </Container>
  );
}

export default function SellerPage({ params }: Props) {
  return (
    <Suspense fallback={<Container className="py-8"><div className="h-32 animate-pulse rounded-xl bg-grey-500" /></Container>}>
      <SellerContent params={params} />
    </Suspense>
  );
}
