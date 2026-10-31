"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon, ChatIcon, SearchIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";
import { Tabs } from "@/components/ui/Tabs";
import { formatAED } from "@/lib/format";
import type { ChatMessage, Conversation } from "@/lib/types";
import { cn } from "@/lib/cn";

function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="grid place-items-center gap-3 px-6 py-20 text-center">
      <ChatIcon className="size-14" strokeWidth={1.5} />
      <h2 className="font-serif text-display-xs font-semibold">{title}</h2>
      <p className="text-md text-black">{text}</p>
      <Link
        href="/"
        className="mt-1 rounded-md bg-blue-500 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-blue-400"
      >
        Start shopping
      </Link>
    </div>
  );
}

function Bubble({ m }: { m: ChatMessage }) {
  const mine = m.from === "me";
  return (
    <div className={cn("flex flex-col gap-2", mine ? "items-end" : "items-start")}>
      {m.text && (
        <p
          className={cn(
            "max-w-[80%] rounded-lg px-4 py-3 text-md",
            mine ? "bg-powder-200" : "bg-grey-500/60",
          )}
        >
          {m.text}
          <span className="ml-3 align-bottom text-xs text-powder-900">{m.time}</span>
        </p>
      )}
      {m.product && (
        <Link
          href="/product/p1"
          className="w-full max-w-xs overflow-hidden rounded-lg border border-grey-500 bg-white shadow-card"
        >
          <span className="relative block aspect-[4/3] bg-grey-500">
            <Image src={m.product.image} alt="" fill sizes="320px" className="object-cover" />
          </span>
          <span className="block px-4 py-3">
            <span className="block text-xs font-semibold uppercase tracking-wide">{m.product.brand}</span>
            <span className="block text-sm text-powder-900">{m.product.title}</span>
            <span className="mt-2 flex items-center gap-2 text-xs">
              <strong className="text-sm">{formatAED(m.product.price).replace(".00", "")}</strong>
              <span className="rounded border border-grey-600 px-1.5 py-0.5">{m.product.condition}</span>
            </span>
          </span>
        </Link>
      )}
    </div>
  );
}

