import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, Youtube, MessageCircle } from "lucide-react";
import logo from "@/assets/optivo-logo.png";
import { SITE, waLink, callLink } from "@/data/site";
import { services } from "@/data/services";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border bg-foreground text-background">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-background p-3">
              <img src={logo} alt="Optivo Solutions" className="h-10 w-auto" />
            </div>
            <p className="text-sm text-background/70">
              A growth-obsessed digital agency helping ambitious brands scale online with strategy, creativity and measurable results.
            </p>
            <div className="flex gap-3 pt-2">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/optivosolutions", label: "Instagram" },
                { Icon: Facebook, href: "https://www.facebook.com/optivosolutions", label: "Facebook" },
                // YouTube & LinkedIn hidden for now — uncomment to re-enable
                // { Icon: Linkedin, href: "#", label: "LinkedIn" },
                // { Icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-background/20 transition hover:bg-gradient-brand hover:border-transparent"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/90">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {[
                ["/about", "About"],
                ["/services", "Services"],
                ["/success", "Success Stories"],
                ["/career", "Career"],
                ["/blog", "Blog"],
                ["/faqs", "FAQs"],
                ["/admin/login", "Admin Login"],
              ].map(([to, label]) => (
                <li key={to}>
                  {to === "/admin/login" ? (
                    <a href="/admin/login" className="transition hover:text-white">
                      {label}
                    </a>
                  ) : (
                    <Link to={to} className="transition hover:text-white">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/90">Services</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {services.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className="transition hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/90">Legal</h4>
            <ul className="space-y-2 text-sm text-background/70">
              {[
                ["/privacy-policy", "Privacy Policy"],
                ["/terms-conditions", "Terms & Conditions"],
                ["/disclaimer-cookie-policy", "Disclaimer & Cookie Policy"],
                ["/payments-refund-policy", "Payments & Refund Policy"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-background/90">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex gap-3"><MapPin size={16} className="mt-0.5 shrink-0" /><span>{SITE.address.line1}, {SITE.address.line2}, {SITE.address.line3}</span></li>
              <li className="flex gap-3"><Phone size={16} className="mt-0.5 shrink-0" /><a href={callLink()} className="hover:text-white">{SITE.phones[0]}</a></li>
              <li className="flex gap-3"><Mail size={16} className="mt-0.5 shrink-0" /><a href={`mailto:${SITE.email}`} className="hover:text-white">{SITE.email}</a></li>
            </ul>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-background/15 pt-6 text-xs text-background/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
            <Link to="/terms-conditions" className="hover:text-white">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          </div>
          <span>💡 Crafted with code and curiosity by <span className="font-semibold text-white">Sankhya Stack</span></span>
        </div>
      </div>
    </footer>
  );
}
