import sedan from "@/assets/car-sedan.jpg";
import suv from "@/assets/car-suv.jpg";
import hatch from "@/assets/car-hatchback.jpg";
import luxury from "@/assets/car-luxury.jpg";
import tempo from "@/assets/car-tempo.jpg";

export type CarClass = {
  id: string;
  name: string;
  tagline: string;
  seats: number;
  bags: number;
  ac: boolean;
  perKm: number;
  minFare: number;
  image: string;
  examples: string;
  transmission: "Manual" | "Automatic";
  fuel: "Petrol" | "Diesel" | "Hybrid";
  mileage: string;
  features: string[];
  rating: number;
  trips: string;
};

export const CAR_CLASSES: CarClass[] = [
  {
    id: "hatchback",
    name: "Hatchback",
    tagline: "City rides, smart pricing",
    seats: 4,
    bags: 2,
    ac: true,
    perKm: 12,
    minFare: 1500,
    image: hatch,
    examples: "Swift · WagonR · Celerio",
    transmission: "Manual",
    fuel: "Petrol",
    mileage: "22 km/l",
    features: ["Music system", "Phone charger", "Bottled water"],
    rating: 4.7,
    trips: "12k+ trips",
  },
  {
    id: "sedan",
    name: "Sedan",
    tagline: "Comfort for outstation trips",
    seats: 4,
    bags: 3,
    ac: true,
    perKm: 14,
    minFare: 2000,
    image: sedan,
    examples: "Etios · Dzire · Amaze",
    transmission: "Manual",
    fuel: "Diesel",
    mileage: "20 km/l",
    features: ["Leather seats", "Boot space", "Reading lights", "USB charging"],
    rating: 4.8,
    trips: "28k+ trips",
  },
  {
    id: "suv",
    name: "SUV / Innova",
    tagline: "Spacious family travel",
    seats: 7,
    bags: 4,
    ac: true,
    perKm: 18,
    minFare: 2800,
    image: suv,
    examples: "Innova · Ertiga · Crysta",
    transmission: "Manual",
    fuel: "Diesel",
    mileage: "15 km/l",
    features: ["Captain seats", "Roof rails", "Rear AC", "Large boot"],
    rating: 4.9,
    trips: "34k+ trips",
  },
  {
    id: "luxury",
    name: "Luxury",
    tagline: "Premium executive class",
    seats: 4,
    bags: 3,
    ac: true,
    perKm: 45,
    minFare: 6000,
    image: luxury,
    examples: "Mercedes E · BMW 5 · Audi A6",
    transmission: "Automatic",
    fuel: "Hybrid",
    mileage: "14 km/l",
    features: ["Ambient lighting", "Massage seats", "Sunroof", "Bose audio", "Mini bar"],
    rating: 5.0,
    trips: "3k+ trips",
  },
  {
    id: "tempo",
    name: "Tempo Traveller",
    tagline: "Group trips up to 12",
    seats: 12,
    bags: 8,
    ac: true,
    perKm: 28,
    minFare: 5000,
    image: tempo,
    examples: "Force Urbania · 12-seater",
    transmission: "Manual",
    fuel: "Diesel",
    mileage: "10 km/l",
    features: ["Pushback seats", "LED TV", "Charging points", "Curtains"],
    rating: 4.8,
    trips: "9k+ trips",
  },
];

export const WHATSAPP_NUMBER = "919136242706";
export const PHONE_DISPLAY = "+91 91362 42706";
