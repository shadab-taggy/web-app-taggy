import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";
import { Container } from "@/components/sections";
import { guides } from "@/data/guides";

export const metadata: Metadata = { title: "Helpful guides — Taggy" };

export default function GuidesPage() {
  const [featured, ...rest] = guides;
  return (
    <Container className="py-10 lg:py-14">
      <header className="mb-10 max-w-2xl">
        <h1 className="font-serif text-display-md font-semibold">Helpful guides</h1>
        <p className="mt-3 text-lg text-powder-900">
          Everything you need to buy, sell and get the most out of Taggy.
        </p>
      </header>

      <Link
        href={`/guides/${featured.slug}`}
        className="group mb-8 flex items-center justify-between gap-6 rounded-2xl bg-blue-500 p-8 transition-colors hover:bg-blue-400 md:p-10"
      >
        <span>
          <span className="text-xs font-semibold uppercase tracking-wider">Start here</span>
          <span className="mt-2 block font-serif text-display-xs font-semibold md:text-display-sm">
            {featured.title}
          </span>
          <span className="mt-2 block text-md">{featured.readTime}</span>
        </span>
        <ChevronRightIcon className="size-7 shrink-0 transition-transform group-hover:translate-x-1" />
      </Link>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="flex h-full flex-col justify-between gap-6 rounded-xl border border-powder-200 bg-white p-6 shadow-card transition-shadow hover:shadow-popover"
            >
              <span className="text-lg font-semibold">{g.title}</span>
              <span className="flex items-center justify-between text-sm text-powder-900">
                {g.readTime}
                <ChevronRightIcon className="size-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
