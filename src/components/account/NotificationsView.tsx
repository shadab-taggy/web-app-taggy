"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckIcon, CloseIcon, SearchIcon } from "@/components/icons";
import { NoticeIcon } from "@/components/notifications/NoticeIcon";
import { Toggle } from "@/components/ui/Fields";
import { initialNotices, type Notice, type NoticeFilter } from "@/data/notifications";
import { cn } from "@/lib/cn";

const prefs = [
  { id: "messages", label: "Messages", desc: "New chats from buyers and sellers" },
  { id: "offers", label: "Offers", desc: "Offers made and received" },
  { id: "saves", label: "Likes & saves", desc: "When someone saves your items" },
  { id: "orders", label: "Order updates", desc: "Sales, collection and delivery" },
  { id: "email", label: "Email digest", desc: "A weekly summary in your inbox" },
];

export function NotificationsView() {
  const [items, setItems] = useState<Notice[]>(initialNotices);
  const [filter, setFilter] = useState<NoticeFilter>("all");
  const [query, setQuery] = useState("");
  const [on, setOn] = useState<Record<string, boolean>>({ messages: true, offers: true, saves: true, orders: true, email: false });

  const unread = items.filter((n) => !n.read).length;
  const counts: Record<NoticeFilter, number> = { all: items.length, unread, read: items.length - unread };
  const visible = items.filter(
    (n) =>
      (filter === "all" || (filter === "unread" ? !n.read : n.read)) &&
      `${n.title} ${n.text}`.toLowerCase().includes(query.toLowerCase()),
  );
  const groups = (["Today", "Earlier"] as const)
    .map((g) => ({ name: g, list: visible.filter((n) => n.group === g) }))
    .filter((g) => g.list.length);

  const setRead = (id: string, read: boolean) =>
    setItems((x) => x.map((n) => (n.id === id ? { ...n, read } : n)));

  return (
    <div className="py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-display-sm font-medium">Notifications</h1>
          <p className="mt-1 text-sm text-powder-900" aria-live="polite">
            {unread > 0 ? `${unread} unread` : "You’re all caught up"}
          </p>
        </div>
        <button
          type="button"
          disabled={unread === 0}
          onClick={() => setItems((x) => x.map((n) => ({ ...n, read: true })))}
          className="inline-flex h-10 items-center gap-2 rounded-md border border-black px-4 text-sm font-semibold transition-colors hover:bg-grey-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CheckIcon className="size-4" /> Mark all as read
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <section aria-label="Notification list">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div role="group" aria-label="Filter notifications" className="flex gap-2">
              {(["all", "unread", "read"] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium capitalize transition-colors",
                    filter === f ? "border-black bg-black text-white" : "border-grey-600 hover:bg-grey-500",
                  )}
                >
                  {f}
                  <span className={cn("text-xs", filter === f ? "text-white/70" : "text-muted")}>{counts[f]}</span>
                </button>
              ))}
            </div>
            <label className="flex h-9 w-full items-center gap-2 rounded-full border border-grey-600 px-3.5 focus-within:border-black focus-within:ring-1 focus-within:ring-black sm:w-64">
              <SearchIcon className="size-4 text-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notifications"
                aria-label="Search notifications"
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              />
            </label>
          </div>

          {groups.length === 0 ? (
            <div className="grid place-items-center gap-2 rounded-xl border border-dashed border-grey-600 py-20 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-powder-200">
                <CheckIcon className="size-7 text-powder-900" />
              </span>
              <h2 className="font-serif text-xl font-semibold">Nothing to show</h2>
              <p className="text-sm text-powder-900">
                {query ? "No notifications match your search." : "New activity will appear here."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              {groups.map((g) => (
                <div key={g.name}>
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">{g.name}</h2>
                  <ul className="overflow-hidden rounded-xl border border-grey-500 bg-white shadow-card">
                    {g.list.map((n) => (
                      <li
                        key={n.id}
                        className={cn(
                          "group relative border-b border-grey-500 last:border-b-0",
                          !n.read && "bg-powder-200/40",
                        )}
                      >
                        <Link
                          href={n.href}
                          onClick={() => setRead(n.id, true)}
                          className="flex items-start gap-4 px-5 py-4 pr-28 outline-offset-[-2px] transition-colors hover:bg-grey-500/40"
                        >
                          <NoticeIcon type={n.type} />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-center gap-2">
                              <span className={cn("text-md", n.read ? "font-medium" : "font-semibold")}>{n.title}</span>
                              {!n.read && <span className="size-2 rounded-full bg-papaya-500" aria-label="Unread" />}
                            </span>
                            <span className="mt-0.5 block text-sm text-powder-900">{n.text}</span>
                          </span>
                          <span className="shrink-0 text-sm text-muted transition-opacity group-focus-within:opacity-0 group-hover:opacity-0">
                            {n.time}
                          </span>
                        </Link>
                        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 gap-1 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => setRead(n.id, !n.read)}
                            aria-label={n.read ? `Mark “${n.title}” as unread` : `Mark “${n.title}” as read`}
                            title={n.read ? "Mark as unread" : "Mark as read"}
                            className="grid size-9 place-items-center rounded-full hover:bg-black/10"
                          >
                            <CheckIcon className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setItems((x) => x.filter((y) => y.id !== n.id))}
                            aria-label={`Dismiss “${n.title}”`}
                            title="Dismiss"
                            className="grid size-9 place-items-center rounded-full hover:bg-black/10"
                          >
                            <CloseIcon className="size-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside aria-labelledby="prefs-heading" className="lg:sticky lg:top-40 lg:self-start">
          <div className="rounded-xl border border-grey-500 bg-brown-100 p-6">
            <h2 id="prefs-heading" className="font-serif text-xl font-semibold">
              Notification settings
            </h2>
            <p className="mt-1 text-sm text-powder-900">Choose what you want to hear about.</p>
            <ul className="mt-5 flex flex-col gap-4">
              {prefs.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-4">
                  <span>
                    <span className="block text-sm font-semibold">{p.label}</span>
                    <span className="block text-xs text-powder-900">{p.desc}</span>
                  </span>
                  {/* TODO: persist preferences via the backend. */}
                  <Toggle
                    checked={on[p.id]}
                    onChange={(v) => setOn((s) => ({ ...s, [p.id]: v }))}
                    label={p.label}
                  />
                </li>
              ))}
            </ul>
            <Link href="/profile/settings" className="mt-6 inline-block text-sm font-medium underline">
              All account settings
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
