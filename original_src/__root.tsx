import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";

import appCss from "../styles.css?url";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import EngagementPopup from "@/components/EngagementPopup";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-brand">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Please try again.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Optivo Solutions — Performance-Driven Digital Marketing Agency" },
      { name: "description", content: "Premium digital marketing agency. SEO, Google Ads, Meta Ads, Social Media, Web Development, WhatsApp Automation, E-commerce & Branding." },
      { name: "author", content: "Optivo Solutions" },
      { name: "theme-color", content: "#1e40ff" },
      { property: "og:site_name", content: "Optivo Solutions" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Optivo Solutions — Performance-Driven Digital Marketing Agency" },
      { property: "og:description", content: "Strategic branding, performance marketing, SEO, content, PR and lead generation that scale brands faster." },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Optivo Solutions — Performance-Driven Digital Marketing Agency" },
      { name: "twitter:description", content: "Strategic branding, performance marketing, SEO, content, PR and lead generation that scale brands faster." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/202bdfb5-498a-49ae-b9c7-9d71e9471fd7/id-preview-1096941d--cb08013d-6f0a-4c80-8531-f228b181afd4.lovable.app-1779615761415.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/202bdfb5-498a-49ae-b9c7-9d71e9471fd7/id-preview-1096941d--cb08013d-6f0a-4c80-8531-f228b181afd4.lovable.app-1779615761415.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/favicon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      { rel: "shortcut icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Optivo Solutions",
          image: "/og.jpg",
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
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function ScrollToTop() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [pathname]);
  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");
  return (
    <QueryClientProvider client={queryClient}>
      <ScrollToTop />
      {isAdmin ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-20">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppFloat />
          <EngagementPopup />
        </div>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}
