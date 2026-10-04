import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/pages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    seo({
      title: "Privacy Policy | LES Transport",
      description: "How L E S TRANSPORT LTD collects, uses and protects your personal data, including quote and contact form submissions.",
      path: "/privacy-policy",
      crumbs: [{ name: "Privacy Policy", path: "/privacy-policy" }],
    }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      extra="Address lookup: our quote form uses Royal Mail AddressNow to look up collection and delivery addresses from a postcode. Postcodes and search text you enter are sent to Royal Mail AddressNow to return matching addresses."
    />
  ),
});
