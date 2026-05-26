import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Car,
  Phone,
  MessageCircle,
  IndianRupee,
  Sparkles,
  Users,
  Briefcase,
  Snowflake,
  Fuel,
  Gauge,
  Settings2,
  CheckCircle2,
  Quote,
  Plane,
  Building2,
  Mountain,
  Heart,
  Wallet,
  Headphones,
  Award,
  UserCheck,
  Navigation,
  Play,
} from "lucide-react";
import heroCar from "@/assets/hero-car.jpg";
import { CAR_CLASSES, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/cars";

const HERO_BG_IMAGES = [
  "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tuhi Car Rental — Pan-India Outstation Cabs & Airport Transfers" },
      {
        name: "description",
        content:
          "Book reliable outstation cabs, one-way drops, airport pickups and local hires across India. Transparent fares, verified chauffeurs, instant WhatsApp booking.",
      },
      { property: "og:title", content: "Tuhi Car Rental — Pan-India Cab Booking" },
      {
        property: "og:description",
        content: "Verified drivers, clean cars, transparent fares. Book on WhatsApp in seconds.",
      },
    ],
  }),
  component: HomePage,
});

const POPULAR_ROUTES = [
  { from: "Delhi", to: "Jaipur", km: 280, hrs: "5h", price: 3920, icon: Mountain },
  { from: "Mumbai", to: "Pune", km: 150, hrs: "3h", price: 2100, icon: Building2 },
  { from: "Bangalore", to: "Mysore", km: 145, hrs: "3h", price: 2030, icon: Mountain },
  { from: "Chennai", to: "Pondicherry", km: 165, hrs: "3.5h", price: 2310, icon: Heart },
  { from: "Hyderabad", to: "Vijayawada", km: 275, hrs: "4.5h", price: 3850, icon: Building2 },
  { from: "Kolkata", to: "Digha", km: 185, hrs: "4h", price: 2590, icon: Heart },
];

const TESTIMONIALS = [
  {
    name: "Ananya R.",
    trip: "Delhi → Manali",
    rating: 5,
    text: "Driver was on time at 4 AM. Car was spotless. The fare matched the Google Maps quote exactly — zero haggling.",
  },
  {
    name: "Rohit S.",
    trip: "Bangalore Airport",
    rating: 5,
    text: "Booked on WhatsApp in under a minute. Tracking link arrived right away. This is how cab booking should work.",
  },
  {
    name: "Meera K.",
    trip: "Mumbai → Pune",
    rating: 5,
    text: "Did 6 trips this month. Same chauffeur each time on request. Premium service at a fair price.",
  },
];

const SERVICES = [
  {
    icon: Plane,
    title: "Airport Transfers",
    desc: "Meet & greet, flight tracking, free 60 min wait.",
    tag: "From ₹699",
  },
  {
    icon: MapPin,
    title: "Outstation One-way",
    desc: "Pay only one side. No return charges.",
    tag: "From ₹12/km",
  },
  {
    icon: Building2,
    title: "Corporate Travel",
    desc: "GST invoices, monthly billing, dedicated SPOC.",
    tag: "Custom plans",
  },
  {
    icon: Heart,
    title: "Wedding & Events",
    desc: "Decorated cars, multi-day packages, group fleet.",
    tag: "On request",
  },
];

