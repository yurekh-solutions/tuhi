import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Award, Smile, MapPin } from "lucide-react";

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
        style={{ marginTop: "-30px" }}
        className="relative mx-3 overflow-hidden rounded-[2.25rem] md:mx-6 min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh] flex items-center bg-gray-900"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent" />

        <div className="relative grid gap-8 px-5 py-10 md:px-10 md:py-14 lg:py-16 w-full">
          <div className="max-w-3xl text-white">
            <span className="chip bg-white/20 backdrop-blur-sm border-white/30 text-white">
              ABOUT US
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              A simpler way to travel India
            </h1>
            <p className="mt-3 max-w-lg text-sm text-gray-300 sm:text-base md:text-lg leading-relaxed">
              Tuhi Car Rental Service was born in Mumbai with a simple goal — make hiring an
              outstation cab as effortless as ordering food.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="section">
        <div className="mx-auto max-w-5xl">
          <div className=" grid gap-4 md:gap-6 md:grid-cols-2">
            <div className="neu p-5 md:p-8">
              <h2 className="text-2xl font-bold">Our promise</h2>
              <p className="mt-3 text-foreground/80">
                No hidden charges. No last-minute cancellations. Just a clean car, a verified
                chauffeur and a fare you saw before the ride began.
              </p>
            </div>
            <div className="neu p-5 md:p-8">
              <h2 className="text-2xl font-bold">Pan-India network</h2>
              <p className="mt-3 text-foreground/80">
                Local partners in every state, audited by our central operations team. That's how a
                Mumbai booking gets you a Bengaluru pickup without missing a beat.
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-10 grid gap-3 md:gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, k: "100%", v: "Verified drivers" },
              { icon: Award, k: "4.9★", v: "Customer rating" },
              { icon: Smile, k: "50k+", v: "Happy travellers" },
              { icon: MapPin, k: "1500+", v: "Cities served" },
            ].map((s) => (
              <div key={s.v} className="neu-sm p-6 text-center">
                <s.icon className="mx-auto text-[oklch(0.5_0.12_75)]" size={22} />
                <div className="mt-2 text-2xl font-extrabold">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
