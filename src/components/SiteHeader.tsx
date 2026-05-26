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
    <header className="sticky top-0 z-50">
      <div className="mx-3 mt-3 md:mx-6">
        <div className="glass flex items-center justify-between rounded-[2.25rem] px-4 py-3 backdrop-blur-xl md:px-6">
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
              <div className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
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
        <div className="mx-3 mt-2 md:mx-6">
          <div className="glass overflow-hidden rounded-[2.25rem] backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1 p-4">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-sm font-medium transition-colors hover:bg-white/80"
                  activeProps={{
                    className: "rounded-xl px-4 py-3.5 text-sm font-semibold bg-white/90 shadow-sm",
                  }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-[var(--border)] pt-3">
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-center gap-2 rounded-xl bg-[var(--surface)] px-4 py-3 text-sm font-semibold shadow-sm"
                >
                  <Phone size={15} className="text-[oklch(0.5_0.12_75)]" />
                  {PHONE_DISPLAY}
                </a>
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="btn-gold mt-2 w-full justify-center shadow-lg"
                >
                  <Car size={15} /> Book Now
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
