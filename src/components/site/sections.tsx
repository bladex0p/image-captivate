import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, type Service } from "@/data/services";
import { fleet, fleetIntro } from "@/data/fleet";
import { facts, site, stats } from "@/data/site";
import { CountUp, Reveal, Stagger, staggerIndex } from "./motion";
import { FleetCarousel } from "./FleetCarousel";
export { StepTimeline } from "./StepTimeline";
import type { FAQ } from "@/data/faqs";
import { ImageSlot, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

export function ServiceCard({ service, featured, index = 0, className }: { service: Service; featured?: boolean; index?: number; className?: string }) {
  const Icon = service.icon;
  return (
    <Link
      to="/service/$slug"
      params={{ slug: service.slug }}
      style={staggerIndex(index)}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border border-line bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-brand-red hover:shadow-[0_18px_40px_-24px_var(--brand-red)]",
        featured && "lg:p-8",
        className,
      )}
    >
      <Icon
        className={cn("text-brand-red transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1", featured ? "size-10" : "size-7")}
        aria-hidden
        strokeWidth={1.75}
      />
      <h3 className={cn("mt-5", featured ? "text-3xl lg:text-4xl" : "text-2xl")}>{service.title}</h3>
      <p className={cn("mt-2 flex-1 leading-relaxed text-fg-muted", featured ? "text-base max-w-md" : "text-sm")}>{service.blurb}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
        Learn More <ArrowRight className="size-3.5 text-brand-red transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden />
      </span>
    </Link>
  );
}

/** Bento spans for the full 10-service grid (4 columns, 16 cells). */
const bento: Record<number, string> = {
  0: "lg:col-span-2 lg:row-span-2",
  4: "lg:col-span-2",
  6: "lg:col-span-2",
  9: "lg:col-span-2",
};

