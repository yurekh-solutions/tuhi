import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Users,
  Briefcase,
  Snowflake,
  ArrowRight,
  Search,
  SlidersHorizontal,
  Star,
  ShieldCheck,
  Clock,
  Award,
  Phone,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { fetchCars } from "@/routes/api-server/cars";
import type { Car } from "@/lib/data.server";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Our Fleet — 100+ Cars | Tuhi Car Rental" },
      {
        name: "description",
        content:
          "Explore Tuhi's fleet: 100+ cars including Swift, Innova, Honda City, Mercedes and more. Pan-India service with transparent pricing.",
      },
    ],
  }),
  component: FleetPage,
});

const CATEGORIES = [
  { id: "all", label: "All Cars" },
  { id: "hatchback", label: "Hatchback" },
  { id: "sedan", label: "Sedan" },
  { id: "suv", label: "SUV/MUV" },
  { id: "luxury", label: "Luxury" },
  { id: "tempo", label: "Tempo" },
];

function FleetPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ["cars", selectedCategory],
    queryFn: () => fetchCars({ data: { category: selectedCategory } }),
  });

  const filteredCars = useMemo(() => {
    const filtered = cars.filter((car: Car) =>
      car.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (sortBy === "name") {
      filtered.sort((a: Car, b: Car) => a.name.localeCompare(b.name));
    } else if (sortBy === "price-asc") {
      filtered.sort((a: Car, b: Car) => a.ratePerKm - b.ratePerKm);
    } else if (sortBy === "price-desc") {
      filtered.sort((a: Car, b: Car) => b.ratePerKm - a.ratePerKm);
    }

    return filtered;
  }, [cars, searchQuery, sortBy]);

  if (isLoading) {
    return (
      <div className="section">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="neu animate-pulse p-5">
                <div className="aspect-[16/10] rounded-2xl bg-[var(--muted)]" />
                <div className="mt-4 h-4 w-3/4 rounded bg-[var(--muted)]" />
                <div className="mt-2 h-3 w-1/2 rounded bg-[var(--muted)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* BANNER */}
      <section
        style={{ marginTop: "-30px" }}
        className="relative mx-3 overflow-hidden rounded-[2.25rem] md:mx-6 min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh] flex items-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop)",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent" />

        <div className="relative grid gap-8 px-5 py-10 md:px-10 md:py-14 lg:py-16 w-full">
          <div className="max-w-3xl text-white">
            <span className="chip bg-white/20 backdrop-blur-sm border-white/30 text-white">
              THE FLEET
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Pick your perfect ride
            </h1>
            <p className="mt-3 max-w-lg text-sm text-gray-300 sm:text-base md:text-lg leading-relaxed">
              {cars.length} cars available. Every car is sanitised and driven by a verified
              chauffeur.
            </p>
          </div>
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <div className="section">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Our Premium Fleet</h2>
            <p className="mt-3 text-muted-foreground">
              Choose from our wide range of well-maintained vehicles
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600",
                title: "Luxury Sedans",
                desc: "Premium comfort for business travel",
              },
              {
                image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600",
                title: "SUVs & MUVs",
                desc: "Perfect for family trips",
              },
              {
                image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600",
                title: "Hatchbacks",
                desc: "Economical city rides",
              },
            ].map((item, idx) => (
              <div key={idx} className="group overflow-hidden rounded-2xl shadow-lg">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="bg-white p-5">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WHY CHOOSE OUR FLEET */}
      <div className="bg-gradient-to-br from-[oklch(0.97_0.01_250)] to-[oklch(0.95_0.015_250)] py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 text-center">
            <span className="chip">Why Choose Our Fleet</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">
              Quality vehicles, professional service
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Every vehicle in our fleet is carefully maintained, sanitized before each trip, and
              driven by verified professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Verified Drivers",
                desc: "Background-checked professionals with 5+ years experience",
              },
              {
                icon: CheckCircle2,
                title: "Sanitized Cars",
                desc: "Deep cleaned and sanitized before every trip",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                desc: "Round-the-clock assistance during your journey",
              },
              {
                icon: Award,
                title: "Best Prices",
                desc: "Competitive, transparent pricing with no hidden fees",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="neu p-6 text-center transition-transform hover:-translate-y-1"
              >
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
      </div>

      {/* CONTENT */}
      <div className="section">
        <div className="mx-auto max-w-7xl">
          <div className=" space-y-4">
            {/* Category Tabs */}
            <div className="neu-inset flex flex-wrap gap-2 p-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === cat.id
                      ? "bg-[var(--surface)] text-foreground shadow-[var(--shadow-neu-sm)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search cars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="neu-input pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="neu-input w-auto px-3 py-2 text-sm"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Cars Grid */}
          {filteredCars.length === 0 ? (
            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground">No cars found matching your criteria.</p>
            </div>
          ) : (
            <div className="mt-6 md:mt-8 grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {filteredCars.map((car: Car) => (
                <article
                  key={car.id}
                  className="group neu relative overflow-hidden p-4 md:p-5 transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl neu-inset grid place-items-center">
                    <img
                      src={car.image}
                      alt={car.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-4 transition-transform group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{car.name}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{car.category}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          from
                        </div>
                        <div className="text-lg font-bold">
                          ₹{car.ratePerKm}
                          <span className="text-xs font-medium text-muted-foreground">/km</span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">{car.description}</p>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-2.5 py-2">
                        <Users size={14} className="text-[oklch(0.5_0.12_75)]" /> {car.seats} seats
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-2.5 py-2">
                        <Briefcase size={14} className="text-[oklch(0.5_0.12_75)]" /> {car.bags}{" "}
                        bags
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-2.5 py-2">
                        <Snowflake size={14} className="text-[oklch(0.5_0.12_75)]" />{" "}
                        {car.ac ? "AC" : "Non-AC"}
                      </div>
                      <div className="flex items-center gap-2 rounded-lg bg-[var(--muted)] px-2.5 py-2">
                        <span className="text-[oklch(0.5_0.12_75)]">{car.transmission}</span>
                      </div>
                    </div>

                    <Link
                      to="/book"
                      search={{ car: car.id } as never}
                      className="btn-gold mt-5 w-full justify-center text-sm"
                    >
                      Book This Car <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <span className="chip">Customer Reviews</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">What our customers say</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Real reviews from real travelers who experienced our premium fleet and service.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Vikram Patel",
                rating: 5,
                text: "Innova was spotless and comfortable. Driver was professional and knew the routes well. Great experience for our family trip to Goa!",
                trip: "Mumbai → Goa",
                car: "Toyota Innova",
              },
              {
                name: "Sneha Iyer",
                rating: 5,
                text: "Booked a Mercedes for my wedding. The car was beautifully maintained and the driver was punctual. Made our special day even more memorable.",
                trip: "Wedding Event",
                car: "Mercedes E-Class",
              },
              {
                name: "Amit Desai",
                rating: 5,
                text: "Regular corporate traveler. Tuhi's sedan service is consistently excellent. Professional drivers, clean cars, and transparent billing.",
                trip: "Corporate Travel",
                car: "Honda City",
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
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-semibold text-[oklch(0.5_0.12_75)]">{testimonial.car}</span>
                  <span>•</span>
                  <span>{testimonial.trip}</span>
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-border/60 pt-4">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-[oklch(0.25_0.05_260)]"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    {testimonial.name[0]}
                  </div>
                  <div className="text-sm font-bold">{testimonial.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section pt-0">
        <div className="mx-auto max-w-7xl">
          <div
            className="overflow-hidden rounded-[2.25rem] px-6 py-12 text-center md:px-16 md:py-20"
            style={{ background: "var(--gradient-hero)" }}
          >
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Ready to choose your perfect ride?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Browse our fleet, compare vehicles, and book your ideal car for a comfortable journey
              across India.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link to="/book" className="btn-gold">
                Book Now <ArrowRight size={16} />
              </Link>
              <a
                href={`https://wa.me/${process.env.VITE_WHATSAPP_NUMBER || "919136242706"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-glass"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
