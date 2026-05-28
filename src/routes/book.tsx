import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn, createServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import {
  MapPin,
  Calendar,
  Car as CarIcon,
  Phone,
  User,
  MessageCircle,
  Loader2,
  ArrowRight,
  Clock,
  IndianRupee,
  Plus,
  Search,
  X,
  Send,
  FileText,
  CheckCircle2,
} from "lucide-react";
import { CAR_CLASSES, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/cars";
import { computeDistance } from "@/lib/distance.functions";
import { createBooking } from "@/lib/data.server";
import type { Booking } from "@/lib/data.server";

const saveBookingToAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: Booking) => data)
  .handler(async ({ data }) => {
    createBooking(data);
    return { success: true };
  });

type Search = {
  car?: string;
  from?: string;
  to?: string;
  date?: string;
  returnDate?: string;
  time?: string;
  tripType?: string;
};

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    car: typeof s.car === "string" ? s.car : undefined,
    from: typeof s.from === "string" ? s.from : undefined,
    to: typeof s.to === "string" ? s.to : undefined,
    date: typeof s.date === "string" ? s.date : undefined,
    returnDate: typeof s.returnDate === "string" ? s.returnDate : undefined,
    time: typeof s.time === "string" ? s.time : undefined,
    tripType: typeof s.tripType === "string" ? s.tripType : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book a Cab — Tuhi Car Rental Pan-India" },
      {
        name: "description",
        content:
          "Book outstation, airport or local cabs across India. Auto-calculated fares with Google Maps, instant WhatsApp confirmation.",
      },
      { property: "og:title", content: "Book a Cab — Tuhi Car Rental" },
      {
        property: "og:description",
        content: "Live fare estimate. WhatsApp confirmation. Pan-India.",
      },
    ],
  }),
  component: BookPage,
});

