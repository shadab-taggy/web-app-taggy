"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BellIcon } from "@/components/icons";
import { NoticeIcon } from "@/components/notifications/NoticeIcon";
import { CountBadge } from "@/components/ui/Badge";
import { initialNotices } from "@/data/notifications";
import { cn } from "@/lib/cn";

/** Header bell: unread badge + dropdown preview of the latest notifications. */
export function NotificationsMenu() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(initialNotices);
  const ref = useRef<HTMLDivElement>(null);
  const unread = items.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={unread ? `Notifications, ${unread} new` : "Notifications"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative grid size-10 place-items-center rounded-full transition-colors hover:bg-grey-500",
          open && "bg-grey-500",
        )}
      >
        <BellIcon />
        <CountBadge count={unread} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Notifications"
          className="absolute right-0 top-full z-50 mt-2 w-[min(92vw,400px)] overflow-hidden rounded-xl border border-grey-500 bg-white shadow-popover"
        >
          <div className="flex items-center justify-between border-b border-grey-500 px-5 py-3.5">
            <h2 className="font-serif text-lg font-semibold">Notifications</h2>
            <button
              type="button"
              disabled={!unread}
              onClick={() => setItems((x) => x.map((n) => ({ ...n, read: true })))}
              className="text-xs font-medium text-powder-900 hover:text-black disabled:opacity-40"
            >
              Mark all as read
            </button>
          </div>
          <ul className="max-h-[380px] overflow-y-auto">
            {items.slice(0, 4).map((n) => (
              <li key={n.id} className={cn("border-b border-grey-500 last:border-b-0", !n.read && "bg-powder-200/40")}>
                <Link
                  href={n.href}
                  onClick={() => {
                    setItems((x) => x.map((y) => (y.id === n.id ? { ...y, read: true } : y)));
                    setOpen(false);
                  }}
                  className="flex items-start gap-3 px-5 py-3.5 hover:bg-grey-500/40"
                >
                  <NoticeIcon type={n.type} className="size-10" />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold">{n.title}</span>
                      <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted">
                        {n.time}
                        {!n.read && <span className="size-2 rounded-full bg-papaya-500" aria-label="Unread" />}
                      </span>
                    </span>
                    <span className="line-clamp-2 text-xs text-powder-900">{n.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/notifications"
            onClick={() => setOpen(false)}
            className="block border-t border-grey-500 bg-brown-100 px-5 py-3 text-center text-sm font-semibold hover:bg-grey-500/60"
          >
            View all notifications
          </Link>
        </div>
      )}
    </div>
  );
}
