import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Award,
  Smile,
  MapPin,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Star,
  Heart,
  Target,
  Globe,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Tuhi Car Rental — Trusted Pan-India Mobility" },
      {
        name: "description",
        content:
          "Tuhi Car Rental Service — founded in Mumbai, serving travellers across India with verified drivers, transparent fares and a fleet you can trust.",
      },
      { property: "og:title", content: "About Tuhi Car Rental" },
      { property: "og:description", content: "Trusted cab partner across 1,500+ Indian cities." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
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
              "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-[oklch(0.15_0.02_80/0.85)]" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[oklch(0.85_0.18_80)]" />

        <div className="relative z-10 text-center px-5 py-10 md:px-10 md:py-14 lg:py-16 w-full">
          <div className="max-w-3xl mx-auto text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.88_0.12_85)] to-[oklch(0.75_0.16_75)] px-4 py-2 backdrop-blur-md border border-[oklch(0.85_0.18_80)] text-sm font-semibold text-[oklch(0.15_0.02_80)]">
              ABOUT US
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              A simpler way to travel India
            </h1>
            <p className="mt-3 max-w-lg mx-auto text-sm text-white/90 sm:text-base md:text-lg leading-relaxed">
              Tuhi Car Rental Service was born in Mumbai with a simple goal — make hiring an
              outstation cab as effortless as ordering food.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VALUES */}
      <section className="section">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="chip">Our Mission</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Making travel effortless</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              We believe every journey should be comfortable, safe, and transparent. Our mission is
              to revolutionize road travel in India.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To provide reliable, affordable, and safe transportation across India with transparent pricing and exceptional customer service.",
              },
              {
                icon: Heart,
                title: "Our Values",
                desc: "Safety first, transparency always, customer obsession, and continuous innovation in everything we do.",
              },
              {
                icon: Globe,
                title: "Our Vision",
                desc: "To become India's most trusted car rental service, covering every city and route by 2030.",
              },
            ].map((item) => (
              <div key={item.title} className="neu p-6 transition-transform hover:-translate-y-1">
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl text-[oklch(0.25_0.05_260)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <item.icon size={24} />
                </div>
                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section pt-0">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 text-center">
            <span className="chip">Our Journey</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Milestones that define us</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                year: "2006",
                title: "Founded in Mumbai",
                desc: "Started with just 5 cars and a vision to simplify outstation travel.",
              },
              {
                year: "2010",
                title: "Expanded to 50 Cars",
                desc: "Grew our fleet to serve Mumbai-Pune, Mumbai-Nashik, and Mumbai-Goa routes.",
              },
              {
                year: "2014",
                title: "Pan-India Service",
                desc: "Launched services in Delhi, Bangalore, Hyderabad, and Chennai.",
              },
              {
                year: "2018",
                title: "50,000+ Trips Completed",
                desc: "Reached a major milestone with verified drivers and transparent pricing.",
              },
              {
                year: "2020",
                title: "Digital Transformation",
                desc: "Introduced WhatsApp booking, GPS tracking, and online fare calculation.",
              },
              {
                year: "2024",
                title: "500+ Cities Coverage",
                desc: "Now serving over 500 cities with 100+ vehicles and 24/7 support.",
              },
            ].map((milestone, idx) => (
              <div key={idx} className="flex gap-4 md:gap-6">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.5_0.12_75)] to-[oklch(0.6_0.14_80)] text-sm font-bold text-white">
                    {milestone.year}
                  </div>
                  {idx < 5 && (
                    <div className="mt-2 h-12 w-0.5 bg-gradient-to-b from-[oklch(0.5_0.12_75)] to-transparent" />
                  )}
                </div>
                <div className="flex-1 neu-sm p-5">
                  <h3 className="text-lg font-bold">{milestone.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM STATS */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl glass p-8 md:p-12">
          <div className="mb-10 text-center">
            <span className="chip">By the Numbers</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Our impact in numbers</h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, value: "10,000+", label: "Happy Customers" },
              { icon: MapPin, value: "500+", label: "Cities Served" },
              { icon: Clock, value: "24/7", label: "Support Available" },
              { icon: Award, value: "4.9★", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="mx-auto grid h-16 w-16 place-items-center rounded-2xl text-[oklch(0.25_0.05_260)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <stat.icon size={28} />
                </div>
                <div className="mt-4 text-3xl font-extrabold">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="chip">Why Choose Us</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">What sets us apart</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Verified & Trained Drivers",
                desc: "Every driver undergoes rigorous background checks, professional training, and customer service workshops. Your safety is our priority.",
                features: [
                  "Police verification",
                  "5+ years experience",
                  "Customer service training",
                  "Regular performance reviews",
                ],
              },
              {
                title: "Transparent Pricing",
                desc: "No hidden charges, no surge pricing. What you see is what you pay. We use Google Maps to calculate exact distances and fares.",
                features: [
                  "No hidden fees",
                  "Google Maps pricing",
                  "No surge pricing",
                  "Free cancellation",
                ],
              },
              {
                title: "24/7 Customer Support",
                desc: "Our support team is available round the clock via phone, WhatsApp, or email. We're always here when you need us.",
                features: [
                  "24/7 availability",
                  "WhatsApp support",
                  "Real-time tracking",
                  "Quick response time",
                ],
              },
              {
                title: "Well-Maintained Fleet",
                desc: "All our vehicles are regularly serviced, sanitized before every trip, and equipped with GPS tracking for your safety.",
                features: [
                  "Regular maintenance",
                  "Pre-trip sanitization",
                  "GPS tracking",
                  "Insurance covered",
                ],
              },
            ].map((item) => (
              <div key={item.title} className="neu p-6 transition-transform hover:-translate-y-1">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-muted-foreground">{item.desc}</p>
                <ul className="mt-4 space-y-2">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-[oklch(0.5_0.12_75)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="chip">Testimonials</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">What our customers say</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Rajesh Kumar",
                location: "Delhi",
                rating: 5,
                text: "Excellent service! Driver was punctual, car was clean, and the fare was exactly as quoted. Will definitely use again.",
                trip: "Delhi → Jaipur",
              },
              {
                name: "Priya Sharma",
                location: "Mumbai",
                rating: 5,
                text: "Booked via WhatsApp in minutes. The whole experience was seamless. Highly recommended for outstation trips!",
                trip: "Mumbai → Pune",
              },
              {
                name: "Arun Reddy",
                location: "Hyderabad",
                rating: 5,
                text: "Professional driver, comfortable car, and transparent billing. Best cab service I've used in India.",
                trip: "Hyderabad → Vijayawada",
              },
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className="neu p-6 transition-transform hover:-translate-y-1"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-[oklch(0.78_0.14_80)] text-[oklch(0.78_0.14_80)]"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                  "{testimonial.text}"
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-[oklch(0.25_0.05_260)]"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.trip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-0">
        <div className="overflow-hidden bg-gradient-to-br from-[oklch(0.15_0.05_260)] to-[oklch(0.18_0.06_265)] px-6 py-12 text-center md:px-16 md:py-20">
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Ready to travel with us?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Book your next ride today and experience the Tuhi difference. Safe, reliable, and
              affordable.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/book"
                className="rounded-full bg-gradient-to-r from-[oklch(0.88_0.12_85)] to-[oklch(0.75_0.16_75)] px-8 py-4 text-lg font-bold text-[oklch(0.18_0.02_260)] shadow-[0_16px_48px_-12px_oklch(0.78_0.14_80/0.4)] transition-all hover:shadow-[0_20px_56px_-10px_oklch(0.78_0.14_80/0.6)] active:scale-95"
              >
                Book a Cab <ArrowRight size={16} className="inline ml-1" />
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
              >
                Contact Us
              </Link>
            </div>
          </div>
      </section>
    </div>
  );
}
