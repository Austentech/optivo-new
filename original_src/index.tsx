import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, MessageCircle, Sparkles, TrendingUp, Users, Star, Award,
  Search, ClipboardList, Target, Rocket, LineChart, TrendingUp as TrendUp,
  Globe, MapPin, Bot, Mic, Brain,
  Gauge, Megaphone, BarChart3,
} from "lucide-react";
import { services } from "@/data/services";
import { waLink, SITE } from "@/data/site";
import { Section, Heading, Reveal } from "@/components/Section";
import { StatCounter } from "@/components/StatCounter";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { homepageFaqs, buildFaqJsonLd } from "@/data/faqs";
import { reviews } from "@/data/reviews";
import { ClientLogos } from "@/components/ClientLogos";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Optivo Solutions — Performance-Driven Digital Marketing Agency" },
      { name: "description", content: "Optivo Solutions is a results-focused digital marketing agency helping startups, local businesses, e-commerce brands and enterprises grow through SEO, performance marketing, branding, PR and lead generation." },
      { property: "og:title", content: "Optivo Solutions — Performance-Driven Digital Marketing" },
      { property: "og:description", content: "Strategic branding, performance marketing, SEO, content, PR and lead generation that scale brands faster." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildFaqJsonLd(homepageFaqs)),
      },
    ],
  }),
  component: Home,
});

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-brand opacity-20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 md:grid-cols-2 md:px-8 md:pt-24 lg:pb-28">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            Performance-Driven Digital Marketing Solutions That Help Brands <span className="text-gradient-brand">Grow Faster</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            Optivo Solutions helps startups, local businesses, e-commerce brands and growing enterprises scale their digital presence through strategic branding, performance marketing, SEO, content creation, PR and lead generation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 font-semibold text-white shadow-glow transition hover:scale-[1.02]">
              Book A Free Consultation <ArrowRight size={16} />
            </Link>
            <Link to="/services" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 font-semibold transition hover:border-primary hover:text-primary">
              View Our Services
            </Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 font-semibold transition hover:border-primary hover:text-primary">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </motion.div>

          <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex">{[0,1,2,3,4].map(i => <Star key={i} size={16} className="fill-accent text-accent" />)}</div>
            <span><span className="font-semibold text-foreground">4.9</span> on Google · 52+ happy clients</span>
          </div>
        </div>

        <div className="relative">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[5/6] w-full max-w-md">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-[2rem] bg-gradient-brand opacity-20 blur-2xl"
      />
      <div className="absolute inset-0 rounded-[2rem] border border-border bg-card/90 p-5 shadow-glow backdrop-blur ring-gradient">
        {/* Dashboard mock */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Campaign Performance</div>
            <div className="text-lg font-bold">+250% Growth</div>
          </div>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-brand text-white"><TrendingUp size={16} /></div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { l: "Clients", v: "52+" },
            { l: "Leads", v: "15K+" },
            { l: "Campaigns", v: "100+" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border border-border bg-background p-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
              <div className="mt-0.5 text-base font-semibold">{s.v}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-border bg-background p-4">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>Organic traffic</span><span>Last 90 days</span>
          </div>
          <svg viewBox="0 0 200 80" className="h-24 w-full">
            <defs>
              <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.52 0.24 262)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.52 0.24 262)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,70 C30,60 50,55 70,45 C90,35 110,40 130,25 C150,12 180,18 200,5 L200,80 L0,80 Z" fill="url(#g1)" />
            <path d="M0,70 C30,60 50,55 70,45 C90,35 110,40 130,25 C150,12 180,18 200,5" fill="none" stroke="oklch(0.52 0.24 262)" strokeWidth="2" />
          </svg>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-accent/20 text-accent"><Users size={14} /></div>
            <div>
              <div className="text-[10px] uppercase text-muted-foreground">Happy Clients</div>
              <div className="text-sm font-semibold">52+</div>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-border bg-background p-3">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/20 text-primary"><Award size={14} /></div>
            <div>
              <div className="text-[10px] uppercase text-muted-foreground">Campaigns</div>
              <div className="text-sm font-semibold">100+</div>
            </div>
          </div>
        </div>
      </div>

      <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-6 top-12 hidden rounded-2xl border border-border bg-background/90 p-3 shadow-soft backdrop-blur md:flex">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-white"><Star size={18} /></div>
        <div className="ml-3"><div className="text-xs text-muted-foreground">Google Rating</div><div className="text-sm font-bold">4.9 / 5.0</div></div>
      </motion.div>

      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 bottom-8 hidden rounded-2xl border border-border bg-background/90 p-3 shadow-soft backdrop-blur md:flex">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground"><MessageCircle size={18} /></div>
        <div className="ml-3"><div className="text-xs text-muted-foreground">WhatsApp leads</div><div className="text-sm font-bold">+184% MoM</div></div>
      </motion.div>
    </div>
  );
}

