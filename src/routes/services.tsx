import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/primitives";
import { Coverage, CTABand, ServicesGrid } from "@/components/site/sections";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    seo({
      title: "Courier Services Across England | LES Transport",
      description:
        "Explore same day, express, pallet and specialist courier services across England with LES Transport. Find the right delivery service today.",
      path: "/services",
      crumbs: [{ name: "Services", path: "/services" }],
    }),
  component: Services,
});

function Services() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services" }]}
        title="Courier Services"
        intro="LES Transport provides fast, reliable courier and delivery services across England, supporting businesses and individuals who require professional transport for parcels, freight and specialist deliveries."
      />
      <section className="on-dark pb-16">
        <div className="container-les max-w-3xl">
          <QuoteWizard />
        </div>
      </section>
      <ServicesGrid />
      <Coverage />
      <CTABand />
    </>
  );
}
