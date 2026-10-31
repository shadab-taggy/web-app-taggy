import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/account/PageHeader";

export const metadata: Metadata = { title: "Tagged Issue — Taggy" };

export default function TaggedIssuePage() {
  return (
    <div>
      <PageHeader title="Tagged Issue" />
      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section aria-labelledby="issues-heading">
          <h2 id="issues-heading" className="sr-only">
            Your tagged issues
          </h2>
          <div className="overflow-hidden rounded-xl border border-grey-500 bg-white shadow-card">
            <div className="grid place-items-center gap-2 px-6 py-20 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-powder-200" aria-hidden>
                <svg viewBox="0 0 24 24" className="size-7 text-powder-900" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8.500 12.500 2.500 2.500 4.500-5" />
                </svg>
              </span>
              <p className="font-serif text-xl font-semibold">No tagged issues</p>
              <p className="max-w-sm text-sm text-powder-900">
                Issues you report on purchased items will be tracked here.
              </p>
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-xl border border-grey-500 bg-brown-100 p-6">
          <h2 className="font-serif text-xl font-semibold">How tagged issues work</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-[#3f3f3f]">
            <p>
              While it may not be our favorite feature, Taggy serves an important purpose as a safe and
              dependable shopping platform.
            </p>
            <p>
              This is where you can find any issues related to items you&apos;ve purchased that have been tagged.
            </p>
            <p>
              To report an issue with a purchase, simply go to the &lsquo;My Purchases&rsquo; tab in your account menu.
            </p>
          </div>
          <Link
            href="/profile/purchases"
            className="mt-6 inline-flex h-10 items-center rounded-md bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-black/85"
          >
            Go to My Purchases
          </Link>
        </aside>
      </div>
    </div>
  );
}