export function ServicesGrid({
  items = services,
  title = "Our Courier Services",
  intro = "We provide a range of delivery solutions designed to meet different logistics requirements.",
  className,
}: {
  items?: Service[];
  title?: string;
  intro?: string;
  className?: string;
}) {
  const isBento = items.length === 10;
  return (
    <section className={cn("section bg-bg-alt", className)}>
      <div className="container-les">
        <Reveal><SectionHeading pill="Services" title={title} intro={intro} /></Reveal>
        <Stagger
          className={cn(
            "mt-12 grid gap-4",
            isBento ? "sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {items.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} featured={isBento && i === 0} className={isBento ? bento[i] : undefined} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function FleetPreview({
  title = "A 100+ Courier Fleet Ready for Any Delivery",
  intro = fleetIntro,
  className,
}: {
  title?: string;
  intro?: string;
  className?: string;
}) {
  return (
    <section className={cn("section bg-surface", className)}>
      <div className="container-les">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading pill="Fleet" title={title} intro={intro} />
          <Button asChild variant="outlineLight" className="self-start md:self-auto">
            <Link to="/fleet">View Our Fleet <ArrowRight aria-hidden /></Link>
          </Button>
        </Reveal>
        <FleetCarousel items={fleet.slice(0, 4)} className="mt-12" />
      </div>
    </section>
  );
}

export function StatStrip({ items = stats, dark = true }: { items?: { value: string; label: string }[]; dark?: boolean }) {
  return (
    <Stagger className={cn("grid gap-4", items.length === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3")}>
      {items.map((s, i) => (
        <div
          key={s.label}
          style={staggerIndex(i)}
          className={cn("rounded-md border p-6", dark ? "border-border-dark" : "border-line bg-surface")}
        >
          <CountUp value={s.value} className="block font-heading text-5xl font-bold" />
          <div className={cn("mt-1 text-sm uppercase tracking-[0.12em]", dark ? "text-on-dark-muted" : "text-fg-muted")}>
            {s.label}
          </div>
        </div>
      ))}
    </Stagger>
  );
}

/** All headline figures from site.ts: shipments, rating, hubs, vehicles, cover. */
export function FactsBand({ className }: { className?: string }) {
  return (
    <section className={cn("section on-dark", className)}>
      <div className="container-les">
        <StatStrip
          items={[
            ...stats.slice(0, 2),
            { value: facts.vehicles, label: "Vehicles" },
            { value: facts.goodsInTransit, label: "Goods-in-transit cover per vehicle" },
          ]}
        />
      </div>
    </section>
  );
}

export function NumberedCards({
  items,
  pill = "Why Us",
  title,
  image,
  cta,
}: {
  items: { title: string; body: ReactNode }[];
  pill?: string;
  title: string;
  image?: ReactNode;
  cta?: ReactNode;
}) {
  return (
    <section className="section on-dark">
      <div className="container-les grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <div className="self-start lg:sticky lg:top-28">
          <SectionHeading pill={pill} title={title} dark />
          {image && <div className="mt-10">{image}</div>}
          {cta && <div className="mt-10">{cta}</div>}
        </div>
        <Stagger as="ol" className="grid gap-4 self-start">
          {items.map((it, i) => (
            <li
              key={it.title}
              style={staggerIndex(i)}
              className="card-dark group flex gap-6 bg-brand-black/40 p-6 transition-colors hover:border-brand-red md:p-8"
            >
              <span className="num-outline font-heading text-4xl font-bold leading-none md:text-5xl">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-2xl">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">{it.body}</p>
              </div>
            </li>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function Coverage({
  title = "Courier Coverage Across England",
  intro = "LES Transport operates across England, providing fast courier services to businesses and individuals across a wide range of locations.",
  blocks,
}: {
  title?: string;
  intro?: string;
  blocks?: { title: string; body: ReactNode }[];
}) {
  const items = blocks ?? [
    {
      title: "Nationwide Courier Coverage",
      body: "We provide courier services across England, with extended delivery coverage available to Scotland and Wales when required.",
    },
    {
      title: "Bedfordshire Courier Services",
      body: "Our main base in Bedfordshire allows us to deliver quickly throughout Bedfordshire, Hertfordshire, Buckinghamshire and surrounding regions.",
    },
    {
      title: "Birmingham Courier Services",
      body: (
        <>
          With operational presence in Birmingham, we provide strong coverage across the Midlands.{" "}
          <Link
            to="/location/$slug"
            params={{ slug: "courier-services-in-birmingham" }}
            className="font-semibold text-brand-red underline-offset-4 hover:underline"
          >
            Birmingham courier services
          </Link>
        </>
      ),
    },
  ];
  return (
    <section className="section bg-surface">
      <div className="container-les">
        <Reveal><SectionHeading pill="Coverage" title={title} intro={intro} /></Reveal>
        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
          {items.map((b, i) => (
            <div key={b.title} style={staggerIndex(i)} className="bg-surface p-8 lg:p-10">
              <h3 className="flex items-center gap-3 text-2xl">
                {/Bedfordshire|Birmingham/.test(b.title) && <span className="pulse-dot shrink-0" aria-hidden />}
                {b.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{b.body}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function FAQAccordion({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQ[]; title?: string }) {
  return (
    <section className="section bg-bg-alt">
      <div className="container-les grid gap-10 lg:grid-cols-[4fr_8fr]">
        <Reveal className="self-start lg:sticky lg:top-28"><SectionHeading pill="FAQ" title={title} /></Reveal>
        <Accordion type="single" collapsible className="reveal overflow-hidden rounded-md border border-line bg-surface">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`f${i}`}
              className="border-l-2 border-l-transparent border-b-line px-6 transition-colors last:border-b-0 data-[state=open]:border-l-brand-red data-[state=open]:bg-bg-alt/60"
            >
              <AccordionTrigger plus className="py-5 text-left text-base font-semibold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-fg-muted">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function CTABand({
  title = "Ready to Book a Delivery?",
  body = "Tell us what you are sending and where. Our dispatch team will confirm the best vehicle and price.",
  secondary,
}: {
  title?: string;
  body?: string;
  secondary?: { label: string; to: "/services" | "/contact-us" };
}) {
  return (
    <section className="on-theme border-t border-border-dark">
      <div className="reveal container-les flex flex-col gap-8 py-16 md:py-20 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-h2">{title}</h2>
          <p className="mt-3 text-on-dark-muted">{body}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {secondary && (
            <Button asChild variant="outlineDark" size="lg">
              <Link to={secondary.to}>{secondary.label}</Link>
            </Button>
          )}
          <Button asChild size="lg">
            <Link to="/get-a-quote">Request a Delivery Quote</Link>
          </Button>
          <Button asChild variant="outlineDark" size="lg" className="md:hidden">
            <a href={site.phoneHref}>
              <Phone aria-hidden /> Call {site.phone}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function BulletPanel({ title, items, body }: { title: string; items?: string[]; body?: string }) {
  return (
    <div className="reveal rounded-md border border-line p-8">
      <h3 className="text-3xl">{title}</h3>
      {body && <p className="mt-4 leading-relaxed text-fg-muted">{body}</p>}
      {items && (
        <ul className="mt-5 space-y-2">
          {items.map((i) => (
            <li key={i} className="flex gap-3 text-sm">
              <span aria-hidden className="mt-2 h-0.5 w-4 shrink-0 bg-brand-red" />
              {i}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
