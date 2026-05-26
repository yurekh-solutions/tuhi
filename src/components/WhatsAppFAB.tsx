import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/cars";

export function WhatsAppFAB() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Tuhi Car Rental, I'd like to enquire about a booking.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_20px_50px_-10px_oklch(0.7_0.18_145/0.7)] transition-transform hover:scale-105"
      style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
    >
      <MessageCircle size={26} />
    </a>
  );
}
