'use client';

import { ArrowRight, Sparkles } from "lucide-react";
import { CTASection } from "@/components/optivo/CTASection";
import type { PageKey } from "@/components/optivo/Navbar";

interface Props {
  onNavigate: (state: { page: PageKey; serviceSlug?: string }) => void;
}

export default function BlogPage({ onNavigate }: Props) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center md:py-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles size={14} /> Blog
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            Something great is <span className="text-gradient-brand">coming soon</span>.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            We&apos;re crafting deep, tactical growth playbooks for founders and marketers.
            Check back shortly — the Optivo blog launches soon.
          </p>
          <button
            onClick={() => onNavigate({ page: "contact" })}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow"
          >
            Talk to us in the meantime <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <CTASection title="Want growth advice for your business?" subtitle="Book a free strategy call — no slides, just clarity." />
    </>
  );
}