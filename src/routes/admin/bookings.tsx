import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Calendar,
  Download,
  X,
  Check,
  Clock,
  XCircle,
  DollarSign,
  Truck,
  TrendingUp,
  Users,
  Car,
  AlertCircle,
} from "lucide-react";
import { checkAdminAuth } from "@/lib/adminAuth";
import { createServerFn } from "@tanstack/react-start";
import type { Booking } from "@/lib/data.server";
import {
  getAllBookings,
  getBookingAnalytics,
  updateBookingStatus,
  updatePaymentStatus,
  assignDriver,
} from "@/lib/data.server";

export const Route = createFileRoute("/admin/bookings")({
  component: AdminBookingsPage,
});

const fetchBookings = createServerFn({ method: "POST" }).handler(async () => {
  return getAllBookings();
});

const fetchAnalytics = createServerFn({ method: "POST" }).handler(async () => {
  return getBookingAnalytics();
});

const updateStatusFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; status: Booking["status"]; notes?: string }) => data)
  .handler(async ({ data }) => {
    updateBookingStatus(data.id, data.status, data.notes);
    return { success: true };
  });

const updatePaymentFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; paymentStatus: Booking["paymentStatus"] }) => data)
  .handler(async ({ data }) => {
    updatePaymentStatus(data.id, data.paymentStatus);
    return { success: true };
  });

const assignDriverFn = createServerFn({ method: "POST" })
  .inputValidator((data: { id: string; driverName: string }) => data)
  .handler(async ({ data }) => {
    assignDriver(data.id, data.driverName);
    return { success: true };
  });

type StatusOption = "all" | Booking["status"];
type PaymentOption = "all" | Booking["paymentStatus"];

function AdminBookingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusOption>("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentOption>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.navigate({ to: "/admin/login" });
    }
  }, [router]);

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => fetchBookings({}),
    enabled: checkAdminAuth(),
  });

  const { data: analytics } = useQuery({
    queryKey: ["bookings-analytics"],
    queryFn: () => fetchAnalytics({}),
    enabled: showAnalytics,
  });

  const statusMutation = useMutation({
    mutationFn: (data: { id: string; status: Booking["status"]; notes?: string }) =>
      updateStatusFn({ data }),
    onSuccess: () => refetch(),
  });

  const paymentMutation = useMutation({
    mutationFn: (data: { id: string; paymentStatus: Booking["paymentStatus"] }) =>
      updatePaymentFn({ data }),
    onSuccess: () => refetch(),
  });

  const driverMutation = useMutation({
    mutationFn: (data: { id: string; driverName: string }) => assignDriverFn({ data }),
    onSuccess: () => refetch(),
  });

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || b.paymentStatus === paymentFilter;
    const matchesDate = (!dateFrom || b.date >= dateFrom) && (!dateTo || b.date <= dateTo);
    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  function exportToCSV() {
    const headers = [
      "ID",
      "Customer",
      "Phone",
      "Email",
      "Car",
      "From",
      "To",
      "Date",
      "Time",
      "Distance",
      "Fare",
      "Status",
      "Payment",
      "Driver",
    ];
    const rows = filteredBookings.map((b) => [
      b.id,
      b.customerName,
      b.phone,
      b.email,
      b.carName,
      b.from,
      b.to,
      b.date,
      b.time,
      b.distance,
      b.fare,
      b.status,
      b.paymentStatus,
      b.driverName || "Not assigned",
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  }

  async function handleStatusChange(id: string, status: Booking["status"], notes?: string) {
    await statusMutation.mutateAsync({ id, status, notes });
  }

  async function handlePaymentChange(id: string, paymentStatus: Booking["paymentStatus"]) {
    await paymentMutation.mutateAsync({ id, paymentStatus });
  }

  async function handleDriverAssign(id: string, driverName: string) {
    await driverMutation.mutateAsync({ id, driverName });
  }

  if (!checkAdminAuth()) return null;

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 lg:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Booking Management</h1>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setShowAnalytics(!showAnalytics)} className="btn-gold">
              <TrendingUp size={16} /> Analytics
            </button>
            <button onClick={exportToCSV} className="btn-gold">
              <Download size={16} /> Export CSV
            </button>
          </div>
        </div>

        {/* Analytics Dashboard */}
        {showAnalytics && analytics && (
          <div className="mb-6 grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <div className="neu p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar size={16} /> Total
              </div>
              <div className="mt-2 text-2xl font-bold">{analytics.totalBookings}</div>
            </div>
            <div className="neu p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock size={16} /> Pending
              </div>
              <div className="mt-2 text-2xl font-bold text-yellow-600">
                {analytics.pendingCount}
              </div>
            </div>
            <div className="neu p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Check size={16} /> Confirmed
              </div>
              <div className="mt-2 text-2xl font-bold text-blue-600">
                {analytics.confirmedCount}
              </div>
            </div>
            <div className="neu p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Car size={16} /> Completed
              </div>
              <div className="mt-2 text-2xl font-bold text-green-600">
                {analytics.completedCount}
              </div>
            </div>
            <div className="neu p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign size={16} /> Revenue
              </div>
              <div className="mt-2 text-2xl font-bold">
                ₹{analytics.totalRevenue.toLocaleString("en-IN")}
              </div>
            </div>
            <div className="neu p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp size={16} /> Avg Fare
              </div>
              <div className="mt-2 text-2xl font-bold">
                ₹{analytics.averageFare.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by name, ID, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="neu-input pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusOption)}
              className="neu-input w-full sm:w-40"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as PaymentOption)}
              className="neu-input w-full sm:w-40"
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
            </select>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-muted-foreground" />
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="neu-input flex-1"
                placeholder="From"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">to</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="neu-input flex-1"
                placeholder="To"
              />
            </div>
            {(dateFrom || dateTo) && (
              <button
                onClick={() => {
                  setDateFrom("");
                  setDateTo("");
                }}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Clear dates
              </button>
            )}
          </div>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredBookings.length} of {bookings.length} bookings
        </div>

        {isLoading ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="neu animate-pulse p-4">
                <div className="h-4 w-1/2 rounded bg-[var(--muted)]" />
                <div className="mt-2 h-3 w-3/4 rounded bg-[var(--muted)]" />
              </div>
            ))}
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="neu p-8 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">No bookings found</p>
            <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto rounded-xl lg:block">
              <table className="neu w-full">
                <thead className="border-b border-[var(--border)] bg-[var(--muted)]">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase">ID</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase">
                      Customer
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase">Route</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase">Date</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase">Fare</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase">Payment</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase">Driver</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--muted)]/50"
                    >
                      <td className="px-3 py-3 text-sm font-semibold">{booking.id}</td>
                      <td className="px-3 py-3 text-sm">
                        <div className="font-semibold">{booking.customerName}</div>
                        <div className="text-xs text-muted-foreground">{booking.phone}</div>
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <div>{booking.from}</div>
                        <div className="text-xs text-muted-foreground">→ {booking.to}</div>
                      </td>
                      <td className="px-3 py-3 text-sm">
                        <div>{booking.date}</div>
                        <div className="text-xs text-muted-foreground">{booking.time}</div>
                      </td>
                      <td className="px-3 py-3 text-sm font-bold">
                        ₹{booking.fare.toLocaleString("en-IN")}
                      </td>
                      <td className="px-3 py-3">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusChange(booking.id, e.target.value as Booking["status"])
                          }
                          className={`rounded-full px-2 py-1 text-xs font-semibold border-0 cursor-pointer ${
                            booking.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : booking.status === "confirmed"
                                ? "bg-blue-100 text-blue-700"
                                : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-3 py-3">
                        <select
                          value={booking.paymentStatus}
                          onChange={(e) =>
                            handlePaymentChange(
                              booking.id,
                              e.target.value as Booking["paymentStatus"],
                            )
                          }
                          className={`rounded-full px-2 py-1 text-xs font-semibold border-0 cursor-pointer ${
                            booking.paymentStatus === "paid"
                              ? "bg-green-100 text-green-700"
                              : booking.paymentStatus === "partial"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="partial">Partial</option>
                        </select>
                      </td>
                      <td className="px-3 py-3">
                        {booking.driverName ? (
                          <div className="flex items-center gap-1 text-sm">
                            <Truck size={12} />
                            {booking.driverName}
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingBooking(booking)}
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Assign Driver
                          </button>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <button
                          onClick={() => setEditingBooking(booking)}
                          className="rounded-lg bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white hover:bg-[var(--primary)]/90"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 lg:hidden">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="neu-sm p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold">{booking.id}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        booking.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "confirmed"
                            ? "bg-blue-100 text-blue-700"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="mt-2 font-semibold">{booking.customerName}</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {booking.from} → {booking.to}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span>{booking.date}</span>
                    <span className="font-bold text-foreground">
                      ₹{booking.fare.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value as Booking["status"])
                      }
                      className="flex-1 rounded-lg border px-2 py-1 text-xs"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => setEditingBooking(booking)}
                      className="flex-1 rounded-lg bg-[var(--primary)] px-2 py-1 text-xs font-semibold text-white"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Edit Modal */}
      {editingBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="glass w-full max-w-lg rounded-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Edit Booking {editingBooking.id}</h2>
              <button
                onClick={() => setEditingBooking(null)}
                className="rounded-full p-2 hover:bg-[var(--muted)]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                    Status
                  </label>
                  <select
                    value={editingBooking.status}
                    onChange={(e) =>
                      setEditingBooking({
                        ...editingBooking,
                        status: e.target.value as Booking["status"],
                      })
                    }
                    className="neu-input"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                    Payment
                  </label>
                  <select
                    value={editingBooking.paymentStatus}
                    onChange={(e) =>
                      setEditingBooking({
                        ...editingBooking,
                        paymentStatus: e.target.value as Booking["paymentStatus"],
                      })
                    }
                    className="neu-input"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="partial">Partial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                  Driver Name
                </label>
                <input
                  type="text"
                  value={editingBooking.driverName || ""}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      driverName: e.target.value,
                    })
                  }
                  placeholder="Enter driver name..."
                  className="neu-input"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase text-muted-foreground">
                  Notes
                </label>
                <textarea
                  value={editingBooking.notes || ""}
                  onChange={(e) =>
                    setEditingBooking({
                      ...editingBooking,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Add notes..."
                  rows={3}
                  className="neu-input"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setEditingBooking(null)}
                className="flex-1 rounded-xl border py-3 font-semibold hover:bg-[var(--muted)]"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await handleStatusChange(editingBooking.id, editingBooking.status);
                  await handlePaymentChange(editingBooking.id, editingBooking.paymentStatus);
                  if (editingBooking.driverName) {
                    await handleDriverAssign(editingBooking.id, editingBooking.driverName);
                  }
                  setEditingBooking(null);
                }}
                className="btn-gold flex-1"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
