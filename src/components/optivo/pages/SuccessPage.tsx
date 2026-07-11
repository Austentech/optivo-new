'use client';

import { Star, TrendingUp } from "lucide-react";
import { Section, Heading, Reveal } from "@/components/optivo/Section";
import { CTASection } from "@/components/optivo/CTASection";
import { StatCounter } from "@/components/optivo/StatCounter";
import { reviews } from "@/data/reviews";

const cases = [
  { brand: "DTC Skincare Brand", metric: "+312%", label: "Organic traffic in 6 months", desc: "Technical SEO + content engine + digital PR." },
  { brand: "EdTech Platform", metric: "-42%", label: "Cost per qualified lead", desc: "Funnel rebuild + creative testing on Meta + Google." },
  { brand: "Local Real Estate", metric: "4.7x", label: "Return on ad spend", desc: "Hyper-local targeting + WhatsApp follow-up automation." },
  { brand: "Fashion D2C", metric: "+184%", label: "Monthly revenue uplift", desc: "Shopping ads + email/SMS retention flows." },
];

export default function SuccessPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <span className="rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-xs font-semibold text-primary">Success</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Real brands. Real <span className="text-gradient-brand">growth stories</span>.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              250+ businesses have grown with Optivo. Here&apos;s what they say — and the numbers behind it.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-14 md:grid-cols-4 md:px-8">
          <StatCounter value={4.9} suffix="★" label="Google Rating" />
          <StatCounter value={52} suffix="+" label="Happy Clients" />
          <StatCounter value={15000} suffix="+" label="Leads Generated" />
          <StatCounter value={100} suffix="+" label="Campaigns Managed" />
        </div>
      </section>

      <Section>
        <Heading eyebrow="Case Studies" title="A few of our favourite wins." />
        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.brand} delay={i * 0.05}>
              <div className="group relative overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-glow md:p-9">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-brand opacity-10 blur-3xl transition group-hover:opacity-25" />
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.brand}</div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <div className="text-5xl font-bold text-gradient-brand md:text-6xl">{c.metric}</div>
                    </div>
                    <div className="mt-2 text-base font-semibold">{c.label}</div>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white"><TrendingUp size={20} /></div>
                </div>
                <p className="mt-5 text-muted-foreground">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <Heading center eyebrow="Testimonials" title="What our clients say." />
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.04}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-soft">
                <div className="flex">{Array.from({length:t.rating}).map((_,k)=><Star key={k} size={14} className="fill-accent text-accent" />)}</div>
                <p className="mt-4 flex-1 text-sm">&quot;{t.text}&quot;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand font-semibold text-white">
                    {t.name.split(" ").map(p=>p[0]).join("").slice(0,2)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection title="Be our next success story." />
    </>
  );
}