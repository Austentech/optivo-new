'use client';
import { Section, Heading } from "./Section";

const CLIENTS = [
  { name: "PKY Group" },
  { name: "Jai Chandra Hospital" },
  { name: "Nalandda Wala Hotel & Banquet" },
  { name: "Envogue" },
  { name: "Navlok Hospital" },
  { name: "Divyadrishti Eye Centre" },
];

export function ClientLogos() {
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <Section className="bg-secondary/30">
      <Heading center eyebrow="Our Clients" title={<>Trusted by <span className="text-gradient-brand">growing businesses</span>.</>} subtitle="From hospitals and hospitality to retail and real estate — brands choose Optivo to scale." />
      <div
        className="group relative mt-4 overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-6 md:gap-10 group-hover:[animation-play-state:paused]">
          {loop.map((c, i) => (
            <div key={`${c.name}-${i}`} className="flex h-28 w-56 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-soft md:h-32 md:w-64">
              <div className="flex h-14 items-center text-lg font-bold text-gradient-brand">{c.name}</div>
              <div className="text-center text-[11px] font-semibold text-muted-foreground">{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}