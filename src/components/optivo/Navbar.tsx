'use client';
import { Menu, X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { callLink, waLink, SITE } from "@/data/site";

export type PageKey = "home" | "about" | "services" | "success" | "blog" | "contact" | "career" | "faqs" | "service-detail";

interface NavigateState {
  page: PageKey;
  serviceSlug?: string;
}

const nav: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "success", label: "Success" },
  { key: "blog", label: "Blog" },
  { key: "contact", label: "Contact" },
];

interface NavbarProps {
  currentPage: PageKey;
  onNavigate: (state: NavigateState) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (key: PageKey) => {
    onNavigate({ page: key });
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (key: PageKey) => {
    if (key === "home") return currentPage === "home";
    if (key === "services") return currentPage === "services" || currentPage === "service-detail";
    return currentPage === key;
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-border/60 shadow-soft" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <button onClick={() => handleNav("home")} className="flex items-center gap-2">
          <img src="/optivo-logo-header.png" alt="Optivo Solutions" className="h-9 w-auto md:h-11" />
        </button>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <button
              key={n.key}
              onClick={() => handleNav(n.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive(n.key) ? "bg-secondary text-foreground" : "text-foreground/80 hover:bg-secondary hover:text-foreground"}`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href={callLink()} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary">
            <Phone size={16} /> {SITE.phones[0]}
          </a>
          <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]">
            Get Free Consultation
          </a>
        </div>

        <button onClick={() => setOpen((v) => !v)} className="rounded-lg p-2 lg:hidden" aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {nav.map((n) => (
                <button
                  key={n.key}
                  onClick={() => handleNav(n.key)}
                  className={`rounded-lg px-4 py-3 text-left text-base font-medium ${isActive(n.key) ? "bg-secondary text-primary" : "text-foreground/90 hover:bg-secondary"}`}
                >
                  {n.label}
                </button>
              ))}
              <a href={callLink()} className="mt-2 rounded-lg border px-4 py-3 text-center font-medium">Call {SITE.phones[0]}</a>
              <a href={waLink()} target="_blank" rel="noreferrer" className="rounded-lg bg-gradient-brand px-4 py-3 text-center font-semibold text-white">WhatsApp Us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}