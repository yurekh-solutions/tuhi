import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/cars";

export function SiteFooter() {
  return (
    <footer>
      {/* Top Bar - Yellow */}
      <div className="bg-[oklch(0.85_0.18_80)] text-[oklch(0.15_0.02_80)] py-3 text-xs md:text-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-4 md:gap-6">
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-1.5 font-semibold hover:opacity-80">
              <Phone size={14} /> {PHONE_DISPLAY}
            </a>
            <span className="hidden sm:inline">✉ bookings@tuhicarrental.in</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-semibold hover:opacity-80"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer - Black */}
      <div className="bg-[oklch(0.15_0.02_80)] border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold tracking-tight text-white">
                TUHI <span className="text-[oklch(0.85_0.18_80)]">Car Rental</span>
              </div>
              <p className="mt-3 max-w-md text-sm text-white/70">
                Pan-India outstation cabs, airport transfers, and local hires. Verified drivers, clean
                cars, transparent fares — every ride.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.85_0.18_80)]">
                Explore
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>
                  <Link to="/fleet" className="hover:text-[oklch(0.85_0.18_80)] transition-colors">
                    Our Fleet
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="hover:text-[oklch(0.85_0.18_80)] transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-[oklch(0.85_0.18_80)] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/book" className="hover:text-[oklch(0.85_0.18_80)] transition-colors">
                    Book Now
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.85_0.18_80)]">
                Contact
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <Phone size={14} className="mt-1 text-[oklch(0.85_0.18_80)]" /> {PHONE_DISPLAY}
                </li>
                <li className="flex items-start gap-2">
                  <Mail size={14} className="mt-1 text-[oklch(0.85_0.18_80)]" />{" "}
                  bookings@tuhicarrental.in
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={14} className="mt-1 text-[oklch(0.85_0.18_80)]" /> Taj Lands End,
                  Bandra, Mumbai
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
            <div>© {new Date().getFullYear()} Tuhi Car Rental Service. All rights reserved.</div>
            <div>Crafted for travellers across India.</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
