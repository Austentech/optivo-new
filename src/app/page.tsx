'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, MessageCircle, Phone, Mail, MapPin, Clock, Gauge,
  Target, Eye, Heart, Search, Users, TrendingUp, Lightbulb,
  Shield, Zap, Palette, BarChart3, Brain, Globe, Megaphone,
  Code2, Sparkles, ShoppingBag, Star, ChevronRight, Send,
  Rocket, Briefcase, HeartPulse, Wifi, Building2, PenTool,
  Database, Store, MapPinIcon, Building, Layers,
} from 'lucide-react';

import Navbar from '@/components/optivo/Navbar';
import Footer from '@/components/optivo/Footer';
import { Section, Heading, Reveal, Eyebrow } from '@/components/optivo/Section';
import { StatCounter } from '@/components/optivo/StatCounter';
import { FAQ } from '@/components/optivo/FAQ';
import { CTASection } from '@/components/optivo/CTASection';
import { ClientLogos } from '@/components/optivo/ClientLogos';
import { BookCall } from '@/components/optivo/BookCall';
import WhatsAppFloat from '@/components/optivo/WhatsAppFloat';
import EngagementPopup from '@/components/optivo/EngagementPopup';

import { SITE, waLink, callLink, mapsEmbed, mapsDirections } from '@/data/site';
import { services, serviceCategories } from '@/data/services';
import { homepageFaqs, allFaqs } from '@/data/faqs';
import { reviews } from '@/data/reviews';
import type { PageKey } from '@/components/optivo/Navbar';

