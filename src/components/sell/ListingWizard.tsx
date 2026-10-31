"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { PlusIcon } from "@/components/icons";
import { WizardShell } from "@/components/sell/Wizard";
import { TagAccordion } from "@/components/tags/TagAccordion";
import { Button } from "@/components/ui/Button";
import { Checkbox, Select, Textarea } from "@/components/ui/Fields";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { defaultAddress } from "@/data/account";
import { cn } from "@/lib/cn";

const models = [
  "Female Model – Seated on Stool",
  "Female Model – Lounging on Sofa",
  "Female Model – Leaning on Chair",
  "Female Model – Cross-Legged on Floor",
];

// Placeholder option lists until the catalogue API is connected.
const options = {
  department: ["Female", "Male", "Children"],
  main: ["Clothes", "Shoes", "Bags", "Accessories"],
  sub: ["Dresses", "Shirts", "Tops", "Trousers", "Skirts"],
  brand: ["Zara", "Zimmermann", "Polo Ralph Lauren", "Fendi", "Burberry"],
  size: ["XS / UK 6", "S / UK 8-10", "M / UK 10-12", "L / UK 12-14"],
  condition: ["New with tags", "Like new", "Very good", "Worn once"],
  colour: ["Black", "White", "Cream", "Blue", "Green", "Red"],
  fabric: ["Cotton", "Polyester", "Silk", "Linen", "Wool"],
  fit: ["True to size", "Runs small", "Runs large"],
};

interface Photo {
  id: string;
  url: string;
}

type Info = Record<"department" | "main" | "sub" | "brand" | "size" | "condition" | "colour" | "fit" | "fabric", string>;

