import { SITE_URL, site } from "@/data/site";
import { assets, assetSrc } from "@/data/assets";
import type { FAQ } from "@/data/faqs";

type Crumb = { name: string; path: string };

export function seo(opts: {
  title: string;
  description: string;
  path: string;
  faqs?: FAQ[] | undefined;
  crumbs?: Crumb[];
  noindex?: boolean;
}) {
  const url = SITE_URL + (opts.path === "/" ? "/" : opts.path);
  const meta: Record<string, string>[] = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
  ];
  if (assets.ogShare.available) {
    const img = SITE_URL + assetSrc("ogShare");
    meta.push({ property: "og:image", content: img }, { name: "twitter:image", content: img });
  }
  if (opts.noindex) meta.push({ name: "robots", content: "noindex" });

  const scripts: { type: string; children: string }[] = [];
  if (opts.faqs?.length) {
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: opts.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    });
  }
  if (opts.crumbs?.length) {
    const all = [{ name: "Home", path: "/" }, ...opts.crumbs];
    scripts.push({
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: all.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.name,
          item: SITE_URL + c.path,
        })),
      }),
    });
  }
  return { meta, links: [{ rel: "canonical", href: url }], scripts };
}

export const localBusinessJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MovingCompany"],
  additionalType: "https://schema.org/CourierService",
  name: site.name,
  legalName: site.legalName,
  url: SITE_URL,
  telephone: site.phone,
  email: site.email,
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.town,
    postalCode: site.address.postcode,
    addressCountry: "GB",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  areaServed: { "@type": "Country", name: "England" },
  sameAs: [site.social.facebook, site.social.instagram],
});
