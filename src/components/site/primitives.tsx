import { Link, type LinkProps } from "@tanstack/react-router";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { assets, assetSrc, type AssetKey } from "@/data/assets";
import { cn } from "@/lib/utils";

export function PillLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("pill", className)}>{children}</span>;
}

export function Tagline({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand-red", className)}>
      <span aria-hidden className="h-0.5 w-8 bg-brand-red" />
      No Stress. Just LES.
    </p>
  );
}

export function SectionHeading({
  pill,
  title,
  intro,
  as: As = "h2",
  align = "left",
  dark,
  className,
}: {
  pill?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {pill && <PillLabel className="mb-5">{pill}</PillLabel>}
      <As className="text-h1">{title}</As>
      {intro && (
        <p className={cn("mt-5 max-w-[65ch] text-base md:text-lg leading-relaxed", dark ? "text-on-dark-muted" : "text-fg-muted")}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function ImageSlot({
  asset,
  alt,
  ratio = "aspect-[4/3]",
  className,
  greyscale,
  eager,
}: {
  asset: AssetKey;
  alt: string;
  ratio?: string;
  className?: string;
  greyscale?: boolean;
  eager?: boolean;
}) {
  const a = assets[asset];
  if (!a.available) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn("relative flex items-end overflow-hidden rounded-md bg-grey-800", ratio, className)}
      >
        <span className="m-3 rounded-sm bg-brand-black/60 px-2 py-1 font-mono text-[11px] text-on-dark-muted">
          {a.file}
        </span>
      </div>
    );
  }
  return (
    <div className={cn("overflow-hidden rounded-md bg-grey-800", ratio, className)}>
      <img
        src={assetSrc(asset)}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", greyscale && "grayscale")}
      />
    </div>
  );
}

export function CheckList({ items, className, dark }: { items: string[]; className?: string; dark?: boolean }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-red">
            <Check className="size-3 text-on-red" strokeWidth={3} aria-hidden />
          </span>
          <span className={cn("leading-snug", dark ? "text-brand-white" : "text-foreground")}>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; to?: LinkProps["to"] }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.14em] text-on-dark-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link to="/" className="hover:text-brand-white">Home</Link>
        </li>
        {items.map((c) => (
          <li key={c.name} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {c.to ? (
              <Link to={c.to} className="hover:text-brand-white">{c.name}</Link>
            ) : (
              <span aria-current="page" className="text-brand-white">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Dark inner-page hero with breadcrumbs and a single H1. */
export function PageHero({
  crumbs,
  title,
  intro,
  children,
}: {
  crumbs: { name: string; to?: LinkProps["to"] }[];
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-theme border-t border-border-dark">
      <div className="container-les py-16 md:py-24">
        <Breadcrumbs items={crumbs} />
        <Tagline className="mt-8" />
        <h1 className="mt-4 max-w-4xl text-display">{title}</h1>
        {intro && <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-on-dark-muted">{intro}</p>}
        {children}
      </div>
    </section>
  );
}

export function TodoBlock({ label }: { label: string }) {
  return (
    <div className="rounded-md border border-dashed border-brand-red/60 bg-bg-alt p-6 text-sm text-fg-muted">
      <strong className="text-brand-red">TODO:</strong> {label}
    </div>
  );
}
