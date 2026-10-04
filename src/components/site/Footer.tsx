import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Phone } from "lucide-react";
import { site } from "@/data/site";
import { Logo } from "./Header";

const quick = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About Us" },
  { to: "/fleet", label: "Our Fleet" },
  { to: "/insights", label: "Insights" },
  { to: "/get-a-quote", label: "Quotes" },
  { to: "/contact-us", label: "Contact Us" },
] as const;

export function Footer() {
  return (
    <footer className="on-dark border-t border-border-dark pb-24 md:pb-0">
      <div className="container-les grid gap-12 py-16 md:grid-cols-3">
        <div>
          <Logo className="h-14" />
          <p className="mt-5 max-w-xs text-sm text-on-dark-muted">{site.footerLine}</p>
          <div className="mt-6 flex gap-3">
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="LES Transport on Facebook" className="card-dark flex size-10 items-center justify-center hover:border-brand-white">
              <Facebook className="size-4" />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="LES Transport on Instagram" className="card-dark flex size-10 items-center justify-center hover:border-brand-white">
              <Instagram className="size-4" />
            </a>
          </div>
        </div>
        <nav aria-label="Quick links">
          <h2 className="text-lg tracking-[0.1em]">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {quick.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-on-dark-muted hover:text-brand-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-lg tracking-[0.1em]">Contact Info</h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-on-dark-muted">
            <p><a href={site.phoneHref} className="hover:text-brand-white">{site.phone}</a></p>
            <p><a href={`mailto:${site.email}`} className="hover:text-brand-white">{site.email}</a></p>
            <p>{site.address.full}</p>
            <p>{site.hours}</p>
          </address>
        </div>
      </div>
      <div className="border-t border-border-dark">
        <div className="container-les flex flex-col gap-3 py-6 text-xs text-on-dark-muted md:flex-row md:items-center md:justify-between">
          <p>{site.copyright} · Company number: {site.companyNumber}</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy-policy" className="hover:text-brand-white">Privacy Policy</Link>
            <Link to="/cookie-policy" className="hover:text-brand-white">Cookie Policy</Link>
            <Link to="/terms" className="hover:text-brand-white">Terms</Link>
          </div>
          <p>{site.credit}</p>
        </div>
      </div>
    </footer>
  );
}

export function MobileCallButton() {
  return (
    <a
      href={site.phoneHref}
      className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-brand-white shadow-lg md:hidden"
    >
      <Phone className="size-4" aria-hidden /> Call Us
    </a>
  );
}
