import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/cars";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Tuhi Car Rental — Call or WhatsApp 24×7" },
      {
        name: "description",
        content:
          "Reach Tuhi Car Rental on +91 91362 42706 for outstation, airport or local cab bookings. WhatsApp and email support 24×7.",
      },
      { property: "og:title", content: "Contact Tuhi Car Rental" },
      {
        property: "og:description",
        content: "Call or WhatsApp +91 91362 42706 for instant booking.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  function sendWhatsApp(e: React.FormEvent) {
    e.preventDefault();
    const text = `Hi Tuhi Car Rental,%0A%0AName: ${encodeURIComponent(form.name)}%0APhone: ${encodeURIComponent(form.phone)}%0A%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
  }

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
              "url(https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop)",
          }}
        />

        <div className="absolute inset-0 bg-[oklch(0.15_0.02_80/0.85)]" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[oklch(0.85_0.18_80)]" />

        <div className="relative z-10 text-center px-5 py-10 md:px-10 md:py-14 lg:py-16 w-full">
          <div className="max-w-3xl mx-auto text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[oklch(0.88_0.12_85)] to-[oklch(0.75_0.16_75)] px-4 py-2 backdrop-blur-md border border-[oklch(0.85_0.18_80)] text-sm font-semibold text-[oklch(0.15_0.02_80)]">
              CONTACT
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              We're a call away
            </h1>
            <p className="mt-3 max-w-lg mx-auto text-sm text-white/90 sm:text-base md:text-lg leading-relaxed">
              Reach us anytime — call, WhatsApp, or email. We're here 24×7.
            </p>
          </div>
        </div>
      </section>

      {/* BUSINESS HOURS */}
      <section className="section pt-10">
        <div className="mx-auto max-w-6xl">
          <div className="glass p-8 md:p-12">
            <div className="text-center">
              <span className="chip">Availability</span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">We're here when you need us</h2>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Phone,
                  title: "Phone Support",
                  hours: "24/7 Available",
                  desc: "Call us anytime for instant booking assistance",
                },
                {
                  icon: MessageCircle,
                  title: "WhatsApp",
                  hours: "24/7 Available",
                  desc: "Quick responses, book in under 1 minute",
                },
                {
                  icon: Mail,
                  title: "Email Support",
                  hours: "Response within 2 hours",
                  desc: "For detailed enquiries and corporate bookings",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div
                    className="mx-auto grid h-14 w-14 place-items-center rounded-2xl text-[oklch(0.25_0.05_260)]"
                    style={{ background: "var(--gradient-gold)" }}
                  >
                    <item.icon size={24} />
                  </div>
                  <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-[oklch(0.5_0.12_75)]">
                    {item.hours}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO & FORM */}
      <section className="section pt-0">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="glass flex items-center gap-3 md:gap-4 p-4 md:p-6 transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-2xl text-[oklch(0.5_0.12_75)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Call</div>
                  <div className="text-lg font-bold">{PHONE_DISPLAY}</div>
                </div>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex items-center gap-3 md:gap-4 p-4 md:p-6 transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-2xl text-white"
                  style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
                >
                  <MessageCircle size={18} className="md:size-[20]" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    WhatsApp
                  </div>
                  <div className="text-lg font-bold">{PHONE_DISPLAY}</div>
                </div>
              </a>
              <a
                href="mailto:bookings@tuhicarrental.in"
                className="glass flex items-center gap-3 md:gap-4 p-4 md:p-6 transition-transform hover:-translate-y-0.5"
              >
                <div
                  className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-2xl text-[oklch(0.5_0.12_75)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <Mail size={18} className="md:size-[20]" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Email
                  </div>
                  <div className="text-lg font-bold">bookings@tuhicarrental.in</div>
                </div>
              </a>
              <div className="neu flex items-center gap-3 md:gap-4 p-4 md:p-6">
                <div
                  className="grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-2xl text-[oklch(0.5_0.12_75)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <MapPin size={18} className="md:size-[20]" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    Office
                  </div>
                  <div className="text-lg font-bold">Taj Lands End, Bandra, Mumbai</div>
                </div>
              </div>
            </div>

            <form onSubmit={sendWhatsApp} className="neu p-8">
              <h2 className="text-xl font-bold">Send a quick enquiry</h2>
              <p className="mt-1 text-sm text-muted-foreground">Your message opens in WhatsApp.</p>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Your name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="neu-input"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Phone
                  </label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="neu-input"
                    placeholder="+91 ..."
                  />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="neu-input"
                    placeholder="Tell us about your trip..."
                  />
                </div>
                <button type="submit" className="btn-gold w-full justify-center">
                  <MessageCircle size={18} /> Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="pt-0">
        <div className="overflow-hidden bg-gradient-to-br from-[oklch(0.15_0.05_260)] to-[oklch(0.18_0.06_265)] px-6 py-12 text-center md:px-16 md:py-20">
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              Ready to book your ride?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/70">
              Get in touch with us today for a safe, comfortable, and affordable journey across
              India.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/book"
                className="rounded-full bg-gradient-to-r from-[oklch(0.88_0.12_85)] to-[oklch(0.75_0.16_75)] px-8 py-4 text-lg font-bold text-[oklch(0.18_0.02_260)] shadow-[0_16px_48px_-12px_oklch(0.78_0.14_80/0.4)] transition-all hover:shadow-[0_20px_56px_-10px_oklch(0.78_0.14_80/0.6)] active:scale-95"
              >
                Book Now <ArrowRight size={16} className="inline ml-1" />
              </Link>
              <a
                href={`tel:${PHONE_DISPLAY}`}
                className="rounded-full border border-white/20 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95"
              >
                <Phone size={16} className="inline mr-2" /> Call Us
              </a>
            </div>
          </div>
      </section>
    </div>
  );
}
