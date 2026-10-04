import { createFileRoute } from "@tanstack/react-router";
import { ArticlePage } from "@/components/site/pages";
import { articles } from "@/data/articles";
import { seo } from "@/lib/seo";

const a = articles[0];

export const Route = createFileRoute("/courier-vs-parcel-delivery-differences-how-to-choose-the-right-option")({
  head: () =>
    seo({
      title: a.seo.title,
      description: a.seo.description,
      path: `/${a.slug}`,
      crumbs: [{ name: "Insights", path: "/insights" }, { name: a.title, path: `/${a.slug}` }],
    }),
  component: () => <ArticlePage slug={a.slug} />,
});
