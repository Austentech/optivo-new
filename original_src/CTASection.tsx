import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { callLink, waLink } from "@/data/site";
import { Reveal } from "./Section";

export function CTASection({ title, subtitle }: { title?: string; subtitle?: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8 md:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 text-center text-white md:p-16">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold md:text-5xl">{title ?? "Let's grow your business — together."}</h2>
            <p className="mt-4 text-white/85 md:text-lg">
              {subtitle ?? "Get a free 30-minute strategy call with our team. No fluff. Just a clear growth plan."}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-foreground shadow-lg transition hover:scale-[1.02]"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
              <a
                href={callLink()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Phone size={16} /> Call Now
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Free Consultation <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
