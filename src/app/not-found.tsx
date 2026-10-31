import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main id="main" className="grid min-h-dvh place-items-center px-4 py-16">
      <div className="flex max-w-md flex-col items-center text-center">
        <Logo width={130} className="mb-10" />
        <p className="text-sm font-semibold uppercase tracking-wider text-papaya-700">Error 404</p>
        <h1 className="mt-2 font-serif text-display-md font-semibold">This page has left the wardrobe</h1>
        <p className="mt-3 text-md text-powder-900">
          We can’t find what you’re looking for. It may have been sold, moved or never existed.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex h-10 items-center rounded-md bg-black px-6 text-sm font-semibold text-white hover:bg-black/85">
            Back to home
          </Link>
          <Link href="/search" className="inline-flex h-10 items-center rounded-md border border-black px-6 text-sm font-semibold hover:bg-grey-500">
            Browse items
          </Link>
        </div>
      </div>
    </main>
  );
}
