"use client";

import { useState } from "react";
import { PageHeader } from "@/components/account/PageHeader";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Fields";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/cn";

function PencilButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="grid size-9 place-items-center rounded-full hover:bg-black/5">
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 20h4L19 9a2.800 2.800 0 0 0-4-4L4 16v4ZM13.500 6.500l4 4" />
      </svg>
    </button>
  );
}

function TrashButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="grid size-9 place-items-center rounded-full hover:bg-black/5">
      <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
      </svg>
    </button>
  );
}

function FormActions({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="mt-6 flex gap-3">
      <Button type="button" variant="outline" fullWidth onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" fullWidth>
        Save
      </Button>
    </div>
  );
}

/* ---------------------------------- Bank --------------------------------- */

interface Bank { id: string; holder: string; bank: string; last4: string; address: string }

export function BankDetailsPage() {
  const [banks, setBanks] = useState<Bank[]>([
    { id: "1", holder: "Lucydahlin", bank: "HBSC bank", last4: "1956", address: "456 Financial Way, Downtown, Dubai, UAE" },
  ]);
  const [editing, setEditing] = useState<Bank | "new" | null>(null);
  const [error, setError] = useState<string>();

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const holder = String(d.get("holder") ?? "").trim();
    const bank = String(d.get("bank") ?? "").trim();
    const account = String(d.get("account") ?? "").replace(/\s/g, "");
    if (!holder || !bank || account.length < 8) {
      setError("Enter the account holder, bank name and a valid account number");
      return;
    }
    const entry: Bank = {
      id: editing && editing !== "new" ? editing.id : String(Date.now()),
      holder,
      bank,
      last4: account.slice(-4),
      address: String(d.get("address") ?? ""),
    };
    setBanks((b) => (editing === "new" ? [...b, entry] : b.map((x) => (x.id === entry.id ? entry : x))));
    setError(undefined);
    setEditing(null);
  }

  const current = editing && editing !== "new" ? editing : null;

  return (
    <div className="max-w-3xl">
      <PageHeader title="Bank details" back="/profile/settings" backLabel="Settings" action={{ label: "Add new", onClick: () => setEditing("new"), icon: false }} />
      {banks.length === 0 ? (
        <p className="rounded-xl border border-grey-500 py-16 text-center text-md text-powder-900">No bank details yet.</p>
      ) : (
        <ul className="grid gap-4">
          {banks.map((b) => (
            <li key={b.id} className="rounded-xl border border-grey-500 bg-white p-5 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{b.holder}</h2>
                <div className="flex">
                  <PencilButton label={`Edit ${b.bank}`} onClick={() => setEditing(b)} />
                  <TrashButton label={`Remove ${b.bank}`} onClick={() => setBanks((x) => x.filter((y) => y.id !== b.id))} />
                </div>
              </div>
              <p className="text-md">{b.bank} •••••••••••••{b.last4}</p>
              <p className="text-sm text-powder-900">{b.address}</p>
            </li>
          ))}
        </ul>
      )}

      <Modal open={!!editing} onClose={() => { setEditing(null); setError(undefined); }} title={editing === "new" ? "Add bank details" : "Edit bank details"}>
        <form key={current?.id ?? "new"} onSubmit={save} noValidate className="flex flex-col gap-4">
          <Input name="holder" label="Account holder name" defaultValue={current?.holder} />
          <Input name="bank" label="Bank name" defaultValue={current?.bank} />
          <Input name="account" label="Account number / IBAN" inputMode="numeric" placeholder="•••• •••• ••••" autoComplete="off" />
          <Input name="address" label="Bank address" defaultValue={current?.address} />
          {error && <p role="alert" className="text-xs text-danger">{error}</p>}
          <FormActions onCancel={() => setEditing(null)} />
        </form>
      </Modal>
    </div>
  );
}

/* -------------------------------- Addresses ------------------------------ */

interface Address { id: string; label: string; city: string; line: string }

