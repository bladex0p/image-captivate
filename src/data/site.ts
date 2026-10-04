export const SITE_URL = "https://lestransport.co.uk";

export const site = {
  name: "LES Transport",
  legalName: "L E S TRANSPORT LTD",
  companyNumber: "14918509",
  tagline: "No Stress. Just LES.",
  footerLine: "Fast, Reliable Courier & Delivery Services Across England",
  phone: "01582 858394",
  phoneHref: "tel:+441582858394",
  email: "support@lestransport.co.uk",
  address: {
    street: "363a Dunstable Road",
    town: "Luton",
    postcode: "LU4 8BY",
    full: "363a Dunstable Road, Luton, LU4 8BY",
  },
  hours: "Monday - Friday 08:00 to 17:00",
  social: {
    facebook: "https://www.facebook.com/people/L-E-S-Transport-Ltd/61587632167801/",
    instagram: "https://www.instagram.com/lestransportltd/",
  },
  credit: "Website by All Safe Cyber Security",
  copyright: "2026 LES Transport Ltd, All rights reserved.",
};

/** Client to confirm these figures. */
export const stats = [
  { value: "1,000+", label: "Successful Shipments" },
  { value: "4.9", label: "Average Rating" },
  { value: "5+", label: "Hubs" },
];

export const facts = {
  vehicles: "100+",
  goodsInTransit: "£10,000",
};

export const mapEmbed = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;
