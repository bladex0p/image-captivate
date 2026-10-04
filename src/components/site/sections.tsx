import { Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { services, type Service } from "@/data/services";
import { fleet, fleetIntro } from "@/data/fleet";
import { site, stats } from "@/data/site";
import type { FAQ } from "@/data/faqs";
import { ImageSlot, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      to="/service/$slug"
      params={{ slug: service.slug }}
      className="group reveal flex flex-col rounded-md border border-line bg-surface p-6 transition-colors hover:border-fg"
    >
      <Icon className="size-7 text-brand-red" aria-hidden strokeWidth={1.75} />
      <h3 className="mt-5 text-2xl">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{service.blurb}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
        Learn More <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

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
  return (
    <section className={cn("section bg-bg-alt", className)}>
      <div className="container-les">
        <SectionHeading pill="Services" title={title} intro={intro} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
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
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading pill="Fleet" title={title} intro={intro} />
          <Button asChild variant="outlineLight" className="self-start md:self-auto">
            <Link to="/fleet">View Our Fleet</Link>
          </Button>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.slice(0, 4).map((v) => (
            <article key={v.name} className="reveal">
              <ImageSlot asset={v.image} alt={`${v.name} from the LES Transport fleet`} />
              <h3 className="mt-5 text-2xl">{v.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{v.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StatStrip({ items = stats, dark = true }: { items?: { value: string; label: string }[]; dark?: boolean }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-3")}>
      {items.map((s) => (
        <div
          key={s.label}
          className={cn("rounded-md border p-6", dark ? "border-border-dark" : "border-line bg-surface")}
        >
          <div className="font-heading text-5xl font-bold tabular-nums">{s.value}</div>
          <div className={cn("mt-1 text-sm uppercase tracking-[0.12em]", dark ? "text-on-dark-muted" : "text-fg-muted")}>
            {s.label}
          </div>
        </div>
      ))}
    </div>
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
        <div>
          <SectionHeading pill={pill} title={title} dark />
          {image && <div className="mt-10">{image}</div>}
          {cta && <div className="mt-10">{cta}</div>}
        </div>
        <ol className="grid gap-4 self-start">
          {items.map((it, i) => (
            <li key={it.title} className="card-dark reveal flex gap-6 p-6">
              <span className="font-heading text-3xl font-bold text-brand-red">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-2xl">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-on-dark-muted">{it.body}</p>
              </div>
            </li>
          ))}
        </ol>
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
        <SectionHeading pill="Coverage" title={title} intro={intro} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line md:grid-cols-3">
          {items.map((b) => (
            <div key={b.title} className="reveal bg-surface p-8">
              <h3 className="text-2xl">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{b.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQAccordion({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQ[]; title?: string }) {
  return (
    <section className="section bg-bg-alt">
      <div className="container-les grid gap-10 lg:grid-cols-[4fr_8fr]">
        <SectionHeading pill="FAQ" title={title} />
        <Accordion type="single" collapsible className="rounded-md border border-line bg-surface px-6">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-fg-muted">{f.a}</AccordionContent>
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
      <div className="container-les flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between">
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

export function StepTimeline({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
      <span aria-hidden className="absolute left-0 right-0 top-6 hidden h-px bg-line md:block" />
      {steps.map((s, i) => (
        <li key={s.title} className="reveal relative">
          <span className="relative z-10 flex size-12 items-center justify-center rounded-full bg-fg font-heading text-xl font-bold text-bg">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-2xl">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
        </li>
      ))}
    </ol>
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
