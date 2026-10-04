import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BulletPanel, Coverage, CTABand, FAQAccordion, FleetPreview, ServiceCard } from "@/components/site/sections";
import { ImageSlot, PageHero, SectionHeading, TodoBlock } from "@/components/site/primitives";
import { NotFoundPage } from "@/components/site/pages";
import { getService, services } from "@/data/services";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/service/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData && getService(loaderData.slug);
    if (!s) return { meta: [{ title: "Service not found | LES Transport" }, { name: "robots", content: "noindex" }] };
    return seo({
      title: s.seo.title,
      description: s.seo.description,
      path: `/service/${s.slug}`,
      faqs: s.detail?.faqs ?? undefined,
      crumbs: [
        { name: "Services", path: "/services" },
        { name: s.title, path: `/service/${s.slug}` },
      ],
    });
  },
  notFoundComponent: NotFoundPage,
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const s = getService(slug)!;
  const d = s.detail;
  const related = s.related.map((r) => services.find((x) => x.slug === r)!).filter(Boolean);

  return (
    <>
      <PageHero crumbs={[{ name: "Services", to: "/services" }, { name: s.title }]} title={s.title} intro={s.blurb}>
        <Button asChild size="lg" className="mt-8"><Link to="/get-a-quote">Request a Delivery Quote</Link></Button>
      </PageHero>

      <section className="section">
        <div className="container-les grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading pill="Service" title={`What is ${s.title}?`} />
            <div className="mt-6 leading-relaxed text-fg-muted">
              {d ? <p>{d.intro}</p> : <TodoBlock label={`Intro copy for ${s.title}.`} />}
            </div>
          </div>
          <ImageSlot asset={s.image} alt={`${s.title} by LES Transport`} />
        </div>
      </section>

      <section className="section bg-bg-alt">
        <div className="container-les grid gap-6 lg:grid-cols-3">
          {d ? (
            <>
              <BulletPanel title="Key Benefits" items={d.benefits} />
              <BulletPanel title="Common Use Cases" items={d.useCases} />
              <BulletPanel title="What We Deliver" items={d.whatWeDeliver} />
            </>
          ) : (
            <>
              <TodoBlock label="Key Benefits list." />
              <TodoBlock label="Common Use Cases list." />
              <TodoBlock label="What We Deliver list." />
            </>
          )}
        </div>
      </section>

      <Coverage />
      <FleetPreview />

      <section className="section bg-bg-alt">
        <div className="container-les">
          <SectionHeading pill="Related" title="Related Services" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => <ServiceCard key={r.slug} service={r} />)}
          </div>
        </div>
      </section>

      {d?.faqs ? (
        <FAQAccordion faqs={d.faqs} />
      ) : (
        <section className="section">
          <div className="container-les">
            <SectionHeading pill="FAQ" title="Frequently Asked Questions" />
            <div className="mt-8"><TodoBlock label={`7 FAQs for ${s.title}.`} /></div>
          </div>
        </section>
      )}
      <CTABand />
    </>
  );
}
