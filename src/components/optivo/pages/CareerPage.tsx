'use client';

import { Briefcase, Zap, Heart, Users, ArrowRight } from "lucide-react";
import { Section, Heading, Reveal } from "@/components/optivo/Section";
import { CTASection } from "@/components/optivo/CTASection";
import { waLink } from "@/data/site";

const openings = [
  { role: "Senior Performance Marketer", type: "Full-time · Remote / On-site", desc: "Own Meta & Google Ads for 5–10 brands. 3+ yrs experience." },
  { role: "SEO Lead", type: "Full-time · Remote / On-site", desc: "Lead our SEO pod across technical, content and outreach." },
  { role: "Content & Video Producer", type: "Full-time · Remote / On-site", desc: "Script, shoot & edit reels and brand films." },
  { role: "Web Developer (React)", type: "Full-time · Remote", desc: "Build fast, accessible marketing sites in React/Next." },
  { role: "Social Media Manager", type: "Full-time · Remote / On-site", desc: "Calendar, community & campaigns for 4–6 brands." },
  { role: "Graphic Designer", type: "Full-time · Remote / On-site", desc: "Identity, ads, social — pixel-perfect craft." },
];

export default function CareerPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <span className="rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-xs font-semibold text-primary">Careers</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Build the <span className="text-gradient-brand">next big agency</span> with us.</h1>
            <p className="mt-5 text-lg text-muted-foreground">We&apos;re hiring senior, curious, kind people who love craft and growth in equal measure.</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: Zap, t: "Speed & Ownership", d: "Ship work that matters every week." },
            { Icon: Heart, t: "Health & Wellbeing", d: "Insurance, leave, mental health days." },
            { Icon: Users, t: "Senior Peers", d: "Learn from specialists, not juniors." },
            { Icon: Briefcase, t: "Hybrid + Remote", d: "Work where you do your best work." },
          ].map(({ Icon, t, d }, i) => (
            <Reveal key={t} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white"><Icon size={20} /></div>
                <h3 className="mt-4 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <Heading eyebrow="Open Roles" title="We&apos;re hiring." />
        <div className="space-y-3">
          {openings.map((o, i) => (
            <Reveal key={o.role} delay={i * 0.03}>
              <div className="group flex flex-col gap-3 rounded-2xl border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:shadow-glow md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-bold">{o.role}</h3>
                  <p className="text-sm text-muted-foreground">{o.type} · {o.desc}</p>
                </div>
                <a href={waLink(`Hi Optivo, I'd like to apply for the ${o.role} role.`)} target="_blank" rel="noreferrer"
                   className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
                  Apply <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection title="Don't see your role?" subtitle="Send us your work and tell us what you'd build at Optivo." />
    </>
  );
}