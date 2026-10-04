import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Adds `html.motion-ok` before paint when the visitor allows motion. Reveal states only hide content under this class. */
export const motionInitScript = `(function(){try{if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("motion-ok")}}catch(e){}})();`;

export function prefersReducedMotion() {
  return typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fires once when the element enters the viewport. */
export function useInViewOnce<T extends Element>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setInView(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return [ref, inView] as const;
}

/**
 * Global runtime: watches `.reveal`, `.stagger` and `.draw-line` elements (including ones added after
 * navigation) and adds `.is-in` once they scroll into view.
 */
export function MotionRuntime() {
  useEffect(() => {
    const sel = ".reveal:not(.is-in), .stagger:not(.is-in), .draw-line:not(.is-in)";
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      const all = () => document.querySelectorAll(sel).forEach((el) => el.classList.add("is-in"));
      all();
      const mo = new MutationObserver(all);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    const scan = () => document.querySelectorAll(sel).forEach((el) => io.observe(el));
    scan();
    let t = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(t);
      t = requestAnimationFrame(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}

/** Fade + 16px rise on scroll, once. */
export function Reveal({
  as: As = "div",
  className,
  delay,
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <As className={cn("reveal", className)} style={delay ? ({ "--d": `${delay}ms` } as CSSProperties) : undefined}>
      {children}
    </As>
  );
}

/** Staggered reveal for direct children of a grid/list. Children get `--i` from `staggerIndex`. */
export function Stagger({ as: As = "div", className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  return <As className={cn("stagger", className)}>{children}</As>;
}
export const staggerIndex = (i: number) => ({ "--i": i }) as CSSProperties;

/** Parses "1,000+", "4.9", "£10,000", "100+" into parts. */
function parseStat(value: string) {
  const m = value.match(/^([^\d]*)([\d,]*\.?\d+)(.*)$/);
  if (!m) return null;
  const raw = m[2]!;
  const decimals = raw.includes(".") ? raw.split(".")[1]!.length : 0;
  return { prefix: m[1]!, target: Number(raw.replace(/,/g, "")), decimals, comma: raw.includes(","), suffix: m[3]! };
}

const fmt = (n: number, p: NonNullable<ReturnType<typeof parseStat>>) =>
  p.prefix +
  (p.comma ? n.toLocaleString("en-GB", { minimumFractionDigits: p.decimals, maximumFractionDigits: p.decimals }) : n.toFixed(p.decimals)) +
  p.suffix;

/** Counts up from 0 to the parsed value once in view (~1.6s ease-out). Final value is always in the DOM. */
export function useCountUp(value: string, duration = 1600) {
  const parsed = parseStat(value);
  const [ref, inView] = useInViewOnce<HTMLSpanElement>("0px");
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!parsed || prefersReducedMotion()) return;
    if (!started.current) setDisplay(fmt(0, parsed));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView || !parsed || started.current || prefersReducedMotion()) return;
    started.current = true;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      const n = parsed.target * eased;
      const pow = Math.pow(10, parsed.decimals);
      setDisplay(k === 1 ? value : fmt(Math.floor(n * pow) / pow, parsed));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return [ref, display] as const;
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const [ref, display] = useCountUp(value);
  return (
    <span ref={ref} className={cn("tabular-nums", className)} aria-label={value} role="text">
      <span className="sr-only">{value}</span>
      <span aria-hidden>{display}</span>
    </span>
  );
}

/** Dashed route line that draws itself left to right when scrolled into view. */
export function RouteDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("draw-line container-les py-2", className)}>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-8 w-full overflow-visible text-brand-red">
        <path
          d="M0 20 C 200 4, 360 36, 600 20 S 1000 4, 1200 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="8 10"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="0" cy="20" r="5" fill="currentColor" />
        <circle cx="1200" cy="20" r="5" fill="currentColor" />
      </svg>
    </div>
  );
}

const areas = [
  "Bedfordshire",
  "Hertfordshire",
  "Buckinghamshire",
  "London",
  "The Midlands",
  "Birmingham",
  "Scotland & Wales on request",
  "England-wide",
];

export function CoverageMarquee() {
  const row = (hidden?: boolean) => (
    <ul className="marquee-row" aria-hidden={hidden || undefined}>
      {areas.map((a) => (
        <li key={a} className="flex items-center gap-8">
          <span>{a}</span>
          <span className="size-1.5 rounded-full bg-brand-red" aria-hidden />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee on-dark border-y border-border-dark" role="region" aria-label="Coverage areas">
      <div className="marquee-track">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
