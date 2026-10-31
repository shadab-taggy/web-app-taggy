import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/cn";

/** Standard page container: max width + consistent gutters. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[var(--container-page)] px-4 md:px-8", className)}>
      {children}
    </div>
  );
}

/** Serif section title with "View more" link, as on the mobile Home. */
export function SectionHeader({
  title,
  href,
  id,
}: {
  title: string;
  href?: string;
  id?: string;
}) {
  return (
    <div className="mb-5 flex items-baseline justify-between gap-4">
      <h2 id={id} className="font-serif text-display-xs font-medium text-black">
        {title}
      </h2>
      {href && (
        <Link href={href} className="-my-1.5 py-1.5 text-sm font-medium text-black hover:underline">
          View more
        </Link>
      )}
    </div>
  );
}

export function ProductGrid({
  products,
  columns = 5,
}: {
  products: Product[];
  columns?: 4 | 5;
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5",
        columns === 5 ? "lg:grid-cols-4 xl:grid-cols-5" : "lg:grid-cols-4",
      )}
    >
      {products.map((p) => (
        <li key={p.id}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}

export function Section({
  title,
  href,
  children,
  className,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-10", className)}>
      <SectionHeader title={title} href={href} />
      {children}
    </section>
  );
}

export function CategoryTiles({
  tiles,
}: {
  tiles: { id: string; label: string; count: number; image: string }[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((t) => (
        <li key={t.id}>
          <Link
            href={`/search?category=${t.id}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-lg bg-grey-500"
          >
            <Image
              src={t.image}
              alt=""
              fill
              sizes="(min-width:1024px) 20vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-x-0 bottom-0 bg-white/55 px-4 py-3 backdrop-blur-sm">
              <span className="block text-md font-medium text-black">{t.label}</span>
              <span className="block text-sm text-powder-900">{t.count} items</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PromoBanner({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-6 rounded-lg bg-blue-500 px-6 py-5 transition-colors hover:bg-blue-400 md:px-8 md:py-6"
    >
      <span>
        <span className="block text-md font-semibold text-black md:text-lg">{title}</span>
        <span className="mt-1 block text-sm text-black md:text-md">{description}</span>
      </span>
      <ChevronRightIcon className="size-6 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function WardrobeCard({
  wardrobe,
  wide = false,
}: {
  wardrobe: { id: string; name: string; avatar: string; items: Product[] };
  /** Lay items out in a single row (desktop hero wardrobe). */
  wide?: boolean;
}) {
  return (
    <article className="rounded-xl border border-grey-500 bg-white p-4 shadow-card">
      <Link href={`/seller/${wardrobe.id}`} className="mb-3 flex items-center gap-3">
        <span className="relative size-10 overflow-hidden rounded-full bg-grey-500">
          <Image src={wardrobe.avatar} alt="" fill sizes="40px" className="object-cover" />
        </span>
        <span>
          <span className="block text-sm font-semibold text-black">{wardrobe.name}</span>
          <span className="block text-xs text-muted">Wardrobe</span>
        </span>
      </Link>
      <ul className={cn("grid grid-cols-2 gap-3", wide && "md:grid-cols-4 lg:grid-cols-5")}>
        {wardrobe.items.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} compact />
          </li>
        ))}
      </ul>
    </article>
  );
}
