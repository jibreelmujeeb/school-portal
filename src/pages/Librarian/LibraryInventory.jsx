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

export default function LibrarianLibraryInventoryPage() {
  
  const inventory = [
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

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Library Inventory
          </h1>

          <p className="text-gray-500 mt-1">
            Manage books, copies, stock and locations.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="border rounded-xl px-5 py-3
            flex items-center gap-2">
            <Download size={18} />
            Export
          </button>

          <button className="bg-blue-600 text-white
            rounded-xl px-5 py-3 flex items-center gap-2">
            <Plus size={18} />
            Add Inventory
          </button>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">

        <StatCard value="8,450" label="Total Copies" />
        <StatCard value="5,920" label="Available" />
        <StatCard value="2,180" label="Borrowed" />
        <StatCard value="210" label="Reserved" />
        <StatCard value="85" label="Damaged" />
        <StatCard value="55" label="Lost" />
        <StatCard value="120" label="Low Stock" />
        <StatCard value="48" label="Locations" />

      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row gap-3">

        <div className="border rounded-xl px-4 py-3
          flex items-center flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search book, ID, ISBN or barcode..."
            className="w-full ml-3 outline-none"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Locations</option>
          <option>Shelf A-12</option>
          <option>Shelf B-05</option>
          <option>Shelf B-08</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Conditions</option>
          <option>Good</option>
          <option>Minor Damage</option>
          <option>Major Damage</option>
          <option>Lost</option>
        </select>

      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">

        {[
          "All",
          "Available",
          "Borrowed",
          "Damaged",
          "Lost",
          "Low Stock",
        ].map((tab, index) => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-xl
              whitespace-nowrap ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "border"
              }`}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* Inventory Table */}
      <div className="border rounded-3xl overflow-hidden
        overflow-x-auto">

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

            {inventory.map((item) => (
              <InventoryRow
                key={item.id}
                item={item}
              />
            ))}

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

      <h2 className="text-xl font-bold mt-3">
        {value}
      </h2>

      <p className="text-xs text-gray-500">
        {label}
      </p>

    </div>
  );
}

function InventoryRow({ item }) {
  return (
    <tr className="border-b">

      <td className="p-4">

        <div className="flex items-center gap-3">

          <div className="w-10 h-12 border rounded-lg
            flex items-center justify-center">

            <BookOpen size={18} />

          </div>

          <div>
            <p className="font-semibold">
              {item.title}
            </p>

            <p className="text-xs text-gray-500">
              {item.id}
            </p>
          </div>

        </div>

      </td>

      <td className="p-4">
        {item.total}
      </td>

      <td className="p-4 text-green-600 font-medium">
        {item.available}
      </td>

      <td className="p-4">
        {item.borrowed}
      </td>

      <td className="p-4 text-orange-600">
        {item.damaged}
      </td>

      <td className="p-4 text-red-600">
        {item.lost}
      </td>

      <td className="p-4">

        <span className="flex items-center gap-1">
          <MapPin size={15} />
          {item.location}
        </span>

      </td>

      <td className="p-4">
        {item.condition}
      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <button className="border rounded-lg p-2">
            <Eye size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <Edit size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <ArrowRightLeft size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <AlertTriangle size={16} />
          </button>

        </div>

      </td>

    </tr>
  );
}