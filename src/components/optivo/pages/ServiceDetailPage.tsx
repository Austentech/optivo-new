'use client';

import { ArrowRight, CheckCircle2, MessageCircle, Phone, Calendar, Star } from "lucide-react";
import { getService, services, type Service } from "@/data/services";
import { Section, Heading, Reveal } from "@/components/optivo/Section";
import { StatCounter } from "@/components/optivo/StatCounter";
import { FAQ } from "@/components/optivo/FAQ";
import { CTASection } from "@/components/optivo/CTASection";
import { waLink, callLink } from "@/data/site";
import type { PageKey } from "@/components/optivo/Navbar";

interface Props {
  slug: string;
  onNavigate: (state: { page: PageKey; serviceSlug?: string }) => void;
}

function Breadcrumbs({ title, onNavigate }: { title: string; onNavigate: Props["onNavigate"] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><button onClick={() => onNavigate({ page: "home" })} className="hover:text-primary">Home</button></li>
        <li aria-hidden>/</li>
        <li><button onClick={() => onNavigate({ page: "services" })} className="hover:text-primary">Services</button></li>
        <li aria-hidden>/</li>
        <li className="font-medium text-foreground">{title}</li>
      </ol>
    </nav>
  );
}

export default function ServiceDetailPage({ slug, onNavigate }: Props) {
  const s = getService(slug);
  if (!s) {
    return (
      <Section className="text-center">
        <h1 className="text-3xl font-bold">Service not found</h1>
        <button onClick={() => onNavigate({ page: "services" })} className="mt-6 inline-flex rounded-full bg-gradient-brand px-5 py-2.5 text-white">All services</button>
      </Section>
    );
  }
  const Icon = s.icon;
  const others = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:px-8 md:py-24">
          <div>
            <Breadcrumbs title={s.title} onNavigate={onNavigate} />
            <div className="mt-4 inline-flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow"><Icon size={26} /></div>
              <span className="rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-xs font-semibold text-primary">{s.tagline}</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">{s.headline}</h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">{s.overview}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button onClick={() => onNavigate({ page: "contact" })} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 font-semibold text-white shadow-glow transition hover:scale-[1.02]">
                <Calendar size={16} /> Book Consultation
              </button>
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

      {s.overviewExtra && (
        <Section className="pt-12 md:pt-16">
          <div className="mx-auto max-w-4xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>{s.overview}</p>
            <p>{s.overviewExtra}</p>
          </div>
        </Section>
      )}

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

      <Section>
        <Heading center eyebrow="FAQs" title="Frequently asked questions." subtitle={`Everything you need to know about our ${s.title}.`} />
        <FAQ items={s.faqs} />
      </Section>

      <CTASection title={`Ready to scale with ${s.title}?`} />

      <Section className="pt-0">
        <Heading eyebrow="Explore more" title="Related services" subtitle="Stack services for compounding growth." />
        <div className="grid gap-5 md:grid-cols-3">
          {others.map((o) => {
            const OIcon = o.icon;
            return (
              <button
                key={o.slug}
                onClick={() => onNavigate({ page: "service-detail", serviceSlug: o.slug })}
                className="group rounded-2xl border border-border bg-card p-6 text-left transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white"><OIcon size={18} /></div>
                <h3 className="mt-4 text-lg font-bold">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">View <ArrowRight size={14} className="transition group-hover:translate-x-0.5" /></span>
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
          <button onClick={() => onNavigate({ page: "services" })} className="rounded-full border border-border bg-background px-4 py-2 font-medium hover:border-primary hover:text-primary">All Services</button>
          <button onClick={() => onNavigate({ page: "about" })} className="rounded-full border border-border bg-background px-4 py-2 font-medium hover:border-primary hover:text-primary">About Optivo</button>
          <button onClick={() => onNavigate({ page: "contact" })} className="rounded-full border border-border bg-background px-4 py-2 font-medium hover:border-primary hover:text-primary">Contact Us</button>
          <button onClick={() => onNavigate({ page: "home" })} className="rounded-full border border-border bg-background px-4 py-2 font-medium hover:border-primary hover:text-primary">Home</button>
        </div>
      </Section>
    </>
  );
}