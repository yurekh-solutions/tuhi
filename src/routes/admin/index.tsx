import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  Car,
  Calendar,
  Users,
  LogOut,
  Menu,
  X,
  TrendingUp,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { checkAdminAuth, clearAdminAuth } from "@/lib/adminAuth";
import { getAdminStats } from "@/lib/admin.server";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.navigate({ to: "/admin/login" });
    }
  }, [router]);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => getAdminStats({}),
    enabled: checkAdminAuth(),
  });

  function handleLogout() {
    clearAdminAuth();
    router.navigate({ to: "/admin/login" });
  }

  if (!checkAdminAuth()) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-[var(--surface)] shadow-lg transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-xl font-bold">TUHI Admin</h1>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-4">
            <Link
              to="/admin"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold bg-[var(--muted)] text-foreground"
            >
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link
              to="/admin/cars"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-[var(--muted)] hover:text-foreground"
            >
              <Car size={18} /> Cars
            </Link>
            <Link
              to="/admin/bookings"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-[var(--muted)] hover:text-foreground"
            >
              <Calendar size={18} /> Bookings
            </Link>
            <Link
              to="/admin/customers"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-[var(--muted)] hover:text-foreground"
            >
              <Users size={18} /> Customers
            </Link>
          </nav>

          <div className="border-t border-[var(--border)] px-4 py-4 space-y-2">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-[var(--muted)] hover:text-foreground"
            >
              <ArrowLeft size={18} /> Back to Website
            </Link>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-destructive hover:bg-[var(--muted)]"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu size={20} />
            </button>
            <h2 className="text-lg font-bold lg:hidden">Dashboard</h2>
            <div className="hidden lg:block" />
            <div className="text-sm text-muted-foreground">Welcome, Admin</div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 lg:p-6">
          {isLoading ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="neu animate-pulse p-6">
                  <div className="h-4 w-1/2 rounded bg-[var(--muted)]" />
                  <div className="mt-2 h-8 w-3/4 rounded bg-[var(--muted)]" />
                </div>
              ))}
            </div>
          ) : stats ? (
            <>
              {/* Stats Cards */}
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="neu p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">Total Bookings</div>
                    <Calendar size={20} className="text-[oklch(0.5_0.12_75)]" />
                  </div>
                  <div className="mt-2 text-3xl font-bold">{stats.totalBookings}</div>
                </div>

                <div className="neu p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
                    <TrendingUp size={20} className="text-[oklch(0.5_0.12_75)]" />
                  </div>
                  <div className="mt-2 text-3xl font-bold">
                    ₹{stats.totalRevenue.toLocaleString("en-IN")}
                  </div>
                </div>

                <div className="neu p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">Total Customers</div>
                    <Users size={20} className="text-[oklch(0.5_0.12_75)]" />
                  </div>
                  <div className="mt-2 text-3xl font-bold">{stats.totalCustomers}</div>
                </div>

                <div className="neu p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">Active Cars</div>
                    <Car size={20} className="text-[oklch(0.5_0.12_75)]" />
                  </div>
                  <div className="mt-2 text-3xl font-bold">{stats.activeCars}</div>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-bold">Recent Bookings</h3>
                <div className="neu overflow-x-auto">
                  {/* Desktop Table */}
                  <table className="hidden w-full lg:table">
                    <thead className="border-b border-[var(--border)] bg-[var(--muted)]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                          Customer
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                          Route
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                          Fare
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentBookings.map((booking) => (
                        <tr
                          key={booking.id}
                          className="border-b border-[var(--border)] last:border-0"
                        >
                          <td className="px-4 py-3 text-sm font-semibold">{booking.id}</td>
                          <td className="px-4 py-3 text-sm">{booking.customerName}</td>
                          <td className="px-4 py-3 text-sm">
                            {booking.from} → {booking.to}
                          </td>
                          <td className="px-4 py-3 text-sm">{booking.date}</td>
                          <td className="px-4 py-3 text-sm font-semibold">
                            ₹{booking.fare.toLocaleString("en-IN")}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                                booking.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : booking.status === "confirmed"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              <CheckCircle size={12} /> {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile Cards */}
                  <div className="space-y-3 p-4 lg:hidden">
                    {stats.recentBookings.map((booking) => (
                      <div key={booking.id} className="neu-sm p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold">{booking.id}</span>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              booking.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "confirmed"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <div className="mt-2 text-sm">{booking.customerName}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {booking.from} → {booking.to}
                        </div>
                        <div className="mt-2 flex items-center justify-between text-sm">
                          <span>{booking.date}</span>
                          <span className="font-bold">₹{booking.fare.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}
