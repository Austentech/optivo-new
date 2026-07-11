import { createFileRoute } from "@tanstack/react-router";
import { Section, Heading } from "@/components/Section";
import { FAQ } from "@/components/FAQ";
import { CTASection } from "@/components/CTASection";
import { allFaqs, buildFaqJsonLd } from "@/data/faqs";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Optivo Solutions" },
      { name: "description", content: "Frequently asked questions about Optivo Solutions — SEO, performance marketing, branding, PR, lead generation, AEO/GEO and Google Business Profile optimization." },
      { property: "og:title", content: "FAQs — Optivo Solutions" },
      { property: "og:description", content: "Answers to common questions about our digital marketing, SEO and growth services." },
      { property: "og:url", content: "/faqs" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildFaqJsonLd(allFaqs)),
      },
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
  return (
    <>
      <Section>
        <Heading
          center
          eyebrow="FAQs"
          title="Everything you wanted to ask."
          subtitle="Still have questions? WhatsApp or call us anytime."
        />
        <FAQ items={allFaqs} />
      </Section>
      <CTASection title="Still curious? Let's chat." />
    </>
  );
}
