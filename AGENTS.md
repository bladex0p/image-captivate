<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Motion lives in src/components/site/motion.tsx (Reveal, Stagger, CountUp, MotionRuntime) using CSS + IntersectionObserver, no animation library; initialize observation only after hydration, keep it reliable on mobile, and hide start states only under `html.motion-ok` so reduced-motion and no-JS visitors always see final content.
- Mobile layouts must keep content within its parent; deliberate horizontal scrollers may scroll internally but must not use negative container margins or leak partial cards outside the content gutter.
- Stat figures are rendered with CountUp from values in src/data/site.ts; never hard-code stat numbers in pages, so changing a figure updates every page.
