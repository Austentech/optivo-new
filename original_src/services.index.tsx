import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { services } from "@/data/services";
import { Section, Heading, Reveal } from "@/components/Section";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Optivo Solutions | Digital Marketing, SEO, Ads, Branding & More" },
      { name: "description", content: "Explore Optivo Solutions' full-funnel digital marketing services — Social Media, SEO & Local SEO, Web Development, Meta & Google Ads, Branding, Lead Generation, Google Business Profile, AEO & GEO, E-Commerce and PR & Influencer Marketing." },
      { property: "og:title", content: "Services — Optivo Solutions" },
      { property: "og:description", content: "Pick a single service or let us run the entire growth engine for you." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesIndex,
});

const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

function ServicesIndex() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return services.filter((s) => {
      const matchesCat = cat === "All" || s.category === cat;
      const matchesQ =
        !term ||
        s.title.toLowerCase().includes(term) ||
        s.short.toLowerCase().includes(term) ||
        s.overview.toLowerCase().includes(term) ||
        s.included.some((i) => i.toLowerCase().includes(term));
      return matchesCat && matchesQ;
    });
  }, [q, cat]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <span className="rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-xs font-semibold text-primary">Services</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">
              Full-funnel growth — <span className="text-gradient-brand">end to end</span>.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Pick a single service or let us run the entire growth engine for you.
            </p>
          </div>
        </div>
      </section>

      <Section>
        {/* SEARCH + FILTER */}
        <div className="mx-auto mb-10 max-w-5xl rounded-2xl border border-border bg-card p-4 shadow-soft md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <SearchIcon size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services (e.g. SEO, ads, branding)..."
                className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary"
                aria-label="Search services"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    cat === c
                      ? "bg-gradient-brand text-white shadow-glow"
                      : "border border-border bg-background text-foreground/80 hover:border-primary hover:text-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-muted-foreground">No services match your search.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.slug} delay={i * 0.04}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group relative block h-full overflow-hidden rounded-3xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-glow md:p-9"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand text-white shadow-glow">
                        <Icon size={24} />
                      </div>
                      <span className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition group-hover:border-primary group-hover:text-primary">
                        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                    <span className="mt-5 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-secondary-foreground">
                      {s.category}
                    </span>
                    <h2 className="mt-3 text-2xl font-bold">{s.title}</h2>
                    <p className="mt-2 text-muted-foreground">{s.short}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {s.included.slice(0, 4).map((it) => (
                        <span key={it} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                          {it}
                        </span>
                      ))}
                    </div>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </Section>

      <CTASection />
    </>
  );
}
