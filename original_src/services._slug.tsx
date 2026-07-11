import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, Calendar, Star } from "lucide-react";
import { getService, services, type Service } from "@/data/services";
import { Section, Heading, Reveal } from "@/components/Section";
import { StatCounter } from "@/components/StatCounter";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { waLink, callLink, SITE } from "@/data/site";
import { buildFaqJsonLd } from "@/data/faqs";

const SITE_URL = "https://optivo-growth-engine.lovable.app";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): Service => {
    const s = getService(params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData, params }) => {
    const s = loaderData;
    const url = `${SITE_URL}/services/${params.slug}`;
    const serviceSchema = s && {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.title,
      description: s.overview,
      provider: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE_URL,
      },
      areaServed: "IN",
      serviceType: s.category,
      url,
    };
    const breadcrumbSchema = s && {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
        { "@type": "ListItem", position: 3, name: s.title, item: url },
      ],
    };
    return {
      meta: [
        { title: `${s?.title ?? "Service"} — Optivo Solutions` },
        { name: "description", content: s?.overview ?? "" },
        { property: "og:title", content: `${s?.title ?? "Service"} — Optivo Solutions` },
        { property: "og:description", content: s?.short ?? "" },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: s
        ? [
            { type: "application/ld+json", children: JSON.stringify(serviceSchema) },
            { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
            { type: "application/ld+json", children: JSON.stringify(buildFaqJsonLd(s.faqs)) },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <Section className="text-center">
      <h1 className="text-3xl font-bold">Service not found</h1>
      <Link to="/services" className="mt-6 inline-flex rounded-full bg-gradient-brand px-5 py-2.5 text-white">All services</Link>
    </Section>
  ),
  component: ServicePage,
});

function Breadcrumbs({ title }: { title: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link to="/" className="hover:text-primary">Home</Link></li>
        <li aria-hidden>/</li>
        <li><Link to="/services" className="hover:text-primary">Services</Link></li>
        <li aria-hidden>/</li>
        <li className="font-medium text-foreground">{title}</li>
      </ol>
    </nav>
  );
}

function ServicePage() {
  const s = Route.useLoaderData() as Service;
  const Icon = s.icon;
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:px-8 md:py-24">
          <div>
            <Breadcrumbs title={s.title} />
            <div className="mt-4 inline-flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow"><Icon size={26} /></div>
              <span className="rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-xs font-semibold text-primary">{s.tagline}</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">{s.headline}</h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">{s.overview}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-white shadow-glow transition hover:scale-[1.02]">
                <Calendar size={16} /> Book Consultation
              </Link>
              <a href={waLink(`Hi Optivo, I'd like to know more about ${s.title}.`)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-semibold hover:border-primary hover:text-primary">
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a href={callLink()} className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 font-semibold hover:border-primary hover:text-primary">
                <Phone size={16} /> Call Now
              </a>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6 shadow-glow ring-gradient md:p-8">
            <h2 className="text-lg font-bold">Why this matters</h2>
            <p className="mt-2 text-muted-foreground">{s.why}</p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {s.stats.map((st) => (
                <div key={st.label} className="rounded-xl border border-border bg-background p-4 text-center">
                  <div className="text-2xl font-bold text-gradient-brand">{st.value}{st.suffix}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      {s.overviewExtra && (
        <Section className="pt-12 md:pt-16">
          <div className="mx-auto max-w-4xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>{s.overview}</p>
            <p>{s.overviewExtra}</p>
          </div>
        </Section>
      )}

      {/* SERVICES INCLUDED */}
      <Section className="bg-secondary/40">
        <Heading
          eyebrow="What's Included"
          title={<>Our <span className="text-gradient-brand">{s.title}</span> Services Include</>}
          subtitle="A complete, ready-to-run offering — nothing missing, nothing extra."
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {s.included.map((it, i) => (
            <Reveal key={it} delay={i * 0.02}>
              <div className="flex h-full items-start gap-3 rounded-2xl border border-border bg-background p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-glow">
                <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 size={18} />
                </span>
                <span className="text-sm font-medium text-foreground">{it}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* BENEFITS */}
      <Section>
        <Heading eyebrow="Benefits" title="What you get with Optivo." subtitle="Outcomes tied to visibility, leads, brand growth and conversion." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {s.benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.04}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary"><CheckCircle2 size={20} /></div>
                <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROCESS TIMELINE */}
      <Section className="bg-secondary/40">
        <Heading center eyebrow="Our Process" title="How we deliver." subtitle="A proven six-step system — Discovery → Strategy → Planning → Execution → Optimization → Reporting." />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {s.process.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <div className="relative h-full rounded-2xl border border-border bg-background p-5">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white shadow-glow">{i + 1}</div>
                <h3 className="mt-3 text-base font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY CHOOSE OPTIVO */}
      <Section>
        <Heading
          eyebrow="Why Choose Optivo"
          title={<>Built for ambitious brands that want <span className="text-gradient-brand">real results</span>.</>}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {s.whyChoose.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.04}>
              <div className="ring-gradient relative h-full rounded-2xl bg-card p-6 shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white">
                  <Star size={20} />
                </div>
                <h3 className="mt-5 text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{w.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-14 md:grid-cols-3 md:px-8">
          {s.stats.map((st) => <StatCounter key={st.label} value={st.value} suffix={st.suffix} label={st.label} />)}
        </div>
      </section>

      {/* FAQS */}
      <Section>
        <Heading center eyebrow="FAQs" title="Frequently asked questions." subtitle={`Everything you need to know about our ${s.title}.`} />
        <FAQ items={s.faqs} />
      </Section>

      <CTASection title={`Ready to scale with ${s.title}?`} />

      {/* RELATED SERVICES */}
      <Section className="pt-0">
        <Heading eyebrow="Explore more" title="Related services" subtitle="Stack services for compounding growth." />
        <div className="grid gap-5 md:grid-cols-3">
          {others.map((o) => {
            const OIcon = o.icon;
            return (
              <Link
                key={o.slug}
                to="/services/$slug"
                params={{ slug: o.slug }}
                className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white"><OIcon size={18} /></div>
                <h3 className="mt-4 text-lg font-bold">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">View <ArrowRight size={14} className="transition group-hover:translate-x-0.5" /></span>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link to="/services" className="rounded-full border border-border bg-background px-4 py-2 font-medium hover:border-primary hover:text-primary">All Services</Link>
          <Link to="/about" className="rounded-full border border-border bg-background px-4 py-2 font-medium hover:border-primary hover:text-primary">About Optivo</Link>
          <Link to="/contact" className="rounded-full border border-border bg-background px-4 py-2 font-medium hover:border-primary hover:text-primary">Contact Us</Link>
          <Link to="/" className="rounded-full border border-border bg-background px-4 py-2 font-medium hover:border-primary hover:text-primary">Home</Link>
        </div>
      </Section>
    </>
  );
}
