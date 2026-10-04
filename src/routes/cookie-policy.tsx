import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/pages";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cookie-policy")({
  head: () =>
    seo({
      title: "Cookie Policy | LES Transport",
      description: "How LES Transport uses functional, preference, statistics and marketing cookies, and how to manage your choices.",
      path: "/cookie-policy",
      crumbs: [{ name: "Cookie Policy", path: "/cookie-policy" }],
    }),
  component: () => (
    <LegalPage
      title="Cookie Policy"
      extra="Functional cookies are always on and include the Royal Mail AddressNow address lookup needed for the quote form. Preference, statistics and marketing cookies are only used with your consent, which you can change at any time by clearing your choice in your browser."
    />
  ),
});
