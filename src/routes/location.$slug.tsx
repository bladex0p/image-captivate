import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHeading } from "@/components/site/primitives";
import { CTABand, FactsBand, FAQAccordion, FleetPreview, NumberedCards, ServicesGrid } from "@/components/site/sections";
import { NotFoundPage } from "@/components/site/pages";
import { getLocation } from "@/data/locations";
import { mapEmbed } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/location/$slug")({
  loader: ({ params }) => {
    const l = getLocation(params.slug);
    if (!l) throw notFound();
    return { slug: l.slug };
  },
  head: ({ loaderData }) => {
    const l = loaderData && getLocation(loaderData.slug);
    if (!l) return { meta: [{ title: "Location not found | LES Transport" }, { name: "robots", content: "noindex" }] };
    return seo({
      title: l.seo.title,
      description: l.seo.description,
      path: `/location/${l.slug}`,
      faqs: l.faqs,
      crumbs: [{ name: `Courier Services in ${l.town}`, path: `/location/${l.slug}` }],
    });
  },
  notFoundComponent: NotFoundPage,
  component: LocationPage,
});

function LocationPage() {
  const { slug } = Route.useLoaderData();
  const l = getLocation(slug)!;
  return (
    <>
      <PageHero crumbs={[{ name: `Courier Services in ${l.town}` }]} title={l.h1} intro={l.intro}>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {l.highlights.map((h) => (
            <div key={h} className="card-dark p-5 font-heading text-xl font-bold uppercase">{h}</div>
          ))}
        </div>
        <Button asChild size="lg" className="mt-10"><Link to="/get-a-quote">Request a Delivery Quote</Link></Button>
      </PageHero>

      <section className="section">
        <div className="container-les grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading pill="Same Day" title={l.sameDay.title} intro={l.sameDay.body} />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {l.coverage.map((c) => (
                <div key={c.title} className="card-light p-5">
                  <h3 className="flex items-center gap-2 text-xl"><MapPin className="size-4 text-brand-red" aria-hidden />{c.title}</h3>
                  <p className="mt-1 text-sm text-fg-muted">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
          <iframe
            title={`Map of ${l.town}`}
            src={mapEmbed(l.map)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[24rem] w-full rounded-md border border-line grayscale"
          />
        </div>
      </section>

      <FleetPreview />
      <ServicesGrid />
      <NumberedCards title={`Why ${l.town} Businesses Choose LES Transport`} items={l.why} />
      <FAQAccordion faqs={l.faqs} />
      <CTABand />
    </>
  );
}