function today() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function BookPage() {
  const search = useSearch({ from: "/book" });
  const [tripType, setTripType] = useState<"oneway" | "round" | "airport" | "local">(() => {
    const tt = search.tripType;
    if (tt === "outstation") return "round";
    if (tt === "local") return "local";
    if (tt === "airport") return "airport";
    return "oneway";
  });
  const [from, setFrom] = useState(search.from || "");
  const [to, setTo] = useState(search.to || "");
  const [date, setDate] = useState(search.date || today());
  const [time, setTime] = useState(() => {
    const searchTime = search.time || "09:00";
    // Convert "6:00 AM" or "11:30 PM" format to "06:00" or "23:30"
    if (searchTime.includes("AM") || searchTime.includes("PM")) {
      const match = searchTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (match) {
        let hours = parseInt(match[1]);
        const minutes = match[2];
        const period = match[3].toUpperCase();
        if (period === "PM" && hours !== 12) hours += 12;
        if (period === "AM" && hours === 12) hours = 0;
        return `${String(hours).padStart(2, "0")}:${minutes}`;
      }
    }
    return searchTime;
  });
  const [carId, setCarId] = useState(search.car ?? "sedan");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [km, setKm] = useState<number | null>(null);
  const [durationMin, setDurationMin] = useState<number | null>(null);

  // Payment state
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Custom car request modal state
  const [showCustomCarModal, setShowCustomCarModal] = useState(false);
  const [customCarName, setCustomCarName] = useState("");
  const [customCarBrand, setCustomCarBrand] = useState("");
  const [customSeats, setCustomSeats] = useState("");
  const [customRequirements, setCustomRequirements] = useState("");

  const distanceFn = useServerFn(computeDistance);
  const saveBookingFn = useServerFn(saveBookingToAdmin);
  const distanceMut = useMutation({
    mutationFn: (vars: { origin: string; destination: string }) => distanceFn({ data: vars }),
    onSuccess: (d) => {
      setKm(d.km);
      setDurationMin(d.durationMinutes);
    },
  });

  const car = CAR_CLASSES.find((c) => c.id === carId) ?? CAR_CLASSES[1];

  const fare = useMemo(() => {
    if (!km) return null;
    const multiplier = tripType === "round" ? 2 : 1;
    const base = Math.max(car.minFare, km * car.perKm * multiplier);
    const driverAllowance = tripType === "round" || km > 250 ? 400 : 0;
    return Math.round(base + driverAllowance);
  }, [km, car, tripType]);

  function calculate() {
    if (!from || !to) return;
    distanceMut.mutate({ origin: from, destination: to });
  }

  function buildMessage() {
    // Check if custom car requested
    if (carId === "custom") {
      return [
        `*Custom Car Booking Request — Tuhi Car Rental*`,
        ``,
        `*Trip Type:* ${labelFor(tripType)}`,
        `*From:* ${from}`,
        `*To:* ${to}`,
        `*Date:* ${date} at ${time}`,
        ``,
        `*🚗 Custom Car Request:*`,
        `*Car Name:* ${customCarName || "Not specified"}`,
        `*Brand:* ${customCarBrand || "Not specified"}`,
        `*Seats:* ${customSeats || "Not specified"}`,
        customRequirements ? `*Requirements:* ${customRequirements}` : null,
        km
          ? `*Distance:* ${km} km${durationMin ? ` (~${Math.floor(durationMin / 60)}h ${durationMin % 60}m)` : ""}`
          : null,
        fare ? `*Estimated Fare:* ₹${fare.toLocaleString("en-IN")}` : null,
        ``,
        `*Name:* ${name || "—"}`,
        `*Phone:* ${phone || "—"}`,
      ]
        .filter(Boolean)
        .join("\n");
    }

    return [
      `*New Booking Enquiry — Tuhi Car Rental*`,
      ``,
      `*Trip Type:* ${labelFor(tripType)}`,
      `*From:* ${from}`,
      `*To:* ${to}`,
      `*Date:* ${date} at ${time}`,
      `*Car Class:* ${car.name} (${car.examples})`,
      km
        ? `*Distance:* ${km} km${durationMin ? ` (~${Math.floor(durationMin / 60)}h ${durationMin % 60}m)` : ""}`
        : null,
      fare ? `*Estimated Fare:* ₹${fare.toLocaleString("en-IN")}` : null,
      ``,
      `*Name:* ${name || "—"}`,
      `*Phone:* ${phone || "—"}`,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function sendCustomCarRequest() {
    if (!from || !to || !name || !phone) {
      alert("Please fill in trip details and contact information");
      return;
    }
    const msg = [
      `*🚗 Custom Car Booking Request — Tuhi Car Rental*`,
      ``,
      `*Trip Type:* ${labelFor(tripType)}`,
      `*From:* ${from}`,
      `*To:* ${to}`,
      `*Date:* ${date} at ${time}`,
      km ? `*Distance:* ${km} km (~${Math.floor(durationMin! / 60)}h ${durationMin! % 60}m)` : null,
      ``,
      `*🚗 Vehicle Requirements:*`,
      `*Preferred Car:* ${customCarName || "Not specified"}`,
      `*Brand/Model:* ${customCarBrand || "Not specified"}`,
      `*Seating Capacity:* ${customSeats || "Not specified"}`,
      customRequirements ? `*Additional Requirements:* ${customRequirements}` : null,
      ``,
      `*👤 Customer Details:*`,
      `*Name:* ${name}`,
      `*Phone:* ${phone}`,
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setShowCustomCarModal(false);
  }

  function sendBooking(e: React.FormEvent) {
    e.preventDefault();

    // Check if payment is confirmed
    if (!paymentConfirmed) {
      alert("Please complete the ₹99 payment first!");
      return;
    }

    // Save to admin panel first
    const bookingData = {
      id: `BK-${Date.now().toString(36).toUpperCase()}`,
      customerName: name,
      phone,
      email: "",
      carId: carId,
      carName: car.name,
      from,
      to,
      date,
      time,
      distance: km || 0,
      fare: fare || 0,
      status: "pending" as const,
      tripType,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: paymentConfirmed ? `Payment confirmed via Razorpay` : "",
      driverName: "",
      paymentStatus: (paymentConfirmed ? "paid" : "pending") as "paid" | "pending",
    };
    saveBookingFn({ data: bookingData }).catch(() => {});

    // Open WhatsApp after payment confirmation
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`;
    window.open(url, "_blank");
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
              "url(https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent" />

        <div className="relative grid gap-8 px-5 py-10 md:px-10 md:py-14 lg:py-16 w-full">
          <div className="max-w-3xl text-white">
            <span className="chip bg-white/20 backdrop-blur-sm border-white/30 text-white">
              BOOKING
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-[1.15] sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Plan your trip
            </h1>
            <p className="mt-3 max-w-lg text-sm text-gray-300 sm:text-base md:text-lg leading-relaxed">
              Fill in your details and we'll send your booking request via WhatsApp instantly.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="section">
        <div className="mx-auto max-w-7xl">
          <form onSubmit={sendBooking} className="grid gap-6 md:gap-8 lg:grid-cols-[1.4fr_1fr]">
            {/* Left: form */}
            <div className="glass p-4 md:p-6 lg:p-8">
              {/* Trip type */}
              <div className="neu-inset flex gap-1 p-1.5 text-sm font-semibold">
                {(["oneway", "round", "airport", "local"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTripType(t)}
                    className={`flex-1 rounded-xl px-3 py-2.5 transition ${
                      tripType === t
                        ? "bg-[var(--surface)] text-foreground shadow-[var(--shadow-neu-sm)]"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {labelFor(t)}
                  </button>
                ))}
              </div>

              {/* From / To */}
              <div className="mt-4 md:mt-6 grid gap-3 md:gap-4 md:grid-cols-2">
                <Field label="Pickup City / Address" icon={MapPin}>
                  <input
                    className="neu-input"
                    required
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="e.g. Mumbai Airport T2"
                  />
                </Field>
                <Field label={tripType === "local" ? "Local Area" : "Destination"} icon={MapPin}>
                  <input
                    className="neu-input"
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="e.g. Pune Station"
                  />
                </Field>
              </div>

              {/* Date / Time */}
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Travel Date" icon={Calendar}>
                  <input
                    type="date"
                    className="neu-input"
                    required
                    min={today()}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </Field>
                <Field label="Pickup Time" icon={Clock}>
                  <input
                    type="time"
                    className="neu-input"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Field>
              </div>

              {/* Calculate */}
              <button
                type="button"
                onClick={calculate}
                disabled={!from || !to || distanceMut.isPending}
                className="btn-gold mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {distanceMut.isPending ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <MapPin size={18} />
                )}
                {distanceMut.isPending
                  ? "Calculating with Google Maps..."
                  : "Calculate distance & fare"}
              </button>
              {distanceMut.isError && (
                <p className="mt-3 text-sm text-destructive">
                  {(distanceMut.error as Error).message}. Try a more specific city or address.
                </p>
              )}

              {/* Car Class */}
              <div className="mt-8">
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <CarIcon size={14} /> Choose your car
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {CAR_CLASSES.map((c) => {
                    const active = carId === c.id;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setCarId(c.id)}
                        className={`text-left p-4 transition ${
                          active
                            ? "rounded-[var(--radius)] bg-[var(--surface)] shadow-[var(--shadow-neu-inset)] ring-2 ring-[var(--ring)]"
                            : "neu-sm hover:-translate-y-0.5"
                        }`}
                      >
                        <div className="aspect-[16/10] grid place-items-center overflow-hidden rounded-xl bg-white/50">
                          <img
                            src={c.image}
                            alt={c.name}
                            loading="lazy"
                            className="h-full w-full object-contain p-2"
                          />
                        </div>
                        <div className="mt-3 flex items-baseline justify-between">
                          <div className="font-bold">{c.name}</div>
                          <div className="text-sm font-bold">
                            ₹{c.perKm}
                            <span className="text-[10px] text-muted-foreground">/km</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {c.seats} seats · {c.bags} bags · AC
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Car Request Button */}
                <button
                  type="button"
                  onClick={() => setShowCustomCarModal(true)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--border)] px-4 py-3 text-sm font-semibold text-muted-foreground transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                >
                  <Plus size={16} /> Can't find your car? Request custom vehicle
                </button>
              </div>

              {/* Contact */}
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <Field label="Your Name" icon={User}>
                  <input
                    required
                    className="neu-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                  />
                </Field>
                <Field label="Phone Number" icon={Phone}>
                  <input
                    required
                    type="tel"
                    className="neu-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 ..."
                  />
                </Field>
              </div>
            </div>

            {/* Right: summary */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="neu p-7">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Booking Summary
                </div>
                <div className="mt-4 space-y-3 text-sm">
                  <Row label="Trip" value={labelFor(tripType)} />
                  <Row label="From" value={from || "—"} />
                  <Row label="To" value={to || "—"} />
                  <Row label="Date" value={`${date} · ${time}`} />
                  <Row label="Vehicle" value={car.name} />
                </div>

                <div className="my-6 h-px bg-border" />

                <div className="grid grid-cols-2 gap-3">
                  <div className="neu-inset rounded-2xl p-4 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Distance
                    </div>
                    <div className="mt-1 text-xl font-extrabold">
                      {km != null ? `${km} km` : "—"}
                    </div>
                  </div>
                  <div className="neu-inset rounded-2xl p-4 text-center">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      Est. Time
                    </div>
                    <div className="mt-1 text-xl font-extrabold">
                      {durationMin != null
                        ? `${Math.floor(durationMin / 60)}h ${durationMin % 60}m`
                        : "—"}
                    </div>
                  </div>
                </div>

                <div
                  className="mt-4 rounded-2xl p-5 text-white"
                  style={{ background: "var(--gradient-hero)" }}
                >
                  <div className="text-[10px] uppercase tracking-wider text-white/60">
                    Total Estimated Fare
                  </div>
                  <div className="mt-1 flex items-baseline gap-1 text-3xl font-extrabold">
                    <IndianRupee size={22} />
                    {fare != null ? fare.toLocaleString("en-IN") : "—"}
                  </div>
                  <div className="mt-1 text-xs text-white/60">
                    Inclusive of driver. Tolls, parking and state taxes extra.
                  </div>
                </div>

                {/* Payment Section - Shows BEFORE WhatsApp */}
                {!paymentConfirmed ? (
                  <div className="mt-5 space-y-3">
                    <div className="rounded-2xl border-2 border-dashed border-[oklch(0.5_0.15_75)] bg-gradient-to-br from-gray-50 to-white p-6">
                      <div className="text-center">
                        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.85_0.15_85)] to-[oklch(0.9_0.12_80)]">
                          <IndianRupee size={24} className="text-[oklch(0.3_0.1_250)]" />
                        </div>
                        <h4 className="text-sm font-bold text-gray-900">Booking Request Fee</h4>
                        <p className="mt-1 text-xs text-gray-600">
                          Pay ₹99 to confirm your booking
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={async () => {
                          setIsProcessingPayment(true);

                          try {
                            const options = {
                              key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_XXXXXXXXXXXX",
                              amount: 9900,
                              currency: "INR",
                              name: "Tuhi Car Rental",
                              description: "Booking Request Fee",
                              image: "/favicon.svg",
                              handler: function (response: any) {
                                setPaymentConfirmed(true);
                                setIsProcessingPayment(false);
                              },
                              prefill: {
                                name: name,
                                contact: phone,
                              },
                              theme: {
                                color: "#4A5568",
                              },
                            };

                            const script = document.createElement("script");
                            script.src = "https://checkout.razorpay.com/v1/checkout.js";
                            script.async = true;
                            script.onload = () => {
                              const razorpay = new (window as any).Razorpay(options);
                              razorpay.open();
                            };
                            document.head.appendChild(script);
                          } catch (error) {
                            console.error("Payment failed:", error);
                            setIsProcessingPayment(false);
                            alert("Payment failed. Please try again.");
                          }
                        }}
                        disabled={isProcessingPayment}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[oklch(0.5_0.15_75)] to-[oklch(0.6_0.14_80)] py-3 text-sm font-bold text-white shadow-lg transition-all hover:from-[oklch(0.6_0.14_80)] hover:to-[oklch(0.7_0.12_85)] hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isProcessingPayment ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <IndianRupee size={18} />
                            Pay ₹99 via Razorpay
                          </>
                        )}
                      </button>

                      <p className="mt-3 text-center text-[10px] text-gray-500">
                        Secure payment • Instant confirmation
                      </p>
                    </div>

                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                      <p className="text-xs text-blue-800">
                        <MessageCircle size={14} className="inline mr-1" />
                        WhatsApp button will appear after payment
                      </p>
                    </div>
                  </div>
                ) : (
                  /* WhatsApp Button - Shows AFTER payment */
                  <>
                    <div className="mt-5 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 p-4 text-center">
                      <CheckCircle2 size={32} className="mx-auto text-green-600" />
                      <p className="mt-2 text-sm font-bold text-green-800">Payment Successful!</p>
                      <p className="text-xs text-green-700">Your booking is confirmed</p>
                    </div>

                    <button
                      type="submit"
                      className="btn-gold mt-4 w-full justify-center bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                    >
                      <MessageCircle size={18} /> Confirm on WhatsApp
                    </button>
                  </>
                )}

                {carId === "custom" && (
                  <button
                    type="button"
                    onClick={sendCustomCarRequest}
                    className="btn-gold mt-3 w-full justify-center"
                  >
                    <Send size={18} /> Request Custom Car via WhatsApp
                  </button>
                )}
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-foreground/80"
                >
                  <Phone size={14} /> or call {PHONE_DISPLAY} <ArrowRight size={14} />
                </a>
              </div>
            </aside>
          </form>
        </div>
      </div>

      {/* Custom Car Request Modal */}
      <CustomCarModal
        isOpen={showCustomCarModal}
        onClose={() => setShowCustomCarModal(false)}
        customCarName={customCarName}
        setCustomCarName={setCustomCarName}
        customCarBrand={customCarBrand}
        setCustomCarBrand={setCustomCarBrand}
        customSeats={customSeats}
        setCustomSeats={setCustomSeats}
        customRequirements={customRequirements}
        setCustomRequirements={setCustomRequirements}
        onSubmit={sendCustomCarRequest}
      />
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon size={12} /> {label}
      </span>
      {children}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="max-w-[60%] text-right font-semibold">{value}</span>
    </div>
  );
}

