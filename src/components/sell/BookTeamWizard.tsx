"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronRightIcon, PlusIcon } from "@/components/icons";
import { WizardShell } from "@/components/sell/Wizard";
import { Checkbox } from "@/components/ui/Fields";
import { defaultAddress } from "@/data/account";
import { cn } from "@/lib/cn";

const times = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"];
const models = [
  "Female Model – Seated on Stool",
  "Female Model – Lounging on Sofa",
  "Female Model – Leaning on Chair",
  "Female Model – Cross-Legged on Floor",
];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const pkg = { name: "The Refresh", items: "Up to 30 items", duration: "Upto 2.5 hours", rate: 290, extra: 12 };

function Choice({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rounded-md border px-3 py-3 text-sm font-medium transition-colors",
        selected
          ? "border-papaya-700 bg-papaya-700 text-white"
          : "border-papaya-500/40 bg-white hover:bg-brown-100",
        className,
      )}
    >
      {children}
    </button>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-grey-500 py-4 last:border-b-0">
      <dt className="text-sm text-powder-900">{label}</dt>
      <dd className="mt-1 text-md">{children}</dd>
    </div>
  );
}

export function BookTeamWizard() {
  const router = useRouter();
  // Month/year start from a fixed reference so SSR and client agree.
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(7);
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [model, setModel] = useState(models[0]);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState(true);
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dateLabel = day ? `${String(day).padStart(2, "0")} ${months[month]}, ${year}` : "";

  function next() {
    setError(undefined);
    if (step === 1 && !address) return setError("Choose an address");
    if (step === 3 && (!day || !time)) return setError("Pick a date and a time");
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0 });
      return;
    }
    setSubmitting(true);
    // TODO: submit the booking to the backend.
    setTimeout(() => router.push("/profile/listing-service"), 600);
  }

  return (
    <WizardShell
      title="Book Listing Team"
      step={step}
      total={4}
      heading={
        ["You’re one step away from effortless selling", "Choose your package", "Pick a date and time", "Booking info"][step - 1]
      }
      headerAction={
        <Link href="https://wa.me/" className="text-sm text-powder-900 hover:text-black">
          WhatsApp us
        </Link>
      }
      onCancel={() => (step === 1 ? router.push("/sell") : setStep(step - 1))}
      onNext={next}
      nextLabel={step === 4 ? "Submit" : "Next"}
      nextLoading={submitting}
    >
      {step === 1 && (
        <>
          <p className="text-md text-powder-900">
            Choose a date and time that works for you, and our Listing Team will take it from there.
            Simply set aside the pieces you’d like to sell. We’ll steam, style, photograph and list them
            on your behalf. Can’t find a suitable time?{" "}
            <Link href="https://wa.me/" className="font-semibold text-papaya-700 underline">
              WhatsApp us
            </Link>{" "}
            and we’ll do our best to accommodate you.
          </p>
          <fieldset className="flex flex-col gap-3 rounded-xl border border-papaya-500/50 p-5">
            <legend className="px-1 text-md font-semibold">Choose your address</legend>
            <Checkbox checked={address} onChange={(e) => setAddress(e.target.checked)}>
              <span className="block text-md">{defaultAddress.city}</span>
              <span className="block text-powder-900">{defaultAddress.line}</span>
            </Checkbox>
            <Link
              href="/profile/addresses"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-grey-600 text-sm font-medium hover:bg-grey-500"
            >
              <PlusIcon className="size-4" /> Add new address
            </Link>
          </fieldset>
        </>
      )}

      {step === 2 && (
        <>
          <section className="rounded-xl border border-papaya-500/50 p-5">
            <h3 className="text-md font-semibold">{pkg.name}</h3>
            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-powder-900">
              <span>{pkg.items}</span>
              <span>{pkg.duration}</span>
            </p>
            <p className="mt-4 text-xs text-powder-900">Introductory Rate</p>
            <p className="text-display-xs font-bold">Ð {pkg.rate.toFixed(2)}</p>
            <p className="mt-1 text-sm">
              Additional items <strong>Ð {pkg.extra}/item</strong>
            </p>
          </section>
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium">Model</legend>
            {models.map((m) => (
              <label key={m} className="flex cursor-pointer items-center gap-3 rounded-lg border border-grey-500 px-4 py-3 text-sm hover:bg-grey-500/40">
                <input type="radio" name="model" checked={model === m} onChange={() => setModel(m)} className="size-4 accent-black" />
                {m}
              </label>
            ))}
          </fieldset>
        </>
      )}

      {step === 3 && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between rounded-lg border border-papaya-500/40 px-3 py-2.5">
              <button type="button" aria-label="Previous year" onClick={() => setYear((y) => y - 1)} className="grid size-8 rotate-180 place-items-center rounded hover:bg-brown-100"><ChevronRightIcon className="size-4" /></button>
              <span className="text-sm font-semibold">{year}</span>
              <button type="button" aria-label="Next year" onClick={() => setYear((y) => y + 1)} className="grid size-8 place-items-center rounded hover:bg-brown-100"><ChevronRightIcon className="size-4" /></button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-papaya-500/40 px-3 py-2.5">
              <button type="button" aria-label="Previous month" onClick={() => { setDay(null); setMonth((m) => (m === 0 ? (setYear((y) => y - 1), 11) : m - 1)); }} className="grid size-8 rotate-180 place-items-center rounded hover:bg-brown-100"><ChevronRightIcon className="size-4" /></button>
              <span className="text-sm font-semibold">{months[month]}</span>
              <button type="button" aria-label="Next month" onClick={() => { setDay(null); setMonth((m) => (m === 11 ? (setYear((y) => y + 1), 0) : m + 1)); }} className="grid size-8 place-items-center rounded hover:bg-brown-100"><ChevronRightIcon className="size-4" /></button>
            </div>
          </div>

          <div role="group" aria-label="Day" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
              <Choice key={d} selected={day === d} onClick={() => setDay(d)} className="flex w-16 shrink-0 flex-col items-center py-2.5">
                <span className="text-md">{d}</span>
                <span className="text-xs font-normal opacity-80">{months[month].slice(0, 3)}</span>
              </Choice>
            ))}
          </div>

          <div role="group" aria-label="Time" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {times.map((t) => (
              <Choice key={t} selected={time === t} onClick={() => setTime(t)}>
                {t}
              </Choice>
            ))}
          </div>
        </>
      )}

      {step === 4 && (
        <dl className="rounded-xl border border-papaya-500/50 px-5">
          <Row label="Address">{defaultAddress.line}</Row>
          <Row label="Package">
            <span className="block font-medium">{pkg.name}</span>
            <span className="mt-1 block text-sm text-powder-900">{pkg.items} · {pkg.duration}</span>
            <span className="mt-2 block text-xs text-powder-900">Introductory Rate</span>
            <span className="block text-display-xs font-bold">Ð {pkg.rate.toFixed(2)}</span>
            <span className="block text-sm">Additional items <strong>Ð {pkg.extra}/item</strong></span>
          </Row>
          <Row label="Date">{dateLabel}</Row>
          <Row label="Time">{time}</Row>
          <Row label="Model">{model}</Row>
        </dl>
      )}

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
    </WizardShell>
  );
}
