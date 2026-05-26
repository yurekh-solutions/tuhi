import { createServerFn } from "@tanstack/react-start";
import {
  getAllBookings,
  getAllCustomers,
  getAllCars,
  saveCars,
  createCar,
  updateCar,
  deleteCar,
  updateBookingStatus,
  updatePaymentStatus,
  assignDriver,
  getBookingsByDateRange,
  getBookingAnalytics,
} from "@/lib/data.server";
import type { Car } from "@/lib/data.server";

export const getAdminStats = createServerFn({ method: "POST" }).handler(async () => {
  const bookings = getAllBookings();
  const customers = getAllCustomers();
  const cars = getAllCars();

  const totalRevenue = bookings.reduce((sum, b) => sum + b.fare, 0);
  const activeCars = cars.filter((c) => c.available).length;

  return {
    totalBookings: bookings.length,
    totalRevenue,
    totalCustomers: customers.length,
    activeCars,
    recentBookings: bookings.slice(-10).reverse(),
  };
});

export const updateCarStatus = createServerFn({ method: "POST" })
  .inputValidator((data: { cars: Car[] }) => data)
  .handler(async ({ data }) => {
    saveCars(data.cars);
    return { success: true };
  });

export const deleteCarFn = createServerFn({ method: "POST" })
  .inputValidator((data: { carId: string }) => data)
  .handler(async ({ data }) => {
    deleteCar(data.carId);
    return { success: true };
  });

export const createCarFn = createServerFn({ method: "POST" })
  .inputValidator((data: { car: Car }) => data)
  .handler(async ({ data }) => {
    createCar(data.car);
    return { success: true };
  });

export const updateCarFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; updates: Partial<Car> }) => data)
  .handler(async ({ data }) => {
    updateCar(data.id, data.updates);
    return { success: true };
  });

export const updateBookingStatusFn = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      id: string;
      status: "pending" | "confirmed" | "completed" | "cancelled";
      notes?: string;
    }) => data,
  )
  .handler(async ({ data }) => {
    updateBookingStatus(data.id, data.status, data.notes);
    return { success: true };
  });

export const updateBookingPaymentFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; paymentStatus: "pending" | "paid" | "partial" }) => data)
  .handler(async ({ data }) => {
    updatePaymentStatus(data.id, data.paymentStatus);
    return { success: true };
  });

export const assignDriverFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; driverName: string }) => data)
  .handler(async ({ data }) => {
    assignDriver(data.id, data.driverName);
    return { success: true };
  });

export const getBookingsAnalyticsFn = createServerFn({ method: "POST" }).handler(async () => {
  return getBookingAnalytics();
});

export const getBookingsByDateFn = createServerFn({ method: "POST" })
  .inputValidator((data: { startDate: string; endDate: string }) => data)
  .handler(async ({ data }) => {
    return getBookingsByDateRange(data.startDate, data.endDate);
  });
