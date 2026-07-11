import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Coming Soon | Optivo Solutions" },
      { name: "description", content: "The Optivo Solutions blog is coming soon — growth playbooks, marketing tactics and case studies, straight from our team." },
      { property: "og:title", content: "Blog — Coming Soon | Optivo Solutions" },
      { property: "og:description", content: "Growth playbooks and marketing tactics from Optivo Solutions — launching soon." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

function Blog() {
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
            We're crafting deep, tactical growth playbooks for founders and marketers.
            Check back shortly — the Optivo blog launches soon.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow"
          >
            Talk to us in the meantime <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <CTASection title="Want growth advice for your business?" subtitle="Book a free strategy call — no slides, just clarity." />
    </>
  );
}
