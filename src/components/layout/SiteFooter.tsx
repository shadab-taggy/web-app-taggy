import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const columns = [
  {
    title: "Shop",
    links: [
      ["New in", "/"],
      ["Luxury", "/search?category=luxury"],
      ["Women", "/search?category=women"],
      ["Men", "/search?category=men"],
      ["Children", "/search?category=children"],
    ],
  },
  {
    title: "Sell",
    links: [
      ["Start selling", "/sell"],
      ["Listing service", "/profile/listing-service"],
      ["Book a team", "/sell/book-a-team"],
      ["How to price your items", "/guides/how-to-price-your-items"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Helpful guides", "/guides"],
      ["FAQs", "/faqs"],
      ["Contact us", "/contact"],
      ["About Taggy", "/about"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Terms & conditions", "/terms"],
      ["Privacy policy", "/privacy"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-grey-500 bg-brown-100">
      <div className="mx-auto grid w-full max-w-[var(--container-page)] gap-10 px-4 py-12 md:grid-cols-[1.4fr_repeat(4,1fr)] md:px-8">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="max-w-xs text-sm text-powder-900">
            Buy and sell pre-loved fashion. Give great pieces a second life.
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="flex flex-col gap-1">
            <h2 className="font-serif text-md font-semibold">{col.title}</h2>
            {col.links.map(([label, href]) => (
              <Link key={label} href={href} className="py-1 text-sm text-powder-900 hover:text-black hover:underline">
                {label}
              </Link>
            ))}
          </nav>
        ))}
      </div>
      <div className="border-t border-grey-600/60">
        <p className="mx-auto max-w-[var(--container-page)] px-4 py-5 text-xs text-muted md:px-8">
          © Taggy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
