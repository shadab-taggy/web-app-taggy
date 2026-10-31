import type { Metadata } from "next";
import Link from "next/link";
import { AccountIcon } from "@/components/account/AccountIcons";
import { ChevronRightIcon } from "@/components/icons";
import { Avatar, Stars } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { accountLinks } from "@/data/account";

export const metadata: Metadata = { title: "Profile — Taggy" };

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="sr-only">Profile</h1>
      <section className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <Avatar name="Lucydahlin" src="/images/wardrobe-house.png" size={112} className="size-24 sm:size-28" />
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-serif text-display-xs font-semibold">@Lucydahlin</p>
            <Badge className="px-2.5 py-1 text-sm">Men</Badge>
          </div>
          <Stars rating={0} count={0} />
          <div className="max-w-lg">
            <div className="mb-1.5 flex justify-between text-sm">
              <span>Profile 66% complete</span>
              <Link href="/profile/edit" className="font-medium underline">
                Complete profile
              </Link>
            </div>
            <div
              role="progressbar"
              aria-valuenow={66}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Profile completion"
              className="h-2.5 overflow-hidden rounded-full bg-powder-200"
            >
              <div className="h-full w-[66%] rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      </section>

      <ul className="flex flex-wrap gap-2" aria-label="Your tags">
        {["Classic & Clean", "Relaxed & Casual", "Smart Everyday"].map((t) => (
          <li key={t}>
            <Badge tone="peach" className="px-3 py-1.5 text-sm">
              {t}
            </Badge>
          </li>
        ))}
      </ul>

      <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {accountLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="flex h-full items-center gap-4 rounded-lg border border-powder-200 bg-white p-4 shadow-card transition-shadow hover:shadow-popover"
            >
              <AccountIcon name={l.icon} className="size-6 shrink-0" />
              <span className="flex-1">
                <span className="block text-md font-semibold">{l.label}</span>
                <span className="block text-sm text-powder-900">{l.desc}</span>
              </span>
              <ChevronRightIcon className="size-5 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
