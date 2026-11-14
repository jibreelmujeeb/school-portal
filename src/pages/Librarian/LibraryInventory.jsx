import { useMemo, useState } from "react";
import {
  BookOpen,
  Package,
  Plus,
  Search,
  MapPin,
  Eye,
  Edit,
  ArrowRightLeft,
  AlertTriangle,
  Download,
} from "lucide-react";

const initialInventory = [
  {
    title: "Mathematics for SS2",
    id: "BK-000125",
    total: 25,
    available: 18,
    borrowed: 5,
    damaged: 1,
    lost: 1,
    location: "Shelf A-12",
    condition: "Good",
  },
  {
    title: "Advanced Physics",
    id: "BK-000126",
    total: 20,
    available: 12,
    borrowed: 6,
    damaged: 2,
    lost: 0,
    location: "Shelf B-05",
    condition: "Good",
  },
  {
    title: "Biology Essentials",
    id: "BK-000127",
    total: 15,
    available: 10,
    borrowed: 4,
    damaged: 1,
    lost: 0,
    location: "Shelf B-08",
    condition: "Good",
  },
];

export default function LibrarianLibraryInventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [condition, setCondition] = useState("All Conditions");
  const [activeTab, setActiveTab] = useState("All");

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch = [item.title, item.id, item.location].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesLocation = location === "All Locations" || item.location === location;
      const matchesCondition =
        condition === "All Conditions" ||
        (condition === "Good" && item.condition === "Good") ||
        (condition === "Minor Damage" && item.condition === "Minor Damage") ||
        (condition === "Major Damage" && item.condition === "Major Damage") ||
        (condition === "Lost" && item.lost > 0);
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Available" && item.available > 0) ||
        (activeTab === "Borrowed" && item.borrowed > 0) ||
        (activeTab === "Damaged" && item.damaged > 0) ||
        (activeTab === "Lost" && item.lost > 0) ||
        (activeTab === "Low Stock" && item.available <= 5);

      return matchesSearch && matchesLocation && matchesCondition && matchesTab;
    });
  }, [inventory, search, location, condition, activeTab]);

  const totalCopies = inventory.reduce((sum, item) => sum + item.total, 0);
  const totalAvailable = inventory.reduce((sum, item) => sum + item.available, 0);
  const totalBorrowed = inventory.reduce((sum, item) => sum + item.borrowed, 0);
  const totalDamaged = inventory.reduce((sum, item) => sum + item.damaged, 0);
  const totalLost = inventory.reduce((sum, item) => sum + item.lost, 0);

  const handleAddInventory = () => {
    const title = window.prompt("Book title:", "");
    if (!title || !title.trim()) return;
    const id = window.prompt("Book ID:", `BK-${Date.now().toString().slice(-6)}`);
    if (!id || !id.trim()) return;
    const total = window.prompt("Total copies:", "10");
    if (total === null || !Number.isInteger(Number(total)) || Number(total) < 0) return;
    const locationValue = window.prompt("Location:", "Shelf A-01");
    if (!locationValue || !locationValue.trim()) return;
    const conditionValue = window.prompt("Condition:", "Good");
    if (!conditionValue || !conditionValue.trim()) return;

    const entry = {
      title: title.trim(),
      id: id.trim(),
      total: Number(total),
      available: Number(total),
      borrowed: 0,
      damaged: 0,
      lost: 0,
      location: locationValue.trim(),
      condition: conditionValue.trim(),
    };

    setInventory((current) => [entry, ...current]);
  };

  const handleEditInventory = (item) => {
    const locationValue = window.prompt("Location:", item.location);
    if (locationValue === null || !locationValue.trim()) return;
    const conditionValue = window.prompt("Condition:", item.condition);
    if (conditionValue === null || !conditionValue.trim()) return;
    const totalValue = window.prompt("Total copies:", String(item.total));
    if (totalValue === null || !Number.isInteger(Number(totalValue)) || Number(totalValue) < 0) return;

    const nextTotal = Number(totalValue);
    setInventory((current) =>
      current.map((entry) => {
        if (entry.id !== item.id) return entry;
        const nextAvailable = Math.max(0, nextTotal - entry.borrowed - entry.damaged - entry.lost);
        return {
          ...entry,
          total: nextTotal,
          available: Math.max(0, nextAvailable),
          location: locationValue.trim(),
          condition: conditionValue.trim(),
        };
      })
    );
  };

  const handleDeleteInventory = (item) => {
    if (window.confirm(`Remove "${item.title}" from inventory?`)) {
      setInventory((current) => current.filter((entry) => entry.id !== item.id));
    }
  };

  const viewInventory = (item) => {
    window.alert(`${item.title}\nID: ${item.id}\nTotal: ${item.total}\nAvailable: ${item.available}\nBorrowed: ${item.borrowed}\nDamaged: ${item.damaged}\nLost: ${item.lost}\nLocation: ${item.location}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Library Inventory</h1>
          <p className="text-gray-500 mt-1">Manage books, copies, stock and locations.</p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
            <Download size={18} />
            Export
          </button>

          <button
            onClick={handleAddInventory}
            className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2"
          >
            <Plus size={18} />
            Add Inventory
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
        <StatCard value={totalCopies.toLocaleString()} label="Total Copies" />
        <StatCard value={totalAvailable.toLocaleString()} label="Available" />
        <StatCard value={totalBorrowed.toLocaleString()} label="Borrowed" />
        <StatCard value={0} label="Reserved" />
        <StatCard value={totalDamaged.toLocaleString()} label="Damaged" />
        <StatCard value={totalLost.toLocaleString()} label="Lost" />
        <StatCard value={inventory.filter((item) => item.available <= 5).length.toLocaleString()} label="Low Stock" />
        <StatCard value={new Set(inventory.map((item) => item.location)).size.toLocaleString()} label="Locations" />
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <div className="border rounded-xl px-4 py-3 flex items-center flex-1">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search book, ID, ISBN or barcode..."
            className="w-full ml-3 outline-none"
          />
        </div>

        <select value={location} onChange={(event) => setLocation(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Locations</option>
          <option>Shelf A-12</option>
          <option>Shelf B-05</option>
          <option>Shelf B-08</option>
          <option>Shelf A-01</option>
        </select>

        <select value={condition} onChange={(event) => setCondition(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Conditions</option>
          <option>Good</option>
          <option>Minor Damage</option>
          <option>Major Damage</option>
          <option>Lost</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {[
          "All",
          "Available",
          "Borrowed",
          "Damaged",
          "Lost",
          "Low Stock",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl whitespace-nowrap ${
              activeTab === tab ? "bg-blue-600 text-white" : "border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="border-b">
            <tr>
              <th className="p-4 text-left">Book</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Available</th>
              <th className="p-4 text-left">Borrowed</th>
              <th className="p-4 text-left">Damaged</th>
              <th className="p-4 text-left">Lost</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Condition</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan={9} className="p-8 text-center text-gray-500">
                  No inventory items match your filters.
                </td>
              </tr>
            ) : (
              filteredInventory.map((item) => (
                <InventoryRow
                  key={item.id}
                  item={item}
                  onView={viewInventory}
                  onEdit={handleEditInventory}
                  onDelete={handleDeleteInventory}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="border rounded-2xl p-4">
      <Package size={20} />
      <h2 className="text-xl font-bold mt-3">{value}</h2>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function InventoryRow({ item, onView, onEdit, onDelete }) {
  return (
    <tr className="border-b">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-12 border rounded-lg flex items-center justify-center">
            <BookOpen size={18} />
          </div>
          <div>
            <p className="font-semibold">{item.title}</p>
            <p className="text-xs text-gray-500">{item.id}</p>
          </div>
        </div>
      </td>

      <td className="p-4">{item.total}</td>
      <td className="p-4 text-green-600 font-medium">{item.available}</td>
      <td className="p-4">{item.borrowed}</td>
      <td className="p-4 text-orange-600">{item.damaged}</td>
      <td className="p-4 text-red-600">{item.lost}</td>

      <td className="p-4">
        <span className="flex items-center gap-1">
          <MapPin size={15} />
          {item.location}
        </span>
      </td>

      <td className="p-4">{item.condition}</td>

      <td className="p-4">
        <div className="flex gap-2">
          <button onClick={() => onView(item)} className="border rounded-lg p-2" aria-label={`View ${item.title}`}>
            <Eye size={16} />
          </button>

          <button onClick={() => onEdit(item)} className="border rounded-lg p-2" aria-label={`Edit ${item.title}`}>
            <Edit size={16} />
          </button>

          <button className="border rounded-lg p-2" aria-label={`Transfer ${item.title}`}>
            <ArrowRightLeft size={16} />
          </button>

          <button onClick={() => onDelete(item)} className="border rounded-lg p-2 text-red-600" aria-label={`Delete ${item.title}`}>
            <AlertTriangle size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
