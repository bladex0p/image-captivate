import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckList, ImageSlot, SectionHeading, Tagline } from "@/components/site/primitives";
import { Coverage, CTABand, FAQAccordion, FleetPreview, NumberedCards, ServicesGrid, StatStrip } from "@/components/site/sections";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { ContactForm } from "@/components/site/ContactForm";
import { CountUp, CoverageMarquee, RouteDivider, staggerIndex } from "@/components/site/motion";
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

const heroWords = "Fast, Reliable Courier & Delivery Services Across England".split(" ");

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="on-theme relative overflow-hidden">
        <div className="relative h-[46vh] min-h-[18rem] overflow-hidden md:h-[58vh] lg:h-[64vh]">
          <div className="hero-zoom absolute inset-0">
            <ImageSlot asset="heroVan" alt="LES Transport van on the road, black and white photograph" ratio="h-full" greyscale eager className="h-full rounded-none" />
          </div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-[oklch(0_0_0/35%)] via-[oklch(0_0_0/10%)] to-brand-black" />
        </div>
        <div className="container-les relative grid gap-14 pb-24 pt-12 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-20 lg:pb-32 lg:pt-16">
          <div>
            <Tagline />
            <h1 className="mt-6 text-[clamp(2.75rem,1.4rem+4.6vw,6rem)] leading-[0.95]">
              {heroWords.map((w, i) => (
                <span key={i} className="hero-word">
                  <span style={staggerIndex(i)}>{w}</span>
                  {i < heroWords.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>
            <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-on-dark-muted">
              From urgent same-day deliveries to final mile delivery, LES Transport provides professional courier solutions for businesses and individuals across England. Operating from Bedfordshire with additional coverage from Birmingham, our experienced drivers and versatile fleet ensure your goods reach their destination safely and on time.
            </p>
            <CheckList
              dark
              animated
              className="mt-10"
              items={[
                "Same-Day & Urgent Deliveries",
                "Nationwide Coverage Across England",
                "Fleet From Small Vans to Long Wheelbase Vehicles",
                "Final Mile Delivery Specialists",
              ]}
            />
            <Button asChild size="lg" className="mt-12">
              <Link to="/get-a-quote">Request a Delivery Quote</Link>
            </Button>
            <div className="mt-16">
              <StatStrip />
            </div>
          </div>
          <div className="relative z-10 lg:-mt-56">
            <div className="rounded-md shadow-[0_40px_80px_-30px_oklch(0_0_0/65%)] lg:sticky lg:top-28">
              <QuoteWizard compact />
            </div>
          </div>
        </div>
        <svg aria-hidden viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute inset-x-0 bottom-4 h-6 w-full text-brand-red">
          <path className="route-march" d="M0 22 C 240 6, 480 36, 720 20 S 1200 6, 1440 22" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 8" vectorEffect="non-scaling-stroke" />
        </svg>
      </section>

      <CoverageMarquee />

      {/* About teaser */}
      <section className="section">
        <div className="container-les grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              className="reveal"
              pill="About Us"
              title="Professional Courier Services You Can Rely On"
              intro="Whether you require urgent delivery, final mile delivery, or reliable logistics support for your business, LES Transport is ready to help. Our experienced team, flexible vehicle fleet and commitment to reliability make us a trusted courier partner for businesses across England."
            />
            <Button asChild size="lg" className="mt-8">
              <Link to="/get-a-quote">Request a Delivery Quote</Link>
            </Button>
          </div>
          <div className="stagger grid grid-cols-2 gap-4">
            <div className="on-dark texture-dark card-dark p-8">
              <CountUp value={facts.vehicles} className="block font-heading text-5xl font-bold" />
              <div className="mt-1 text-sm uppercase tracking-[0.12em] text-on-dark-muted">Vehicles</div>
            </div>
            <div className="rounded-md border border-line p-8">
              <CountUp value={facts.goodsInTransit} className="block font-heading text-5xl font-bold" />
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
      <RouteDivider />
      <ServicesGrid />
      <Coverage />
      <FAQAccordion faqs={homeFaqs} />
      <CTABand />

      {/* Contact */}
      <section className="section">
        <div className="container-les grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading className="reveal" pill="Contact" title="Talk to Our Dispatch Team" />
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
