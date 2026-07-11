'use client';

import { Section, Heading } from "@/components/optivo/Section";
import { FAQ } from "@/components/optivo/FAQ";
import { CTASection } from "@/components/optivo/CTASection";
import { allFaqs } from "@/data/faqs";

export default function FAQsPage() {
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