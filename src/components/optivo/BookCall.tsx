import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle2, ArrowRight, User, Phone } from "lucide-react";
import { services } from "@/data/services";
import { waLink } from "@/data/site";

const slots = ["10:00 AM", "11:30 AM", "01:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

export function BookCall() {
  const [step, setStep] = useState<"form" | "preview" | "done">("form");
  const today = new Date().toISOString().split("T")[0];
  const [data, setData] = useState({
    service: services[0].title,
    date: today,
    time: slots[0],
    name: "",
    phone: "",
  });
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const valid = data.name.trim().length >= 2 && /^[0-9+\-\s()]{8,15}$/.test(data.phone);

  const [saving, setSaving] = useState(false);
  const submit = async () => {
    if (saving) return;
    setSaving(true);
    const msg = [
      "New Booking Request — Optivo Solutions",
      "",
      `Name: ${data.name}`,
      `Phone: ${data.phone}`,
      `Service: ${data.service}`,
      `Date: ${data.date}`,
      `Time: ${data.time}`,
    ].join("\n");
    window.open(waLink(msg), "_blank");
    setSaving(false);
    setStep("done");
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
      <AnimatePresence mode="wait">
        {step === "form" && (
          <motion.div key="form" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <h3 className="text-2xl font-bold md:text-3xl">Schedule a Call</h3>
            <p className="mt-1 text-sm text-muted-foreground">Pick a service, time and we&apos;ll be ready.</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Field label="Service" icon={<Calendar size={16} />}>
                <select value={data.service} onChange={set("service")} className="optivo-input">
                  {services.map((s) => <option key={s.slug}>{s.title}</option>)}
                </select>
              </Field>
              <Field label="Date" icon={<Calendar size={16} />}>
                <input type="date" min={today} value={data.date} onChange={set("date")} className="optivo-input" />
              </Field>
              <Field label="Time Slot" icon={<Clock size={16} />}>
                <select value={data.time} onChange={set("time")} className="optivo-input">
                  {slots.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Your Name" icon={<User size={16} />}>
                <input type="text" maxLength={60} value={data.name} onChange={set("name")} placeholder="e.g. Rohan Sharma" className="optivo-input" />
              </Field>
              <Field label="Mobile Number" icon={<Phone size={16} />}>
                <input type="tel" maxLength={15} value={data.phone} onChange={set("phone")} placeholder="+91 ..." className="optivo-input" />
              </Field>
            </div>

            <button
              disabled={!valid}
              onClick={() => setStep("preview")}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 font-semibold text-white shadow-glow transition disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
            >
              Preview Booking <ArrowRight size={16} />
            </button>
          </motion.div>
        )}

        {step === "preview" && (
          <motion.div key="preview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <h3 className="text-2xl font-bold md:text-3xl">Confirm your booking</h3>
            <p className="mt-1 text-sm text-muted-foreground">We&apos;ll send the details to our team on WhatsApp.</p>

            <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-background">
              {([
                ["Service", data.service],
                ["Date", data.date],
                ["Time", data.time],
                ["Name", data.name],
                ["Phone", data.phone],
              ] as const).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 px-5 py-3 text-sm">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium text-right">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setStep("form")} className="rounded-full border border-border px-6 py-3 text-sm font-semibold">
                Back
              </button>
              <button onClick={submit} disabled={saving} className="flex-1 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-60">
                {saving ? "Saving…" : "Confirm & Send via WhatsApp"}
              </button>
            </div>
          </motion.div>
        )}

        {step === "done" && (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 18 }}
            className="py-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", damping: 12 }}
              className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-brand text-white shadow-glow"
            >
              <CheckCircle2 size={40} />
            </motion.div>
            <h3 className="mt-6 text-3xl font-bold text-gradient-brand">Booking received!</h3>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Thanks {data.name.split(" ")[0]} — we&apos;ve opened WhatsApp with your details. Our team will confirm your slot within minutes.
            </p>
            <button
              onClick={() => { setStep("form"); setData({ ...data, name: "", phone: "" }); }}
              className="mt-6 inline-flex rounded-full border border-border px-5 py-2 text-sm font-semibold"
            >
              Book another call
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </span>
      {children}
    </label>
  );
}