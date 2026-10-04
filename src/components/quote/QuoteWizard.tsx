import { useRef, useState } from "react";
import { useForm, type Path } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Paperclip, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { getDistance, submitQuote } from "@/lib/forms.functions";
import { cargoTypes, deliveryTypes, labelFor, vehicleCategories, vehicleTypes, type VehicleCategory } from "@/data/vehicles";
import { calculateQuote, SHOW_INSTANT_PRICE } from "@/config/pricing";
import { AddressLookup } from "./AddressLookup";
import { darkInput, defaultQuote, manualDistanceSchema, stepSchemas, type QuoteValues } from "./types";

const STEPS = ["Addresses", "Delivery Type", "Vehicle Category", "Vehicle Type", "Cargo", "Collection", "Your Details"];
const MAX_FILES = 5;
const MAX_TOTAL = 10 * 1024 * 1024;
const ACCEPT = "image/*,.pdf,.doc,.docx,.xls,.xlsx,.csv";

function OptionCards({
  options,
  value,
  onChange,
  name,
}: {
  options: { id: string; title: string; desc: string }[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="grid gap-3">
      {options.map((o) => {
        const on = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(o.id)}
            className={cn(
              "flex items-center justify-between gap-4 rounded-md border p-4 text-left transition-[border-color,background-color,transform] duration-200 hover:-translate-y-px",
              on ? "border-brand-red bg-brand-red/10" : "border-border-dark hover:border-brand-white",
            )}
          >
            <span>
              <span className="block font-semibold">{o.title}</span>
              <span className="mt-0.5 block text-sm text-on-dark-muted">{o.desc}</span>
            </span>
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                on ? "border-brand-red bg-brand-red" : "border-border-dark",
              )}
              aria-hidden
            >
              {on && <Check className="tick-in size-3.5 text-on-red" strokeWidth={3} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const toBase64 = (f: File) =>
  new Promise<string>((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(String(r.result).split(",")[1] ?? "");
    r.onerror = rej;
    r.readAsDataURL(f);
  });

export function QuoteWizard({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [fileErr, setFileErr] = useState("");
  const [submitErr, setSubmitErr] = useState("");
  const [distanceNote, setDistanceNote] = useState(false);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const shakeRef = useRef<HTMLDivElement>(null);
  const shake = () => {
    const el = shakeRef.current;
    if (!el) return;
    el.classList.remove("shake");
    void el.offsetWidth;
    el.classList.add("shake");
  };
  const topRef = useRef<HTMLDivElement>(null);
  const distanceFn = useServerFn(getDistance);
  const submitFn = useServerFn(submitQuote);

  const { register, setValue, watch, getValues, setError, clearErrors, formState, reset } = useForm<QuoteValues>({
    defaultValues: defaultQuote,
  });
  const v = watch();
  const errors = formState.errors;

  const validate = (schema: (typeof stepSchemas)[number]) => {
    clearErrors();
    const r = schema.safeParse(getValues());
    if (r.success) return true;
    shake();
    for (const i of r.error.issues) setError(i.path.join(".") as Path<QuoteValues>, { message: i.message });
    return false;
  };

  const go = (n: number) => {
    setDir(n >= step ? 1 : -1);
    setStep(n);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  const next = async () => {
    if (!validate(stepSchemas[step]!)) return;
    if (step === 1) {
      if (v.distanceSource === "manual") {
        if (!validate(manualDistanceSchema)) return;
      } else {
        setBusy(true);
        try {
          const r = await distanceFn({ data: { from: v.collection.postcode.trim(), to: v.delivery.postcode.trim() } });
          if (r.ok) {
            setValue("distanceSource", "auto");
            setValue("distanceMiles", String(r.miles));
            setValue("distanceZone", r.zone);
          } else throw new Error();
        } catch {
          setValue("distanceSource", "manual");
          setDistanceNote(true);
          setBusy(false);
          return;
        }
        setBusy(false);
      }
    }
    go(step + 1);
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const merged = [...files, ...Array.from(list)];
    if (merged.length > MAX_FILES) return setFileErr("Up to 5 files.");
    if (merged.reduce((s, f) => s + f.size, 0) > MAX_TOTAL) return setFileErr("Files must total 10MB or less.");
    setFileErr("");
    setFiles(merged);
  };

  const submit = async () => {
    if (!validate(stepSchemas[7]!)) return;
    setBusy(true);
    setSubmitErr("");
    try {
      const attachments = await Promise.all(
        files.map(async (f) => ({ name: f.name, type: f.type || "application/octet-stream", size: f.size, base64: await toBase64(f) })),
      );
      const s = getValues();
      const strip = (a: QuoteValues["collection"]) => ({ line1: a.line1, line2: a.line2, town: a.town, postcode: a.postcode.toUpperCase() });
      await submitFn({
        data: {
          collection: strip(s.collection),
          delivery: strip(s.delivery),
          distanceMiles: s.distanceMiles ? Number(s.distanceMiles) : null,
          distanceZone: s.distanceZone || null,
          distanceSource: s.distanceSource === "auto" ? "auto" : "manual",
          deliveryType: s.deliveryType,
          vehicleCategory: s.vehicleCategory,
          vehicleType: s.vehicleType,
          cargoType: s.cargoType,
          collectionDate: s.collectionDate,
          collectionTime: s.collectionTime,
          specialRequirements: s.specialRequirements,
          fullName: s.fullName,
          email: s.email,
          phone: s.phone,
          terms: true,
          website: s.website,
          attachments,
        },
      });
      go(8);
    } catch (e) {
      setSubmitErr(e instanceof Error ? e.message : "Something went wrong. Please call us.");
    } finally {
      setBusy(false);
    }
  };

  const restart = () => {
    reset(defaultQuote);
    setFiles([]);
    setDistanceNote(false);
    go(1);
  };

  const today = new Date().toISOString().slice(0, 10);
  const price = calculateQuote({ deliveryType: v.deliveryType, vehicleType: v.vehicleType, miles: v.distanceMiles ? Number(v.distanceMiles) : null });
  const err = (k: keyof QuoteValues) => {
    const e = errors[k];
    return e && "message" in e && e.message ? <p className="mt-2 text-xs text-brand-red">{String(e.message)}</p> : null;
  };
  const H = ({ children, sub }: { children: string; sub?: string }) => (
    <div className="mb-6">
      <h3 className={compact ? "text-2xl" : "text-3xl"}>{children}</h3>
      {sub && <p className="mt-1 text-sm text-on-dark-muted">{sub}</p>}
    </div>
  );

  return (
    <div ref={topRef} className={cn("on-dark card-dark scroll-mt-28", compact ? "p-5 sm:p-6" : "p-6 sm:p-10")}>
      {step <= 7 && (
        <div className="mb-8">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs uppercase tracking-[0.14em] text-on-dark-muted">
            <span className="min-w-0">Step {step} of 7</span>
            <span className="max-w-[12rem] truncate text-right">{STEPS[step - 1]}</span>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-brand-white/15" aria-hidden>
            <div
              className="h-full origin-left rounded-full bg-brand-red transition-transform duration-500 ease-out"
              style={{ transform: `scaleX(${step / 7})` }}
            />
          </div>
          <div className="mt-3 flex justify-between" aria-hidden>
            {STEPS.map((s, i) => (
              <span
                key={s}
                className={cn(
                  "size-2 rounded-full transition-[background-color,transform] duration-300",
                  i + 1 === step ? "scale-125 bg-brand-red" : i + 1 < step ? "bg-brand-white" : "bg-brand-white/20",
                )}
              />
            ))}
          </div>
        </div>
      )}

      <form onSubmit={(e) => e.preventDefault()} noValidate className="overflow-hidden">
        <div ref={shakeRef}>
        <div key={step} className={dir > 0 ? "step-fwd" : "step-back"}>
        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" {...register("website")} />

        {step === 1 && (
          <div className="grid gap-8">
            <H>Where are we collecting and delivering?</H>
            <AddressLookup prefix="collection" label="Collection Address" register={register} setValue={setValue} errors={errors} />
            <AddressLookup prefix="delivery" label="Delivery Address" register={register} setValue={setValue} errors={errors} />
            {v.distanceSource === "manual" && (
              <div className="grid gap-3 rounded-md border border-border-dark p-4">
                {distanceNote && <p className="text-sm">We couldn't calculate the distance automatically. Please enter the details below.</p>}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="dz">Distance Zone</Label>
                    <select id="dz" {...register("distanceZone")} className={cn("mt-1.5 w-full rounded-md border px-3", darkInput)}>
                      <option value="" className="bg-brand-black">Select…</option>
                      <option value="under-30" className="bg-brand-black">Under 30 miles</option>
                      <option value="30-plus" className="bg-brand-black">30+ miles</option>
                    </select>
                    {err("distanceZone")}
                  </div>
                  <div>
                    <Label htmlFor="dm">Distance (miles)</Label>
                    <Input id="dm" inputMode="decimal" className={cn("mt-1.5", darkInput)} {...register("distanceMiles")} />
                    {err("distanceMiles")}
                  </div>
                </div>
              </div>
            )}
            <p className="text-xs text-on-dark-muted">Address lookup powered by Royal Mail AddressNow.</p>
          </div>
        )}

        {step === 2 && (
          <>
            <H sub="How quickly do you need the delivery?">Delivery Type</H>
            <OptionCards name="Delivery type" options={deliveryTypes} value={v.deliveryType} onChange={(x) => setValue("deliveryType", x)} />
            {err("deliveryType")}
          </>
        )}

        {step === 3 && (
          <>
            <H sub="What size of vehicle do you need?">Vehicle Category</H>
            <OptionCards
              name="Vehicle category"
              options={vehicleCategories}
              value={v.vehicleCategory}
              onChange={(x) => {
                if (x !== v.vehicleCategory) setValue("vehicleType", "");
                setValue("vehicleCategory", x);
              }}
            />
            {err("vehicleCategory")}
          </>
        )}

        {step === 4 && (
          <>
            <H>Vehicle Type</H>
            <OptionCards
              name="Vehicle type"
              options={vehicleTypes[(v.vehicleCategory || "normal") as VehicleCategory]}
              value={v.vehicleType}
              onChange={(x) => setValue("vehicleType", x)}
            />
            {err("vehicleType")}
          </>
        )}

        {step === 5 && (
          <>
            <H sub="What are you sending?">Cargo Type</H>
            <OptionCards name="Cargo type" options={cargoTypes} value={v.cargoType} onChange={(x) => setValue("cargoType", x)} />
            {err("cargoType")}
          </>
        )}

        {step === 6 && (
          <div className="grid gap-5">
            <H>Collection Details</H>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cd">Collection Date</Label>
                <Input id="cd" type="date" min={today} className={cn("mt-1.5 [color-scheme:dark]", darkInput)} {...register("collectionDate")} />
                {err("collectionDate")}
              </div>
              <div>
                <Label htmlFor="ct">Collection Time</Label>
                <Input id="ct" type="time" className={cn("mt-1.5 [color-scheme:dark]", darkInput)} {...register("collectionTime")} />
                {err("collectionTime")}
              </div>
            </div>
            <div>
              <Label htmlFor="sr">Special Requirements (optional)</Label>
              <Textarea id="sr" rows={4} maxLength={2000} className={cn("mt-1.5 h-auto", darkInput)} {...register("specialRequirements")} />
              <p className="mt-1 text-right text-xs text-on-dark-muted">{v.specialRequirements.length} / 2000</p>
              {err("specialRequirements")}
            </div>
            <div>
              <span className="text-sm font-medium">Attachments (optional)</span>
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setDrag(true);
                }}
                onDragLeave={() => setDrag(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDrag(false);
                  addFiles(e.dataTransfer.files);
                }}
                className={cn(
                  "mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-md border border-dashed p-6 text-center text-sm",
                  drag ? "border-brand-red bg-brand-red/10" : "border-border-dark",
                )}
              >
                <Upload className="size-5" aria-hidden />
                Drag files here or click to browse
                <span className="text-xs text-on-dark-muted">Images, PDF, Word, Excel · up to 5 files, 10MB total</span>
                <input type="file" multiple accept={ACCEPT} className="sr-only" onChange={(e) => addFiles(e.target.files)} />
              </label>
              {fileErr && <p className="mt-2 text-xs text-brand-red">{fileErr}</p>}
              {files.length > 0 && (
                <ul className="mt-3 grid gap-2">
                  {files.map((f, i) => (
                    <li key={f.name + i} className="flex items-center justify-between gap-3 rounded-md border border-border-dark px-3 py-2 text-sm">
                      <span className="flex min-w-0 items-center gap-2"><Paperclip className="size-4 shrink-0" aria-hidden /><span className="truncate">{f.name}</span></span>
                      <button type="button" aria-label={`Remove ${f.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))}>
                        <X className="size-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="grid gap-4">
            <H sub="We'll use these to send you the quote.">Your Details</H>
            <div>
              <Label htmlFor="fn">Full Name</Label>
              <Input id="fn" autoComplete="name" className={cn("mt-1.5", darkInput)} {...register("fullName")} />
              {err("fullName")}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="em">Email</Label>
                <Input id="em" type="email" autoComplete="email" className={cn("mt-1.5", darkInput)} {...register("email")} />
                {err("email")}
              </div>
              <div>
                <Label htmlFor="ph">Phone</Label>
                <Input id="ph" type="tel" autoComplete="tel" className={cn("mt-1.5", darkInput)} {...register("phone")} />
                {err("phone")}
              </div>
            </div>
            <label className="mt-2 flex items-start gap-3 text-sm">
              <input type="checkbox" className="mt-0.5 size-4 accent-brand-red" {...register("terms")} />
              <span>
                I accept the{" "}
                <Link to="/terms" className="underline underline-offset-4" target="_blank">terms and conditions</Link>
              </span>
            </label>
            {err("terms")}
            {submitErr && <p role="alert" className="text-sm text-brand-red">{submitErr}</p>}
          </div>
        )}

        {step === 8 && (
          <div className="grid gap-6" role="status">
            <div className="flex items-start gap-4">
              <svg viewBox="0 0 56 56" className="success-tick size-12 shrink-0 text-brand-red" aria-hidden>
                <circle cx="28" cy="28" r="25" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M17 29 l7 7 l15 -16" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div>
                <h3 className="text-3xl">Quote request submitted</h3>
                <p className="mt-1 text-on-dark-muted">Our team will be in touch shortly.</p>
              </div>
            </div>
            <div className="fade-late rounded-md border border-border-dark p-5">
              <h4 className="text-xl">Your Quote</h4>
              <dl className="mt-4 grid gap-2 text-sm">
                <div className="flex justify-between gap-4"><dt className="text-on-dark-muted">Route</dt><dd className="text-right">{v.collection.postcode.toUpperCase()} → {v.delivery.postcode.toUpperCase()}</dd></div>
                {v.distanceMiles && <div className="flex justify-between gap-4"><dt className="text-on-dark-muted">Estimated distance</dt><dd>{v.distanceMiles} miles</dd></div>}
                <div className="flex justify-between gap-4"><dt className="text-on-dark-muted">Delivery</dt><dd>{labelFor(deliveryTypes, v.deliveryType)}</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-on-dark-muted">Vehicle</dt><dd>{labelFor(vehicleTypes[(v.vehicleCategory || "normal") as VehicleCategory], v.vehicleType)}</dd></div>
              </dl>
              <div className="mt-5 border-t border-border-dark pt-4 text-sm">
                {SHOW_INSTANT_PRICE && price ? (
                  <dl className="grid gap-2">
                    <div className="flex justify-between"><dt>Subtotal (ex. VAT)</dt><dd>£{price.subtotal.toFixed(2)}</dd></div>
                    <div className="flex justify-between"><dt>VAT (20%)</dt><dd>£{price.vat.toFixed(2)}</dd></div>
                    <div className="flex justify-between font-semibold"><dt>Total (inc. VAT)</dt><dd>£{price.total.toFixed(2)}</dd></div>
                  </dl>
                ) : (
                  <p className="font-semibold">Final price confirmed by our dispatch team</p>
                )}
              </div>
            </div>
            <Button type="button" variant="outlineDark" onClick={restart} className="justify-self-start">Start New Quote</Button>
          </div>
        )}

        </div>
        </div>
        {step <= 7 && (
          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 1 ? (
              <Button type="button" variant="outlineDark" onClick={() => go(step - 1)}>Back</Button>
            ) : (
              <span />
            )}
            {step < 7 ? (
              <Button type="button" onClick={next} disabled={busy}>{busy ? "Checking…" : "Next"}</Button>
            ) : (
              <Button type="button" onClick={submit} disabled={busy}>{busy ? "Sending…" : "Get My Quote"}</Button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
