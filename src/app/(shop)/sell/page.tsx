import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AccountIcon } from "@/components/account/AccountIcons";
import { ChevronRightIcon } from "@/components/icons";
import { Container } from "@/components/sections";

export const metadata: Metadata = { title: "Start selling — Taggy" };

const options = [
  {
    href: "/sell/new",
    icon: "tag",
    title: "List It Myself",
    desc: "Create and publish your own listing in minutes.",
    className: "border-grey-500 bg-white",
  },
  {
    href: "/sell/book-a-team",
    icon: "info",
    title: "On Your Behalf",
    desc: "We will come to your home, steam, photograph, list and package your items for you.",
    className: "border-transparent bg-[#fde8cf]",
  },
];

export default function SellPage() {
  return (
    <Container className="py-8">
      <div className="grid overflow-hidden rounded-2xl border border-grey-500 lg:grid-cols-2">
        <div className="relative min-h-72 bg-grey-500 lg:min-h-[520px]">
          <Image
            src="/images/dress-olive.png"
            alt=""
            fill
            priority
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-8 p-8 md:p-14">
          <div>
            <h1 className="font-serif text-display-sm font-semibold">Start selling on Taggy</h1>
            <p className="mt-2 text-md text-powder-900">From your wardrobe to Taggy in just a few clicks.</p>
          </div>
          <ul className="flex flex-col gap-4">
            {options.map((o) => (
              <li key={o.href}>
                <Link
                  href={o.href}
                  className={`flex items-center gap-4 rounded-lg border p-5 transition-shadow hover:shadow-popover ${o.className}`}
                >
                  <AccountIcon name={o.icon} className="size-7 shrink-0" />
                  <span className="flex-1">
                    <span className="block text-md font-semibold">{o.title}</span>
                    <span className="block text-sm">{o.desc}</span>
                  </span>
                  <ChevronRightIcon className="size-5 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
