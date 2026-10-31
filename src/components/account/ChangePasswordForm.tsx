"use client";

import { useState } from "react";
import { PageHeader } from "@/components/account/PageHeader";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { Button } from "@/components/ui/Button";

export function ChangePasswordForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const current = String(d.get("current") ?? "");
    const next = String(d.get("next") ?? "");
    const confirm = String(d.get("confirm") ?? "");
    const err: Record<string, string> = {};
    if (!current) err.current = "Enter your current password";
    if (next.length < 8) err.next = "Password must be at least 8 characters";
    else if (next === current) err.next = "Choose a password different from your current one";
    if (confirm !== next) err.confirm = "Passwords do not match";
    setErrors(err);
    // TODO: change the password via the backend.
    setSaved(Object.keys(err).length === 0);
    if (!Object.keys(err).length) e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-md">
      <PageHeader title="Change Password" back="/profile/settings" backLabel="Settings" />
      <div className="flex flex-col gap-5">
        <PasswordInput name="current" label="Current password" autoComplete="current-password" error={errors.current} />
        <PasswordInput name="next" label="New password" autoComplete="new-password" error={errors.next} hint="At least 8 characters" />
        <PasswordInput name="confirm" label="Confirm new password" autoComplete="new-password" error={errors.confirm} />
      </div>
      <div className="mt-8 flex items-center gap-4">
        <Button type="submit" size="lg">
          Update password
        </Button>
        <p role="status" className="text-sm text-powder-900">
          {saved ? "Password updated ✓" : ""}
        </p>
      </div>
    </form>
  );
}
