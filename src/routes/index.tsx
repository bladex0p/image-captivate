import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckList, ImageSlot, SectionHeading, Tagline } from "@/components/site/primitives";
import { Coverage, CTABand, FAQAccordion, FleetPreview, NumberedCards, ServicesGrid, StatStrip } from "@/components/site/sections";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { ContactForm } from "@/components/site/ContactForm";
import { homeFaqs } from "@/data/faqs";
import { facts, site } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "LES Transport | Reliable Courier Services",
      description:
        "Fast, secure courier services, from same day and pallet delivery to specialist transport. Get a quote from LES Transport today.",
      path: "/",
      faqs: homeFaqs,
    }),
  component: Home,
});

export const whyItems = [
  { title: "Fast Response Times", body: "Our dispatch team responds quickly to delivery requests, ensuring urgent shipments are handled without delay." },
  { title: "Reliable Courier Network", body: "Operating from Bedfordshire and Birmingham, we provide dependable courier services across England." },
  { title: "Experienced Transport Team", body: "With industry experience and professional drivers, we ensure deliveries are handled safely and efficiently." },
  { title: "Secure Deliveries", body: "All vehicles are covered by goods-in-transit insurance, providing additional peace of mind for customers." },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="on-theme">
        <ImageSlot asset="heroVan" alt="LES Transport van on the road, black and white photograph" ratio="aspect-[16/7] md:aspect-[16/6]" greyscale eager className="rounded-none" />
        <div className="container-les grid gap-12 py-14 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16 lg:py-20">
          <div>
            <Tagline />
            <h1 className="mt-5 text-display">Fast, Reliable Courier &amp; Delivery Services Across England</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-on-dark-muted">
              From urgent same-day deliveries to final mile delivery, LES Transport provides professional courier solutions for businesses and individuals across England. Operating from Bedfordshire with additional coverage from Birmingham, our experienced drivers and versatile fleet ensure your goods reach their destination safely and on time.
            </p>
            <CheckList
              dark
              className="mt-8"
              items={[
                "Same-Day & Urgent Deliveries",
                "Nationwide Coverage Across England",
                "Fleet From Small Vans to Long Wheelbase Vehicles",
                "Final Mile Delivery Specialists",
              ]}
            />
            <Button asChild size="lg" className="mt-10">
              <Link to="/get-a-quote">Request a Delivery Quote</Link>
            </Button>
            <div className="mt-12">
              <StatStrip />
            </div>
          </div>
          <div className="lg:pt-2">
            <QuoteWizard compact />
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="section">
        <div className="container-les grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              pill="About Us"
              title="Professional Courier Services You Can Rely On"
              intro="Whether you require urgent delivery, final mile delivery, or reliable logistics support for your business, LES Transport is ready to help. Our experienced team, flexible vehicle fleet and commitment to reliability make us a trusted courier partner for businesses across England."
            />
            <Button asChild size="lg" className="mt-8">
              <Link to="/get-a-quote">Request a Delivery Quote</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="on-dark card-dark p-8">
              <div className="font-heading text-5xl font-bold tabular-nums">{facts.vehicles}</div>
              <div className="mt-1 text-sm uppercase tracking-[0.12em] text-on-dark-muted">Vehicles</div>
            </div>
            <div className="rounded-md border border-line p-8">
              <div className="font-heading text-5xl font-bold tabular-nums">{facts.goodsInTransit}</div>
              <div className="mt-1 text-sm uppercase tracking-[0.12em] text-fg-muted">Goods-in-transit cover per vehicle</div>
            </div>
          </div>
        </div>
      </section>

      <NumberedCards
        title="Why Businesses Choose LES Transport"
        image={<ImageSlot asset="whyUsDriver" alt="LES Transport driver carrying a parcel to the van" />}
        items={[
          ...whyItems,
          {
            title: "Flexible Delivery Options",
            body: (
              <>
                From single parcel deliveries to complex{" "}
                <Link to="/service/$slug" params={{ slug: "multi-drop-delivery" }} className="text-brand-white underline underline-offset-4">multi-drop routes</Link>
                , we adapt to your logistics needs.
              </>
            ),
          },
        ]}
        cta={<Button asChild size="lg"><Link to="/get-a-quote">Get a Quote</Link></Button>}
      />

      <FleetPreview />
      <ServicesGrid />
      <Coverage />
      <FAQAccordion faqs={homeFaqs} />
      <CTABand />

      {/* Contact */}
      <section className="section">
        <div className="container-les grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading pill="Contact" title="Talk to Our Dispatch Team" />
            <ul className="mt-8 space-y-4 text-sm">
              <li className="flex gap-3"><Phone className="size-5 text-brand-red" aria-hidden /><a href={site.phoneHref} className="font-semibold">{site.phone}</a></li>
              <li className="flex gap-3"><Mail className="size-5 text-brand-red" aria-hidden /><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li className="flex gap-3"><MapPin className="size-5 text-brand-red" aria-hidden />{site.address.full}</li>
              <li className="flex gap-3"><Clock className="size-5 text-brand-red" aria-hidden />{site.hours}</li>
            </ul>
          </div>
          <ContactForm withPhone={false} source="home" />
        </div>
      </section>
    </>
  );
}