export function AddressBookPage() {
  const [items, setItems] = useState<Address[]>([
    { id: "1", label: "Home", city: "Dubai, United Arab Emirates", line: "123 Al Fahidi Street, Bur Dubai, Dubai, UAE" },
  ]);
  const [defaultId, setDefaultId] = useState("1");
  const [editing, setEditing] = useState<Address | "new" | null>(null);
  const [error, setError] = useState<string>();

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const label = String(d.get("label") ?? "").trim();
    const line = String(d.get("line") ?? "").trim();
    if (!label || !line) {
      setError("Enter a label and a street address");
      return;
    }
    const entry: Address = {
      id: editing && editing !== "new" ? editing.id : String(Date.now()),
      label,
      city: String(d.get("city") ?? "").trim() || "Dubai, United Arab Emirates",
      line,
    };
    setItems((a) => (editing === "new" ? [...a, entry] : a.map((x) => (x.id === entry.id ? entry : x))));
    setError(undefined);
    setEditing(null);
  }

  const current = editing && editing !== "new" ? editing : null;

  return (
    <div className="max-w-3xl">
      <PageHeader title="Address Book" back="/profile/settings" backLabel="Settings" action={{ label: "Add new", onClick: () => setEditing("new"), icon: false }} />
      <ul className="grid gap-4">
        {items.map((a) => {
          const isDefault = a.id === defaultId;
          return (
            <li key={a.id} className={cn("rounded-xl border p-5", isDefault ? "border-powder-200 bg-powder-200/70" : "border-grey-500 bg-white")}>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{a.label}</h2>
                <div className="flex">
                  <PencilButton label={`Edit ${a.label}`} onClick={() => setEditing(a)} />
                  <TrashButton label={`Remove ${a.label}`} onClick={() => setItems((x) => x.filter((y) => y.id !== a.id))} />
                </div>
              </div>
              <Checkbox checked={isDefault} onChange={() => setDefaultId(a.id)} className="mt-1">
                <span className="block text-md">{a.city}</span>
                <span className="block text-powder-900">{a.line}</span>
                <span className="sr-only">Use as default address</span>
              </Checkbox>
            </li>
          );
        })}
      </ul>

      <Modal open={!!editing} onClose={() => { setEditing(null); setError(undefined); }} title={editing === "new" ? "Add address" : "Edit address"}>
        <form key={current?.id ?? "new"} onSubmit={save} noValidate className="flex flex-col gap-4">
          <Input name="label" label="Label" placeholder="e.g. Home" defaultValue={current?.label} />
          <Input name="city" label="City, country" defaultValue={current?.city ?? "Dubai, United Arab Emirates"} />
          <Input name="line" label="Street address" defaultValue={current?.line} autoComplete="street-address" />
          {error && <p role="alert" className="text-xs text-danger">{error}</p>}
          <FormActions onCancel={() => setEditing(null)} />
        </form>
      </Modal>
    </div>
  );
}

/* --------------------------------- Holidays ------------------------------- */

interface Holiday { id: string; from: string; to: string }

const fmt = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

export function HolidaysPage() {
  const [items, setItems] = useState<Holiday[]>([{ id: "1", from: "2026-07-31", to: "2026-08-02" }]);
  const [editing, setEditing] = useState<Holiday | "new" | null>(null);
  const [error, setError] = useState<string>();

  function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const from = String(d.get("from") ?? "");
    const to = String(d.get("to") ?? "");
    if (!from || !to) return setError("Choose both a start and end date");
    if (to < from) return setError("The end date must be after the start date");
    const entry: Holiday = { id: editing && editing !== "new" ? editing.id : String(Date.now()), from, to };
    setItems((h) => (editing === "new" ? [...h, entry] : h.map((x) => (x.id === entry.id ? entry : x))));
    setError(undefined);
    setEditing(null);
  }

  const current = editing && editing !== "new" ? editing : null;

  return (
    <div className="max-w-3xl">
      <PageHeader title="Holidays" back="/profile/settings" backLabel="Settings" action={{ label: "Add Holiday", onClick: () => setEditing("new"), icon: false }} />
      <div className="mb-8 rounded-xl border border-grey-500 p-5">
        <p className="text-md font-semibold">Are you going away and will not be available if your items get purchased?</p>
        <p className="mt-3 text-md text-powder-900">
          Input your holiday dates and your items will still show on the app but won&apos;t be able to be
          collected until your return.
        </p>
      </div>

      <h2 className="mb-3 text-md font-semibold">Upcoming holidays</h2>
      {items.length === 0 ? (
        <p className="rounded-xl border border-grey-500 py-12 text-center text-md text-powder-900">No upcoming holidays.</p>
      ) : (
        <ul className="grid gap-3">
          {items.map((h) => (
            <li key={h.id} className="flex items-center justify-between rounded-xl border border-powder-200 bg-powder-200/70 px-5 py-3">
              <span className="text-md">{fmt(h.from)} - {fmt(h.to)}</span>
              <div className="flex">
                <PencilButton label="Edit holiday" onClick={() => setEditing(h)} />
                <TrashButton label="Remove holiday" onClick={() => setItems((x) => x.filter((y) => y.id !== h.id))} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={!!editing} onClose={() => { setEditing(null); setError(undefined); }} title={editing === "new" ? "Add holiday" : "Edit holiday"}>
        <form key={current?.id ?? "new"} onSubmit={save} noValidate className="flex flex-col gap-4">
          <Input name="from" type="date" label="From" defaultValue={current?.from} />
          <Input name="to" type="date" label="To" defaultValue={current?.to} />
          {error && <p role="alert" className="text-xs text-danger">{error}</p>}
          <FormActions onCancel={() => setEditing(null)} />
        </form>
      </Modal>
    </div>
  );
}