/* ─── Page transition wrapper ─── */
function PageTransition({ children, key_val }: { children: React.ReactNode; key_val: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key_val}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Shared Stats Bar ─── */
function StatsBar() {
  return (
    <Section className="py-12 md:py-16">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
        <StatCounter value={4.9} suffix="★" label="Google Rating" decimals={1} />
        <StatCounter value={52} suffix="+" label="Happy Clients" />
        <StatCounter value={15000} suffix="+" label="Leads Generated" />
        <StatCounter value={100} suffix="+" label="Campaigns Managed" />
      </div>
    </Section>
  );
}

/* ─── Trust bar (smaller, used on home) ─── */
function TrustBar() {
  return (
    <Section className="py-12 md:py-16">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
        <StatCounter value={4.9} suffix="★" label="Google Rating" decimals={1} />
        <StatCounter value={52} suffix="+" label="Happy Clients" />
        <StatCounter value={15000} suffix="+" label="Leads Generated" />
        <StatCounter value={100} suffix="+" label="Campaigns Managed" />
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
   ═══════════════════════════════════════════════════════════════ */
function HomePage() {
  return (
    <div>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow>Digital Marketing Agency</Eyebrow>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
              >
                Performance-Driven Digital Marketing Solutions That Help Brands{' '}
                <span className="text-gradient-brand">Grow Faster.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="mt-6 max-w-xl text-lg text-muted-foreground"
              >
                {SITE.tagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
                >
                  Book A Free Consultation
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('services-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  View Our Services <ArrowRight size={16} />
                </button>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3.5 text-sm font-semibold transition hover:border-[#25D366] hover:text-[#25D366]"
                >
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-glow md:p-8">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-brand opacity-15 blur-3xl" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Campaign Performance</p>
                      <p className="mt-1 text-2xl font-bold text-gradient-brand">+250% Growth</p>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-white">
                      <TrendingUp size={18} />
                    </div>
                  </div>
                  <div className="mt-6">
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
                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-secondary/50 p-3 text-center">
                      <p className="text-lg font-bold">52+</p>
                      <p className="text-[11px] text-muted-foreground">Clients</p>
                    </div>
                    <div className="rounded-xl bg-secondary/50 p-3 text-center">
                      <p className="text-lg font-bold">15K+</p>
                      <p className="text-[11px] text-muted-foreground">Leads</p>
                    </div>
                    <div className="rounded-xl bg-secondary/50 p-3 text-center">
                      <p className="text-lg font-bold">100+</p>
                      <p className="text-[11px] text-muted-foreground">Campaigns</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating stat cards */}
              <div className="absolute -left-4 top-8 rounded-2xl border border-border bg-card p-3 shadow-glow">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-green-100 text-green-600">
                    <TrendingUp size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold">+312%</p>
                    <p className="text-[10px] text-muted-foreground">Organic Traffic</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 bottom-12 rounded-2xl border border-border bg-card p-3 shadow-glow">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-100 text-blue-600">
                    <Users size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold">4.9★</p>
                    <p className="text-[10px] text-muted-foreground">Google Rating</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SEO Description */}
      <Section>
        <Reveal>
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                <Gauge size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold md:text-2xl">Digital Marketing Agency Focused on Growth</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Optivo Solutions is a full-service digital marketing and branding agency helping businesses grow through SEO, social media marketing, performance advertising, website development, branding, PR, lead generation and AI search optimization strategies. We deliver measurable results for startups, local businesses and growing enterprises.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 3. Trust Bar */}
      <TrustBar />

      {/* 4. Services */}
      <Section id="services-section">
        <Heading
          center
          eyebrow="What We Do"
          title={<>Full-funnel growth — <span className="text-gradient-brand">end to end.</span></>}
          subtitle="From brand strategy to performance ads — every service connected to your revenue goals."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.slug} delay={i * 0.05}>
                <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-glow">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-gradient-brand group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2"
                  >
                    Learn more <ChevronRight size={14} />
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* 5. Client Logos */}
      <ClientLogos />

      {/* 6. Growth Pillars */}
      <Section>
        <Heading
          center
          eyebrow="Why Growth Matters"
          title={<>Built for <span className="text-gradient-brand">measurable growth.</span></>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: TrendingUp, title: 'Business Growth', desc: 'Revenue-focused strategies that scale with your ambition.' },
            { icon: Eye, title: 'Digital Visibility', desc: 'Show up where your customers are searching and scrolling.' },
            { icon: Megaphone, title: 'Lead Generation', desc: 'Consistent flow of qualified prospects, every single month.' },
            { icon: Sparkles, title: 'Brand Positioning', desc: 'Stand out in a crowded market with a clear, memorable identity.' },
            { icon: Brain, title: 'AI Search Optimization', desc: 'Get cited by ChatGPT, Perplexity, Gemini and voice search.' },
            { icon: Globe, title: 'Market Authority', desc: 'Become the recognized leader in your category.' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-glow">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 7. Why Choose Us */}
      <Section className="bg-secondary/30">
        <Heading
          center
          eyebrow="Why Choose Us"
          title={<>Built for <span className="text-gradient-brand">ambitious brands.</span></>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { num: '01', title: 'Expert Team', desc: 'Senior strategists, designers, developers and media buyers — all in-house, never outsourced.' },
            { num: '02', title: 'Result Driven Strategy', desc: 'Every initiative is tied to leads, revenue or measurable brand growth.' },
            { num: '03', title: 'Transparent Reporting', desc: 'Live dashboards, clear KPIs, no black boxes — ever.' },
            { num: '04', title: 'Fast Support', desc: 'Average response time under 30 minutes across all channels.' },
            { num: '05', title: 'Creative Solutions', desc: 'Scroll-stopping creatives, data-driven campaigns and out-of-the-box ideas.' },
            { num: '06', title: 'ROI Focused Marketing', desc: 'Every rupee tracked, attributed and optimized for maximum return.' },
          ].map((item, i) => (
            <Reveal key={item.num} delay={i * 0.05}>
              <div className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-glow">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-white">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 8. Process */}
      <Section>
        <Heading
          center
          eyebrow="Our Process"
          title={<>A proven <span className="text-gradient-brand">6-step growth system.</span></>}
          subtitle="From first conversation to measurable results — a structured, repeatable framework."
        />
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />
          {[
            { title: 'Discovery', desc: 'Deep-dive into your brand, audience, competitors and current performance.' },
            { title: 'Planning', desc: 'Calendars, creative briefs, asset lists and approval workflows.' },
            { title: 'Strategy', desc: 'Custom roadmap with channels, KPIs, positioning and timeline.' },
            { title: 'Execution', desc: 'Launch campaigns, content, automations and optimizations.' },
            { title: 'Optimization', desc: 'Weekly iteration — kill what\'s not working, double down on what is.' },
            { title: 'Growth', desc: 'Transparent monthly dashboards tied to real business outcomes.' },
          ].map((step, i) => (
            <Reveal key={step.title} delay={i * 0.08}>
              <div className={`relative mb-10 flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="absolute left-6 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-gradient-brand text-sm font-bold text-white ring-4 ring-background md:left-1/2">
                  {i + 1}
                </div>
                <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <h3 className="text-lg font-bold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 9. Home FAQ */}
      <Section className="bg-secondary/30">
        <Heading
          center
          eyebrow="FAQs"
          title="Answers to common questions."
          subtitle="Everything you need to know about working with us."
        />
        <FAQ items={homepageFaqs} />
      </Section>

      {/* 10. CTA Section */}
      <CTASection />

      {/* 11. Contact Strip */}
      <Section id="contact-section">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Prefer the old-school way?</p>
            <h3 className="mt-2 text-2xl font-bold md:text-3xl">Reach out directly</h3>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={callLink()}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                <Phone size={16} /> {SITE.phones[0]}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary hover:text-primary"
              >
                <Mail size={16} /> {SITE.email}
              </a>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT PAGE
   ═══════════════════════════════════════════════════════════════ */
function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 text-center">
          <Eyebrow>About Optivo Solutions</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            We're a growth agency built for <span className="text-gradient-brand">ambitious brands.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Helping Businesses Build Stronger Digital Presence
          </motion.p>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To help businesses grow through data-driven digital marketing, creative branding and measurable results that create lasting impact.' },
            { icon: Eye, title: 'Our Vision', desc: 'To become the most trusted growth partner for ambitious businesses across India — known for transparency, creativity and results.' },
            { icon: Heart, title: 'Our Values', desc: 'Transparency, ownership, creativity and client obsession. We treat every brand like our own and every result like it matters.' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-glow">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Our Story */}
      <Section className="bg-secondary/30">
        <Heading
          center
          eyebrow="Our Story"
          title={<>How <span className="text-gradient-brand">Optivo Solutions</span> began.</>}
        />
        <Reveal>
          <div className="mx-auto max-w-3xl space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Optivo Solutions was founded with a simple belief: every business — whether a local clinic, a growing D2C brand or an established enterprise — deserves access to world-class digital marketing. We saw too many agencies delivering vanity metrics and zero accountability, and we knew there had to be a better way.
            </p>
            <p>
              We started as a small, hungry team focused on SEO and social media, and quickly grew into a full-service digital marketing and branding agency. Today, we serve 52+ clients across industries like healthcare, real estate, education, e-commerce, hospitality and professional services — delivering measurable growth through strategy, creativity and technology.
            </p>
            <p>
              Our team combines senior strategists, creative designers, skilled developers and performance marketers — all working in-house, never outsourced. Every campaign is built on data, every creative is crafted with intent, and every report is tied to real business outcomes. That's the Optivo way.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Stats */}
      <StatsBar />

      {/* Specializations */}
      <Section>
        <Heading
          center
          eyebrow="Specializations"
          title={<>Areas we <span className="text-gradient-brand">excel in.</span></>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: Search, title: 'SEO & Local SEO' },
            { icon: Megaphone, title: 'Social Media Marketing' },
            { icon: Target, title: 'Meta & Google Ads' },
            { icon: Code2, title: 'Website Development' },
            { icon: Sparkles, title: 'Branding & Design' },
            { icon: Brain, title: 'AEO & GEO Optimization' },
            { icon: ShoppingBag, title: 'E-Commerce Marketing' },
            { icon: Star, title: 'PR & Influencer Marketing' },
            { icon: MapPinIcon, title: 'Google Business Profile' },
            { icon: Users, title: 'Lead Generation' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.04}>
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:border-primary/40 hover:shadow-glow">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <item.icon size={18} />
                </div>
                <span className="text-sm font-semibold">{item.title}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team Pods */}
      <Section className="bg-secondary/30">
        <Heading
          center
          eyebrow="Our Team"
          title={<>Specialized <span className="text-gradient-brand">team pods.</span></>}
          subtitle="Each pod is a focused unit of experts delivering deep expertise in their domain."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Lightbulb, title: 'Strategy Pod', desc: 'Research, planning, positioning and growth roadmaps.' },
            { icon: Palette, title: 'Creative Studio', desc: 'Design, video, branding and content production.' },
            { icon: BarChart3, title: 'Performance Pod', desc: 'Paid media, analytics, optimization and reporting.' },
            { icon: Code2, title: 'Engineering', desc: 'Web development, automation and technical SEO.' },
            { icon: Store, title: 'E-Commerce Pod', desc: 'Shopify, WooCommerce, product ads and retention.' },
            { icon: MapPinIcon, title: 'Local SEO Pod', desc: 'Google Business Profile, maps and local search.' },
            { icon: Building, title: 'Enterprise Pod', desc: 'Multi-location, large-scale and cross-channel strategies.' },
            { icon: PenTool, title: 'Content & AEO Studio', desc: 'AI search optimization, copywriting and content strategy.' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-glow">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICES PAGE
   ═══════════════════════════════════════════════════════════════ */
function ServicesPage() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');

  const filtered = services.filter((s) => {
    const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.short.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCat === 'All' || s.category === activeCat;
    return matchSearch && matchCat;
  });

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 text-center">
          <Eyebrow>Our Services</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Full-funnel growth — <span className="text-gradient-brand">end to end.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            From brand strategy to performance ads — every service connected to your revenue goals.
          </motion.p>
        </div>
      </section>

      {/* Filter + Grid */}
      <Section>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search services…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeCat === cat
                    ? 'bg-gradient-brand text-white shadow-glow'
                    : 'border border-border bg-card text-foreground/80 hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">No services match your search.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.slug} delay={i * 0.04}>
                  <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-glow">
                    <div className="flex items-start justify-between">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition group-hover:bg-gradient-brand group-hover:text-white">
                        <Icon size={22} />
                      </div>
                      <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                        {s.category}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.included.slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                      {s.included.length > 3 && (
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          +{s.included.length - 3} more
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        const el = document.getElementById('contact-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2"
                    >
                      Learn more <ChevronRight size={14} />
                    </button>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}
      </Section>

      <CTASection />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT PAGE
   ═══════════════════════════════════════════════════════════════ */
function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((d) => ({ ...d, [k]: e.target.value }));

  const handleSubmit = () => {
    const msg = [
      'New Enquiry — Optivo Solutions',
      '',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Message: ${form.message}`,
    ].join('\n');
    window.open(waLink(msg), '_blank');
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 text-center">
          <Eyebrow>Contact Us</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Let's talk <span className="text-gradient-brand">growth.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Whether you're ready to start or just exploring — we'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <Section id="contact-section">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: MapPin, title: 'Visit Us', desc: `${SITE.address.line1}, ${SITE.address.line2}`, href: mapsDirections, linkText: 'Get Directions' },
            { icon: Phone, title: 'Call Us', desc: SITE.phones[0], href: callLink(), linkText: 'Call Now' },
            { icon: Mail, title: 'Email', desc: SITE.email, href: `mailto:${SITE.email}`, linkText: 'Send Email' },
            { icon: Clock, title: 'Hours', desc: SITE.hours, href: undefined, linkText: undefined },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-glow">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                {item.href && item.linkText && (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary transition hover:gap-2"
                  >
                    {item.linkText} <ChevronRight size={14} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Contact Form + BookCall */}
      <Section className="bg-secondary/30">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <Reveal>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
              <h3 className="text-2xl font-bold md:text-3xl">Send us a message</h3>
              <p className="mt-1 text-sm text-muted-foreground">Fill in the form and we'll get back to you within 30 minutes.</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={set('name')}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    placeholder="+91 ..."
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</span>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    rows={4}
                    placeholder="Tell us about your business and goals…"
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>
              <button
                onClick={handleSubmit}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 font-semibold text-white shadow-glow transition hover:scale-[1.01] md:w-auto"
              >
                <Send size={16} /> Send via WhatsApp
              </button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <BookCall />
          </Reveal>
        </div>
      </Section>

      {/* Map */}
      <Section>
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe
              src={mapsEmbed}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Optivo Solutions Location"
              className="w-full"
            />
          </div>
        </Reveal>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BLOG PAGE
   ═══════════════════════════════════════════════════════════════ */
function BlogPage() {
  return (
    <div>
      {/* Coming Soon */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring', damping: 18 }}
          >
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-brand text-white shadow-glow">
              <PenTool size={36} />
            </div>
            <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Something great is <span className="text-gradient-brand">coming soon.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              We're crafting insightful articles on digital marketing, growth strategies and industry trends. Stay tuned.
            </p>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CAREER PAGE
   ═══════════════════════════════════════════════════════════════ */
function CareerPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 text-center">
          <Eyebrow>Career at Optivo</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Build the next big agency <span className="text-gradient-brand">with us.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            We're looking for passionate people who want to grow fast, own their work and make a real impact.
          </motion.p>
        </div>
      </section>

      {/* Perks */}
      <Section>
        <Heading
          center
          eyebrow="Perks & Culture"
          title={<>Why people <span className="text-gradient-brand">love working here.</span></>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Rocket, title: 'Speed & Ownership', desc: 'Move fast, take ownership and ship things that matter. No bureaucracy.' },
            { icon: HeartPulse, title: 'Health & Wellbeing', desc: 'Medical coverage, mental health support and a culture that respects balance.' },
            { icon: Users, title: 'Senior Peers', desc: 'Work alongside experienced strategists, designers and marketers every day.' },
            { icon: Wifi, title: 'Hybrid + Remote', desc: 'Flexible work environment — office, home or hybrid. We trust you.' },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-glow">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Openings */}
      <Section className="bg-secondary/30">
        <Heading
          center
          eyebrow="Open Positions"
          title={<>Current <span className="text-gradient-brand">openings.</span></>}
          subtitle="Found the right role? Apply via WhatsApp — we respond within 24 hours."
        />
        <div className="mx-auto max-w-3xl space-y-4">
          {[
            { title: 'Social Media Manager', type: 'Full-Time', location: 'Hybrid' },
            { title: 'SEO Specialist', type: 'Full-Time', location: 'Hybrid' },
            { title: 'Performance Marketer (Meta & Google Ads)', type: 'Full-Time', location: 'Hybrid' },
            { title: 'Graphic Designer', type: 'Full-Time', location: 'Hybrid' },
            { title: 'Content Writer & Strategist', type: 'Full-Time', location: 'Remote' },
            { title: 'Web Developer (WordPress / React)', type: 'Full-Time', location: 'Hybrid' },
          ].map((job, i) => (
            <Reveal key={job.title} delay={i * 0.05}>
              <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition hover:border-primary/40 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-bold">{job.title}</h3>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{job.type}</span>
                    <span>·</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <a
                  href={waLink(`Hi Optivo, I'm interested in the ${job.title} position. Here's my background:`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
                >
                  Apply <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SUCCESS PAGE
   ═══════════════════════════════════════════════════════════════ */
function SuccessPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 grid-bg opacity-10" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8 text-center">
          <Eyebrow>Success Stories</Eyebrow>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
          >
            Real brands. Real <span className="text-gradient-brand">growth stories.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Results speak louder than promises. Here's what we've delivered.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Case Studies */}
      <Section>
        <Heading
          center
          eyebrow="Case Studies"
          title={<>Growth stories from <span className="text-gradient-brand">real clients.</span></>}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              title: 'DTC Skincare Brand',
              metric: '+312%',
              metricLabel: 'Organic Traffic Growth',
              desc: 'Took a new DTC skincare brand from zero organic visibility to page-one rankings for 40+ high-intent keywords in 8 months.',
              tags: ['SEO', 'Content Strategy', 'Branding'],
            },
            {
              title: 'EdTech Platform',
              metric: '-42%',
              metricLabel: 'Reduction in CAC',
              desc: 'Optimized Meta and Google Ads funnels, improving lead quality while cutting cost-per-acquisition by 42% in just 90 days.',
              tags: ['Meta Ads', 'Google Ads', 'Landing Pages'],
            },
            {
              title: 'Local Real Estate Company',
              metric: '4.7x',
              metricLabel: 'Return on Ad Spend',
              desc: 'Built a full-funnel ad system for a real estate firm — generating qualified buyer leads at a consistent 4.7x ROAS.',
              tags: ['Performance Ads', 'Lead Gen', 'WhatsApp Automation'],
            },
            {
              title: 'Fashion D2C Brand',
              metric: '+184%',
              metricLabel: 'Revenue Growth',
              desc: 'End-to-end e-commerce marketing — from Shopify optimization to Meta ads to email flows — driving 184% revenue growth in 6 months.',
              tags: ['E-Commerce', 'Shopify', 'Email Marketing'],
            },
          ].map((cs, i) => (
            <Reveal key={cs.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:border-primary/40 hover:shadow-glow">
                <p className="text-3xl font-bold text-gradient-brand md:text-4xl">{cs.metric}</p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">{cs.metricLabel}</p>
                <h3 className="mt-4 text-lg font-bold">{cs.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cs.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cs.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-secondary/30">
        <Heading
          center
          eyebrow="Testimonials"
          title={<>What our <span className="text-gradient-brand">clients say.</span></>}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">&ldquo;{r.text}&rdquo;</p>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-sm font-bold">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FAQs PAGE
   ═══════════════════════════════════════════════════════════════ */
function FAQsPage() {
  return (
    <div>
      <Section className="pt-32 md:pt-40">
        <div className="mb-12 text-center">
          <Eyebrow>FAQs</Eyebrow>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-4 text-3xl font-bold tracking-tight md:text-5xl"
          >
            Everything you wanted to <span className="text-gradient-brand">ask.</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Can't find your answer? Reach out — we're happy to help.
          </p>
        </div>
        <FAQ items={allFaqs} />
      </Section>
      <CTASection />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageKey>('home');

  const handleNavigate = (page: PageKey) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageMap: Record<PageKey, React.ReactNode> = {
    home: <HomePage />,
    about: <AboutPage />,
    services: <ServicesPage />,
    contact: <ContactPage />,
    blog: <BlogPage />,
    career: <CareerPage />,
    success: <SuccessPage />,
    faqs: <FAQsPage />,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      <main className="pt-16">
        <PageTransition key_val={currentPage}>
          {pageMap[currentPage]}
        </PageTransition>
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppFloat />
      <EngagementPopup />
    </div>
  );
}