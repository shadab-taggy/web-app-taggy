"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import { MAX_TAGS_PER_GROUP, tagGroups } from "@/data/tags";
import { cn } from "@/lib/cn";

const steps = ["Personal details", "Personal details", "Tags"] as const;

type Errors = Partial<Record<"name" | "username" | "phone" | "dob", string>>;

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [form, setForm] = useState({ name: "", username: "", phone: "", dob: "" });
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [openGroup, setOpenGroup] = useState<string>(tagGroups[0].id);
  const [saving, setSaving] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate(): boolean {
    const next: Errors = {};
    if (step === 0) {
      if (!form.name.trim()) next.name = "Enter your full name";
      if (!/^@?[a-z0-9_.]{3,20}$/i.test(form.username.trim()))
        next.username = "3–20 letters, numbers, dots or underscores";
      if (!/^\d{7,12}$/.test(form.phone.replace(/\s/g, ""))) next.phone = "Enter a valid mobile number";
    }
    if (step === 1) {
      if (!form.dob) next.dob = "Select your date of birth";
      else if (new Date(form.dob).getTime() > Date.now() - 18 * 365.25 * 864e5)
        next.dob = "You must be at least 18 to use Taggy";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function onContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (step < 2) return setStep((s) => s + 1);
    setSaving(true);
    // TODO: persist profile + tags via the backend.
    setTimeout(() => router.push("/"), 500);
  }

  function toggleTag(group: string, tag: string) {
    setSelected((s) => {
      const cur = s[group] ?? [];
      if (cur.includes(tag)) return { ...s, [group]: cur.filter((t) => t !== tag) };
      const next = [...cur, tag].slice(-MAX_TAGS_PER_GROUP);
      return { ...s, [group]: next };
    });
  }

  return (
    <div className="grid min-h-dvh lg:grid-cols-[minmax(340px,0.8fr)_1.2fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-grey-500 p-10 text-white lg:flex">
        <Image src="/images/dress-maroon.webp" alt="" fill priority sizes="40vw" className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 to-black/80" />
        <div className="relative rounded-md bg-white/90 px-4 py-2 self-start">
          <Logo width={110} />
        </div>
        <ol className="relative flex flex-col gap-5" aria-label="Setup steps">
          {[
            ["Your details", "Name, username and phone"],
            ["About you", "Date of birth"],
            ["Your style", "Tags that shape your feed"],
          ].map(([t, d], i) => (
            <li key={t} aria-current={i === step ? "step" : undefined} className="flex items-start gap-4">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border text-sm font-semibold",
                  i < step ? "border-white bg-white text-black" : i === step ? "border-white bg-black/70" : "border-white/70 bg-black/50 text-white",
                )}
              >
                {i < step ? "✓" : i + 1}
              </span>
              <span>
                <span className="block text-md font-semibold">{t}</span>
                <span className="block text-sm text-white/90">{d}</span>
              </span>
            </li>
          ))}
        </ol>
      </aside>

      <main id="main" className="flex flex-col items-center justify-center px-4 py-10 md:py-14">
        <div className="mb-8 lg:hidden">
          <Logo width={120} />
        </div>
    <form onSubmit={onContinue} noValidate className="flex w-full max-w-[560px] flex-col gap-8">
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span>Step {step + 1}/3</span>
          <span>{steps[step]}</span>
        </div>
        <div
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step + 1}
          aria-label="Onboarding progress"
          className="h-2.5 overflow-hidden rounded-full bg-powder-200"
        >
          <div
            className="h-full rounded-full bg-blue-500 transition-[width] duration-300"
            style={{ width: `${((step + 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <section className="flex flex-col gap-5">
          <h1 className="font-serif text-display-xs font-semibold">Add name and username</h1>
          <Input label="Full name *" placeholder="e.g. Ryan" value={form.name} onChange={set("name")} error={errors.name} autoComplete="name" />
          <Input
            label="Username *"
            placeholder="@ryannew"
            value={form.username}
            onChange={set("username")}
            error={errors.username}
            hint="Pick a unique username other Taggy customers will see you as"
            autoComplete="username"
          />
          <Input
            label="Mobile number *"
            placeholder="124215421"
            inputMode="tel"
            value={form.phone}
            onChange={set("phone")}
            error={errors.phone}
            autoComplete="tel-national"
            leading={<span className="flex items-center gap-1 text-md text-black">+971 <ChevronDownIcon className="size-4 text-muted" /></span>}
          />
        </section>
      )}

      {step === 1 && (
        <section className="flex flex-col gap-5">
          <h1 className="font-serif text-display-xs font-semibold">Add personal details</h1>
          <Input
            label="Date of birth *"
            type="date"
            value={form.dob}
            onChange={set("dob")}
            error={errors.dob}
            autoComplete="bday"
          />
        </section>
      )}

      {step === 2 && (
        <section className="flex flex-col gap-5">
          <div>
            <h1 className="font-serif text-display-xs font-semibold">Add tags</h1>
            <p className="mt-1 text-md text-powder-900">
              Your tags are your style fingerprint, shaping your Taggy experience and helping you
              discover more of what feels like you. Choose up to 2 tags per section
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {tagGroups.map((g) => {
              const open = openGroup === g.id;
              const count = (selected[g.id] ?? []).length;
              return (
                <div key={g.id} className="rounded-xl border border-powder-200 bg-white">
                  <h2>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`panel-${g.id}`}
                      onClick={() => setOpenGroup(open ? "" : g.id)}
                      className="flex w-full items-center justify-between px-5 py-3.5 text-left text-md font-semibold"
                    >
                      <span>
                        {g.label}
                        {count > 0 && <span className="ml-2 text-sm font-normal text-powder-900">· {count} selected</span>}
                      </span>
                      <ChevronDownIcon className={cn("size-5 transition-transform", open && "rotate-180")} />
                    </button>
                  </h2>
                  {open && (
                    <div id={`panel-${g.id}`} className="px-5 pb-5">
                      <p className="mb-3 text-sm text-muted">Choose max {MAX_TAGS_PER_GROUP} tags</p>
                      <div className="flex flex-wrap gap-2.5">
                        {g.tags.map((t) => {
                          const on = (selected[g.id] ?? []).includes(t);
                          return (
                            <button
                              key={t}
                              type="button"
                              aria-pressed={on}
                              onClick={() => toggleTag(g.id, t)}
                              className={cn(
                                "rounded-md border px-3.5 py-2 text-sm font-medium transition-colors",
                                on
                                  ? "border-blue-500 bg-blue-500 text-black"
                                  : "border-powder-200 bg-white text-black hover:bg-grey-500",
                              )}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="flex flex-col items-center gap-3">
        <Button type="submit" size="lg" fullWidth loading={saving}>
          {step === 2 ? "Finish" : "Continue"}
        </Button>
        {step === 0 ? (
          <Link href="/login" className="text-sm font-medium text-powder-900 hover:text-black">
            ← Back to Login
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="text-sm font-medium text-powder-900 hover:text-black"
          >
            ← Back
          </button>
        )}
      </div>
    </form>
      </main>
    </div>
  );
}
