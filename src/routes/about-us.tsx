import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CheckList, ImageSlot, PageHero, SectionHeading } from "@/components/site/primitives";
import { BulletPanel, CTABand, FAQAccordion, FleetPreview, ServicesGrid } from "@/components/site/sections";
import { aboutFaqs } from "@/data/faqs";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about-us")({
  head: () =>
    seo({
      title: "About LES Transport | Reliable Courier Company",
      description:
        "Learn about LES Transport, a trusted courier company delivering secure, reliable services across England. See why businesses choose us.",
      path: "/about-us",
      faqs: aboutFaqs,
      crumbs: [{ name: "About Us", path: "/about-us" }],
    }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero crumbs={[{ name: "About Us" }]} title="About Us" />
      <section className="section">
        <div className="container-les grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading pill="About Us" title="Reliable Courier Services" />
            <div className="mt-6 space-y-4 leading-relaxed text-fg-muted">
              <p>LES Transport is a professional courier and delivery company providing fast, secure and reliable transport services across England. Based in Bedfordshire with additional operational coverage in Birmingham, Hertfordshire and Buckinghamshire we support businesses and individuals who require dependable logistics solutions, from urgent same-day deliveries to final mile delivery.</p>
              <p>Our focus is simple: deliver every job safely, efficiently and on time. We understand that when customers trust us with their deliveries, they are trusting us with something important to their business or personal needs. That is why we prioritise reliability, communication and professional service on every job we undertake.</p>
            </div>
          </div>
          <ImageSlot asset="whyUsDriver" alt="LES Transport driver with a delivery" ratio="aspect-[4/3]" />
        </div>
      </section>
      <section className="section on-theme">
        <div className="container-les grid gap-12 lg:grid-cols-2">
          <SectionHeading
            dark
            pill="Experience"
            title="Built on Industry Experience"
            intro="While LES Transport is a modern and growing logistics company, our team brings over a decade of experience in the transport and courier industry through our sister company, which has been operating since 2013."
          />
          <CheckList dark className="self-center" items={["Time-critical logistics", "Business courier requirements", "Secure transport for valuable goods", "Efficient delivery route planning", "Professional driver standards"]} />
        </div>
      </section>
      <ServicesGrid />
      <FleetPreview title="A 100+ Flexible Fleet for Every Delivery" />
      <section className="section bg-bg-alt">
        <div className="container-les">
          <SectionHeading pill="Coverage" title="Courier Coverage Across England" />
          <ul className="mt-10 flex flex-wrap gap-3">
            {["Bedfordshire", "Hertfordshire", "London", "The Midlands", "And across England"].map((c) => (
              <li key={c} className="rounded-full border border-fg px-5 py-2 text-sm font-semibold uppercase tracking-[0.1em]">{c}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section">
        <div className="container-les grid gap-6 lg:grid-cols-2">
          <BulletPanel title="Our Commitment to Customers" items={["Fast response times", "Reliable delivery schedules", "Secure handling of goods", "Clear communication with customers", "Flexible courier solutions"]} />
          <BulletPanel
            title="Secure and Professional Deliveries"
            body="Our vehicles are covered by goods-in-transit insurance of up to £10,000 per vehicle, giving customers additional confidence that their items are protected during transport. Our drivers are experienced professionals who understand the importance of careful handling, punctuality and clear communication."
          />
        </div>
      </section>
      <FAQAccordion faqs={aboutFaqs} />
      <CTABand title="Work With LES Transport" secondary={{ label: "View Services", to: "/services" }} />
      <div className="hidden"><Button asChild><Link to="/services">Services</Link></Button></div>
    </>
  );
}
