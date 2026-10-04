import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/pages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    seo({
      title: "Terms and Conditions | LES Transport",
      description: "Terms and conditions for courier and delivery services provided by L E S TRANSPORT LTD.",
      path: "/terms",
      crumbs: [{ name: "Terms", path: "/terms" }],
    }),
  component: () => <LegalPage title="Terms and Conditions" />,
});
