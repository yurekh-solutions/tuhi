import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md p-10 text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-gold">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="glass max-w-md p-10 text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-gold"
          >
            Try again
          </button>
          <a
            href="/"
            className="btn-ghost-glass !text-foreground"
            style={{ background: "oklch(1 0 0 / 0.6)", borderColor: "var(--border)" }}
          >
            Home
          </a>
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
      { title: "Tuhi Car Rental Service — Pan-India Cab & Outstation Booking" },
      {
        name: "description",
        content:
          "Book outstation cabs, airport transfers and local hires across India with Tuhi Car Rental. Verified drivers, transparent fares, WhatsApp booking.",
      },
      { name: "author", content: "Tuhi Car Rental" },
      { name: "robots", content: "index, follow" },
      {
        name: "keywords",
        content:
          "car rental, outstation cab, airport transfer, pan-india, verified drivers, transparent fares, whatsapp booking, Mumbai, Delhi, Bangalore",
      },
      {
        property: "og:title",
        content: "Tuhi Car Rental Service — Pan-India Cab & Outstation Booking",
      },
      {
        property: "og:description",
        content:
          "Book outstation cabs, airport transfers and local hires across India. Verified drivers, transparent fares, WhatsApp booking.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://tuhicarrental.in" },
      { property: "og:image", content: "https://tuhicarrental.in/og-image.jpg" },
      { property: "og:site_name", content: "Tuhi Car Rental" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tuhi Car Rental Service" },
      {
        name: "twitter:description",
        content: "Book outstation cabs, airport transfers and local hires across India.",
      },
      { name: "theme-color", content: "#1a1a4e" },
    ],
    links: [
      { rel: "canonical", href: "https://tuhicarrental.in" },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Tuhi Car Rental Service",
    description:
      "Pan-India car rental service with verified drivers for outstation cabs, airport transfers, and local hires.",
    url: "https://tuhicarrental.in",
    telephone: "+91-91362-42706",
    email: "bookings@tuhicarrental.in",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bandra",
      addressRegion: "Mumbai",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.0541",
      longitude: "72.8394",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "₹₹",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Car Rental Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Outstation Cabs" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Airport Transfers" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Local Hires" } },
      ],
    },
  };

  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        {!isAdminRoute && <SiteHeader />}
        <main className={!isAdminRoute ? "flex-1 pt-20 md:pt-24" : "flex-1"}>
          <Outlet />
        </main>
        {!isAdminRoute && <SiteFooter />}
        {!isAdminRoute && <WhatsAppFAB />}
      </div>
    </QueryClientProvider>
  );
}
