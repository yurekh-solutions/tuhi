import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Car, Star } from "lucide-react";
import { useState } from "react";
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/cars";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/fleet", label: "Fleet" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-gray-900/50 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2 md:gap-3">
            <div className="relative grid h-9 w-9 md:h-11 md:w-11 place-items-center rounded-full bg-[var(--gradient-hero)] text-[oklch(0.86_0.12_85)] shadow-lg transition-transform group-hover:scale-105">
              <span className="text-base md:text-lg font-bold tracking-tight">T</span>
              <div className="absolute -right-1 -top-1 grid h-4 w-4 md:h-5 md:w-5 place-items-center rounded-full bg-[var(--gradient-gold)]">
                <Star size={8} className="md:size-[10] text-[oklch(0.25_0.05_260)]" />
              </div>
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1.5 md:gap-2 text-sm md:text-base font-bold tracking-wide">
                TUHI
                <span className="hidden sm:inline-flex rounded-full bg-[var(--gradient-gold)] px-1.5 py-0.5 text-[9px] md:text-[10px] font-bold text-[oklch(0.25_0.05_260)]">
                  PREMIUM
                </span>
              </div>
              <div className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-white">
                Car Rental
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="group relative rounded-full px-5 py-2.5 text-sm font-medium text-foreground/80 transition-all hover:bg-white/80 hover:text-foreground"
                activeProps={{
                  className:
                    "rounded-full px-5 py-2.5 text-sm font-semibold bg-white/90 text-foreground shadow-md",
                }}
                activeOptions={{ exact: true }}
              >
                {n.label}
                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-[var(--gradient-gold)] transition-all group-hover:w-1/2" />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Phone - Desktop Only */}
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="hidden items-center gap-2 rounded-full bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:shadow-md lg:inline-flex"
            >
              <Phone size={15} className="text-[oklch(0.5_0.12_75)]" />
              <span>{PHONE_DISPLAY}</span>
            </a>

            {/* Book Now Button */}
            <Link
              to="/book"
              className="hidden md:inline-flex btn-gold !py-2.5 !px-6 text-sm shadow-lg hover:shadow-xl"
            >
              <Car size={15} /> Book Now
            </Link>

            {/* Mobile Menu Button */}
            <button
              aria-label="Toggle menu"
              className="grid h-11 w-11 place-items-center rounded-full neu-sm transition-transform hover:scale-105 md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden" style={{ zIndex: 9999, position: "relative" }}>
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div
              className="overflow-hidden rounded-2xl shadow-2xl border border-blue-100"
              style={{
                background: "#ffffff",
              }}
            >
              <nav className="flex flex-col gap-2 p-5" style={{ pointerEvents: "auto" }}>
                {NAV.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setTimeout(() => {
                        window.location.href = n.to;
                      }, 100);
                    }}
                    className="group flex items-center justify-between rounded-xl px-5 py-4 text-base font-semibold text-gray-700 transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 hover:shadow-md active:scale-95"
                    activeProps={{
                      className:
                        "flex items-center justify-between rounded-xl px-5 py-4 text-base font-bold bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 shadow-md",
                    }}
                    activeOptions={{ exact: true }}
                  >
                    <span>{n.label}</span>
                    <span className="text-gray-400 group-hover:text-blue-500 transition-colors text-lg">
                      →
                    </span>
                  </Link>
                ))}
                <div className="mt-3 pt-4 border-t border-gray-200 space-y-3">
                  <a
                    href={`tel:+${WHATSAPP_NUMBER}`}
                    className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 px-5 py-4 text-base font-bold text-gray-700 border border-gray-200 shadow-sm transition-all hover:from-gray-100 hover:to-gray-200 hover:shadow-md active:scale-95"
                    style={{ pointerEvents: "auto" }}
                  >
                    <Phone size={18} className="text-blue-600" />
                    <span>{PHONE_DISPLAY}</span>
                  </a>
                  <Link
                    to="/book"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setTimeout(() => {
                        window.location.href = "/book";
                      }, 100);
                    }}
                    className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 px-5 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-95"
                    style={{ pointerEvents: "auto" }}
                  >
                    <Car size={18} />
                    <span>Book Now</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
