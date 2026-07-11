import { Section, Heading } from "@/components/Section";
import pky from "@/assets/clients/IMG_0047.PNG.asset.json";
import jaiChandra from "@/assets/clients/IMG_1078.JPG.jpeg.asset.json";
import nalandda from "@/assets/clients/IMG_7279.PNG.asset.json";
import envogue from "@/assets/clients/IMG_7922.PNG.asset.json";
import navlok from "@/assets/clients/IMG-20260606-WA0000.jpg.jpeg.asset.json";
import divyadrishti from "@/assets/clients/IMG-20260606-WA0002.jpg.jpeg.asset.json";

const CLIENTS = [
  { name: "PKY Group", url: pky.url },
  { name: "Jai Chandra Hospital", url: jaiChandra.url },
  { name: "Nalandda Wala Hotel & Banquet", url: nalandda.url },
  { name: "Envogue", url: envogue.url },
  { name: "Navlok Hospital", url: navlok.url },
  { name: "Divyadrishti Eye Centre", url: divyadrishti.url },
];

export function ClientLogos() {
  // Duplicate the list so the marquee loop is seamless
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <Section className="bg-secondary/30">
      <Heading
        center
        eyebrow="Our Clients"
        title={<>Trusted by <span className="text-gradient-brand">growing businesses</span>.</>}
        subtitle="From hospitals and hospitality to retail and real estate — brands choose Optivo to scale."
      />

      <div
        className="group relative mt-4 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-6 md:gap-10 group-hover:[animation-play-state:paused]">
          {loop.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="flex h-28 w-56 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-soft md:h-32 md:w-64"
            >
              <img
                src={c.url}
                alt={`${c.name} logo`}
                loading="lazy"
                className="max-h-14 w-auto object-contain"
              />
              <div className="text-center text-[11px] font-semibold text-muted-foreground">
                {c.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes optivo-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: optivo-marquee 32s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .animate-marquee { animation: none; } }
      `}</style>
    </Section>
  );
}
