import type { Metadata } from "next";
import Link from "next/link";
import { AccountIcon } from "@/components/account/AccountIcons";
import { PageHeader } from "@/components/account/PageHeader";
import { ChevronRightIcon } from "@/components/icons";

export const metadata: Metadata = { title: "Settings — Taggy" };

const groups = [
  {
    title: "Account",
    items: [
      { href: "/profile/edit", icon: "user", label: "My profile", desc: "Name, photo, contact details and bio" },
      { href: "/profile/password", icon: "lock", label: "Change Password", desc: "Update your password" },
      { href: "/profile/addresses", icon: "pin", label: "Address Book", desc: "Your saved addresses" },
    ],
  },
  {
    title: "Selling",
    items: [
      { href: "/profile/bank", icon: "bank", label: "Bank Details", desc: "Where your payouts are sent" },
      { href: "/profile/holidays", icon: "info", label: "Holiday Mode", desc: "Pause collections while you’re away" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { href: "/notifications", icon: "bell", label: "Notification Settings", desc: "Manage your alerts and notifications" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" />
      <div className="flex flex-col gap-10">
        {groups.map((g) => (
          <section key={g.title} aria-labelledby={`set-${g.title}`}>
            <h2 id={`set-${g.title}`} className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">
              {g.title}
            </h2>
            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {g.items.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex h-full items-center gap-4 rounded-xl border border-powder-200 bg-white p-5 shadow-card transition-shadow hover:shadow-popover"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-powder-200">
                      <AccountIcon name={l.icon} className="size-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-md font-semibold">{l.label}</span>
                      <span className="block text-sm text-powder-900">{l.desc}</span>
                    </span>
                    <ChevronRightIcon className="size-5 shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <div className="border-t border-grey-500 pt-6">
          <Link
            href="/login"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-grey-600 px-5 text-sm font-semibold text-danger transition-colors hover:bg-danger/10"
          >
            <AccountIcon name="logout" className="size-4" /> Log out
          </Link>
        </div>
      </div>
    </div>
  );
}
