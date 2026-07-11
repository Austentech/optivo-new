import { createFileRoute } from "@tanstack/react-router";
import { Section, Heading, Reveal } from "@/components/Section";
import { StatCounter } from "@/components/StatCounter";
import { CTASection } from "@/components/CTASection";
import {
  Target, Eye, Heart, Sparkles, Users, Award,
  Search, MapPin, Share2, BarChart3, PenSquare, Megaphone,
  Code2, ShoppingBag, Brain, Building2, Star,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Optivo Solutions — Helping Businesses Build Stronger Digital Presence" },
      { name: "description", content: "Optivo Solutions is a results-driven digital marketing agency helping startups, local businesses, e-commerce brands and enterprises grow through SEO, branding, performance marketing, PR and lead generation." },
      { property: "og:title", content: "About Optivo Solutions" },
      { property: "og:description", content: "Helping Businesses Build Stronger Digital Presence — our story, mission and specializations." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const specializations = [
  { Icon: Share2, t: "Social Media Management", d: "Build a brand people follow, trust and buy from." },
  { Icon: Search, t: "SEO & Local SEO", d: "Rank higher on Google and dominate local search." },
  { Icon: Code2, t: "Website Development", d: "Fast, conversion-built sites and web apps." },
  { Icon: Target, t: "Meta Ads & Google Ads", d: "Full-funnel paid media managed by specialists." },
  { Icon: PenSquare, t: "Content Creation & Branding", d: "Identity, voice and content that convert." },
  { Icon: Megaphone, t: "Lead Generation Campaigns", d: "Qualified pipeline built on repeatable systems." },
  { Icon: MapPin, t: "Google Business Profile Optimization", d: "Win the local 3-pack and Google Maps." },
  { Icon: Brain, t: "AEO & GEO Optimization", d: "Be cited by ChatGPT, Perplexity and Gemini." },
  { Icon: ShoppingBag, t: "E-Commerce Marketing", d: "More carts, more revenue, lower CAC." },
  { Icon: Star, t: "PR & Influencer Marketing", d: "Earned media, creators and offline brand visibility." },
];

function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <span className="rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-xs font-semibold text-primary">About Us</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              We're a growth agency built for <span className="text-gradient-brand">ambitious brands</span>.
            </h1>
            <p className="mt-4 text-lg font-semibold text-foreground/90 md:text-xl">
              Helping Businesses Build Stronger Digital Presence
            </p>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Optivo Solutions was founded with one belief — marketing should be measurable, creative and uncompromising. We partner with brands across India to engineer real, durable growth.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { Icon: Target, title: "Our Mission", desc: "Make world-class digital marketing accessible to every ambitious Indian business — with full transparency." },
            { Icon: Eye, title: "Our Vision", desc: "To become India's most trusted growth partner — known for results, integrity and creative excellence." },
            { Icon: Heart, title: "Our Values", desc: "Honest reporting. Relentless curiosity. Client obsession. Speed of execution. Beautiful craft." },
          ].map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow"><Icon size={22} /></div>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-muted-foreground">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* OUR STORY */}
      <Section className="bg-secondary/40">
        <Heading
          eyebrow="Our Story"
          title={<>A results-driven agency built around <span className="text-gradient-brand">your growth</span>.</>}
        />
        <div className="mx-auto max-w-4xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            At <span className="font-semibold text-foreground">Optivo Solutions</span>, we help businesses grow through strategic digital marketing, SEO services, social media marketing, branding, performance marketing, and lead generation solutions designed to improve online visibility and business growth.
          </p>
          <p>
            As a results-driven digital marketing agency, we combine creativity, analytics, Meta Ads, Google Ads, website development, and local SEO strategies to help brands build stronger digital presence, generate quality leads, and increase customer engagement.
          </p>
          <p>
            From startups and local businesses to e-commerce brands, service businesses and growing enterprises, we create customized marketing strategies optimized for both search engines and AI-driven search experiences.
          </p>
        </div>
      </Section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-14 md:grid-cols-4 md:px-8">
          <StatCounter value={4.9} suffix="★" label="Google Rating" />
          <StatCounter value={52} suffix="+" label="Happy Clients" />
          <StatCounter value={15000} suffix="+" label="Leads Generated" />
          <StatCounter value={100} suffix="+" label="Campaigns Managed" />
        </div>
      </section>

      {/* SPECIALIZATION */}
      <Section>
        <Heading
          center
          eyebrow="Specializations"
          title="What We Specialize In"
          subtitle="A complete growth engine — strategy, creative and execution working as one team."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {specializations.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.04}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
                  <it.Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold">{it.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Our Journey section temporarily disabled — kept for future use.
      <Section className="bg-secondary/40">
        <Heading eyebrow="Our Journey" title={<>From a small studio to a <span className="text-gradient-brand">national agency</span>.</>} />
        <div className="relative ml-3 space-y-10 border-l border-border pl-8 md:ml-0 md:mx-auto md:max-w-3xl">
          {[
            { y: "2021", t: "Founded", d: "Optivo Solutions opens its doors with a small team and a big ambition." },
            { y: "2022", t: "First 50 clients", d: "Scaled across SEO, ads and social media for local & national brands." },
            { y: "2023", t: "Creative studio launched", d: "Built an in-house photo, video & design team for premium content." },
            { y: "2024", t: "100+ active retainers", d: "Hit 100+ active clients and launched our WhatsApp automation practice." },
            { y: "2025", t: "Going national", d: "Working with brands across India with a remote-first growth team." },
          ].map((m, i) => (
            <Reveal key={m.y} delay={i * 0.05}>
              <div className="relative">
                <span className="absolute -left-[42px] top-1 grid h-6 w-6 place-items-center rounded-full bg-gradient-brand ring-4 ring-background"><span className="h-2 w-2 rounded-full bg-white" /></span>
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">{m.y}</div>
                <h3 className="mt-1 text-xl font-bold">{m.t}</h3>
                <p className="mt-1 text-muted-foreground">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
      */}

      <Section>
        <Heading center eyebrow="The Team" title="Senior, in-house, accountable." subtitle="No juniors learning on your account. Real specialists from day one." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Strategy Pod", role: "Growth strategists & analysts", icon: Target },
            { name: "Creative Studio", role: "Designers, editors & writers", icon: Sparkles },
            { name: "Performance Pod", role: "Paid media specialists", icon: Award },
            { name: "Engineering", role: "Developers & automation", icon: Users },
            { name: "E-Commerce Pod", role: "Shopify, marketplaces & CRO", icon: ShoppingBag },
            { name: "Local SEO Pod", role: "Google Business & Maps experts", icon: MapPin },
            { name: "Enterprise Pod", role: "Multi-location & B2B growth", icon: Building2 },
            { name: "Content & AEO Studio", role: "SEO, AEO and GEO content engineers", icon: Brain },
          ].map(({ name, role, icon: Icon }, i) => (
            <Reveal key={name} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-background p-6 text-center shadow-soft">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow"><Icon size={26} /></div>
                <h3 className="mt-5 text-lg font-bold">{name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection title="Want to be our next success story?" subtitle="Book a free strategy session with a senior team member." />
    </>
  );
}