export function InboxView({
  conversations,
  threads,
}: {
  conversations: Conversation[];
  threads: Record<string, ChatMessage[]>;
}) {
  const [tab, setTab] = useState("chat");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(conversations[0]?.id ?? null);
  const [mobileThread, setMobileThread] = useState(false);
  const [extra, setExtra] = useState<Record<string, ChatMessage[]>>({});
  const [draft, setDraft] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const active = conversations.find((c) => c.id === activeId) ?? null;
  const base =
    activeId && (threads[activeId] ?? (active ? [{ id: "seed", from: "them" as const, text: active.preview, time: "—" }] : []));
  const messages = [...(base || []), ...((activeId && extra[activeId]) || [])];
  const filtered = conversations.filter((c) =>
    `${c.name} ${c.preview}`.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length, activeId]);

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !activeId) return;
    const time = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    setExtra((x) => ({
      ...x,
      [activeId]: [...(x[activeId] ?? []), { id: `${Date.now()}`, from: "me", text, time }],
    }));
    setDraft("");
  }

  return (
    <div className="overflow-hidden rounded-xl border border-grey-500 bg-white">
      <Tabs
        label="Inbox sections"
        value={tab}
        onChange={setTab}
        items={[
          { id: "chat", label: "Chat" },
          { id: "made", label: "Offers made" },
          { id: "received", label: "Offers received" },
        ]}
        className="px-2 [&>button]:flex-1 md:[&>button]:flex-none md:[&>button]:px-10"
      />

      {tab === "made" && (
        <EmptyState title="No offers made yet" text="Offers you make on items will appear here." />
      )}
      {tab === "received" && (
        <EmptyState title="No offers received yet" text="Offers on your listings will appear here." />
      )}

      {tab === "chat" &&
        (conversations.length === 0 ? (
          <EmptyState title="No messages yet" text="All your conversations will appear here." />
        ) : (
          <div className="grid h-[calc(100vh-17rem)] min-h-[520px] lg:grid-cols-[380px_1fr]">
            <section
              aria-label="Conversations"
              className={cn(
                "flex min-h-0 flex-col border-grey-500 lg:border-r",
                mobileThread && "hidden lg:flex",
              )}
            >
              <div className="p-4">
                <label className="flex h-10 items-center gap-2.5 rounded-full border border-grey-600 px-4 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                  <SearchIcon className="size-5 text-muted" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search"
                    aria-label="Search conversations"
                    className="h-full min-w-0 flex-1 bg-transparent text-base outline-none md:text-md placeholder:text-muted"
                  />
                </label>
              </div>
              <ul className="min-h-0 flex-1 overflow-y-auto">
                {filtered.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      aria-current={c.id === activeId}
                      onClick={() => {
                        setActiveId(c.id);
                        setMobileThread(true);
                      }}
                      className={cn(
                        "flex w-full gap-3 border-b border-grey-500 px-4 py-4 text-left transition-colors hover:bg-grey-500/40",
                        c.id === activeId && "bg-powder-200/50",
                      )}
                    >
                      <Avatar name={c.name} size={48} />
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center justify-between">
                          <span className="text-md font-semibold">{c.name}</span>
                          <span className="flex items-center gap-1.5 text-sm text-powder-900">
                            {c.time}
                            {c.unread && <span className="size-2 rounded-full bg-papaya-500" aria-label="Unread" />}
                          </span>
                        </span>
                        <span className="line-clamp-2 text-sm text-powder-900">{c.preview}</span>
                      </span>
                    </button>
                  </li>
                ))}
                {filtered.length === 0 && (
                  <li className="px-4 py-10 text-center text-sm text-powder-900">No conversations found.</li>
                )}
              </ul>
            </section>

            <section
              aria-label={active ? `Conversation with ${active.name}` : "Conversation"}
              className={cn("min-h-0 flex-col", mobileThread ? "flex" : "hidden lg:flex")}
            >
              {active ? (
                <>
                  <header className="flex items-center gap-3 border-b border-grey-500 px-5 py-4">
                    <button
                      type="button"
                      aria-label="Back to conversations"
                      onClick={() => setMobileThread(false)}
                      className="grid size-9 place-items-center rounded-full hover:bg-grey-500 lg:hidden"
                    >
                      <ArrowLeftIcon className="size-5" />
                    </button>
                    <Avatar name={active.name} size={40} />
                    <h2 className="font-serif text-xl font-semibold">{active.name}</h2>
                  </header>

                  <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 py-5">
                    <p className="text-center text-xs text-muted">Mon</p>
                    {messages.map((m) => (
                      <Bubble key={m.id} m={m} />
                    ))}
                    <div ref={endRef} />
                  </div>

                  <form onSubmit={send} className="flex items-center gap-3 border-t border-grey-500 p-4">
                    <label className="flex h-10 flex-1 items-center gap-2 rounded-full border border-grey-600 px-4 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
                      <svg viewBox="0 0 24 24" className="size-5 text-muted" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="m21 11-9 9a6 6 0 0 1-8.5-8.5l9-9a4 4 0 0 1 5.7 5.7l-9 9a2 2 0 0 1-2.8-2.8l8.3-8.3" />
                      </svg>
                      <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Typing...."
                        aria-label="Message"
                        className="h-full min-w-0 flex-1 bg-transparent text-base outline-none md:text-md placeholder:text-muted"
                      />
                    </label>
                    <button
                      type="submit"
                      aria-label="Send message"
                      disabled={!draft.trim()}
                      className="grid size-11 place-items-center rounded-full bg-blue-500 transition-colors hover:bg-blue-400 disabled:opacity-50"
                    >
                      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
                      </svg>
                    </button>
                  </form>
                </>
              ) : (
                <p className="m-auto text-md text-powder-900">Select a conversation</p>
              )}
            </section>
          </div>
        ))}
    </div>
  );
}
