import { Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "./motion";

/**
 * 4-step timeline. A line fills red as the visitor scrolls (horizontal on desktop, vertical on mobile),
 * a van travels along it and each step activates when reached.
 */
export function StepTimeline({ steps }: { steps: { title: string; body: string }[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return setP(1);
    let raf = 0;
    const calc = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top hits 75% of the viewport, 1 when the bottom reaches 55%.
      const start = vh * 0.75;
      const end = vh * 0.55;
      const total = r.height + (start - end);
      const v = (start - r.top) / total;
      setP(Math.max(0, Math.min(1, v)));
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const n = steps.length;
  const reached = (i: number) => p >= (n === 1 ? 0 : i / (n - 1)) - 0.02;

  return (
    <ol ref={ref} className="relative grid gap-10 pl-16 md:grid-cols-4 md:gap-6 md:pl-0 md:pt-16">
      {/* Track */}
      <span aria-hidden className="absolute bottom-6 left-6 top-6 w-px bg-line md:bottom-auto md:left-6 md:right-6 md:top-6 md:h-px md:w-auto" />
      {/* Fill (vertical) */}
      <span
        aria-hidden
        className="absolute bottom-6 left-6 top-6 w-px origin-top bg-brand-red md:hidden"
        style={{ transform: `scaleY(${p})` }}
      />
      {/* Fill (horizontal) */}
      <span
        aria-hidden
        className="absolute left-6 right-6 top-6 hidden h-px origin-left bg-brand-red md:block"
        style={{ transform: `scaleX(${p})` }}
      />
      {/* Van (vertical) */}
      <span aria-hidden className="pointer-events-none absolute bottom-6 left-6 top-6 w-0 md:hidden">
        <span className="absolute left-0 top-0 h-full w-0" style={{ transform: `translateY(${p * 100}%)` }}>
          <Truck className="absolute -left-3 -top-3 size-6 rotate-90 rounded-sm bg-bg p-0.5 text-brand-red" />
        </span>
      </span>
      {/* Van (horizontal) */}
      <span aria-hidden className="pointer-events-none absolute left-6 right-6 top-6 hidden h-0 md:block">
        <span className="absolute left-0 top-0 h-0 w-full" style={{ transform: `translateX(${p * 100}%)` }}>
          <Truck className="absolute -left-3 -top-3 size-6 bg-bg p-0.5 text-brand-red" />
        </span>
      </span>
      {steps.map((s, i) => {
        const on = reached(i);
        return (
          <li
            key={s.title}
            className={cn(
              "relative rounded-md border p-6 transition-[border-color,transform,opacity] duration-500",
              on ? "border-brand-red opacity-100" : "border-line opacity-70 md:translate-y-1",
            )}
          >
            <span
              className={cn(
                "absolute -left-16 top-0 z-10 flex size-12 items-center justify-center rounded-full font-heading text-xl font-bold transition-colors duration-500 md:-top-16 md:left-0",
                on ? "bg-brand-red text-on-red" : "bg-fg text-bg",
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-2xl">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
