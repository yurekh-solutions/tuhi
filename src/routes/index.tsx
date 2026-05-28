import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  Car,
  Phone,
  MessageCircle,
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
  Navigation,
  Timer,
  Calendar,
  Search,
} from "lucide-react";
import { CAR_CLASSES, PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/cars";
import hyderabadImg from "@/assets/image.png";

// Google Maps type declaration
declare global {
  interface Window {
    google: any;
  }
}

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

const TRUST_STATS = [
  { icon: Car, value: "50,000+", label: "Trips Completed", suffix: "" },
  { icon: MapPin, value: "500+", label: "Cities Covered", suffix: "" },
  { icon: Users, value: "10,000+", label: "Happy Customers", suffix: "" },
  { icon: Timer, value: "24/7", label: "Support Available", suffix: "" },
];

const CAB_SERVICE_LINKS = [
  {
    title: "Airport Cab Service",
    links: [
      "Mumbai Airport Cab",
      "New Delhi Airport Taxi",
      "Bangalore Airport Car Rental",
      "Hyderabad Airport Cab",
      "Chennai Airport Taxi",
      "Pune Airport Cab",
      "Kolkata Airport Taxi",
      "Goa Airport Cab",
      "Jaipur Airport Taxi",
      "Nagpur Airport Cab",
    ],
  },
  {
    title: "Luxury Car Rental",
    links: [
      "Luxury Car in Mumbai",
      "Luxury Car in Delhi",
      "Luxury Car in Pune",
      "Luxury Car in Bangalore",
      "Luxury Car in Hyderabad",
      "Luxury Car in Chennai",
      "Luxury Car in Kolkata",
      "Wedding Car Rental",
    ],
  },
  {
    title: "Outstation Cab Booking",
    links: [
      "Outstation Taxi from Mumbai",
      "Delhi Outstation Cab",
      "Outstation Cab in Pune",
      "Outstation Cabs from Bangalore",
      "Hyderabad Outstation Taxi",
      "Chennai Outstation Cab",
      "Kolkata Outstation Cab",
      "Jaipur Outstation Taxi",
    ],
  },
  {
    title: "Local Sightseeing Packages",
    links: [
      "Mumbai Darshan Cab",
      "Delhi Darshan Cab",
      "Pune Darshan Cab",
      "Kolkata Darshan Taxi",
      "Goa Sightseeing Cab",
      "Jaipur City Tour",
      "Hyderabad City Tour",
      "Chennai City Tour",
    ],
  },
  {
    title: "Tempo Traveller & Buses",
    links: [
      "Hire a Bus in Mumbai",
      "Rent a Bus in Delhi",
      "Book Bus in Varanasi",
      "Hire Bus in Pune",
      "Bus on Rent in Bangalore",
      "Tempo Traveller in Hyderabad",
      "Group Travel in Goa",
      "Tempo Traveller in Kolkata",
    ],
  },
];

const CITY_PRESENCE = [
  {
    name: "Mumbai",
    desc: "Airport transfers, Pune expressway trips & local rides across the financial capital.",
    routes: ["Mumbai → Pune", "Mumbai → Nashik", "Mumbai → Goa"],
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Delhi NCR",
    desc: "Outstation cabs to Jaipur, Agra, Manali & beyond. Corporate travel in Gurgaon & Noida.",
    routes: ["Delhi → Jaipur", "Delhi → Agra", "Delhi → Manali"],
    image:
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Bangalore",
    desc: "Tech park commutes, airport pickups & weekend getaways to Mysore, Coorg & Ooty.",
    routes: ["Bangalore → Mysore", "Bangalore → Coorg", "Bangalore → Ooty"],
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Hyderabad",
    desc: "HITEC City rides, Shamshabad airport transfers & trips to Vijayawada & Tirupati.",
    routes: ["Hyderabad → Vijayawada", "Hyderabad → Tirupati", "Hyderabad → Warangal"],
    image: hyderabadImg,
  },
  {
    name: "Chennai",
    desc: "Marina beach to Mahabalipuram, airport cabs & Pondicherry weekend drives.",
    routes: ["Chennai → Pondicherry", "Chennai → Tirupati", "Chennai → Madurai"],
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Kolkata",
    desc: "Howrah pickups, Digha beach trips & Darjeeling hill station getaways.",
    routes: ["Kolkata → Digha", "Kolkata → Darjeeling", "Kolkata → Puri"],
    image:
      "https://images.unsplash.com/photo-1558431382-27e303142255?q=80&w=400&auto=format&fit=crop",
  },
];

const POPULAR_ROUTES = [
  { from: "Delhi", to: "Jaipur", km: 280, hrs: "5h", icon: Mountain },
  { from: "Mumbai", to: "Pune", km: 150, hrs: "3h", icon: Building2 },
  { from: "Bangalore", to: "Mysore", km: 145, hrs: "3h", icon: Mountain },
  { from: "Chennai", to: "Pondicherry", km: 165, hrs: "3.5h", icon: Heart },
  { from: "Hyderabad", to: "Vijayawada", km: 275, hrs: "4.5h", icon: Building2 },
  { from: "Kolkata", to: "Digha", km: 185, hrs: "4h", icon: Heart },
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
    tag: "Most Popular",
  },
  {
    icon: MapPin,
    title: "Outstation One-way",
    desc: "Pay only one side. No return charges.",
    tag: "Pan India",
  },
  {
    icon: Clock,
    title: "Local Trips",
    desc: "8hrs/80km or 12hrs/120km packages available.",
    tag: "Flexible",
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
  {
    icon: Car,
    title: "Luxury Rentals",
    desc: "Premium sedans & SUVs for special occasions.",
    tag: "Premium",
  },
  {
    icon: Users,
    title: "Tempo Traveller",
    desc: "8-12 seater AC vehicles for group travel.",
    tag: "Groups",
  },
  {
    icon: Mountain,
    title: "Sightseeing Packages",
    desc: "Local darshan & city tour packages.",
    tag: "Explore",
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
  {
    icon: Clock,
    t: "On-time service",
    d: "We assure punctual pickup for every customer, any time of day.",
  },
  {
    icon: Navigation,
    t: "GPS tracking",
    d: "Real-time vehicle tracking. Share live location with family.",
  },
  {
    icon: Star,
    t: "Professional drivers",
    d: "Rigorously selected, licensed, with customer service training.",
  },
  {
    icon: Award,
    t: "Safety first",
    d: "Regular vehicle maintenance & safety inspections.",
  },
];

function HomePage() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Show popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("hasSeenPromoPopup");
      if (!hasSeenPopup) {
        setShowPopup(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [tripType, setTripType] = useState<"local" | "outstation" | "bus">("local");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupTime, setPickupTime] = useState("6:00 AM");
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BG_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Load Google Maps Places API
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if Google Maps is already loaded
    if ((window as any).google?.maps?.places) {
      initAutocomplete();
      return;
    }

    // Load Google Maps script
    const script = document.createElement("script");
    const apiKey =
      import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.GOOGLE_MAPS_API_KEY || "";

    if (!apiKey) {
      console.warn("Google Maps API key not found");
      return;
    }

    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = () => initAutocomplete();
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  function initAutocomplete() {
    if (!(window as any).google?.maps?.places || !fromInputRef.current || !toInputRef.current)
      return;

    const options = {
      types: ["(cities)"],
      componentRestrictions: { country: "in" },
    };

    const fromAutocomplete = new (window as any).google.maps.places.Autocomplete(
      fromInputRef.current,
      options,
    );
    fromAutocomplete.addListener("place_changed", () => {
      const place = fromAutocomplete.getPlace();
      if (place.formatted_address) {
        setFrom(place.formatted_address);
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toAutocomplete = new (window as any).google.maps.places.Autocomplete(
      toInputRef.current,
      options,
    );
    toAutocomplete.addListener("place_changed", () => {
      const place = toAutocomplete.getPlace();
      if (place.formatted_address) {
        setTo(place.formatted_address);
      }
    });
  }

  return (
    <div>
      {/* PROMOTIONAL POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowPopup(false);
                localStorage.setItem("hasSeenPromoPopup", "true");
              }}
              className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              <X size={18} />
            </button>

            {/* Popup Content */}
            <div className="grid md:grid-cols-2">
              {/* Left Side - Image/Offer */}
              <div className="relative bg-gradient-to-br from-[oklch(0.85_0.15_85)] to-[oklch(0.75_0.12_80)] p-8 text-white">
                <div className="absolute inset-0 opacity-10">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,white_1px,transparent_1px)] bg-[length:20px_20px]" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-extrabold leading-tight">
                    BOOK YOUR CAB NOW
                    <br />
                    <span className="text-[oklch(0.3_0.1_250)]">AT LOWEST COST</span>
                  </h3>
                  <div className="mt-6">
                    <p className="text-sm font-semibold">CALL NOW & GET</p>
                    <p className="mt-1 text-5xl font-extrabold text-[oklch(0.3_0.1_250)]">
                      20% OFF
                    </p>
                    <p className="text-lg font-bold">TODAY</p>
                  </div>

                  {/* Features */}
                  <div className="mt-6 space-y-2">
                    {["Cost-Effective", "Guaranteed Safety", "Large Capacity", "Easy to Book"].map(
                      (feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-[oklch(0.5_0.15_145)]" />
                          <span className="text-sm font-medium text-gray-800">{feature}</span>
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-6 rounded-lg bg-white/20 px-4 py-2 text-center text-xs font-semibold backdrop-blur-sm">
                    24/7 Booking Assistance • Trusted by 1 Lac+ Happy Customers
                  </div>
                </div>
              </div>

              {/* Right Side - Content & CTA */}
              <div className="p-8">
                <h4 className="text-2xl font-bold text-[oklch(0.3_0.1_250)]">
                  Most Trusted Cab Service - In Maharashtra
                </h4>
                <p className="mt-2 text-lg font-semibold text-gray-600">Book Your Ride Now</p>

                {/* Trust Points */}
                <ul className="mt-6 space-y-3">
                  {[
                    "15+ Years of Trusted Service",
                    "Trusted by 1 Lac+ Customers",
                    "Safe & Professional Drivers",
                    "On-Time Pickup from Airport, Railway Station & Doorstep",
                    "Book Luxury Cabs & Urbania Tempo Travellers",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/\D/g, "")}`}
                  className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.9_0.12_80)] px-8 py-4 text-lg font-bold text-[oklch(0.3_0.1_250)] shadow-lg transition-all hover:from-[oklch(0.9_0.12_80)] hover:to-[oklch(0.95_0.1_85)] hover:shadow-xl active:scale-95"
                >
                  <Phone size={20} />
                  Call Now
                </a>

                <p className="mt-4 text-center text-xs text-gray-500">
                  Instant booking assistance • No hidden charges
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* POPUP MODAL - hirecab.net style */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left Side - Promotional Image */}
              <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-500 p-8 text-white">
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop)",
                    }}
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-extrabold uppercase tracking-tight">
                    Book Your Cab Now
                  </h3>
                  <p className="mt-2 text-3xl font-black">AT LOWEST COST</p>

                  <div className="mt-6">
                    <p className="text-sm font-semibold">CALL NOW & GET</p>
                    <p className="mt-1 text-5xl font-black text-yellow-200">20% OFF</p>
                    <p className="text-lg font-bold">TODAY</p>
                  </div>

                  {/* Taxi Illustration */}
                  <div className="mt-6 flex items-center justify-center">
                    <div className="relative">
                      <div className="h-32 w-48 rounded-lg bg-white/20 backdrop-blur-sm">
                        <div className="flex h-full items-center justify-center">
                          <CarIcon size={64} className="text-white" />
                        </div>
                      </div>
                      <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
                        <MapPin size={20} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mt-6 rounded-lg bg-white/90 p-4 text-gray-900">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="font-medium">Cost-Effective</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="font-medium">Guaranteed Safety</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="font-medium">Large Capacity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-green-600" />
                        <span className="font-medium">Easy to Book</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Banner */}
                  <div className="mt-4 flex justify-between text-xs font-semibold">
                    <span>24/7 Booking Assistance</span>
                    <span>Trusted by 1 Lac+ Happy Customers</span>
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="p-8 md:p-10">
                <h2 className="text-2xl font-bold text-[oklch(0.5_0.15_75)]">
                  Most Trusted Cab Service - In Maharashtra
                </h2>
                <p className="mt-2 text-lg font-semibold text-gray-700">Book Your Ride Now</p>

                {/* Trust Points */}
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[oklch(0.5_0.15_75)] text-white">
                      ✓
                    </span>
                    <span className="text-gray-700">15+ Years of Trusted Service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[oklch(0.5_0.15_75)] text-white">
                      ✓
                    </span>
                    <span className="text-gray-700">Trusted by 1 Lac+ Customers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[oklch(0.5_0.15_75)] text-white">
                      ✓
                    </span>
                    <span className="text-gray-700">Safe & Professional Drivers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[oklch(0.5_0.15_75)] text-white">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      On-Time Pickup from Airport, Railway Station & Doorstep
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[oklch(0.5_0.15_75)] text-white">
                      ✓
                    </span>
                    <span className="text-gray-700">
                      Book Luxury Cabs & Urbania Tempo Travellers
                    </span>
                  </li>
                </ul>

                {/* Call Now Button */}
                <a
                  href={`tel:${PHONE_DISPLAY.replace(/\s/g, "")}`}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[oklch(0.5_0.15_75)] to-[oklch(0.6_0.14_80)] px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-[oklch(0.6_0.14_80)] hover:to-[oklch(0.7_0.12_85)] hover:shadow-xl active:scale-95"
                >
                  <Phone size={20} /> Call Now
                </a>

                {/* WhatsApp Alternative */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I want to book a cab with 20% off offer!")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-green-500 px-6 py-3 text-base font-semibold text-green-600 transition-colors hover:bg-green-50"
                >
                  <MessageCircle size={18} /> WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "clamp(32rem, 70vh, 48rem)", marginTop: "-6.5rem" }}
      >
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          {HERO_BG_IMAGES.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{
                opacity: currentSlide === index ? 1 : 0,
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: currentSlide === index ? "scale(1.05)" : "scale(1)",
                transition: "opacity 1000ms ease-in-out, transform 8000ms ease-out",
              }}
            />
          ))}
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex h-full min-h-[clamp(32rem,70vh,48rem)] max-w-7xl flex-col justify-center px-4 md:px-6">
          <div className="max-w-3xl mt-10">
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20">
              <Sparkles size={16} className="text-[oklch(0.86_0.12_85)]" />
              <span className="text-sm font-medium text-white/90">
                Premium Car Rental Across India
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Your Journey,
              <span className="block mt-2" style={{ color: "oklch(0.86 0.12 85)" }}>
                Our Promise
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl leading-relaxed">
              Verified chauffeurs, transparent fares, and 24×7 support. Book your next outstation
              cab or airport transfer in seconds via WhatsApp.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/book" className="btn-gold text-base px-8 py-4 shadow-2xl">
                <Car size={18} /> Book Your Ride
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Tuhi, I want to book a cab.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-glass text-base px-8 py-4"
              >
                <MessageCircle size={18} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STATS BAR */}
      <section className="relative z-20 mt-8 pb-8">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:gap-6">
            {TRUST_STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass group flex flex-col items-center gap-2 rounded-2xl p-5 text-center transition-transform hover:-translate-y-1 sm:p-6"
              >
                <div
                  className="grid h-12 w-12 place-items-center rounded-xl text-[oklch(0.25_0.05_260)]"
                  style={{ background: "var(--gradient-gold)" }}
                >
                  <stat.icon size={20} />
                </div>
                <div className="text-2xl font-bold sm:text-3xl">{stat.value}</div>
                <div className="text-xs text-muted-foreground sm:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CITY PRESENCE */}
      <section className="section pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <span className="chip">Our Presence</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Serving across India</h2>
            <p className="mt-3 text-muted-foreground">
              From metro cities to hill stations — Tuhi's verified chauffeurs are ready in 500+
              cities nationwide.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CITY_PRESENCE.map((city) => (
              <div
                key={city.name}
                className="neu group relative overflow-hidden rounded-2xl transition-transform hover:-translate-y-1"
              >
                {/* City Image */}
                <div className="relative h-40 overflow-hidden sm:h-48">
                  <img
                    src={city.image}
                    alt={city.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-5 text-xl font-bold text-white sm:text-2xl">
                    {city.name}
                  </h3>
                </div>
                {/* City Content */}
                <div className="p-5">
                  <p className="text-sm text-muted-foreground">{city.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {city.routes.map((route) => (
                      <span
                        key={route}
                        className="inline-flex items-center gap-1 rounded-full bg-[var(--muted)] px-3 py-1 text-xs font-medium"
                      >
                        <MapPin size={10} className="text-[oklch(0.5_0.12_75)]" />
                        {route}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/book"
                    search={{ from: city.name } as never}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.5_0.12_75)] transition-colors hover:text-[oklch(0.6_0.14_80)]"
                  >
                    Book in {city.name} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING FORM - hirecab.net inspired */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[oklch(0.25_0.12_260)] via-[oklch(0.3_0.1_250)] to-[oklch(0.35_0.12_240)] text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-20 md:py-24">
          {/* Header */}
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm border border-white/20">
              <Sparkles size={16} className="text-[oklch(0.86_0.12_85)]" />
              Instant Booking Inquiry
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">Online Cab Booking Service</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-white/80">
              Fill in your trip details and we'll get back to you instantly via WhatsApp with the
              best fare!
            </p>
          </div>

          {/* Booking Form Card */}
          <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            {/* Trip Type Tabs */}
            <div className="mb-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setTripType("local")}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                  tripType === "local"
                    ? "bg-[oklch(0.3_0.1_250)] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Clock size={16} /> Local Trip
              </button>
              <button
                onClick={() => setTripType("outstation")}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                  tripType === "outstation"
                    ? "bg-[oklch(0.3_0.1_250)] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Navigation size={16} /> Outstation Trip
              </button>
              <button
                onClick={() => setTripType("bus")}
                className={`flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                  tripType === "bus"
                    ? "bg-[oklch(0.3_0.1_250)] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Users size={16} /> Hire a Bus
              </button>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* From */}
              <div className="relative">
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <MapPin size={14} className="text-[oklch(0.5_0.12_75)]" /> From
                </label>
                <input
                  ref={fromInputRef}
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Enter Pick Up City"
                  className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[oklch(0.5_0.12_75)] focus:bg-white focus:outline-none"
                />
              </div>

              {/* To */}
              {tripType !== "local" && (
                <div className="relative">
                  <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                    <MapPin size={14} className="text-[oklch(0.5_0.12_75)]" /> To
                  </label>
                  <input
                    ref={toInputRef}
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="Enter Destination City"
                    className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[oklch(0.5_0.12_75)] focus:bg-white focus:outline-none"
                  />
                </div>
              )}

              {/* Departure Date */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <Calendar size={14} className="text-[oklch(0.5_0.12_75)]" /> Departure
                </label>
                <input
                  type="date"
                  value={departure}
                  onChange={(e) => setDeparture(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[oklch(0.5_0.12_75)] focus:bg-white focus:outline-none"
                />
              </div>

              {/* Return Date - Only for Outstation */}
              {tripType === "outstation" && (
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                    <Calendar size={14} className="text-[oklch(0.5_0.12_75)]" /> Return
                  </label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[oklch(0.5_0.12_75)] focus:bg-white focus:outline-none"
                  />
                </div>
              )}

              {/* Pickup Time */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <Clock size={14} className="text-[oklch(0.5_0.12_75)]" /> Pickup Time
                </label>
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 transition-colors focus:border-[oklch(0.5_0.12_75)] focus:bg-white focus:outline-none"
                >
                  {Array.from({ length: 34 }, (_, i) => {
                    const hour = Math.floor(i / 2) + 6;
                    const minute = i % 2 === 0 ? "00" : "30";
                    const period = hour < 12 ? "AM" : "PM";
                    const displayHour = hour > 12 ? hour - 12 : hour;
                    return (
                      <option key={i}>
                        {displayHour}:{minute} {period}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => {
                  if (!from) {
                    alert("Please enter pickup location");
                    return;
                  }
                  // Navigate to booking page with pre-filled data
                  router.navigate({
                    to: "/book",
                    search: {
                      from,
                      to: tripType !== "local" ? to : "",
                      date: departure,
                      returnDate: tripType === "outstation" ? returnDate : undefined,
                      time: pickupTime,
                      tripType,
                    } as Record<string, unknown>,
                  });
                }}
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[oklch(0.5_0.15_75)] to-[oklch(0.6_0.14_80)] px-10 py-4 text-base font-bold text-white shadow-lg transition-all hover:from-[oklch(0.6_0.14_80)] hover:to-[oklch(0.7_0.12_85)] hover:shadow-xl active:scale-95"
              >
                <Search size={18} /> Search Cabs
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-6 border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>Instant WhatsApp Response</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>Best Price Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 size={16} className="text-green-500" />
                <span>Verified Drivers</span>
              </div>
            </div>
          </div>
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
              Book any of these routes in under a minute through our booking form.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_ROUTES.map((r) => (
              <Link
                key={r.from + r.to}
                to="/book"
                search={{ from: r.from, to: r.to } as never}
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
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[oklch(0.5_0.12_75)]">
                    Book <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
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
      {/* CAB SERVICE IN INDIA — SEO LINKS */}
      <section className="section pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-2xl">
            <span className="chip">Since 2006</span>
            <h2 className="mt-3 text-3xl font-bold md:text-5xl">Cab Service in India</h2>
            <p className="mt-3 text-muted-foreground">
              Tuhi Car Rental offers reliable cab services across India. Airport transfers,
              outstation trips, luxury cars, sightseeing packages and group travel — all from one
              trusted provider.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAB_SERVICE_LINKS.map((category) => (
              <div
                key={category.title}
                className="rounded-2xl border border-[oklch(0.86_0.12_85_/_0.3)] bg-[oklch(0.86_0.12_85_/_0.08)] p-6"
              >
                <h3 className="text-lg font-bold">{category.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {category.links.map((link) => (
                    <li key={link}>
                      <Link
                        to="/book"
                        search={
                          {
                            from: link.split(" in ").pop() || link.split(" from ").pop() || "",
                          } as never
                        }
                        className="text-sm text-foreground/80 transition-colors hover:text-[oklch(0.5_0.12_75)] hover:underline"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[oklch(0.5_0.12_75)]"
                >
                  More... <ArrowRight size={12} />
                </Link>
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