function TrustBar() {
  const stats = [
    { value: 4.9, suffix: "★", label: "Google Rating" },
    { value: 52, suffix: "+", label: "Happy Clients" },
    { value: 15000, suffix: "+", label: "Leads Generated" },
    { value: 100, suffix: "+", label: "Campaigns Managed" },
  ];
  return (
    <section className="border-y border-border bg-card/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8 md:py-14">
        {stats.map((s) => <StatCounter key={s.label} {...s} />)}
      </div>
    </section>
  );
}

function Services() {
  return (
    <Section>
      <Heading
        eyebrow="What we do"
        title={<>Full-funnel growth — <span className="text-gradient-brand">end to end</span>.</>}
        subtitle="Pick a single service or let us run the entire growth engine for you."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.slug} delay={i * 0.04}>
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative block h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white shadow-glow">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function WhyChoose() {
  const items = [
    { title: "Expert Team", desc: "Strategists, designers, engineers & creators — in-house." },
    { title: "Result Driven Strategy", desc: "Every plan tied to revenue or pipeline KPIs." },
    { title: "Transparent Reporting", desc: "Live dashboards. No black boxes. Ever." },
    { title: "Fast Support", desc: "Average response under 30 minutes — across channels." },
    { title: "Creative Solutions", desc: "Award-winning creative that earns attention." },
    { title: "ROI Focused Marketing", desc: "We measure profit, not just clicks and likes." },
  ];
  return (
    <Section className="bg-secondary/40">
      <Heading
        center
        eyebrow="Why Optivo"
        title="Built for ambitious brands."
        subtitle="The reason 96% of our clients renew, refer and scale with us."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.05}>
            <div className="ring-gradient relative h-full rounded-2xl bg-background p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-white">
                <span className="text-base font-bold">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Process() {
  const steps = [
    { t: "Discovery", d: "Deep-dive into your brand, audience and competitors.", Icon: Search },
    { t: "Planning", d: "Channel mix, KPIs, creative direction and timeline.", Icon: ClipboardList },
    { t: "Strategy", d: "Positioning, messaging and a measurable growth roadmap.", Icon: Target },
    { t: "Execution", d: "Launch campaigns, content, automation and ads.", Icon: Rocket },
    { t: "Optimization", d: "Weekly experiments. Kill losers. Scale winners.", Icon: LineChart },
    { t: "Growth", d: "Compound. Expand. Dominate the category.", Icon: TrendUp },
  ];
  return (
    <Section>
      <Heading
        center
        eyebrow="Our Process"
        title="A proven 6-step growth system."
      />
      <div className="relative">
        {/* vertical timeline rail — visible on all screens */}
        <div className="pointer-events-none absolute left-5 top-0 h-full w-px bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2 md:-translate-x-1/2" />
        <div className="grid gap-6 md:gap-10">
          {steps.map((s, i) => {
            const Icon = s.Icon;
            const flip = i % 2 === 1;
            return (
              <Reveal key={s.t} delay={i * 0.05}>
                <div className={`relative grid grid-cols-[2.75rem_1fr] gap-4 md:grid-cols-2 md:gap-12 ${flip ? "md:[&>.card]:order-2" : ""}`}>
                  {/* node dot */}
                  <div className="relative md:hidden">
                    <div className="absolute left-1.5 top-6 grid h-8 w-8 place-items-center rounded-full bg-gradient-brand text-white shadow-glow ring-4 ring-background">
                      <Icon size={16} />
                    </div>
                  </div>
                  {/* desktop dot */}
                  <div className="absolute left-1/2 top-8 hidden h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-gradient-brand text-white shadow-glow ring-4 ring-background md:grid">
                    <Icon size={18} />
                  </div>

                  <div className={`card rounded-2xl border border-border bg-card p-5 shadow-soft md:p-8 ${flip ? "md:text-left" : "md:text-right"}`}>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary md:hidden">
                      <span>Step {i + 1}</span>
                    </div>
                    <div className="hidden text-xs font-semibold uppercase tracking-wider text-primary md:block">Step {i + 1}</div>
                    <h3 className="mt-1 text-xl font-bold md:text-2xl">{s.t}</h3>
                    <p className="mt-2 text-sm text-muted-foreground md:text-base">{s.d}</p>
                  </div>
                  <div className="hidden md:block" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section className="bg-secondary/40">
      <Heading center eyebrow="Success Stories" title="What our clients say." subtitle="Real founders. Real businesses. Real results." />

      {/* Google-style rating highlight */}
      <Reveal>
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-background p-6 text-center shadow-soft md:flex-row md:gap-6 md:text-left">
          <div className="text-5xl font-bold text-gradient-brand">4.9</div>
          <div>
            <div className="flex justify-center md:justify-start">
              {[0,1,2,3,4].map((i) => <Star key={i} size={18} className="fill-accent text-accent" />)}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Rated <span className="font-semibold text-foreground">4.9 / 5</span> by clients on Google
            </div>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.05}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <div className="flex">
                  {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={14} className="fill-accent text-accent" />)}
                </div>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">Verified</span>
              </div>
              <p className="mt-4 flex-1 text-sm text-foreground/85">"{t.text}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand font-semibold text-white">
                  {t.name.split(" ").map((p) => p[0]).join("").slice(0,2)}
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
  );
}

function HomeFAQ() {
  return (
    <Section>
      <Heading center eyebrow="FAQs" title="Answers to common questions." subtitle="Everything you need to know about working with Optivo Solutions." />
      <FAQ items={homepageFaqs} />
    </Section>
  );
}

function SEODescription() {
  return (
    <Section className="pt-12 md:pt-16">
      <Reveal>
        <article className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft md:p-10 ring-gradient">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-brand opacity-10 blur-2xl" />
          <div className="flex items-start gap-5">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow"
            >
              <Gauge size={26} />
            </motion.div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Why Optivo</span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
                Digital Marketing Agency Focused on Growth
              </h2>
              <p className="mt-3 text-base text-muted-foreground md:text-lg">
                We are a results-focused digital marketing agency helping brands improve visibility, generate quality leads, strengthen online presence, and achieve sustainable business growth through data-driven marketing strategies.
              </p>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}

function AISearch() {
  const items = [
    { Icon: Search, t: "Google Search", d: "Rank on the queries your customers actually type." },
    { Icon: MapPin, t: "Local Search", d: "Win the Google Map pack in your service area." },
    { Icon: Bot, t: "AI Search Platforms", d: "Be cited by ChatGPT, Perplexity and Gemini." },
    { Icon: Mic, t: "Voice Search", d: "Optimized for conversational, long-tail queries." },
    { Icon: Brain, t: "Modern Search Experiences", d: "Structured data and AEO content engines." },
    { Icon: Globe, t: "Discoverability Everywhere", d: "One brand, ranking across every modern surface." },
  ];
  return (
    <Section className="bg-secondary/40">
      <Heading
        center
        eyebrow="AI & Search"
        title={<>Optimized for Search Engines and <span className="text-gradient-brand">AI Search</span>.</>}
        subtitle="We engineer your brand to be discovered across traditional search, AI assistants and voice — the new front door to your business."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 0.05}>
            <div className="h-full rounded-2xl border border-border bg-background p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
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
  );
}

function GrowthPillars() {
  const items = [
    { Icon: TrendingUp, t: "Business Growth", d: "Repeatable systems that scale revenue month over month." },
    { Icon: Globe, t: "Digital Visibility", d: "Show up wherever your customers are searching today." },
    { Icon: BarChart3, t: "Lead Generation", d: "Qualified pipeline through SEO, Meta and Google Ads." },
    { Icon: Sparkles, t: "Brand Positioning", d: "Premium identity and storytelling that builds trust." },
    { Icon: Brain, t: "AI Search Optimization", d: "Be cited by ChatGPT, Perplexity and Gemini." },
    { Icon: Megaphone, t: "Market Authority", d: "PR, influencers and creative production that compound." },
  ];
  return (
    <Section>
      <Heading
        eyebrow="Outcomes"
        title={<>Built for <span className="text-gradient-brand">measurable growth</span>.</>}
        subtitle="Every engagement is engineered around the metrics that move your business forward."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.t} delay={i * 0.05}>
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
  );
}

function BlogPreview() {
  const posts = [
    { title: "The 2025 Playbook for Meta Ads in India", excerpt: "Why creative is now 80% of performance — and how to scale it.", tag: "Meta Ads", read: "6 min" },
    { title: "Local SEO Wins: Dominate Google Maps in 90 Days", excerpt: "A step-by-step framework for service businesses to win local search.", tag: "SEO", read: "8 min" },
    { title: "WhatsApp Automation: The Quietest Growth Lever", excerpt: "How smart businesses turn DMs into ₹10L+ in monthly revenue.", tag: "Automation", read: "5 min" },
  ];
  return (
    <Section>
      <Heading eyebrow="Insights" title={<>Fresh from the <span className="text-gradient-brand">Optivo blog</span>.</>} subtitle="Tactics, trends and growth stories from our team." />
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <Link to="/blog" className="group block h-full overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:shadow-glow">
              <div className="aspect-[16/10] bg-gradient-brand opacity-90" />
              <div className="p-6">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{p.tag}</span>
                <h3 className="mt-3 text-lg font-bold transition group-hover:text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="mt-4 text-xs text-muted-foreground">{p.read} read</div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <SEODescription />
      <TrustBar />
      <Services />
      <ClientLogos />
      {/* Standalone AI & Search section removed — AI & Search Optimization now lives in the main services list */}
      <GrowthPillars />
      <WhyChoose />
      {/* Video Testimonials / YouTube section hidden — re-enable by uncommenting the line below */}
      {/* <Testimonials /> */}
      <Process />
      <HomeFAQ />
      {/* Homepage blog section hidden — re-enable by uncommenting */}
      {/* <BlogPreview /> */}
      <CTASection />
      <ContactStrip />
    </>
  );
}

function ContactStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 md:px-8">
      <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
        Prefer the old-school way? Call us at <a href={`tel:${SITE.phones[0].replace(/\s/g,"")}`} className="font-semibold text-foreground hover:text-primary">{SITE.phones[0]}</a> · Email <a href={`mailto:${SITE.email}`} className="font-semibold text-foreground hover:text-primary">{SITE.email}</a>
      </div>
    </section>
  );
}