function labelFor(t: "oneway" | "round" | "airport" | "local") {
  return { oneway: "One Way", round: "Round Trip", airport: "Airport", local: "Local 8h/80km" }[t];
}

// Custom Car Request Modal
function CustomCarModal({
  isOpen,
  onClose,
  customCarName,
  setCustomCarName,
  customCarBrand,
  setCustomCarBrand,
  customSeats,
  setCustomSeats,
  customRequirements,
  setCustomRequirements,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  customCarName: string;
  setCustomCarName: (v: string) => void;
  customCarBrand: string;
  setCustomCarBrand: (v: string) => void;
  customSeats: string;
  setCustomSeats: (v: string) => void;
  customRequirements: string;
  setCustomRequirements: (v: string) => void;
  onSubmit: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="glass w-full max-w-lg rounded-2xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Request Custom Vehicle</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-[var(--muted)]">
            <X size={20} />
          </button>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Can't find your preferred vehicle? Tell us what you need and we'll arrange it for you.
        </p>

        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
              <CarIcon size={12} className="inline mr-1" />
              Preferred Car Name
            </label>
            <input
              type="text"
              value={customCarName}
              onChange={(e) => setCustomCarName(e.target.value)}
              placeholder="e.g. Toyota Innova, BMW 5 Series"
              className="neu-input w-full"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
              <FileText size={12} className="inline mr-1" />
              Brand / Model (Optional)
            </label>
            <input
              type="text"
              value={customCarBrand}
              onChange={(e) => setCustomCarBrand(e.target.value)}
              placeholder="e.g. Toyota, Mercedes, BMW"
              className="neu-input w-full"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
              <User size={12} className="inline mr-1" />
              Seating Required
            </label>
            <select
              value={customSeats}
              onChange={(e) => setCustomSeats(e.target.value)}
              className="neu-input w-full"
            >
              <option value="">Select seats</option>
              <option value="4">4 Seats</option>
              <option value="5">5 Seats</option>
              <option value="6">6 Seats</option>
              <option value="7">7 Seats</option>
              <option value="8">8 Seats</option>
              <option value="10+">10+ Seats</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase text-muted-foreground">
              Additional Requirements
            </label>
            <textarea
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
              placeholder="e.g. AC required, music system, special occasion, luggage space..."
              rows={3}
              className="neu-input w-full"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border py-3 font-semibold hover:bg-[var(--muted)]"
          >
            Cancel
          </button>
          <button onClick={onSubmit} className="btn-gold flex-1">
            <Send size={16} /> Send via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
