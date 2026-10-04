import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/primitives";
import { ContactForm } from "@/components/site/ContactForm";
import { mapEmbed, site } from "@/data/site";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact-us")({
  head: () =>
    seo({
      title: "Contact LES Transport | Courier Services Luton",
      description: "Contact LES Transport in Luton. Call 01582 858394, email support@lestransport.co.uk or send us a message about your delivery.",
      path: "/contact-us",
      crumbs: [{ name: "Contact Us", path: "/contact-us" }],
    }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero crumbs={[{ name: "Contact Us" }]} title="Contact Us" intro="Speak to our dispatch team or send us a message." />
      <section className="section">
        <div className="container-les grid gap-12 lg:grid-cols-[3fr_2fr]">
          <ContactForm source="contact" />
          <aside className="on-dark card-dark h-fit p-8">
            <h2 className="text-3xl">Contact Details</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3"><Phone className="size-5 text-brand-red" aria-hidden /><a href={site.phoneHref} className="font-semibold">{site.phone}</a></li>
              <li className="flex gap-3"><Mail className="size-5 text-brand-red" aria-hidden /><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li className="flex gap-3"><MapPin className="size-5 text-brand-red" aria-hidden />{site.address.full}</li>
              <li className="flex gap-3"><Clock className="size-5 text-brand-red" aria-hidden />{site.hours}</li>
            </ul>
            <div className="mt-8 border-t border-border-dark pt-6">
              <p className="text-sm text-on-dark-muted">For delivery quotes, please use our quote page.</p>
              <Button asChild className="mt-4"><Link to="/get-a-quote">Get a Quote</Link></Button>
            </div>
          </aside>
        </div>
      </section>
      <iframe
        title="Map of 363a Dunstable Road, Luton"
        src={mapEmbed(site.address.full)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="block h-[26rem] w-full border-0 grayscale"
      />
    </>
  );
}
