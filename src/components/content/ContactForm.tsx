"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Fields";
import { Input } from "@/components/ui/Input";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ subject?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = String(new FormData(e.currentTarget).get("subject") ?? "").trim();
    const next: typeof errors = {};
    if (!subject) next.subject = "Add a subject";
    if (!message.trim()) next.message = "Tell us a little more";
    setErrors(next);
    if (Object.keys(next).length) return;
    // TODO: send to the support backend.
    setSent(true);
    setMessage("");
    e.currentTarget.reset();
  }

  if (sent) {
    return (
      <div role="status" className="grid place-items-center gap-3 rounded-xl border border-grey-500 bg-brown-100 px-6 py-16 text-center">
        <h2 className="font-serif text-display-xs font-semibold">Thanks — message sent</h2>
        <p className="text-md text-powder-900">Our team will get back to you at hello@taggy.ae soon.</p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 rounded-xl border border-grey-500 bg-white p-6 shadow-card md:p-8">
      <Input name="subject" label="Subject" placeholder="e.g. Login issue" error={errors.subject} />
      <Textarea
        label="Message"
        placeholder="Tell more about this"
        maxLength={250}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        error={errors.message}
      />
      <Button type="submit" size="lg" fullWidth>
        Submit
      </Button>
    </form>
  );
}
