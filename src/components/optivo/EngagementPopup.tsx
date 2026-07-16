'use client';
import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import { waLink } from "@/data/site";

const messages = [
  { title: "Exclusive offer waiting for you", body: "Get 20% off your first month of marketing services — this week only." },
  { title: "Need more leads for your business?", body: "Our average client sees 3x lead growth in 90 days. Let's talk." },
  { title: "Your competitors are already growing online", body: "Don't fall behind. Claim a free growth audit today." },
  { title: "Get a FREE marketing consultation", body: "30 minutes with a senior strategist. Zero pressure." },
  { title: "Want more sales through ads?", body: "Profitable Meta & Google Ads — managed end-to-end." },
  { title: "Ranking on Google = free traffic", body: "Our SEO clients average a 312% organic lift." },
  { title: "Your website could convert 2x more", body: "Quick CRO audit — free for the next 10 businesses." },
  { title: "WhatsApp = 98% open rate", body: "Let's set up automation that turns chats into customers." },
  { title: "Looking for an ecommerce growth partner?", body: "Shopify & WooCommerce experts — Meta + Google + Email." },
  { title: "Let's make your brand unmissable", body: "Branding, content & creative that earns attention." },
];

export default function EngagementPopup() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const close = useCallback(() => {
    setOpen(false);
    try { sessionStorage.setItem("optivo:popup", "1"); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("optivo:popup")) return;
    const t = setTimeout(() => {
      setIdx(Math.floor(Math.random() * messages.length));
      setOpen(true);
    }, 12_000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, close]);

  const m = messages[idx];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm md:items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}
        >
          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-background p-6 shadow-glow md:p-8"
          >
            <button type="button" onClick={(e) => { e.stopPropagation(); close(); }} aria-label="Close popup" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/80 text-muted-foreground transition hover:bg-secondary hover:text-foreground">
              <X size={18} />
            </button>
            <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-brand opacity-20 blur-3xl" />
            <div className="relative">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Optivo Solutions</div>
              <h3 className="text-2xl font-bold text-gradient-brand">{m.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <a href={waLink(`Hi Optivo, ${m.title.toLowerCase()} — please share details.`)} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-glow" onClick={close}>
                  <MessageCircle size={16} /> Chat on WhatsApp
                </a>
                <button onClick={() => { close(); const el = document.getElementById('contact-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white">
                  Book Free Call <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}