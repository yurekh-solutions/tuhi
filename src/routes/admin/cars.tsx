import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Search, X, Check, ToggleLeft, ToggleRight } from "lucide-react";
import { checkAdminAuth } from "@/lib/adminAuth";
import { fetchCars } from "@/routes/api-server/cars";
import { updateCarStatus, deleteCarFn, createCarFn, updateCarFn } from "@/lib/admin.server";
import type { Car } from "@/lib/data.server";

export const Route = createFileRoute("/admin/cars")({
  component: AdminCarsPage,
});

function AdminCarsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<Partial<Car>>({});

  useEffect(() => {
    if (!checkAdminAuth()) {
      router.navigate({ to: "/admin/login" });
    }
  }, [router]);

  const {
    data: cars = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-cars"],
    queryFn: () => fetchCars({ data: { category: "all" } }),
    enabled: checkAdminAuth(),
  });

  const filteredCars = cars.filter((car: Car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || car.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  function openAddModal() {
    setEditingCar(null);
    setFormData({
      id: `car-${Date.now()}`,
      name: "",
      category: "sedan",
      image: "/src/assets/car-sedan.jpg",
      seats: 4,
      bags: 2,
      ac: true,
      ratePerKm: 14,
      minFare: 2000,
      transmission: "Manual",
      fuel: "Petrol",
      description: "",
      available: true,
    });
    setShowModal(true);
  }

  function openEditModal(car: Car) {
    setEditingCar(car);
    setFormData({ ...car });
    setShowModal(true);
  }

  async function handleSave() {
    if (!formData.name || !formData.id) return;

    if (editingCar) {
      // Update existing car
      await updateCarFn({ data: { id: editingCar.id, updates: formData } });
    } else {
      // Create new car
      await createCarFn({ data: { car: formData as Car } });
    }

    setShowModal(false);
    refetch();
  }

  async function handleDelete(carId: string) {
    if (!confirm("Are you sure you want to delete this car?")) return;
    await deleteCarFn({ data: { carId } });
    refetch();
  }

  async function toggleAvailability(car: Car) {
    await updateCarFn({
      data: { id: car.id, updates: { available: !car.available } },
    });
    refetch();
  }

  if (!checkAdminAuth()) return null;

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 lg:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold">Manage Cars</h1>
          <button onClick={openAddModal} className="btn-gold">
            <Plus size={16} /> Add New Car
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              placeholder="Search cars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neu-input pl-10"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="neu-input w-full sm:w-48"
          >
            <option value="all">All Categories</option>
            <option value="hatchback">Hatchback</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV/MUV</option>
            <option value="luxury">Luxury</option>
            <option value="tempo">Tempo</option>
          </select>
        </div>

        {/* Cars List - Desktop Table */}
        <div className="hidden overflow-x-auto rounded-xl lg:block">
          <table className="neu w-full">
            <thead className="border-b border-[var(--border)] bg-[var(--muted)]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Car</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Rate/km</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Seats</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Available</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car: Car) => (
                <tr key={car.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{car.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {car.fuel} · {car.transmission}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm capitalize">{car.category}</td>
                  <td className="px-4 py-3 text-sm font-bold">₹{car.ratePerKm}</td>
                  <td className="px-4 py-3 text-sm">{car.seats}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleAvailability(car)} className="text-2xl">
                      {car.available ? (
                        <ToggleRight className="text-green-600" size={24} />
                      ) : (
                        <ToggleLeft className="text-gray-400" size={24} />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditModal(car)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cars List - Mobile Cards */}
        <div className="space-y-3 lg:hidden">
          {filteredCars.map((car: Car) => (
            <div key={car.id} className="neu-sm p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold">{car.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground capitalize">
                    {car.category} · {car.fuel}
                  </p>
                </div>
                <button onClick={() => toggleAvailability(car)} className="text-2xl">
                  {car.available ? (
                    <ToggleRight className="text-green-600" size={24} />
                  ) : (
                    <ToggleLeft className="text-gray-400" size={24} />
                  )}
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-sm">
                  <span className="font-bold">₹{car.ratePerKm}/km</span> · {car.seats} seats
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(car)}
                    className="rounded-lg p-2 text-blue-600"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="rounded-lg p-2 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="neu w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">{editingCar ? "Edit Car" : "Add New Car"}</h2>
                <button onClick={() => setShowModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold">Car Name</label>
                  <input
                    type="text"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="neu-input"
                    placeholder="e.g. Maruti Swift VXI"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Category</label>
                  <select
                    value={formData.category || "sedan"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="neu-input"
                  >
                    <option value="hatchback">Hatchback</option>
                    <option value="sedan">Sedan</option>
                    <option value="suv">SUV/MUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="tempo">Tempo</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Rate per km (₹)</label>
                  <input
                    type="number"
                    value={formData.ratePerKm || 0}
                    onChange={(e) =>
                      setFormData({ ...formData, ratePerKm: Number(e.target.value) })
                    }
                    className="neu-input"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Minimum Fare (₹)</label>
                  <input
                    type="number"
                    value={formData.minFare || 0}
                    onChange={(e) => setFormData({ ...formData, minFare: Number(e.target.value) })}
                    className="neu-input"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Seats</label>
                  <input
                    type="number"
                    value={formData.seats || 4}
                    onChange={(e) => setFormData({ ...formData, seats: Number(e.target.value) })}
                    className="neu-input"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Bags</label>
                  <input
                    type="number"
                    value={formData.bags || 2}
                    onChange={(e) => setFormData({ ...formData, bags: Number(e.target.value) })}
                    className="neu-input"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Transmission</label>
                  <select
                    value={formData.transmission || "Manual"}
                    onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                    className="neu-input"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold">Fuel Type</label>
                  <select
                    value={formData.fuel || "Petrol"}
                    onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                    className="neu-input"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold">Description</label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="neu-input"
                    rows={3}
                    placeholder="Brief description of the car..."
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={handleSave} className="btn-gold flex-1 justify-center">
                  <Check size={16} /> {editingCar ? "Update" : "Add"} Car
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-[var(--border)] px-4 py-2 hover:bg-[var(--muted)]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
