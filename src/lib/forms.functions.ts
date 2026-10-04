import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

async function callerHash() {
  const { getRequestHeader } = await import("@tanstack/react-start/server");
  const ip =
    getRequestHeader("cf-connecting-ip") ||
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("les:" + ip));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function rateLimited(table: "quote_requests" | "contact_submissions", ipHash: string, max: number) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);
  return (count ?? 0) >= max;
}

/* ---------------- Distance (postcodes.io, haversine) ---------------- */

export const getDistance = createServerFn({ method: "POST" })
  .inputValidator((d: { from: string; to: string }) =>
    z.object({ from: z.string().regex(UK_POSTCODE), to: z.string().regex(UK_POSTCODE) }).parse(d),
  )
  .handler(async ({ data }) => {
    const look = async (pc: string) => {
      const r = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(pc.replace(/\s+/g, ""))}`);
      if (!r.ok) throw new Error("lookup failed");
      const j = (await r.json()) as { result?: { latitude: number; longitude: number } };
      if (!j.result) throw new Error("no result");
      return j.result;
    };
    try {
      const [a, b] = await Promise.all([look(data.from), look(data.to)]);
      const R = 3958.8;
      const rad = (x: number) => (x * Math.PI) / 180;
      const dLat = rad(b.latitude - a.latitude);
      const dLon = rad(b.longitude - a.longitude);
      const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
      const miles = Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
      return { ok: true as const, miles, zone: miles < 30 ? "under-30" : "30-plus" };
    } catch {
      return { ok: false as const };
    }
  });

/* ---------------- Quote ---------------- */

const address = z.object({
  line1: z.string().trim().min(1).max(200),
  line2: z.string().trim().max(200).optional().default(""),
  town: z.string().trim().min(1).max(100),
  postcode: z.string().trim().regex(UK_POSTCODE),
});

const attachment = z.object({
  name: z.string().max(200),
  type: z.string().max(150),
  size: z.number().max(10 * 1024 * 1024),
  base64: z.string(),
});

export const quoteSchema = z.object({
  collection: address,
  delivery: address,
  distanceMiles: z.number().nullable(),
  distanceZone: z.string().max(20).nullable(),
  distanceSource: z.enum(["auto", "manual"]),
  deliveryType: z.string().min(1).max(40),
  vehicleCategory: z.string().min(1).max(40),
  vehicleType: z.string().min(1).max(40),
  cargoType: z.string().min(1).max(40),
  collectionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  collectionTime: z.string().min(1).max(10),
  specialRequirements: z.string().max(2000).optional().default(""),
  fullName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(30),
  terms: z.literal(true),
  website: z.string().max(0).optional().default(""), // honeypot
  attachments: z.array(attachment).max(5).default([]),
});

const ALLOWED = /^(image\/|application\/pdf|application\/msword|application\/vnd\.openxmlformats-officedocument\.(wordprocessingml|spreadsheetml)|application\/vnd\.ms-excel|text\/csv)/;

export const submitQuote = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => quoteSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const }; // bot: silently accept
    const total = data.attachments.reduce((s, a) => s + a.size, 0);
    if (total > 10 * 1024 * 1024) throw new Error("Attachments exceed 10MB total.");
    if (data.attachments.some((a) => !ALLOWED.test(a.type))) throw new Error("Unsupported file type.");

    const ipHash = await callerHash();
    if (await rateLimited("quote_requests", ipHash, 5)) {
      throw new Error("Too many requests. Please try again in a few minutes or call us.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const id = crypto.randomUUID();
    const stored: { name: string; path: string; size: number }[] = [];
    for (const a of data.attachments) {
      const bin = Uint8Array.from(atob(a.base64), (c) => c.charCodeAt(0));
      const safe = a.name.replace(/[^\w.\-]+/g, "_").slice(0, 120);
      const path = `${id}/${Date.now()}-${safe}`;
      const { error } = await supabaseAdmin.storage.from("quote-attachments").upload(path, bin, { contentType: a.type });
      if (error) throw new Error("Attachment upload failed.");
      stored.push({ name: a.name, path, size: a.size });
    }

    const { error } = await supabaseAdmin.from("quote_requests").insert({
      id,
      collection_address: data.collection,
      delivery_address: data.delivery,
      distance_miles: data.distanceMiles,
      distance_zone: data.distanceZone,
      distance_source: data.distanceSource,
      delivery_type: data.deliveryType,
      vehicle_category: data.vehicleCategory,
      vehicle_type: data.vehicleType,
      cargo_type: data.cargoType,
      collection_date: data.collectionDate,
      collection_time: data.collectionTime,
      special_requirements: data.specialRequirements || null,
      attachments: stored,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      terms_accepted: true,
      ip_hash: ipHash,
    });
    if (error) throw new Error("Could not save your request. Please call us.");
    // TODO: email support@lestransport.co.uk once an email domain is verified.
    return { ok: true as const, id };
  });

/* ---------------- Contact ---------------- */

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().default(""),
  message: z.string().trim().min(1, "Please enter a message").max(2000),
  website: z.string().max(0).optional().default(""),
  source: z.string().max(40).optional().default("contact"),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => contactSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    const ipHash = await callerHash();
    if (await rateLimited("contact_submissions", ipHash, 5)) {
      throw new Error("Too many messages. Please try again shortly or call us.");
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
      source: data.source,
      ip_hash: ipHash,
    });
    if (error) throw new Error("Could not send your message. Please call us.");
    // TODO: email support@lestransport.co.uk once an email domain is verified.
    return { ok: true as const };
  });
