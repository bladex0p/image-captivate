import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { articles, readingTime, type Article } from "@/data/articles";
import { ImageSlot, PageHero, TodoBlock } from "./primitives";
import { CTABand } from "./sections";

export function NotFoundPage() {
  return (
    <section className="on-theme">
      <div className="container-les py-32">
        <p className="font-heading text-8xl font-bold text-brand-red">404</p>
        <h1 className="mt-4 text-5xl">Page not found</h1>
        <p className="mt-4 max-w-lg text-on-dark-muted">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild><Link to="/">Go home</Link></Button>
          <Button asChild variant="outlineDark"><Link to="/get-a-quote">Get a Quote</Link></Button>
        </div>
      </div>
    </section>
  );
}

export function ArticleCard({ a }: { a: Article }) {
  return (
    <article className="reveal flex flex-col">
      <ImageSlot asset={a.image} alt={a.title} ratio="aspect-[16/10]" />
      <h3 className="mt-5 text-2xl">{a.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-muted">{a.excerpt}</p>
      <Link to={`/${a.slug}` as "/how-businesses-use-multi-drop-delivery"} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
        Read More <ArrowRight className="size-3.5" aria-hidden />
      </Link>
    </article>
  );
}

export function ArticlePage({ slug }: { slug: string }) {
  const a = articles.find((x) => x.slug === slug)!;
  const mins = readingTime(a);
  const related = articles.filter((x) => x.slug !== slug);
  return (
    <>
      <PageHero crumbs={[{ name: "Insights", to: "/insights" }, { name: a.title }]} title={a.title}>
        {mins && <p className="mt-6 text-sm uppercase tracking-[0.14em] text-on-dark-muted">{mins} min read</p>}
      </PageHero>
      <section className="section">
        <div className="container-les max-w-3xl">
          <ImageSlot asset={a.image} alt={a.title} ratio="aspect-[16/9]" eager />
          <div className="prose-les mt-10">
            {a.body ? a.body.map((p, i) => <p key={i}>{p}</p>) : <TodoBlock label="Full article body to be supplied by the client." />}
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section bg-bg-alt">
          <div className="container-les">
            <h2 className="text-4xl">Related Articles</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {related.map((r) => <ArticleCard key={r.slug} a={r} />)}
            </div>
          </div>
        </section>
      )}
      <CTABand />
    </>
  );
}

export function LegalPage({ title, extra }: { title: string; extra?: string }) {
  return (
    <>
      <PageHero crumbs={[{ name: title }]} title={title} />
      <section className="section">
        <div className="container-les max-w-3xl space-y-6">
          <TodoBlock label={`Client to supply the full ${title} text.`} />
          {extra && <p className="leading-relaxed text-fg-muted">{extra}</p>}
          <p className="text-sm text-fg-muted">L E S TRANSPORT LTD · Company number 14918509 · 363a Dunstable Road, Luton, LU4 8BY</p>
        </div>
      </section>
    </>
  );
}