export const FEATURES = [
  {
    icon: ShieldCheck,
    t: "Verified chauffeurs",
    d: "Police-verified, trained drivers with 5+ years experience.",
  },
  {
    icon: Wallet,
    t: "Transparent fares",
    d: "Live Google Maps pricing. No hidden charges, no surge.",
  },
  { icon: Headphones, t: "24×7 support", d: "Reach a real human anytime — call or WhatsApp." },
  {
    icon: CheckCircle2,
    t: "Free cancellation",
    d: "Cancel up to 1 hour before pickup, full refund.",
  },
];

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative mx-3 mt-3 overflow-hidden rounded-[2.25rem] md:mx-6 min-h-[70vh] md:min-h-[60vh] lg:min-h-[55vh] flex items-center bg-gray-900">
        {/* Background Carousel Images */}
        {HERO_BG_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="absolute inset-0 bg-cover bg-center transition-all duration-[3000ms] ease-in-out"
            style={{
              backgroundImage: `url(${img})`,
              opacity: currentSlide === idx ? 1 : 0,
              transform: currentSlide === idx ? "scale(1.05)" : "scale(1)",
            }}
          />
        ))}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent" />

        <div className="relative grid gap-8 px-5 py-12 md:grid-cols-2 md:items-center md:gap-10 md:px-10 md:py-16 lg:py-20">
          <div className="order-2 text-white md:order-1 z-10">
            <span
              className="chip"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "oklch(0.86 0.12 85)",
                border: "1px solid oklch(0.86 0.12 85 / 0.3)",
              }}
            >
              <Sparkles size={14} /> Pan-India · 24×7
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Drive anywhere in India,
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-gold)" }}
              >
                booked in a tap.
              </span>
            </h1>
            <p className="mt-3 max-w-lg text-sm text-gray-300 sm:text-base md:text-lg leading-relaxed">
              Outstation, one-way, airport transfer or local hire — Tuhi puts a verified chauffeur
              and a clean car at your door, with fares calculated live on Google Maps.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/book" className="btn-gold">
                Book a ride <ArrowRight size={18} />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Tuhi, I'd like to book a cab.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-glass"
              >
                <MessageCircle size={18} /> WhatsApp now
              </a>
            </div>

            {/* Carousel Indicators - Hidden */}
            {/* <div className="mt-8 flex gap-2">
              {HERO_BG_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx
                      ? "w-8 bg-[oklch(0.86_0.12_85)]"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div> */}

            {/* Stats */}
            <div className="mt-4 grid max-w-md grid-cols-3 gap-2 sm:gap-3">
              {[
                { k: "50k+", v: "Happy riders" },
                { k: "1500+", v: "Cities" },
                { k: "4.9★", v: "Avg rating" },
              ].map((m) => (
                <div
                  key={m.v}
                  className="rounded-xl sm:rounded-2xl px-2 sm:px-3 py-2 sm:py-3 text-center bg-gray-900/40 backdrop-blur-md border border-white/10"
                >
                  <div className="text-lg sm:text-xl font-bold text-[oklch(0.86_0.12_85)] md:text-2xl">
                    {m.k}
                  </div>
                  <div className="mt-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-widest text-gray-400">
                    {m.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative order-1 md:order-2 z-10 hidden md:flex items-center justify-center">
            <div className="relative">
              <div
                className="absolute -inset-4 lg:-inset-6 rounded-[3rem]"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.86 0.12 85 / 0.35), transparent 60%)",
                }}
              />
              <img
                src={heroCar}
                alt="Premium black sedan for Tuhi Car Rental"
                width={1600}
                height={1000}
                className="relative max-w-xs lg:max-w-sm xl:max-w-lg animate-float drop-shadow-2xl"
              />

              {/* Floating glass badge */}
              <div className="absolute -bottom-2 left-2 lg:-bottom-4 lg:left-4 hidden glass rounded-xl lg:rounded-2xl px-3 py-2 lg:px-4 lg:py-3 lg:flex items-center gap-2 lg:gap-3">
                <div
                  className="grid h-8 w-8 lg:h-10 lg:w-10 place-items-center rounded-lg lg:rounded-xl"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <ShieldCheck size={14} className="lg:size-[18] text-[oklch(0.25_0.05_260)]" />
                </div>
                <div>
                  <div className="text-[10px] lg:text-xs text-muted-foreground">100% verified</div>
                  <div className="text-xs lg:text-sm font-bold">Police-checked drivers</div>
                </div>
              </div>
              <div className="absolute -top-2 right-2 lg:-top-4 lg:right-4 hidden glass rounded-xl lg:rounded-2xl px-3 py-2 lg:px-4 lg:py-3 lg:flex items-center gap-2 lg:gap-3">
                <div
                  className="grid h-8 w-8 lg:h-10 lg:w-10 place-items-center rounded-lg lg:rounded-xl"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <Star size={14} className="lg:size-[18] text-[oklch(0.25_0.05_260)]" />
                </div>
                <div>
                  <div className="text-[10px] lg:text-xs text-muted-foreground">Loved by</div>
                  <div className="text-xs lg:text-sm font-bold">50,000+ travellers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK FARE STRIP */}
      <section className="px-3 py-10 md:px-6">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-4">
          {[
            { icon: MapPin, label: "Pan-India coverage", value: "1500+ cities" },
            { icon: IndianRupee, label: "Starts at", value: "₹12 / km" },
            { icon: Clock, label: "Average pickup", value: "15 min" },
            { icon: Car, label: "Cars in fleet", value: "5 classes" },
          ].map((s) => (
            <div key={s.label} className="neu flex items-center gap-4 p-5">
              <div
                className="grid h-12 w-12 place-items-center rounded-2xl text-[oklch(0.5_0.12_75)]"
                style={{ background: "var(--gradient-gold)" }}
              >
                <s.icon size={20} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
                <div className="text-lg font-bold">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <span className="chip">What we offer</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              Every kind of ride, one phone number
            </h2>
            <p className="mt-3 text-muted-foreground">
              From a 30-minute airport drop to a 10-day Himalayan road trip — Tuhi has a plan for
              it.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="neu group p-6 transition-transform hover:-translate-y-1"
              >
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl text-[oklch(0.25_0.05_260)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <s.icon size={22} />
                </div>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                  <span className="text-sm font-semibold text-[oklch(0.5_0.12_75)]">{s.tag}</span>
                  <Link
                    to="/services"
                    className="text-xs font-semibold text-foreground/70 group-hover:text-foreground inline-flex items-center gap-1"
                  >
                    Learn <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET PREVIEW — RICH DETAIL CARDS */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="chip">Our Fleet</span>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">A car for every journey</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Each car is sanitised before pickup, GPS-tracked, and driven by a verified
                chauffeur.
              </p>
            </div>
            <Link
              to="/fleet"
              className="hidden text-sm font-semibold text-foreground/80 hover:text-foreground md:inline-flex items-center gap-1"
            >
              See all 5 classes <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAR_CLASSES.slice(0, 3).map((c) => (
              <div
                key={c.id}
                className="group neu relative overflow-hidden p-5 transition-transform hover:-translate-y-1"
              >
                {/* Top rating badge */}
                <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold shadow">
                  <Star
                    size={12}
                    className="fill-[oklch(0.78_0.14_80)] text-[oklch(0.78_0.14_80)]"
                  />
                  {c.rating}
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl neu-inset grid place-items-center">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    width={1024}
                    height={700}
                    className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="mt-5 flex items-baseline justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{c.name}</h3>
                    <p className="text-xs text-muted-foreground">{c.examples}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      from
                    </div>
                    <div className="text-lg font-bold">
                      ₹{c.perKm}
                      <span className="text-xs font-medium text-muted-foreground">/km</span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">{c.tagline}</p>

                {/* Spec grid */}
                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-2.5 py-2">
                    <Users size={14} className="text-[oklch(0.5_0.12_75)]" /> {c.seats} seats
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-2.5 py-2">
                    <Briefcase size={14} className="text-[oklch(0.5_0.12_75)]" /> {c.bags} bags
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-2.5 py-2">
                    <Settings2 size={14} className="text-[oklch(0.5_0.12_75)]" /> {c.transmission}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-2.5 py-2">
                    <Fuel size={14} className="text-[oklch(0.5_0.12_75)]" /> {c.fuel}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-2.5 py-2">
                    <Gauge size={14} className="text-[oklch(0.5_0.12_75)]" /> {c.mileage}
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-2.5 py-2">
                    <Snowflake size={14} className="text-[oklch(0.5_0.12_75)]" /> AC
                  </div>
                </div>

                {/* Features list */}
                <ul className="mt-4 space-y-1.5">
                  {c.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 size={13} className="text-[oklch(0.5_0.12_75)]" /> {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                  <span className="text-[11px] text-muted-foreground">{c.trips}</span>
                  <Link
                    to="/book"
                    search={{ car: c.id } as never}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.5_0.12_75)]"
                  >
                    Book {c.name} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/fleet" className="btn-gold">
              See all cars <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <span className="chip">Popular routes</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">India's most booked drives</h2>
            <p className="mt-3 text-muted-foreground">
              Fixed sedan one-way fares. Book any of these in 30 seconds on WhatsApp.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_ROUTES.map((r) => (
              <a
                key={r.from + r.to}
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Tuhi, I want to book ${r.from} to ${r.to}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex items-center gap-4 p-5 transition-transform hover:-translate-y-1"
              >
                <div
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-[oklch(0.25_0.05_260)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <r.icon size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-base font-bold">
                    <span className="truncate">{r.from}</span>
                    <ArrowRight size={14} className="text-muted-foreground" />
                    <span className="truncate">{r.to}</span>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {r.km} km · {r.hrs} drive
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Sedan
                  </div>
                  <div className="text-base font-bold">₹{r.price.toLocaleString("en-IN")}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHY TUHI */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <span className="chip">Why Tuhi</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              The little things that make the difference
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div key={f.t} className="neu-sm p-6">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--muted)] text-[oklch(0.5_0.12_75)]">
                  <f.icon size={20} />
                </div>
                <h3 className="mt-5 text-base font-bold">{f.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl glass p-8 md:p-12">
          <span className="chip">How it works</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">Three steps to the open road</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Plan your trip",
                d: "Choose pickup, drop, date and car class. We auto-calculate distance with Google Maps.",
              },
              {
                n: "02",
                t: "Confirm on WhatsApp",
                d: "Your quote opens in WhatsApp. We confirm the driver, vehicle and arrival time within minutes.",
              },
              {
                n: "03",
                t: "Ride with comfort",
                d: "Verified chauffeur, sanitised car, and a transparent bill at the end. No surprises.",
              },
            ].map((s) => (
              <div key={s.n} className="neu-sm p-6">
                <div className="text-4xl font-bold" style={{ color: "oklch(0.78 0.14 80)" }}>
                  {s.n}
                </div>
                <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <span className="chip">Loved by riders</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Real reviews from real trips</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="neu relative p-7">
                <Quote
                  className="absolute right-5 top-5 text-[oklch(0.86_0.12_85_/_0.4)]"
                  size={40}
                />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className="fill-[oklch(0.78_0.14_80)] text-[oklch(0.78_0.14_80)]"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/85">"{t.text}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-[oklch(0.25_0.05_260)]"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.trip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div
          className="mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] px-4 py-10 text-center md:px-16 md:py-20"
          style={{ background: "var(--gradient-hero)" }}
        >
          <h2 className="text-3xl font-bold text-white md:text-5xl">Ready when you are.</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            Speak to a real human. Call or WhatsApp{" "}
            <span className="font-semibold text-white">{PHONE_DISPLAY}</span> for instant booking.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/book" className="btn-gold">
              Book a cab
            </Link>
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="btn-ghost-glass">
              <Phone size={16} /> Call now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
