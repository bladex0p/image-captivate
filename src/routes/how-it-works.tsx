import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading } from "@/components/site/primitives";
import { Coverage, CTABand, FactsBand, FAQAccordion, FleetPreview, NumberedCards, StepTimeline } from "@/components/site/sections";
import { CoverageMarquee, RouteDivider } from "@/components/site/motion";
import { howFaqs } from "@/data/faqs";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/how-it-works")({
  head: () =>
    seo({
      title: "How Our Courier Service Works | LES Transport",
      description:
        "See how LES Transport handles quotes, collection and safe delivery. Learn how our courier process works and request a quote today.",
      path: "/how-it-works",
      faqs: howFaqs,
      crumbs: [{ name: "How It Works", path: "/how-it-works" }],
    }),
  component: HowItWorks,
});

const steps = [
  { title: "Request a Quote", body: "Submit your pickup and delivery locations, required date and time, and item details so our dispatch team can pick the best vehicle and option." },
  { title: "Job Confirmation", body: "Dispatch confirms availability, pricing and the most suitable vehicle, and sends confirmation with any extra information before collection." },
  { title: "Collection", body: "A professional driver is assigned and collects at the agreed time, loading your goods securely." },
  { title: "Safe and Reliable Delivery", body: "Your goods go directly to the destination and are handed to the recipient with professional handling." },
];

function HowItWorks() {
  return (
    <>
      <PageHero crumbs={[{ name: "How It Works" }]} title="How It Works" intro="Four simple steps from quote to delivery." />
      <section className="section">
        <div className="container-les">
          <SectionHeading className="reveal" pill="Process" title="From Quote to Delivery" />
          <div className="mt-14"><StepTimeline steps={steps} /></div>
        </div>
      </section>
      <FactsBand />
      <NumberedCards
        title="Why Choose LES Transport"
        items={[
          { title: "Reliable Courier Services", body: "Every job is planned and delivered safely, efficiently and on time." },
          { title: "Flexible Vehicle Fleet", body: "A 100+ vehicle fleet, from small vans to long wheelbase." },
          { title: "Experienced Drivers", body: "Professional drivers backed by over a decade of industry experience." },
          { title: "Secure Deliveries", body: "Goods-in-transit insurance of up to £10,000 per vehicle." },
          { title: "Nationwide Courier Coverage", body: "Bedfordshire and Birmingham bases, delivering across England." },
        ]}
      />
      <FleetPreview title="Vehicles for Every Delivery" />
      <RouteDivider />
      <Coverage />
      <CoverageMarquee />
      <FAQAccordion faqs={howFaqs} />
      <CTABand title="Need a Courier Today?" secondary={{ label: "View Services", to: "/services" }} />
    </>
  );
}
