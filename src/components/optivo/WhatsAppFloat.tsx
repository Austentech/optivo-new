'use client';
import { MessageCircle } from "lucide-react";
import { waLink } from "@/data/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-glow animate-pulse-ring transition hover:scale-110"
    >
      <MessageCircle />
    </a>
  );
}