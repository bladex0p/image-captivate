import type { AssetKey } from "./assets";

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  image: AssetKey;
  /** TODO: full article body to be supplied by client. */
  body: string[] | null;
  seo: { title: string; description: string };
};

export const articles: Article[] = [
  {
    slug: "courier-vs-parcel-delivery-differences-how-to-choose-the-right-option",
    title: "Courier vs Parcel Delivery Differences: How to Choose the Right Option",
    excerpt:
      "When you need to send an item, it is not always obvious whether you need courier delivery or parcel delivery. The two terms are often…",
    image: "serviceSameDay",
    body: null,
    seo: {
      title: "Courier vs Parcel Delivery: How to Choose | LES Transport",
      description: "Understand the differences between courier and parcel delivery and how to choose the right option for your shipment. Insights from LES Transport.",
    },
  },
  {
    slug: "how-businesses-use-multi-drop-delivery",
    title: "How Businesses Use Multi-Drop Delivery",
    excerpt:
      "Many businesses do not just need to send one parcel from one place to another. They need to deliver stock, equipment, documents, parts, samples or…",
    image: "serviceDefault",
    body: null,
    seo: {
      title: "How Businesses Use Multi-Drop Delivery | LES Transport",
      description: "See how businesses use multi-drop delivery to move stock, equipment, documents and parts across planned routes. Insights from LES Transport.",
    },
  },
];

export const readingTime = (a: Article) =>
  a.body ? Math.max(1, Math.round(a.body.join(" ").split(/\s+/).length / 220)) : null;
