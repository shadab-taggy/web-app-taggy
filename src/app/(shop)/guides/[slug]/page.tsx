import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { RichBlocks } from "@/components/content/RichBlocks";
import { ArrowLeftIcon, ChevronRightIcon } from "@/components/icons";
import { Container } from "@/components/sections";
import { guides } from "@/data/guides";
import { cn } from "@/lib/cn";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  return { title: guide ? `${guide.title} — Taggy` : "Guide — Taggy" };
}

async function GuideContent({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();
  const more = guides.filter((g) => g.slug !== slug).slice(0, 3);

  return (
    <Container className="py-8 lg:py-12">
      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="Guides" className="sticky top-40">
            <Link href="/guides" className="-ml-1 mb-2 inline-flex items-center gap-1.5 px-1 py-2 text-sm text-powder-900 hover:text-black">
              <ArrowLeftIcon className="size-4" /> All guides
            </Link>
            <ul className="flex flex-col gap-0.5">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    aria-current={g.slug === slug ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 text-sm transition-colors",
                      g.slug === slug ? "bg-blue-500 font-semibold" : "hover:bg-grey-500/60",
                    )}
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <article className="max-w-2xl">
          <Link href="/guides" className="-ml-1 mb-2 inline-flex items-center gap-1.5 px-1 py-2 text-sm text-powder-900 hover:text-black lg:hidden">
            <ArrowLeftIcon className="size-4" /> All guides
          </Link>
          <p className="text-sm text-powder-900">{guide.readTime}</p>
          <h1 className="mb-8 mt-2 font-serif text-display-md font-semibold leading-tight">{guide.title}</h1>
          <RichBlocks blocks={guide.blocks} />

          <section aria-labelledby="more-guides" className="mt-14 border-t border-powder-200 pt-8">
            <h2 id="more-guides" className="mb-4 text-xl font-medium">
              Read more guides
            </h2>
            <ul className="grid gap-3">
              {more.map((g) => (
                <li key={g.slug}>
                  <Link
                    href={`/guides/${g.slug}`}
                    className="flex items-center justify-between gap-4 rounded-xl border border-powder-200 p-4 transition-shadow hover:shadow-popover"
                  >
                    <span>
                      <span className="block text-md font-medium">{g.title}</span>
                      <span className="block text-sm text-powder-900">{g.readTime}</span>
                    </span>
                    <ChevronRightIcon className="size-4 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </Container>
  );
}

export default function GuidePage({ params }: Props) {
  return (
    <Suspense fallback={<Container className="py-12"><div className="h-64 max-w-2xl animate-pulse rounded-xl bg-grey-500" /></Container>}>
      <GuideContent params={params} />
    </Suspense>
  );
}
