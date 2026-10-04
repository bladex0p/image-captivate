import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/primitives";
import { FleetCarousel } from "@/components/site/FleetCarousel";
import { RouteDivider } from "@/components/site/motion";
import { facts } from "@/data/site";
import { CTABand, FAQAccordion, StatStrip } from "@/components/site/sections";
import { fleet, specFootnote } from "@/data/fleet";
import { fleetFaqs } from "@/data/faqs";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/fleet")({
  head: () =>
    seo({
      title: "Courier Fleet | Vans for All Delivery Sizes | LES Transport",
      description:
        "Explore the LES Transport fleet, with 100+ vehicles ready for parcels, pallet deliveries and larger loads. Find the right transport solution.",
      path: "/fleet",
      faqs: fleetFaqs,
      crumbs: [{ name: "Our Fleet", path: "/fleet" }],
    }),
  component: Fleet,
});

const cols = [
  ["payload", "Max payload"],
  ["loadSpace", "Load space (L x W x H)"],
  ["floorArea", "Floor area"],
  ["pallets", "Pallet capacity"],
  ["tailLift", "Tail lift"],
] as const;

function Fleet() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Our Fleet" }]}
        title="Our Courier Fleet: 100+ Vans for Every Delivery Across England"
        intro="The LES Transport fleet is a 100+ vehicle courier fleet operating from hubs in Bedfordshire and Birmingham, covering small vans for parcels through to long wheelbase vans for palletised freight. Every vehicle carries goods-in-transit insurance up to £10,000. From single-document drops to multi-pallet bulk shipments, we match the right vehicle to every job."
      >
        <div className="mt-12">
          <StatStrip
            items={[
              { value: facts.vehicles, label: "Vehicles in the active fleet" },
              { value: String(fleet.length), label: "Vehicle classes (Small Van to LWB)" },
              { value: facts.goodsInTransit, label: "Goods-in-transit insurance per vehicle" },
            ]}
          />
        </div>
      </PageHero>

      <section className="section">
        <div className="container-les">
          <FleetCarousel items={fleet} headingLevel="h2" cols="lg:grid-cols-3" />
        </div>
      </section>
      <RouteDivider />

      <section className="section bg-bg-alt">
        <div className="container-les">
          <h2 className="reveal text-h2">Vehicle Specifications</h2>
          {/* Desktop table */}
          <div className="reveal mt-10 hidden overflow-hidden rounded-md border border-line bg-surface md:block">
            <table className="w-full text-left text-sm tabular-nums">
              <thead className="on-dark">
                <tr>
                  <th scope="col" className="p-4 font-semibold uppercase tracking-[0.08em]">Vehicle</th>
                  {cols.map(([, l]) => <th key={l} scope="col" className="p-4 font-semibold uppercase tracking-[0.08em]">{l}</th>)}
                </tr>
              </thead>
              <tbody>
                {fleet.map((v) => (
                  <tr key={v.name} className="border-t border-line transition-colors hover:bg-bg-alt [&:hover>th]:text-brand-red">
                    <th scope="row" className="p-4 font-semibold transition-colors">{v.name}</th>
                    {cols.map(([k]) => <td key={k} className="p-4 text-fg-muted">{v.spec[k]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="mt-8 grid gap-4 md:hidden">
            {fleet.map((v) => (
              <div key={v.name} className="card-light p-5">
                <h3 className="text-2xl">{v.name}</h3>
                <dl className="mt-3 grid gap-1.5 text-sm">
                  {cols.map(([k, l]) => (
                    <div key={k} className="flex justify-between gap-4"><dt className="text-fg-muted">{l}</dt><dd className="text-right font-medium">{v.spec[k]}</dd></div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-fg-muted">{specFootnote}</p>
        </div>
      </section>

      <FAQAccordion faqs={fleetFaqs} />
      <CTABand />
    </>
  );
}
