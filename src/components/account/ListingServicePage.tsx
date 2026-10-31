"use client";

import { useState } from "react";
import { PageHeader } from "@/components/account/PageHeader";
import { SearchIcon } from "@/components/icons";
import { Tabs } from "@/components/ui/Tabs";
import { defaultAddress } from "@/data/account";

interface Booking {
  id: string;
  status: "pending" | "approved" | "rejected";
  service: string;
  pkg: string;
  date: string;
  time: string;
  model: string;
}

const initial: Booking[] = [
  {
    id: "b1",
    status: "pending",
    service: "On Your Behalf",
    pkg: "The Refresh",
    date: "26 August, 2026",
    time: "04:00 PM",
    model: "Female Model – Seated on Stool",
  },
];

function CancelButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-grey-600 px-3 text-xs font-semibold text-danger hover:bg-danger/10"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
      </svg>
      Cancel
    </button>
  );
}

export function ListingServicePage() {
  const [tab, setTab] = useState<Booking["status"]>("pending");
  const [query, setQuery] = useState("");
  const [bookings, setBookings] = useState(initial);
  const list = bookings.filter(
    (b) => b.status === tab && `${b.service} ${b.pkg}`.toLowerCase().includes(query.toLowerCase()),
  );
  const count = (s: Booking["status"]) => bookings.filter((b) => b.status === s).length;

  return (
    <div>
      <PageHeader title="Listing Service" action={{ href: "/sell/book-a-team", label: "Book Listing Team" }} />

      <Tabs
        label="Booking status"
        value={tab}
        onChange={(id) => setTab(id as Booking["status"])}
        items={[
          { id: "pending", label: `Pending (${count("pending")})` },
          { id: "approved", label: `Approved (${count("approved")})` },
          { id: "rejected", label: `Rejected (${count("rejected")})` },
        ]}
        className="mb-6 [&>button]:flex-1 md:[&>button]:flex-none md:[&>button]:px-10"
      />

      <label className="mb-6 flex h-10 w-full max-w-md items-center gap-2.5 rounded-full border border-grey-600 px-4 focus-within:border-black focus-within:ring-1 focus-within:ring-black">
        <SearchIcon className="size-5 text-muted" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search bookings"
          aria-label="Search bookings"
          className="h-full min-w-0 flex-1 bg-transparent text-base outline-none md:text-md placeholder:text-muted"
        />
      </label>

      {list.length === 0 ? (
        <p className="rounded-xl border border-dashed border-grey-600 py-16 text-center text-md text-powder-900">
          No {tab} bookings.
        </p>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border border-grey-500 bg-white shadow-card md:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Listing service bookings</caption>
              <thead className="border-b border-grey-500 bg-brown-100 text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3 font-semibold">Service</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Package</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Date &amp; time</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Model</th>
                  <th scope="col" className="px-3 py-3 font-semibold">Address</th>
                  <th scope="col" className="px-5 py-3 text-right font-semibold"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-grey-500">
                {list.map((b) => (
                  <tr key={b.id} className="align-top">
                    <td className="px-5 py-4 font-serif text-md font-semibold">{b.service}</td>
                    <td className="px-3 py-4">{b.pkg}</td>
                    <td className="px-3 py-4">
                      <span className="block">{b.date}</span>
                      <span className="text-powder-900">{b.time}</span>
                    </td>
                    <td className="px-3 py-4 text-powder-900">{b.model}</td>
                    <td className="px-3 py-4">
                      <span className="block">{defaultAddress.city}</span>
                      <span className="text-powder-900">{defaultAddress.line}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <CancelButton label={`Cancel ${b.service} booking`} onClick={() => setBookings((x) => x.filter((y) => y.id !== b.id))} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="grid gap-4 md:hidden">
            {list.map((b) => (
              <li key={b.id} className="rounded-xl border border-grey-500 bg-white p-5 shadow-card">
                <h2 className="mb-3 font-serif text-xl font-semibold">{b.service}</h2>
                <dl className="text-sm">
                  {[
                    ["Package", b.pkg],
                    ["Date", b.date],
                    ["Time", b.time],
                    ["Model", b.model],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-grey-500 py-3">
                      <dt className="text-powder-900">{k}</dt>
                      <dd className="text-right font-medium">{v}</dd>
                    </div>
                  ))}
                  <div className="py-3">
                    <dt className="text-powder-900">Address</dt>
                    <dd className="mt-1 font-medium">{defaultAddress.line}</dd>
                  </div>
                </dl>
                <CancelButton label={`Cancel ${b.service} booking`} onClick={() => setBookings((x) => x.filter((y) => y.id !== b.id))} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
