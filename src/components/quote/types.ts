import { z } from "zod";

export type Addr = { search?: string; line1: string; line2: string; town: string; postcode: string };

export type QuoteValues = {
  collection: Addr;
  delivery: Addr;
  distanceSource: "" | "auto" | "manual";
  distanceMiles: string;
  distanceZone: string;
  deliveryType: string;
  vehicleCategory: string;
  vehicleType: string;
  cargoType: string;
  collectionDate: string;
  collectionTime: string;
  specialRequirements: string;
  fullName: string;
  email: string;
  phone: string;
  terms: boolean;
  website: string;
};

const emptyAddr: Addr = { search: "", line1: "", line2: "", town: "", postcode: "" };

export const defaultQuote: QuoteValues = {
  collection: { ...emptyAddr },
  delivery: { ...emptyAddr },
  distanceSource: "",
  distanceMiles: "",
  distanceZone: "",
  deliveryType: "",
  vehicleCategory: "",
  vehicleType: "",
  cargoType: "",
  collectionDate: "",
  collectionTime: "",
  specialRequirements: "",
  fullName: "",
  email: "",
  phone: "",
  terms: false,
  website: "",
};

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const addr = z.object({
  line1: z.string().trim().min(1, "Enter address line 1"),
  town: z.string().trim().min(1, "Enter a town or city"),
  postcode: z.string().trim().regex(UK_POSTCODE, "Enter a valid UK postcode"),
});

export const stepSchemas: Record<number, z.ZodTypeAny> = {
  1: z.object({ collection: addr, delivery: addr }),
  2: z.object({ deliveryType: z.string().min(1, "Choose a delivery type") }),
  3: z.object({ vehicleCategory: z.string().min(1, "Choose a vehicle category") }),
  4: z.object({ vehicleType: z.string().min(1, "Choose a vehicle type") }),
  5: z.object({ cargoType: z.string().min(1, "Choose a cargo type") }),
  6: z.object({
    collectionDate: z.string().min(1, "Choose a collection date"),
    collectionTime: z.string().min(1, "Choose a collection time"),
    specialRequirements: z.string().max(2000, "Maximum 2000 characters"),
  }),
  7: z.object({
    fullName: z.string().trim().min(1, "Enter your full name").max(120),
    email: z.string().trim().email("Enter a valid email"),
    phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
    terms: z.literal(true, { errorMap: () => ({ message: "Please accept the terms and conditions" }) }),
  }),
};

export const manualDistanceSchema = z.object({
  distanceZone: z.string().min(1, "Choose a distance zone"),
  distanceMiles: z.string().regex(/^\d+(\.\d+)?$/, "Enter the distance in miles"),
});

export const darkInput =
  "h-11 border-border-dark bg-brand-white/5 text-brand-white placeholder:text-brand-white/45 focus-visible:ring-brand-white";
