import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/sections";

export const metadata: Metadata = { title: "About Taggy" };

const paragraphs = [
  "Taggy isn't just an app, we're your resale ecosystem, Wardrobe connector, and sustainability cheerleader.",
  "Think of us as the friend who always knows where to score the best pieces (and how to let go of the ones you don't wear anymore). No fakes. No fuss. No hassle.",
  "Just curated Wardrobes filled with Taggy treasures, a resale experience done the Dubai way – fast, chic, and community-powered.",
  "For sellers, we keep things seamless. Whether you're snapping your own listings or letting our Listing Team do the heavy lifting – from steaming to styling to posting, we've got you covered.",
  "All you need to do? Sit back and watch your Wardrobe shine.",
  "At Taggy, buyers and sellers meet in one stylish space where Wardrobes connect, fashion circulates, and sustainability gets its moment in the spotlight.",
];

export default function AboutPage() {
  return (
    <Container className="py-10 lg:py-16">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-grey-500 lg:sticky lg:top-40">
          <Image
            src="/images/about-hero.png"
            alt="A model in a flowing terracotta dress against a blue sky"
            fill
            priority
            sizes="(min-width:1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-papaya-700">About Taggy</p>
          <h1 className="mt-3 font-serif text-display-md font-semibold leading-tight">
            Welcome to the Wardrobe Club.
          </h1>
          <div className="mt-8 flex max-w-2xl flex-col gap-5 text-lg leading-relaxed text-[#3f3f3f]">
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="font-medium text-black">We&apos;re so glad you&apos;re here.</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-10 items-center rounded-md bg-black px-6 text-sm font-semibold text-white transition-colors hover:bg-black/85"
            >
              Start shopping
            </Link>
            <Link
              href="/sell"
              className="inline-flex h-10 items-center rounded-md border border-black px-6 text-sm font-semibold transition-colors hover:bg-grey-500"
            >
              Start selling
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
