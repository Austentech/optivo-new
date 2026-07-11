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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Optivo Solutions — Performance-Driven Digital Marketing",
    description: "Strategic branding, performance marketing, SEO, content, PR and lead generation that scale brands faster.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Optivo Solutions — Performance-Driven Digital Marketing Agency",
    description: "Strategic branding, performance marketing, SEO, content, PR and lead generation that scale brands faster.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" />
        <meta name="theme-color" content="#1e40ff" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Optivo Solutions",
              url: "/",
              telephone: "+917481837663",
              email: "info@optivo.in",
              address: {
                "@type": "PostalAddress",
                streetAddress: "House No 14, Ramnagri Ashiana Road, Sector 4, Ashiana Nagar Phase 1, Khajpura",
                postalCode: "800025",
                addressCountry: "IN",
              },
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "187" },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-background text-foreground`} style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}