import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/primitives";
import { ArticleCard } from "@/components/site/pages";
import { CTABand } from "@/components/site/sections";
import { articles } from "@/data/articles";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/insights")({
  head: () =>
    seo({
      title: "Courier & Delivery Insights | LES Transport",
      description: "Practical guides on courier, parcel, pallet and multi-drop delivery from the LES Transport team. Read our latest logistics insights.",
      path: "/insights",
      crumbs: [{ name: "Insights", path: "/insights" }],
    }),
  component: Insights,
});

function Insights() {
  return (
    <>
      <PageHero crumbs={[{ name: "Insights" }]} title="Insights" intro="Guides and advice to help you choose the right delivery option." />
      <section className="section">
        <div className="container-les grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => <ArticleCard key={a.slug} a={a} />)}
        </div>
      </section>
      <CTABand />
    </>
  );
}
