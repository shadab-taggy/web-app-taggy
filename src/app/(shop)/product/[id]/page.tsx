import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BuyPanel } from "@/components/product/BuyPanel";
import { Container, ProductGrid, Section } from "@/components/sections";
import { getProduct, getSeller, productDetails } from "@/data/details";
import { products } from "@/data/products";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return productDetails.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).id);
  return { title: product ? `${product.title} — Taggy` : "Product — Taggy" };
}

async function ProductContent({ params }: Props) {
  const product = getProduct((await params).id);
  const seller = product && getSeller(product.sellerId);
  if (!product || !seller) notFound();

  const more = products.filter((p) => p.id !== product.id).slice(0, 5);

  return (
    <Container className="py-6">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-powder-900">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-black hover:underline">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/search" className="hover:text-black hover:underline">
              {product.brand}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-black">
            {product.title}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(380px,0.9fr)] lg:gap-14">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-grey-500 lg:max-h-[min(780px,calc(100vh-9rem))]">
          {product.image && (
            <Image
              src={product.image}
              alt={`${product.title}, ${product.brand}`}
              fill
              priority
              sizes="(min-width:1024px) 55vw, 100vw"
              className="object-cover"
            />
          )}
        </div>

        <div className="lg:sticky lg:top-40 lg:self-start">
          <BuyPanel product={product} seller={seller} />
        </div>
      </div>

      <Section title="Seller’s wardrobe" href={`/seller/${seller.id}`} className="mt-6 border-t border-powder-200">
        <ProductGrid products={more} />
      </Section>
    </Container>
  );
}

export default function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<Container className="py-6"><div className="aspect-[4/5] max-w-xl animate-pulse rounded-xl bg-grey-500" /></Container>}>
      <ProductContent params={params} />
    </Suspense>
  );
}
