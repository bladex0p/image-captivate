import { useEffect, useRef, useState } from "react";
import type { FleetVehicle } from "@/data/fleet";
import { cn } from "@/lib/utils";
import { ImageSlot } from "./primitives";
import { Stagger, staggerIndex } from "./motion";

/** Scroll-snap carousel with dots on mobile, grid on desktop. Spec chips appear over the image on hover. */
export function FleetCarousel({
  items,
  className,
  headingLevel = "h3",
  cols = "lg:grid-cols-4",
}: {
  items: FleetVehicle[];
  className?: string;
  headingLevel?: "h2" | "h3";
  cols?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const H = headingLevel;

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const on = () => {
      const w = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? el.clientWidth;
      setActive(Math.round(el.scrollLeft / (w + 16)));
    };
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, []);

  const goTo = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  return (
    <div className={className}>
      <div
        ref={track}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:px-0 sm:hidden [&::-webkit-scrollbar]:hidden"
      >
        {items.map((v) => (
          <FleetCard key={v.name} v={v} H={H} className="w-[82%] shrink-0 snap-start" />
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2 sm:hidden">
        {items.map((v, i) => (
          <button
            key={v.name}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${v.name}`}
            aria-current={active === i}
            className="flex size-11 items-center justify-center"
          >
            <span className={cn("h-1.5 rounded-full transition-all duration-300", active === i ? "w-6 bg-brand-red" : "w-1.5 bg-fg/25")} />
          </button>
        ))}
      </div>
      <Stagger className={cn("hidden gap-6 sm:grid sm:grid-cols-2", cols)}>
        {items.map((v, i) => (
          <FleetCard key={v.name} v={v} H={H} style={staggerIndex(i)} />
        ))}
      </Stagger>
    </div>
  );
}

function FleetCard({
  v,
  H,
  className,
  style,
}: {
  v: FleetVehicle;
  H: "h2" | "h3";
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <article className={cn("group", className)} style={style}>
      <div className="relative overflow-hidden rounded-md">
        <ImageSlot asset={v.image} alt={`${v.name} from the LES Transport fleet`} className="[&_img]:group-hover:scale-105" />
        <ul className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap gap-2 opacity-100 transition-[opacity,transform] duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <li className="on-dark rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]">{v.spec.payload}</li>
          <li className="on-dark rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]">{v.spec.pallets}</li>
        </ul>
      </div>
      <H className="mt-5 text-2xl md:text-3xl">{v.name}</H>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{v.description}</p>
    </article>
  );
}
