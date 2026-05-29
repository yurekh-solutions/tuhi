import { Link } from "@tanstack/react-router";
import { Menu, X, Phone, Car, Star, MessageCircle } from "lucide-react";
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
      {/* Top Bar - Yellow */}
      <div className="bg-[oklch(0.85_0.18_80)] text-[oklch(0.15_0.02_80)] py-2 text-xs md:text-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6">
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-1.5 font-semibold hover:opacity-80">
              <Phone size={14} /> {PHONE_DISPLAY}
            </a>
            <span className="hidden sm:inline">✉ bookings@tuhicarrental.in</span>
          </div>
          
        </div>
      </div>

      {/* Main Navbar - Black with Glass */}
      <div className="bg-[oklch(0.15_0.02_80)] backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2 md:gap-3">
              <div className="relative grid h-10 w-10 md:h-12 md:w-12 place-items-center rounded-full bg-gradient-to-r from-[oklch(0.88_0.12_85)] to-[oklch(0.75_0.16_75)] bg-[oklch(0.85_0.18_80)] text-[oklch(0.15_0.02_80)] shadow-lg transition-transform group-hover:scale-105">
                <span className="text-lg md:text-xl font-bold tracking-tight">T</span>
              </div>
              <div className="leading-tight">
                <div className="text-lg md:text-xl font-bold text-white tracking-wide">
                  TUHI <span className="text-[oklch(0.85_0.18_80)]">Car Rental</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="group relative rounded-full px-5 py-2.5 text-sm font-medium text-white/80 transition-all hover:bg-[oklch(0.85_0.18_80)] hover:text-[oklch(0.15_0.02_80)]"
                  activeProps={{
                    className:
                      "rounded-full px-5 py-2.5 text-sm font-semibold bg-[oklch(0.85_0.18_80)] text-[oklch(0.15_0.02_80)] shadow-md",
                  }}
                  activeOptions={{ exact: true }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Book Now Button */}
              <Link
                to="/book"
                className="hidden md:inline-flex bg-[oklch(0.85_0.18_80)] text-[oklch(0.15_0.02_80)] px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:bg-[oklch(0.90_0.16_85)] transition-all hover:shadow-xl hover:scale-105"
              >
                <Car size={15} className="inline mr-1" /> Book Now
              </Link>

              {/* Mobile Menu Button */}
              <button
                aria-label="Toggle menu"
                className="grid h-11 w-11 place-items-center rounded-full bg-[oklch(0.85_0.18_80)] text-[oklch(0.15_0.02_80)] transition-transform hover:scale-105 md:hidden"
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden"
            style={{ zIndex: 9998 }}
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div
            className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-[oklch(0.15_0.02_80)] shadow-2xl md:hidden"
            style={{ zIndex: 9999 }}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[oklch(0.85_0.18_80)] text-[oklch(0.15_0.02_80)]">
                  <span className="text-lg font-bold">T</span>
                </div>
                <div className="text-lg font-bold text-white">
                  TUHI <span className="text-[oklch(0.85_0.18_80)]">Car Rental</span>
                </div>
              </Link>
              <button
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex h-full flex-col overflow-y-auto p-4">
              <nav className="flex flex-col gap-2" style={{ pointerEvents: "auto" }}>
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
                    className="group flex items-center justify-between rounded-2xl px-6 py-4 text-base font-semibold text-white/80 transition-all hover:bg-[oklch(0.85_0.18_80)] hover:text-[oklch(0.15_0.02_80)] active:scale-95"
                    activeProps={{
                      className:
                        "flex items-center justify-between rounded-2xl px-6 py-4 text-base font-bold bg-[oklch(0.85_0.18_80)] text-[oklch(0.15_0.02_80)]",
                    }}
                    activeOptions={{ exact: true }}
                  >
                    <span>{n.label}</span>
                    <span className="text-white/40 group-hover:text-[oklch(0.15_0.02_80)] transition-colors text-lg">
                      →
                    </span>
                  </Link>
                ))}

                {/* Book Now Button */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link
                    to="/book"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setTimeout(() => {
                        window.location.href = "/book";
                      }, 100);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[oklch(0.85_0.18_80)] px-6 py-4 text-base font-bold text-[oklch(0.15_0.02_80)] shadow-lg transition-all hover:bg-[oklch(0.90_0.16_85)] active:scale-95"
                    style={{ pointerEvents: "auto" }}
                  >
                    <Car size={18} />
                    <span>Book Now</span>
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  <a
                    href={`tel:+${WHATSAPP_NUMBER}`}
                    className="flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-4 text-white/80 transition-colors hover:bg-white/10"
                  >
                    <Phone size={18} className="text-[oklch(0.85_0.18_80)]" />
                    <span className="font-semibold">{PHONE_DISPLAY}</span>
                  </a>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-4 text-white/80 transition-colors hover:bg-white/10"
                  >
                    <MessageCircle size={18} className="text-[oklch(0.25_0.08_145)]" />
                    <span className="font-semibold">WhatsApp Us</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
