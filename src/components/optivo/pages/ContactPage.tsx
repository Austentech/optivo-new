'use client';

import { useState } from "react";
import { Mail, MapPin, Phone, Clock, Navigation as NavIcon, MessageCircle, Send } from "lucide-react";
import { Section, Heading, Reveal } from "@/components/optivo/Section";
import { SITE, callLink, waLink, mapsDirections, mapsEmbed } from "@/data/site";
import { BookCall } from "@/components/optivo/BookCall";

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.name.length > 1 && /^[0-9+\-\s()]{8,15}$/.test(form.phone) && form.message.length > 4;
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || saving) return;
    setSaving(true);
    const msg = `New Contact Enquiry\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`;
    window.open(waLink(msg), "_blank");
    setSaving(false);
    setSent(true);
  };
  return (
    <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
      <h3 className="text-2xl font-bold md:text-3xl">Send us a message</h3>
      <p className="mt-1 text-sm text-muted-foreground">We&apos;ll get back to you within 30 minutes.</p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <input maxLength={60} required value={form.name} onChange={set("name")} placeholder="Your name *" className="ipt md:col-span-2" />
        <input maxLength={15} required value={form.phone} onChange={set("phone")} placeholder="Phone *" className="ipt" />
        <input maxLength={80} type="email" value={form.email} onChange={set("email")} placeholder="Email" className="ipt" />
        <textarea maxLength={500} required value={form.message} onChange={set("message")} placeholder="How can we help? *" rows={5} className="ipt md:col-span-2" />
      </div>
      <button disabled={!valid || saving} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 font-semibold text-white shadow-glow disabled:opacity-50 md:w-auto">
        <Send size={16} /> {saving ? "Sending…" : "Send via WhatsApp"}
      </button>
      {sent && <p className="mt-4 text-sm text-primary">Thanks! WhatsApp should have opened — we&apos;ll be in touch shortly.</p>}
      <style>{`.ipt{width:100%;border-radius:.75rem;border:1px solid var(--color-border);background:var(--color-background);padding:.7rem .9rem;font-size:.9rem;outline:none;transition:border-color .2s, box-shadow .2s}.ipt:focus{border-color:var(--color-primary);box-shadow:0 0 0 3px color-mix(in oklab,var(--color-primary) 18%,transparent)}`}</style>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-3xl">
            <span className="rounded-full border border-primary/30 bg-white/70 px-3 py-1 text-xs font-semibold text-primary">Contact</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Let&apos;s <span className="text-gradient-brand">talk growth</span>.</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Pick the channel that suits you. We typically respond within 30 minutes during business hours.
            </p>
          </div>
        </div>
      </section>

      <Section className="pt-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: MapPin, title: "Visit Us", lines: [SITE.address.line1, SITE.address.line2, SITE.address.line3], cta: { label: "View Route", href: mapsDirections } },
            { Icon: Phone, title: "Call Us", lines: SITE.phones, cta: { label: "Call Now", href: callLink() } },
            { Icon: Mail, title: "Email", lines: [SITE.email], cta: { label: "Send Email", href: `mailto:${SITE.email}` } },
            { Icon: Clock, title: "Hours", lines: [SITE.hours, "Sunday: Closed"], cta: { label: "WhatsApp", href: waLink() } },
          ].map(({ Icon, title, lines, cta }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand text-white"><Icon size={20} /></div>
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <ul className="mt-2 flex-1 space-y-1 text-sm text-muted-foreground">
                  {lines.map((l) => <li key={l}>{l}</li>)}
                </ul>
                <a
                  href={cta.href}
                  target={cta.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-semibold transition hover:bg-gradient-brand hover:text-white"
                >
                  {cta.label}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-8 lg:grid-cols-2">
          <ContactForm />
          <BookCall />
        </div>
      </Section>

      <Section className="pt-0">
        <Heading eyebrow="Our Office" title="Visit our office." />
        <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="text-lg font-bold">{SITE.name} HQ</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {SITE.address.line1}<br />{SITE.address.line2}<br />{SITE.address.line3}
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <a href={mapsDirections} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
                <NavIcon size={16} /> View Route & Direction
              </a>
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold hover:border-primary hover:text-primary">
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>
          </div>
          <div className="aspect-video overflow-hidden rounded-2xl border border-border bg-card shadow-soft md:aspect-auto">
            <iframe title="Optivo Solutions Map" src={mapsEmbed} loading="lazy" className="h-full min-h-[300px] w-full" />
          </div>
        </div>
      </Section>
    </>
  );
}