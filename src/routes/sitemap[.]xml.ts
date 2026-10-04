import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/data/site";
import { services } from "@/data/services";
import { articles } from "@/data/articles";
import { locations } from "@/data/locations";

const paths = [
  "/",
  "/about-us",
  "/how-it-works",
  "/services",
  ...services.map((s) => `/service/${s.slug}`),
  "/fleet",
  "/insights",
  ...articles.map((a) => `/${a.slug}`),
  ...locations.map((l) => `/location/${l.slug}`),
  "/contact-us",
  "/get-a-quote",
  "/terms",
  "/privacy-policy",
  "/cookie-policy",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${SITE_URL}${p}</loc></url>`)
          .join("\n")}\n</urlset>\n`;
        return new Response(body, { headers: { "content-type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
