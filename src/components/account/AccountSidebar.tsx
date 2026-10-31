"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountIcon } from "@/components/account/AccountIcons";
import { Avatar } from "@/components/ui/Avatar";
import { accountLinks } from "@/data/account";
import { cn } from "@/lib/cn";

export function AccountSidebar() {
  const pathname = usePathname();
  const onSettings = ["/profile/edit", "/profile/bank", "/profile/addresses", "/profile/password", "/profile/holidays"];

  return (
    <nav aria-label="Account" className="flex flex-col gap-1">
      <Link href="/profile" className="mb-4 flex items-center gap-3 rounded-lg p-2 hover:bg-grey-500/50">
        <Avatar name="Lucydahlin" src="/images/wardrobe-house.webp" size={48} />
        <span>
          <span className="block text-md font-semibold">@Lucydahlin</span>
          <span className="block text-xs text-powder-900">View profile</span>
        </span>
      </Link>

      {accountLinks.map((l) => {
        const active =
          pathname === l.href ||
          (l.href === "/profile/settings" && onSettings.includes(pathname));
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
              active ? "bg-blue-500 font-semibold text-black" : "text-black hover:bg-grey-500/60",
            )}
          >
            <AccountIcon name={l.icon} className="size-5 shrink-0" />
            <span className="truncate">{l.label.replace(" or Feature wardrobe", "")}</span>
          </Link>
        );
      })}
    </nav>
  );
}
