import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { services } from "@/data/services";
import { assetSrc } from "@/data/assets";
import { site } from "@/data/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About Us" },
  { to: "/how-it-works", label: "How It Works" },
] as const;
const links2 = [
  { to: "/fleet", label: "Our Fleet" },
  { to: "/insights", label: "Insights" },
  { to: "/contact-us", label: "Contact Us" },
] as const;

const navCls =
  "text-[13px] font-semibold uppercase tracking-[0.1em] text-on-dark-muted transition-colors hover:text-brand-white data-[status=active]:text-brand-white";

/** White logo on dark surfaces. On light surfaces (light-theme header/drawer) it sits on a black
 * plate until logo-black.svg is supplied (see src/data/assets.ts). */
export function Logo({ className = "h-14" }: { className?: string }) {
  return (
    <span className="logo-plate inline-flex items-center transition-all duration-300">
      <img src={assetSrc("logoWhite")} alt="LES Transport" className={`${className} w-auto`} width={135} height={56} />
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`site-header on-theme sticky top-0 z-50 transition-all duration-300 ${scrolled ? "is-scrolled" : ""}`}>
      <div className={`container-les flex items-center justify-between gap-6 transition-all duration-300 ${scrolled ? "h-16" : "h-20 md:h-24"}`}>
        <Link to="/" aria-label="LES Transport home">
          <Logo className={`w-auto transition-all duration-300 ${scrolled ? "h-11 md:h-12" : "h-14 md:h-[68px]"}`} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={navCls} activeOptions={{ exact: l.to === "/" }}>
              {l.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className={`${navCls} inline-flex items-center gap-1 outline-none`}>
              Services <ChevronDown className="size-3.5" aria-hidden />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="on-theme w-64 border-border-dark">
              {services.map((s) => (
                <DropdownMenuItem key={s.slug} asChild className="focus:bg-brand-red focus:text-on-red">
                  <Link to="/service/$slug" params={{ slug: s.slug }}>
                    {s.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-border-dark" />
              <DropdownMenuItem asChild className="font-semibold text-brand-red focus:bg-brand-red focus:text-on-red">
                <Link to="/services">View All Services</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {links2.map((l) => (
            <Link key={l.to} to={l.to} className={navCls}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/get-a-quote">Get a Quote</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outlineDark" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="on-theme w-[85vw] max-w-sm overflow-y-auto border-border-dark p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex items-center justify-between gap-4 p-6 pr-14">
                <Logo className="h-12" />
                <ThemeToggle />
              </div>
              <nav aria-label="Mobile" className="flex flex-col px-6 pb-8" onClick={() => setOpen(false)}>
                {[...links, ...links2].map((l) => (
                  <Link key={l.to} to={l.to} className={`${navCls} border-b border-border-dark py-4 text-base`}>
                    {l.label}
                  </Link>
                ))}
                <p className="pt-6 text-xs uppercase tracking-[0.14em] text-on-dark-muted">Services</p>
                {services.map((s) => (
                  <Link key={s.slug} to="/service/$slug" params={{ slug: s.slug }} className="py-2 text-sm text-on-dark-muted hover:text-brand-white">
                    {s.title}
                  </Link>
                ))}
                <Link to="/services" className="py-2 text-sm font-semibold text-brand-red">View All Services</Link>
                <Button asChild className="mt-8">
                  <Link to="/get-a-quote">Get a Quote</Link>
                </Button>
                <Button asChild variant="outlineDark" className="mt-3">
                  <a href={site.phoneHref}><Phone aria-hidden /> {site.phone}</a>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
