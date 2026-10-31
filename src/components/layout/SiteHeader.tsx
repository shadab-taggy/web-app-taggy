"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BagIcon, ChatIcon, HeartIcon, MenuIcon, PlusIcon, UserIcon } from "@/components/icons";
import { NotificationsMenu } from "@/components/layout/NotificationsMenu";
import { SearchBox } from "@/components/layout/SearchBox";
import { CountBadge } from "@/components/ui/Badge";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
import { categories } from "@/data/products";
import { cn } from "@/lib/cn";

// Counts are placeholders until the backend is connected.
const counts = { cart: 10, likes: 8 };

const menuLinks = [
  { href: "/profile", label: "My profile" },
  { href: "/profile/listings", label: "My listings" },
  { href: "/profile/purchases", label: "My purchases" },
  { href: "/profile/liked", label: "My liked items" },
  { href: "/profile/settings", label: "Settings" },
  { href: "/guides", label: "Helpful guides" },
  { href: "/login", label: "Sign in" },
];

function IconLink({
  href,
  label,
  count,
  children,
}: {
  href: string;
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={count ? `${label}, ${count} new` : label}
      className="relative grid size-10 place-items-center rounded-full text-black transition-colors hover:bg-grey-500"
    >
      {children}
      {count ? <CountBadge count={count} /> : null}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-grey-500 bg-white/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[var(--container-page)] items-center gap-4 px-4 py-3 md:gap-8 md:px-8">
        <Logo />

        <SearchBox className="hidden flex-1 md:block md:max-w-2xl" />

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <Link
            href="/sell"
            className="mr-2 hidden h-10 items-center gap-2 rounded-full bg-black px-5 text-sm font-semibold text-white transition-colors hover:bg-black/85 md:inline-flex"
          >
            <PlusIcon className="size-4" />
            Sell
          </Link>
          <IconLink href="/cart" label="Cart" count={counts.cart}>
            <BagIcon />
          </IconLink>
          <IconLink href="/profile/liked" label="Liked items" count={counts.likes}>
            <HeartIcon />
          </IconLink>
          <NotificationsMenu />
          <IconLink href="/inbox" label="Inbox">
            <ChatIcon />
          </IconLink>
          <IconLink href="/profile" label="Profile">
            <UserIcon />
          </IconLink>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-grey-500 md:hidden"
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <SearchBox />
      </div>

      <nav
        aria-label="Categories"
        className="mx-auto hidden w-full max-w-[var(--container-page)] gap-1 px-8 md:flex"
      >
        {categories.map((c) => {
          const active = c.id === "new" && pathname === "/";
          return (
            <Link
              key={c.id}
              href={c.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "-mb-px border-b-2 px-4 py-2.5 text-md transition-colors",
                active
                  ? "border-powder-900 font-semibold text-black"
                  : "border-transparent text-muted hover:text-black",
              )}
            >
              {c.label}
            </Link>
          );
        })}
      </nav>

      <Modal open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu" variant="drawer">
        <nav aria-label="Menu" className="flex flex-col">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={c.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-grey-500 py-3 text-md"
            >
              {c.label}
            </Link>
          ))}
          <div className="h-4" />
          {menuLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-grey-500 py-3 text-md"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Modal>
    </header>
  );
}
