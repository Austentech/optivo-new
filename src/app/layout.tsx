import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Optivo Solutions — Performance-Driven Digital Marketing Agency",
  description: "Optivo Solutions is a results-focused digital marketing agency helping startups, local businesses, e-commerce brands and enterprises grow through SEO, performance marketing, branding, PR and lead generation.",
  keywords: ["digital marketing agency", "SEO services", "social media marketing", "performance marketing", "branding", "lead generation", "Optivo Solutions"],
  authors: [{ name: "Optivo Solutions" }],
  openGraph: {
    title: "Optivo Solutions — Performance-Driven Digital Marketing",
    description: "Strategic branding, performance marketing, SEO, content, PR and lead generation that scale brands faster.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased bg-background text-foreground`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}