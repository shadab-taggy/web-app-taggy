"use client";

import { useState } from "react";
import { PageHeader } from "@/components/account/PageHeader";
import { ChevronDownIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Select, Textarea } from "@/components/ui/Fields";
import { Input } from "@/components/ui/Input";

function Phone({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <Input
      label={label}
      inputMode="tel"
      defaultValue={defaultValue}
      leading={
        <span className="flex items-center gap-1 text-md text-black">
          +44 <ChevronDownIcon className="size-4 text-muted" />
        </span>
      }
    />
  );
}

export function EditProfileForm() {
  const [bio, setBio] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string>();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!String(data.get("email") ?? "").includes("@")) {
      setError("Enter a valid email address");
      setSaved(false);
      return;
    }
    setError(undefined);
    // TODO: save the profile via the backend.
    setSaved(true);
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <PageHeader title="Edit profile" back="/profile/settings" backLabel="Settings" />

      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
        <section aria-label="Profile photo" className="flex h-fit flex-col items-center gap-4 rounded-xl border border-grey-500 bg-brown-100 p-6 text-center">
          <Avatar name="Lucydahlin" src="/images/wardrobe-house.png" size={128} />
          <div>
            <p className="text-md font-semibold">@Lucydahlin</p>
            <p className="text-sm text-powder-900">Profile 66% complete</p>
          </div>
          <Button type="button" variant="outline" size="sm">
            Change photo
          </Button>
        </section>

        <div className="rounded-xl border border-grey-500 bg-white p-6 shadow-card md:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <Input name="username" label="User name" defaultValue="Lucydahlin" autoComplete="username" />
            <Input name="fullName" label="Full name" defaultValue="Lucydahlin" autoComplete="name" />
            <Input name="email" type="email" label="Email" defaultValue="Lucydahlin@gmail.com" autoComplete="email" error={error} />
            <Select label="Gender" defaultValue="Male">
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </Select>
            <Phone label="Mobile number" defaultValue="124215421" />
            <Phone label="WhatsApp number" defaultValue="124215421" />
            <Textarea
              className="md:col-span-2"
              label="Bio"
              placeholder="Tell your story"
              maxLength={250}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-grey-500 pt-6">
            <Button type="button" variant="outline" size="lg" onClick={() => history.back()}>
              Cancel
            </Button>
            <Button type="submit" size="lg">
              Save changes
            </Button>
            <p role="status" className="text-sm text-powder-900">
              {saved ? "Profile saved ✓" : ""}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
