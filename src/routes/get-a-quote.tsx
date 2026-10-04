import { createFileRoute } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { PageHero, CheckList } from "@/components/site/primitives";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { site } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/get-a-quote")({
  head: () =>
    seo({
      title: "Get a Courier Quote | LES Transport",
      description: "Request a delivery quote from LES Transport in a few quick steps. Same day, express and specialised courier services across England.",
      path: "/get-a-quote",
      crumbs: [{ name: "Get a Quote", path: "/get-a-quote" }],
    }),
  component: Quote,
});

function Quote() {
  return (
    <>
      <PageHero crumbs={[{ name: "Get a Quote" }]} title="Request a Delivery Quote" />
      <section className="on-theme pb-24">
        <div className="container-les grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <CheckList dark items={["Seven quick steps", "Right vehicle matched to your job", "Goods-in-transit cover up to £10,000"]} />
            <p className="mt-10 text-sm text-on-dark-muted">Prefer to talk?</p>
            <a href={site.phoneHref} className="mt-2 inline-flex items-center gap-2 font-heading text-3xl font-bold">
              <Phone className="size-6 text-brand-red" aria-hidden /> {site.phone}
            </a>
            <p className="mt-1 text-sm text-on-dark-muted">{site.hours}</p>
          </div>
          <QuoteWizard />
        </div>
      </section>
    </>
  );
}
