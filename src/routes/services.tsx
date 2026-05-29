import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Plane,
  Map,
  Building2,
  Mountain,
  Briefcase,
  Heart,
  ArrowRight,
  Clock,
  Users,
  Star,
  CheckCircle2,
  MessageCircle,
  Phone,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Outstation, Airport, Local & Corporate | Tuhi" },
      {
        name: "description",
        content:
          "Outstation cabs, airport transfers, local 8hr/80km hires, corporate travel, weddings and tour packages across India.",
      },
      { property: "og:title", content: "Tuhi Car Rental Services" },
      {
        property: "og:description",
        content: "Outstation, airport, local, corporate, weddings and tour packages.",
      },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  {
    icon: Map,
    title: "Outstation One-Way & Round Trip",
    desc: "Mumbai–Pune, Delhi–Jaipur, Bengaluru–Coorg and 1,500+ routes across India.",
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    desc: "On-time pickup and drop at every major Indian airport, 24×7 with flight tracking.",
  },
  {
    icon: Building2,
    title: "Local 8hr / 80km Hire",
    desc: "Half-day or full-day city packages for shopping, meetings or sightseeing.",
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    desc: "Monthly billing, dedicated account manager and chauffeurs in business attire.",
  },
  {
    icon: Heart,
    title: "Weddings & Events",
    desc: "Decorated cars, fleet bookings and group transfers for your big day.",
  },
  {
    icon: Mountain,
    title: "Tour Packages",
    desc: "Curated multi-day packages — Rajasthan, Kerala, Himachal, Northeast and more.",
  },
];

function ServicesPage() {
  return (
    <div>
      {/* BANNER */}
      <section
        style={{ marginTop: "-6.5rem" }}
        className="relative overflow-hidden min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh] flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-[oklch(0.15_0.02_80/0.85)]" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[oklch(0.85_0.18_80)]" />

        <div className="relative z-10 text-center px-5 py-10 md:px-10 md:py-14 lg:py-16 w-full">
          <div className="max-w-3xl mx-auto text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.88_0.12_85)] to-[oklch(0.75_0.16_75)] px-4 py-2 backdrop-blur-md border border-[oklch(0.85_0.18_80)] text-sm font-semibold text-[oklch(0.15_0.02_80)]">
              SERVICES
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Everything that moves you
            </h1>
            <p className="mt-3 max-w-lg mx-auto text-sm text-white/90 sm:text-base md:text-lg leading-relaxed">
              From a quick airport drop to a 10-day Rajasthan tour — one number, one trusted
              operator.
            </p>
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES */}
      <div className="section">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="chip">What We Offer</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Comprehensive travel solutions</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              From quick airport transfers to multi-day tour packages, we have everything you need
              for a comfortable journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, idx) => (
              <div
                key={s.title}
                className="group glass overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl text-[oklch(0.25_0.05_260)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <s.icon size={24} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 space-y-2">
                  {idx === 0 && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>One-way & round trip options</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>1,500+ routes across India</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Transparent pricing, no hidden fees</span>
                      </li>
                    </>
                  )}
                  {idx === 1 && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>24/7 availability at all airports</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Real-time flight tracking</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Free 60-minute wait time</span>
                      </li>
                    </>
                  )}
                  {idx === 2 && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>8hrs/80km or 12hrs/120km packages</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Perfect for city tours & meetings</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Flexible pickup locations</span>
                      </li>
                    </>
                  )}
                  {idx === 3 && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Monthly billing & GST invoices</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Dedicated account manager</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Professional chauffeurs in uniform</span>
                      </li>
                    </>
                  )}
                  {idx === 4 && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Decorated luxury cars available</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Multi-day package options</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Group fleet coordination</span>
                      </li>
                    </>
                  )}
                  {idx === 5 && (
                    <>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Curated multi-day itineraries</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Rajasthan, Kerala, Himachal & more</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={14} className="text-[oklch(0.5_0.12_75)]" />
                        <span>Experienced local drivers</span>
                      </li>
                    </>
                  )}
                </ul>
                <Link
                  to="/book"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[oklch(0.5_0.15_75)] to-[oklch(0.6_0.14_80)] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-[oklch(0.6_0.14_80)] hover:to-[oklch(0.7_0.12_85)] active:scale-95"
                >
                  Book Now <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl glass p-8 md:p-12">
          <div className="mb-10 text-center">
            <span className="chip">How It Works</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Book in 3 easy steps</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Choose Your Service",
                desc: "Select from outstation, airport, local, corporate, wedding, or tour packages based on your travel needs.",
                icon: Map,
              },
              {
                step: "02",
                title: "Get Instant Quote",
                desc: "Enter your trip details and receive a transparent fare calculated using Google Maps distance. No hidden charges.",
                icon: Clock,
              },
              {
                step: "03",
                title: "Confirm & Ride",
                desc: "Confirm your booking via WhatsApp. Our verified driver arrives on time with a sanitized vehicle.",
                icon: Phone,
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.5_0.15_75)] to-[oklch(0.6_0.14_80)] text-white">
                  <item.icon size={32} />
                </div>
                <div
                  className="mb-2 text-4xl font-extrabold"
                  style={{ color: "oklch(0.78 0.14 80)" }}
                >
                  {item.step}
                </div>
                <h3 className="mb-2 text-xl font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR PACKAGES */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="chip">Popular Packages</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Most booked routes</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Discover our most popular outstation routes and tour packages loved by thousands of
              travelers.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                route: "Delhi → Jaipur",
                distance: "280 km",
                duration: "5 hours",
                price: "From ₹2,500",
              },
              {
                route: "Mumbai → Pune",
                distance: "150 km",
                duration: "3 hours",
                price: "From ₹1,800",
              },
              {
                route: "Bangalore → Mysore",
                distance: "145 km",
                duration: "3 hours",
                price: "From ₹1,700",
              },
              {
                route: "Chennai → Pondicherry",
                distance: "165 km",
                duration: "3.5 hours",
                price: "From ₹1,900",
              },
              {
                route: "Hyderabad → Vijayawada",
                distance: "275 km",
                duration: "4.5 hours",
                price: "From ₹2,400",
              },
              {
                route: "Kolkata → Digha",
                distance: "185 km",
                duration: "4 hours",
                price: "From ₹2,100",
              },
            ].map((pkg) => (
              <Link
                key={pkg.route}
                to="/book"
                search={{ from: pkg.route.split(" → ")[0], to: pkg.route.split(" → ")[1] } as never}
                className="glass group flex items-center gap-4 p-5 transition-transform hover:-translate-y-1"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{pkg.route}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {pkg.distance} · {pkg.duration}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[oklch(0.5_0.12_75)]">{pkg.price}</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[oklch(0.5_0.12_75)]">
                    Book <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE OUR SERVICES */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="chip">Why Choose Us</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">The Tuhi advantage</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Star,
                title: "4.9★ Rating",
                desc: "Trusted by 10,000+ happy customers across India",
              },
              {
                icon: Users,
                title: "Verified Drivers",
                desc: "Police-verified professionals with 5+ years experience",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                desc: "Round-the-clock assistance via phone, WhatsApp & email",
              },
              {
                icon: MessageCircle,
                title: "Easy Booking",
                desc: "Book in under 1 minute via WhatsApp or our online form",
              },
            ].map((feature) => (
              <div key={feature.title} className="glass p-6 text-center">
                <div
                  className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-[oklch(0.25_0.05_260)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <feature.icon size={24} />
                </div>
                <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