function Opts({ list }: { list: string[] }) {
  return (
    <>
      <option value="" disabled>
        Select
      </option>
      {list.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </>
  );
}

export function ListingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bgRemover, setBgRemover] = useState<string[]>([]);
  const [info, setInfo] = useState<Info>({
    department: "", main: "", sub: "", brand: "", size: "", condition: "", colour: "", fit: "", fabric: "",
  });
  const [tags, setTags] = useState<Record<string, string[]>>({});
  const [ship, setShip] = useState({ sameDay: false, threeDay: true });
  const [price, setPrice] = useState({ price: "", total: "", rrp: "" });
  const [terms, setTerms] = useState(false);
  const [acceptOffers, setAcceptOffers] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modelFor, setModelFor] = useState<string | null>(null);
  const [model, setModel] = useState("");
  const [preview, setPreview] = useState<Photo | null>(null);
  const [publishing, setPublishing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | null) {
    if (!files) return;
    const next = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((f) => ({ id: `${f.name}-${f.size}-${f.lastModified}`, url: URL.createObjectURL(f) }));
    setPhotos((p) => [...p, ...next].slice(0, 10));
  }

  function removePhoto(id: string) {
    setPhotos((p) => {
      const gone = p.find((x) => x.id === id);
      if (gone) URL.revokeObjectURL(gone.url);
      return p.filter((x) => x.id !== id);
    });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (step === 1) {
      if (photos.length === 0) e.photos = "Add at least one photo";
      if (!title.trim()) e.title = "Enter an item title";
    }
    if (step === 2) {
      (["department", "main", "sub", "brand", "size", "condition", "colour", "fit"] as const).forEach((k) => {
        if (!info[k]) e[k] = "Required";
      });
    }
    if (step === 4) {
      if (!ship.sameDay && !ship.threeDay) e.ship = "Choose a shipping duration";
      if (!(Number(price.price) > 0)) e.price = "Enter your price";
      if (!(Number(price.total) > 0)) e.total = "Enter the total price including fees";
      if (!terms) e.terms = "You must agree to the Terms & Conditions";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate()) return;
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo({ top: 0 });
      return;
    }
    setPublishing(true);
    // TODO: publish the listing via the backend.
    setTimeout(() => router.push("/profile/listings"), 600);
  }

  const setI = (k: keyof Info) => (e: React.ChangeEvent<HTMLSelectElement>) =>
    setInfo((i) => ({ ...i, [k]: e.target.value }));

  return (
    <>
      <WizardShell
        title="Add your item"
        step={step}
        total={4}
        heading={["Item details", "Product info", "Tags", "Shipping & pricing"][step - 1]}
        headingLink={{ href: "/guides/how-to-prepare-the-ultimate-listing", label: "Ultimate listings tips" }}
        headerAction={
          <button type="button" className="px-1 py-2 text-sm text-powder-900 hover:text-black" onClick={() => router.push("/profile/listings")}>
            Save as draft
          </button>
        }
        onCancel={() => (step === 1 ? router.push("/sell") : setStep(step - 1))}
        onNext={next}
        nextLabel={step === 4 ? "Publish" : "Next"}
        nextLoading={publishing}
        extraAction={
          step === 4 ? (
            <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => setPreview(photos[0] ?? null)}>
              Preview
            </Button>
          ) : null
        }
      >
        {step === 1 && (
          <>
            <fieldset>
              <legend className="mb-3 text-sm font-medium">Add product images</legend>
              <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                {photos.map((p, i) => (
                  <li key={p.id} className="relative aspect-square overflow-hidden rounded-lg bg-grey-500">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt={`Product photo ${i + 1}`} className="size-full object-cover" />
                    {i === 0 && (
                      <span className="absolute left-1 top-1 rounded bg-white/80 px-1.5 py-0.5 text-[10px] font-medium">
                        Cover Image
                      </span>
                    )}
                    <span className="absolute inset-x-1.5 bottom-1.5 flex divide-x divide-grey-600 overflow-hidden rounded-full bg-white shadow">
                      <button type="button" aria-label="Generate with model" onClick={() => setModelFor(p.id)} className="grid flex-1 place-items-center py-1.5 hover:bg-grey-500">
                        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden><path d="m12 3 1.8 4.700L18.500 9.500l-4.700 1.800L12 16l-1.800-4.700L5.500 9.500l4.700-1.800L12 3ZM19 15l.8 2.200L22 18l-2.200.8L19 21l-.8-2.200L16 18l2.200-.8L19 15Z" /></svg>
                      </button>
                      <button type="button" aria-label="Preview photo" onClick={() => setPreview(p)} className="grid flex-1 place-items-center py-1.5 hover:bg-grey-500">
                        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
                      </button>
                      <button type="button" aria-label="Remove photo" onClick={() => removePhoto(p.id)} className="grid flex-1 place-items-center py-1.5 hover:bg-grey-500">
                        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden><path d="M6 6l12 12M18 6 6 18" /></svg>
                      </button>
                    </span>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className={cn(
                      "flex aspect-square w-full flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-sm transition-colors hover:bg-grey-500/50",
                      errors.photos ? "border-danger text-danger" : "border-black",
                    )}
                  >
                    <PlusIcon className="size-5" />
                    Add
                  </button>
                </li>
              </ul>
              <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
              {errors.photos && <p role="alert" className="mt-2 text-xs text-danger">{errors.photos}</p>}
            </fieldset>

            <Input label="Item title" placeholder="e.g. White jumper" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
            <Textarea label="Description" placeholder="Add more details" maxLength={250} value={description} onChange={(e) => setDescription(e.target.value)} />

            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 text-sm font-medium">Background remover</legend>
              {["All photos", "Select photos", "Monthly subs - Unlimited photos"].map((o) => (
                <Checkbox
                  key={o}
                  label={o}
                  checked={bgRemover.includes(o)}
                  onChange={(e) => setBgRemover((b) => (e.target.checked ? [...b, o] : b.filter((x) => x !== o)))}
                />
              ))}
            </fieldset>
          </>
        )}

        {step === 2 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Select label="Choose department *" value={info.department} onChange={setI("department")} error={errors.department}><Opts list={options.department} /></Select>
            <Select label="Choose Main category *" value={info.main} onChange={setI("main")} error={errors.main}><Opts list={options.main} /></Select>
            <Select label="Choose Sub category *" value={info.sub} onChange={setI("sub")} error={errors.sub}><Opts list={options.sub} /></Select>
            <Select label="Brand *" value={info.brand} onChange={setI("brand")} error={errors.brand}><Opts list={options.brand} /></Select>
            <Select label="Size *" value={info.size} onChange={setI("size")} error={errors.size}><Opts list={options.size} /></Select>
            <Select label="Condition *" value={info.condition} onChange={setI("condition")} error={errors.condition}><Opts list={options.condition} /></Select>
            <Select label="Colour *" value={info.colour} onChange={setI("colour")} error={errors.colour}><Opts list={options.colour} /></Select>
            <Select label="Fabric" optional value={info.fabric} onChange={setI("fabric")}><Opts list={options.fabric} /></Select>
            <Select label="Fit *" value={info.fit} onChange={setI("fit")} error={errors.fit}><Opts list={options.fit} /></Select>
          </div>
        )}

        {step === 3 && <TagAccordion tone="papaya" selected={tags} onChange={setTags} />}

        {step === 4 && (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <fieldset className="flex flex-col gap-3 rounded-xl border border-grey-500 p-5">
                <legend className="px-1 text-sm font-semibold">Shipping duration</legend>
                <Checkbox label="Same day delivery (before 6PM, seller dependent)" checked={ship.sameDay} onChange={(e) => setShip((s) => ({ ...s, sameDay: e.target.checked }))} />
                <Checkbox label="3 days delivery (seller dependent)" checked={ship.threeDay} onChange={(e) => setShip((s) => ({ ...s, threeDay: e.target.checked }))} />
                <Link href="/guides/delivery-guide" className="text-xs underline">Read more about shipping timeframe</Link>
                {errors.ship && <p role="alert" className="text-xs text-danger">{errors.ship}</p>}
              </fieldset>

              <fieldset className="flex flex-col gap-3 rounded-xl border border-grey-500 p-5">
                <legend className="px-1 text-sm font-semibold">Shipping Address</legend>
                <Checkbox defaultChecked>
                  <span className="block">{defaultAddress.city}</span>
                  <span className="block text-powder-900">{defaultAddress.line}</span>
                </Checkbox>
                <Link href="/profile/addresses" className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-grey-600 text-sm font-medium hover:bg-grey-500">
                  <PlusIcon className="size-4" /> Add new address
                </Link>
              </fieldset>
            </div>

            <div className="flex flex-col gap-5">
              <Input label="My Price *" inputMode="decimal" placeholder="150" value={price.price} onChange={(e) => setPrice((p) => ({ ...p, price: e.target.value }))} error={errors.price} />
              <Input label="Total Price Including Fees *" inputMode="decimal" placeholder="150" value={price.total} onChange={(e) => setPrice((p) => ({ ...p, total: e.target.value }))} error={errors.total} />
              <Input label="Original Price (RRP) (Optional)" inputMode="decimal" placeholder="150" value={price.rrp} onChange={(e) => setPrice((p) => ({ ...p, rrp: e.target.value }))} />
              <Checkbox checked={terms} onChange={(e) => setTerms(e.target.checked)}>
                I agree to Taggy&apos;s <Link href="/terms" className="underline">Terms &amp; Conditions.</Link> All Taggy services are subject to Taggy <Link href="/privacy" className="underline">Privacy Policy</Link>.
              </Checkbox>
              {errors.terms && <p role="alert" className="-mt-3 text-xs text-danger">{errors.terms}</p>}
              <Checkbox label="I am willing to accept Taggy Offers on this listing." checked={acceptOffers} onChange={(e) => setAcceptOffers(e.target.checked)} />
            </div>

            <section className="rounded-xl border border-grey-500 p-5 md:col-span-2">
              <h3 className="font-serif text-lg font-semibold">Get Seen First…</h3>
              <p className="mt-3 text-sm font-semibold">Boost item</p>
              <p className="text-sm text-powder-900">Want to put your item front and centre? Boost it so buyers see it (and bag it), faster!</p>
            </section>
          </div>
        )}
      </WizardShell>

      <Modal open={!!modelFor} onClose={() => setModelFor(null)} title="Select Model">
        <p className="mb-3 text-sm text-powder-900">
          This is optional but Taggy advises you use this feature to increase your items visibility.
        </p>
        <p className="mb-4 inline-block rounded-md border border-papaya-500 px-3 py-1 text-xs">
          Credits: <strong>18/57 remaining</strong>
        </p>
        <fieldset className="mb-5 flex flex-col gap-2">
          <legend className="sr-only">Model preset</legend>
          {models.map((m) => (
            <label key={m} className="flex cursor-pointer items-center gap-3 rounded-lg border border-grey-500 px-4 py-3 text-sm hover:bg-grey-500/40">
              <input type="radio" name="model" value={m} checked={model === m} onChange={() => setModel(m)} className="size-4 accent-black" />
              {m}
            </label>
          ))}
        </fieldset>
        {/* TODO: call the model-generation service once the backend is connected. */}
        <Button fullWidth size="lg" disabled={!model} onClick={() => setModelFor(null)}>
          Generate
        </Button>
      </Modal>

      <Modal open={!!preview} onClose={() => setPreview(null)} title="Preview">
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview.url} alt="Listing preview" className="max-h-[70vh] w-full rounded-lg object-contain" />
        )}
      </Modal>
    </>
  );
}
