import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Users, Briefcase, Snowflake, ArrowRight, Search, SlidersHorizontal } from "lucide-react";
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
        className="relative mx-3 overflow-hidden rounded-[2.25rem] md:mx-6 min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh] flex items-center bg-gray-900"
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
    </div>
  );
}
