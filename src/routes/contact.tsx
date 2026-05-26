import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
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
      <section className="relative mx-3 mt-3 overflow-hidden rounded-[2.25rem] md:mx-6 min-h-[40vh] md:min-h-[45vh] lg:min-h-[50vh] flex items-center bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent" />

        <div className="relative grid gap-8 px-5 py-10 md:px-10 md:py-14 lg:py-16 w-full">
          <div className="max-w-3xl text-white">
            <span className="chip bg-white/20 backdrop-blur-sm border-white/30 text-white">
              CONTACT
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              We're a call away
            </h1>
            <p className="mt-3 max-w-lg text-sm text-gray-300 sm:text-base md:text-lg leading-relaxed">
              Reach us anytime — call, WhatsApp, or email. We're here 24×7.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="section">
        <div className="mx-auto max-w-6xl">
          <div className="mt-8 md:mt-14 grid gap-4 md:gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="neu flex items-center gap-3 md:gap-4 p-4 md:p-6 transition-transform hover:-translate-y-0.5"
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
                className="neu flex items-center gap-3 md:gap-4 p-4 md:p-6 transition-transform hover:-translate-y-0.5"
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
                className="neu flex items-center gap-3 md:gap-4 p-4 md:p-6 transition-transform hover:-translate-y-0.5"
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
      </div>
    </div>
  );
}
