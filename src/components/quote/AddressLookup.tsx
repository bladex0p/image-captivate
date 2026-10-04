import { useEffect, useRef, useState } from "react";
import type { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ADDRESSNOW_KEY } from "@/config/addressnow";
import type { QuoteValues } from "./types";
import { darkInput } from "./types";

type Pca = {
  fieldMode: { SEARCH: number; POPULATE: number; DEFAULT: number };
  Address: new (
    fields: { element: string; field: string; mode: number }[],
    opts: Record<string, unknown>,
  ) => {
    listen: (ev: string, fn: (a: Record<string, string>) => void) => void;
    destroy?: () => void;
    load?: () => void;
  };
  load?: () => void;
};
declare global {
  interface Window {
    pca?: Pca;
  }
}

export function AddressLookup({
  prefix,
  label,
  register,
  setValue,
  errors,
  onChanged,
}: {
  prefix: "collection" | "delivery";
  label: string;
  register: UseFormRegister<QuoteValues>;
  setValue: UseFormSetValue<QuoteValues>;
  errors: FieldErrors<QuoteValues>;
  onChanged?: () => void;
}) {
  const [manual, setManual] = useState(false);
  const [populated, setPopulated] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const id = (f: string) => `${prefix}-${f}`;
  const err = errors[prefix];

  useEffect(() => {
    let ctrl: InstanceType<Pca["Address"]> | null = null;
    let cancelled = false;
    let tries = 0;
    const init = () => {
      if (cancelled) return;
      const pca = window.pca;
      if (!pca) {
        if (++tries > 25) {
          setUnavailable(true);
          setManual(true);
          return;
        }
        setTimeout(init, 200);
        return;
      }
      try {
        const m = pca.fieldMode;
        ctrl = new pca.Address(
          [
            { element: id("search"), field: "", mode: m.SEARCH },
            { element: id("line1"), field: "Line1", mode: m.POPULATE },
            { element: id("line2"), field: "Line2", mode: m.POPULATE },
            { element: id("town"), field: "City", mode: m.POPULATE },
            { element: id("postcode"), field: "PostalCode", mode: m.POPULATE },
          ],
          { key: ADDRESSNOW_KEY, setCursor: true },
        );
        ctrl.listen("populate", (a) => {
          const opts = { shouldValidate: true, shouldDirty: true };
          setValue(`${prefix}.line1`, a.Line1 ?? "", opts);
          setValue(`${prefix}.line2`, [a.Line2, a.Line3].filter(Boolean).join(", "), opts);
          setValue(`${prefix}.town`, a.City ?? "", opts);
          setValue(`${prefix}.postcode`, a.PostalCode ?? "", opts);
          setPopulated(true);
          onChanged?.();
        });
        pca.load?.();
      } catch {
        setUnavailable(true);
        setManual(true);
      }
    };
    init();
    return () => {
      cancelled = true;
      try {
        ctrl?.destroy?.();
      } catch {
        /* ignore */
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix]);

  const showFields = manual || populated;
  const searchReg = register(`${prefix}.search`);

  return (
    <fieldset className="grid gap-3">
      <legend className="mb-2 font-heading text-xl font-bold uppercase">{label}</legend>
      {!unavailable && (
        <div>
          <Label htmlFor={id("search")} className="text-on-dark-muted">Enter a postcode and pick the address from the list</Label>
          <div className="mt-1.5 flex gap-2">
            <Input
              id={id("search")}
              placeholder="e.g. LU4 8BY"
              autoComplete="off"
              className={darkInput}
              {...searchReg}
              ref={(el) => {
                searchReg.ref(el);
                searchRef.current = el;
              }}
            />
            <Button
              type="button"
              variant="outlineDark"
              onClick={() => {
                const el = searchRef.current;
                if (!el) return;
                el.focus();
                el.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true, key: " " }));
                el.dispatchEvent(new Event("input", { bubbles: true }));
              }}
            >
              <Search aria-hidden /> Find Address
            </Button>
          </div>
        </div>
      )}
      {unavailable && (
        <p className="text-xs text-on-dark-muted">Address lookup is unavailable right now. Please enter the address manually.</p>
      )}

      <div className={showFields ? "grid gap-3 sm:grid-cols-2" : "hidden"}>
        <div className="sm:col-span-2">
          <Label htmlFor={id("line1")}>Address line 1</Label>
          <Input id={id("line1")} className={`mt-1.5 ${darkInput}`} autoComplete="address-line1" {...register(`${prefix}.line1`, { onChange: onChanged })} />
          {err?.line1 && <p className="mt-1 text-xs text-brand-red">{err.line1.message}</p>}
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={id("line2")}>Address line 2 (optional)</Label>
          <Input id={id("line2")} className={`mt-1.5 ${darkInput}`} autoComplete="address-line2" {...register(`${prefix}.line2`)} />
        </div>
        <div>
          <Label htmlFor={id("town")}>Town / City</Label>
          <Input id={id("town")} className={`mt-1.5 ${darkInput}`} autoComplete="address-level2" {...register(`${prefix}.town`)} />
          {err?.town && <p className="mt-1 text-xs text-brand-red">{err.town.message}</p>}
        </div>
        <div>
          <Label htmlFor={id("postcode")}>Postcode</Label>
          <Input id={id("postcode")} className={`mt-1.5 ${darkInput} uppercase`} autoComplete="postal-code" {...register(`${prefix}.postcode`, { onChange: onChanged })} />
          {err?.postcode && <p className="mt-1 text-xs text-brand-red">{err.postcode.message}</p>}
        </div>
      </div>
      {!showFields && err && <p className="text-xs text-brand-red">Please select an address or enter it manually.</p>}
      {!manual && (
        <button type="button" onClick={() => setManual(true)} className="justify-self-start text-xs font-semibold uppercase tracking-[0.1em] text-brand-white underline underline-offset-4">
          Enter address manually
        </button>
      )}
    </fieldset>
  );
}
