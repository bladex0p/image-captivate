import type { FAQ } from "./faqs";

export type Location = {
  slug: string;
  town: string;
  h1: string;
  intro: string;
  seo: { title: string; description: string };
  highlights: string[];
  sameDay: { title: string; body: string };
  coverage: { title: string; body: string }[];
  map: string;
  why: { title: string; body: string }[];
  faqs: FAQ[];
};

export const locations: Location[] = [
  {
    slug: "courier-services-in-birmingham",
    town: "Birmingham",
    h1: "Reliable Courier Services in Birmingham",
    intro:
      "LES Transport provides same-day, express, pallet, overnight and specialist courier services across Birmingham and the West Midlands, with flexible vehicles available for parcels, documents, pallets and larger business goods. Based around our Bedfordshire and Birmingham operations, we support local collections, regional deliveries and longer-distance courier work across England.",
    seo: {
      title: "Courier Services in Birmingham | LES Transport",
      description:
        "Fast, reliable courier services in Birmingham for same-day, express, pallet and specialist deliveries across the West Midlands. Request a quote now.",
    },
    highlights: ["Same-Day Birmingham Collections", "100+ Vehicle Fleet Access", "£10,000 Goods-in-Transit Cover"],
    sameDay: {
      title: "Same Day Delivery Birmingham",
      body: "Our same day courier service covers Birmingham city centre, Solihull, Sutton Coldfield, Walsall and Dudley, with direct collection and delivery for time-critical shipments.",
    },
    coverage: [
      { title: "Birmingham City Centre", body: "B1 to B4" },
      { title: "Solihull & Shirley", body: "Local and regional collections" },
      { title: "Sutton Coldfield", body: "Including Erdington and north Birmingham" },
      { title: "Walsall & Wolverhampton", body: "Coverage across the northern West Midlands" },
      { title: "Dudley & Black Country", body: "West Bromwich, Oldbury, Halesowen" },
      { title: "Coventry & Wider Midlands", body: "Regional and onward delivery across England" },
    ],
    map: "Birmingham, UK",
    why: [
      { title: "Fast Local Response", body: "Quick dispatch for collections across Birmingham." },
      { title: "Flexible Delivery Options", body: "Same day, express, pallet, overnight and specialist services." },
      { title: "West Midlands Coverage", body: "From the city centre to the Black Country and Coventry." },
      { title: "Professional Handling", body: "Experienced drivers and goods-in-transit cover up to £10,000." },
      { title: "Simple Quote Process", body: "Request a quote online or call our dispatch team." },
    ],
    faqs: [
      { q: "Do you provide courier services in Birmingham?", a: "Yes. We have operational presence in Birmingham and provide courier services across the city and the West Midlands." },
      { q: "Can I book an urgent courier in Birmingham?", a: "Yes. Our same day service offers fast collection and direct delivery for urgent Birmingham shipments." },
      { q: "Which areas around Birmingham do you cover?", a: "Birmingham city centre, Solihull, Sutton Coldfield, Erdington, Walsall, Wolverhampton, Dudley, the Black Country, Coventry and the wider Midlands." },
      { q: "Do you offer pallet delivery in Birmingham?", a: "Yes. Our larger vans carry palletised goods, typically up to 4 UK pallets." },
      { q: "Are deliveries insured?", a: "Yes. Our vehicles carry goods-in-transit insurance of up to £10,000 per vehicle." },
      { q: "Can you handle larger or specialist deliveries?", a: "Yes. Our 100+ vehicle fleet and specialist services cover larger, fragile and high-value items." },
      { q: "Do you work with Birmingham businesses?", a: "Yes. We support one-off and regular scheduled business deliveries." },
      { q: "Can you deliver from Birmingham to the rest of England?", a: "Yes. We deliver from Birmingham to destinations across England." },
      { q: "How do I get a quote?", a: "Use our online quote form or call our dispatch team on 01582 858394." },
    ],
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);
