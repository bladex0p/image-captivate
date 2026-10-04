import type { LucideIcon } from "lucide-react";
import {
  Moon,
  Zap,
  Package2,
  Sparkles,
  Timer,
  Clock,
  ShieldCheck,
  Route as RouteIcon,
  Package,
  HandHeart,
} from "lucide-react";
import type { AssetKey } from "./assets";
import type { FAQ } from "./faqs";

export type ServiceDetail = {
  intro: string;
  benefits: string[];
  useCases: string[];
  whatWeDeliver: string[];
  faqs: FAQ[] | null; // null = TODO
};

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  image: AssetKey;
  seo: { title: string; description: string };
  related: string[];
  detail: ServiceDetail | null; // null = TODO, content to follow
};

export const services: Service[] = [
  {
    slug: "overnight-delivery",
    title: "Overnight Delivery",
    blurb: "Next-day delivery service for quick, reliable shipping solutions.",
    icon: Moon,
    image: "serviceDefault",
    seo: {
      title: "Overnight Courier Delivery | LES Transport",
      description: "Next-day overnight courier delivery across England with LES Transport. Reliable, secure shipping for businesses and individuals. Get a quote.",
    },
    related: ["express-delivery", "same-day-delivery", "timed-delivery", "parcel-delivery"],
    detail: null,
  },
  {
    slug: "express-delivery",
    title: "Express Delivery",
    blurb: "Fast delivery service for urgent, but not immediate, shipments.",
    icon: Zap,
    image: "serviceDefault",
    seo: {
      title: "Express Courier Delivery | LES Transport",
      description: "Fast express courier delivery across England for urgent shipments. Professional drivers and a 100+ vehicle fleet. Request a quote today.",
    },
    related: ["same-day-delivery", "overnight-delivery", "timed-delivery", "special-delivery"],
    detail: null,
  },
  {
    slug: "pallet-delivery",
    title: "Pallet Delivery",
    blurb: "Efficient transport for heavier goods and palletised freight.",
    icon: Package2,
    image: "serviceDefault",
    seo: {
      title: "Pallet Delivery Across England | LES Transport",
      description: "Efficient pallet delivery for heavier goods and palletised freight across England, with vans up to long wheelbase. Get a pallet delivery quote.",
    },
    related: ["multi-drop-delivery", "same-day-delivery", "overnight-delivery", "special-delivery"],
    detail: null,
  },
  {
    slug: "special-delivery",
    title: "Special Delivery",
    blurb: "Flexible courier solutions for unique or time-sensitive transport requirements.",
    icon: Sparkles,
    image: "serviceDefault",
    seo: {
      title: "Special Delivery Courier Service | LES Transport",
      description: "Flexible special delivery courier solutions for unique or time-sensitive transport across England. Speak to LES Transport for a tailored quote.",
    },
    related: ["white-glove-delivery", "high-value-delivery", "timed-delivery", "same-day-delivery"],
    detail: null,
  },
  {
    slug: "same-day-delivery",
    title: "Same Day Delivery",
    blurb: "Same-day courier service for urgent, fast deliveries across England.",
    icon: Timer,
    image: "serviceSameDay",
    seo: {
      title: "Urgent Same Day Courier Luton | LES Transport",
      description: "Urgent same day courier from Luton and Birmingham, delivering across England. Collected and delivered by experienced drivers. Get a same day quote.",
    },
    related: ["express-delivery", "timed-delivery", "high-value-delivery", "pallet-delivery"],
    detail: {
      intro:
        "Our same-day courier service is designed for urgent deliveries that need to reach their destination as quickly as possible. When time matters, LES Transport provides fast and reliable transport across England, ensuring items are collected and delivered efficiently by experienced drivers. This service is ideal for businesses and individuals who need immediate delivery support and cannot wait for standard courier timeframes.",
      benefits: [
        "Rapid dispatch for urgent deliveries",
        "Direct transport with minimal delays",
        "Reliable solution for time-critical shipments",
        "Professional drivers and secure handling",
      ],
      useCases: [
        "Urgent business deliveries",
        "Replacement parts for machinery or equipment",
        "Time-sensitive documents",
        "Emergency logistics requirements",
      ],
      whatWeDeliver: [
        "Documents and paperwork",
        "Parcels and packages",
        "Equipment and components",
        "Palletised goods",
        "Fragile items requiring careful handling",
      ],
      faqs: null,
    },
  },
  {
    slug: "timed-delivery",
    title: "Timed Delivery",
    blurb: "Precise delivery windows allow businesses to coordinate shipments with operations, clients or events.",
    icon: Clock,
    image: "serviceDefault",
    seo: {
      title: "Timed Courier Delivery | LES Transport",
      description: "Timed courier delivery with precise delivery windows across England. Coordinate shipments with operations, clients or events. Get a quote.",
    },
    related: ["same-day-delivery", "express-delivery", "multi-drop-delivery", "overnight-delivery"],
    detail: null,
  },
  {
    slug: "high-value-delivery",
    title: "High Value Delivery",
    blurb: "Transportation with careful handling and professional drivers.",
    icon: ShieldCheck,
    image: "serviceHighValue",
    seo: {
      title: "High Value Delivery | Secure Courier Transport",
      description: "Secure high value delivery across England with careful handling and professional drivers. Trust LES Transport and get a quote today.",
    },
    related: ["white-glove-delivery", "special-delivery", "same-day-delivery", "timed-delivery"],
    detail: {
      intro:
        "Our high-value delivery service is designed for goods that require extra care, attention and security during transport. LES Transport ensures valuable items are handled professionally and transported safely from collection to delivery. With experienced drivers and secure handling procedures, we provide a trusted courier solution for transporting valuable goods.",
      benefits: [
        "Careful and secure handling of valuable goods",
        "Professional drivers experienced with sensitive deliveries",
        "Direct transport to reduce risk and delays",
        "Goods-in-transit insurance coverage",
      ],
      useCases: [
        "Transport of valuable equipment",
        "High-value business shipments",
        "Sensitive or fragile items",
        "Deliveries requiring enhanced care and attention",
      ],
      whatWeDeliver: [
        "High-value equipment",
        "Fragile goods",
        "Electronics and specialist items",
        "Important business shipments",
        "Items requiring secure transport",
      ],
      faqs: null,
    },
  },
  {
    slug: "multi-drop-delivery",
    title: "Multi-Drop Delivery",
    blurb: "Ideal for businesses requiring multiple delivery stops across a planned route.",
    icon: RouteIcon,
    image: "serviceDefault",
    seo: {
      title: "Multi-Drop Courier Delivery | LES Transport",
      description: "Multi-drop delivery for businesses with multiple stops across a planned route in England. Efficient routing and professional drivers. Get a quote.",
    },
    related: ["parcel-delivery", "pallet-delivery", "timed-delivery", "overnight-delivery"],
    detail: null,
  },
  {
    slug: "parcel-delivery",
    title: "Parcel Delivery",
    blurb: "Fast and reliable parcel transportation for businesses and individuals.",
    icon: Package,
    image: "serviceDefault",
    seo: {
      title: "Parcel Delivery Courier Service | LES Transport",
      description: "Fast, reliable parcel delivery across England for businesses and individuals. Same day and scheduled options from LES Transport. Get a quote.",
    },
    related: ["same-day-delivery", "overnight-delivery", "multi-drop-delivery", "express-delivery"],
    detail: null,
  },
  {
    slug: "white-glove-delivery",
    title: "White Glove Delivery",
    blurb: "Premium delivery for sensitive, fragile, or high-value items.",
    icon: HandHeart,
    image: "serviceDefault",
    seo: {
      title: "White Glove Delivery Service | LES Transport",
      description: "Premium white glove delivery for sensitive, fragile or high-value items across England. Careful handling by professional drivers. Get a quote.",
    },
    related: ["high-value-delivery", "special-delivery", "same-day-delivery", "timed-delivery"],
    detail: null,
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
