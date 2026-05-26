import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Download, Users } from "lucide-react";
import { checkAdminAuth } from "@/lib/adminAuth";
import { getAllCustomers } from "@/lib/data.server";
import { createServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomersPage,
});

const fetchCustomers = createServerFn({ method: "POST" }).handler(async () => {
  return getAllCustomers();
});

function AdminCustomersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.navigate({ to: "/admin/login" });
    }
  }, [router]);

  const { data: customers = [], isLoading } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: () => fetchCustomers({}),
    enabled: checkAdminAuth(),
  });

  const filteredCustomers = customers.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery)
    );
  });

  function exportToCSV() {
    const headers = ["ID", "Name", "Phone", "Email", "Total Bookings", "Total Spent"];
    const rows = filteredCustomers.map((c) => [
      c.id,
      c.name,
      c.phone,
      c.email,
      c.totalBookings,
      c.totalSpent,
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customers.csv";
    a.click();
  }

  if (!checkAdminAuth()) return null;

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 lg:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Customers</h1>
          <button onClick={exportToCSV} className="btn-gold">
            <Download size={16} /> Export CSV
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search customers by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neu-input pl-10"
            />
          </div>
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
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto rounded-xl lg:block">
              <table className="neu w-full">
                <thead className="border-b border-[var(--border)] bg-[var(--muted)]">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Phone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                      Bookings
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
                      Total Spent
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b border-[var(--border)] last:border-0">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-8 w-8 place-items-center rounded-full bg-[var(--gradient-gold)] text-sm font-bold text-[oklch(0.25_0.05_260)]">
                            {customer.name[0]}
                          </div>
                          <span className="font-semibold">{customer.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{customer.phone}</td>
                      <td className="px-4 py-3 text-sm">{customer.email}</td>
                      <td className="px-4 py-3 text-sm font-semibold">{customer.totalBookings}</td>
                      <td className="px-4 py-3 text-sm font-bold">
                        ₹{customer.totalSpent.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 lg:hidden">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="neu-sm p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gradient-gold)] text-lg font-bold text-[oklch(0.25_0.05_260)]">
                      {customer.name[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{customer.name}</h3>
                      <p className="text-xs text-muted-foreground">{customer.phone}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-muted-foreground">Bookings</div>
                      <div className="font-bold">{customer.totalBookings}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Total Spent</div>
                      <div className="font-bold">
                        ₹{customer.totalSpent.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
