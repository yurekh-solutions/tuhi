import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/cars";

export function SiteFooter() {
  return (
    <footer className="px-3 pb-6 pt-10 md:px-6">
      <div className="glass-dark mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-2xl font-bold tracking-tight text-white">
              TUHI <span className="text-[oklch(0.86_0.12_85)]">Car Rental</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-white/70">
              Pan-India outstation cabs, airport transfers, and local hires.
              Verified drivers, clean cars, transparent fares — every ride.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="btn-ghost-glass !py-2 !px-4 text-sm">
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href={`tel:+${WHATSAPP_NUMBER}`} className="btn-ghost-glass !py-2 !px-4 text-sm">
                <Phone size={16} /> Call
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><Link to="/fleet" className="hover:text-white">Our Fleet</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/book" className="hover:text-white">Book Now</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/90">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2"><Phone size={14} className="mt-1" /> {PHONE_DISPLAY}</li>
              <li className="flex items-start gap-2"><Mail size={14} className="mt-1" /> bookings@tuhicarrental.in</li>
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-1" /> Taj Lands End, Bandra, Mumbai</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Tuhi Car Rental Service. All rights reserved.</div>
          <div>Crafted for travellers across India.</div>
        </div>
      </div>
    </footer>
  );
}
