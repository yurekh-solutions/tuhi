import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, Map, Building2, Mountain, Briefcase, Heart, ArrowRight } from "lucide-react";

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
        style={{ marginTop: "-30px" }}
        className="relative mx-3 overflow-hidden rounded-[2.25rem] md:mx-6 min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh] flex items-center bg-gray-900"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent" />

        <div className="relative grid gap-8 px-5 py-10 md:px-10 md:py-14 lg:py-16 w-full">
          <div className="max-w-3xl text-white">
            <span className="chip bg-white/20 backdrop-blur-sm border-white/30 text-white">
              SERVICES
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Everything that moves you
            </h1>
            <p className="mt-3 max-w-lg text-sm text-gray-300 sm:text-base md:text-lg leading-relaxed">
              From a quick airport drop to a 10-day Rajasthan tour — one number, one trusted
              operator.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="section">
        <div className="mx-auto max-w-7xl">
          <div className=" grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <div key={s.title} className="neu p-5 md:p-7">
                <div
                  className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-2xl text-[oklch(0.5_0.12_75)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <s.icon size={18} className="md:size-[22]" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/book" className="btn-gold">
              Start a booking <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
