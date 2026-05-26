import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");

export type Car = {
  id: string;
  name: string;
  category: string;
  image: string;
  seats: number;
  bags: number;
  ac: boolean;
  ratePerKm: number;
  minFare: number;
  transmission: string;
  fuel: string;
  description: string;
  available: boolean;
};

export function getAllCars(): Car[] {
  const filePath = join(DATA_DIR, "cars.json");
  if (!existsSync(filePath)) return [];
  const data = readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function getCarsByCategory(category: string): Car[] {
  const cars = getAllCars();
  if (category === "all") return cars;
  return cars.filter((car) => car.category === category);
}

export function getCarById(id: string): Car | undefined {
  const cars = getAllCars();
  return cars.find((car) => car.id === id);
}

export function saveCars(cars: Car[]): void {
  const filePath = join(DATA_DIR, "cars.json");
  writeFileSync(filePath, JSON.stringify(cars, null, 2), "utf-8");
}

export function createCar(car: Car): Car {
  const cars = getAllCars();
  cars.push(car);
  saveCars(cars);
  return car;
}

export function updateCar(id: string, updates: Partial<Car>): Car | null {
  const cars = getAllCars();
  const index = cars.findIndex((car) => car.id === id);
  if (index === -1) return null;
  cars[index] = { ...cars[index], ...updates };
  saveCars(cars);
  return cars[index];
}

export function deleteCar(id: string): boolean {
  const cars = getAllCars();
  const filtered = cars.filter((car) => car.id !== id);
  if (filtered.length === cars.length) return false;
  saveCars(filtered);
  return true;
}

// Bookings
export type Booking = {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  carId: string;
  carName: string;
  from: string;
  to: string;
  date: string;
  time: string;
  distance: number;
  fare: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  tripType: "oneway" | "round" | "airport" | "local";
  createdAt: string;
  updatedAt: string;
  notes: string;
  driverName: string;
  paymentStatus: "pending" | "paid" | "partial";
};

export function getAllBookings(): Booking[] {
  const filePath = join(DATA_DIR, "bookings.json");
  if (!existsSync(filePath)) return [];
  const data = readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function saveBookings(bookings: Booking[]): void {
  const filePath = join(DATA_DIR, "bookings.json");
  writeFileSync(filePath, JSON.stringify(bookings, null, 2), "utf-8");
}

export function updateBookingStatus(
  id: string,
  status: Booking["status"],
  notes?: string,
): Booking | null {
  const bookings = getAllBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;
  bookings[index] = {
    ...bookings[index],
    status,
    notes: notes ?? bookings[index].notes,
    updatedAt: new Date().toISOString(),
  };
  saveBookings(bookings);
  return bookings[index];
}

export function updatePaymentStatus(
  id: string,
  paymentStatus: Booking["paymentStatus"],
): Booking | null {
  const bookings = getAllBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;
  bookings[index] = {
    ...bookings[index],
    paymentStatus,
    updatedAt: new Date().toISOString(),
  };
  saveBookings(bookings);
  return bookings[index];
}

export function assignDriver(id: string, driverName: string): Booking | null {
  const bookings = getAllBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index === -1) return null;
  bookings[index] = {
    ...bookings[index],
    driverName,
    updatedAt: new Date().toISOString(),
  };
  saveBookings(bookings);
  return bookings[index];
}

export function getBookingsByDateRange(startDate: string, endDate: string): Booking[] {
  const bookings = getAllBookings();
  return bookings.filter((b) => b.date >= startDate && b.date <= endDate);
}

export function getBookingsByStatus(status: Booking["status"]): Booking[] {
  const bookings = getAllBookings();
  return bookings.filter((b) => b.status === status);
}

export function getBookingAnalytics(): {
  totalBookings: number;
  totalRevenue: number;
  pendingCount: number;
  confirmedCount: number;
  completedCount: number;
  cancelledCount: number;
  averageFare: number;
  totalDistance: number;
  popularRoutes: { route: string; count: number }[];
  bookingsByDay: { date: string; count: number; revenue: number }[];
} {
  const bookings = getAllBookings();
  const completed = bookings.filter((b) => b.status === "completed");

  // Calculate popular routes
  const routeCounts: Record<string, number> = {};
  bookings.forEach((b) => {
    const route = `${b.from} → ${b.to}`;
    routeCounts[route] = (routeCounts[route] || 0) + 1;
  });
  const popularRoutes = Object.entries(routeCounts)
    .map(([route, count]) => ({ route, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Calculate bookings by day
  const dayCounts: Record<string, { count: number; revenue: number }> = {};
  bookings.forEach((b) => {
    if (!dayCounts[b.date]) dayCounts[b.date] = { count: 0, revenue: 0 };
    dayCounts[b.date].count++;
    dayCounts[b.date].revenue += b.fare;
  });
  const bookingsByDay = Object.entries(dayCounts)
    .map(([date, data]) => ({ date, ...data }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return {
    totalBookings: bookings.length,
    totalRevenue: completed.reduce((sum, b) => sum + b.fare, 0),
    pendingCount: bookings.filter((b) => b.status === "pending").length,
    confirmedCount: bookings.filter((b) => b.status === "confirmed").length,
    completedCount: completed.length,
    cancelledCount: bookings.filter((b) => b.status === "cancelled").length,
    averageFare:
      bookings.length > 0
        ? Math.round(bookings.reduce((sum, b) => sum + b.fare, 0) / bookings.length)
        : 0,
    totalDistance: bookings.reduce((sum, b) => sum + b.distance, 0),
    popularRoutes,
    bookingsByDay,
  };
}

// Customers
export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalBookings: number;
  totalSpent: number;
  createdAt: string;
};

export function getAllCustomers(): Customer[] {
  const filePath = join(DATA_DIR, "customers.json");
  if (!existsSync(filePath)) return [];
  const data = readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function saveCustomers(customers: Customer[]): void {
  const filePath = join(DATA_DIR, "customers.json");
  writeFileSync(filePath, JSON.stringify(customers, null, 2), "utf-8");
}
