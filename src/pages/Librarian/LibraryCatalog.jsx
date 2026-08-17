import {
  Search,
  Plus,
  BookOpen,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Barcode,
  Download,
} from "lucide-react";

export default function LibrarianLibraryCatalogPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Library Catalog
          </h1>

          <p className="text-gray-500 mt-1">
            Browse and manage the complete library collection.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
            <Download size={18} />
            Export
          </button>

          <button className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
            <Plus size={18} />
            Add Book
          </button>

        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">

        <StatCard
          icon={<BookOpen />}
          value="4,250"
          label="Total Books"
        />

        <StatCard
          icon={<BookOpen />}
          value="2,840"
          label="Available"
        />

        <StatCard
          icon={<BookOpen />}
          value="1,180"
          label="Borrowed"
        />

        <StatCard
          icon={<BookOpen />}
          value="125"
          label="Reserved"
        />

        <StatCard
          icon={<BookOpen />}
          value="38"
          label="Damaged"
        />

        <StatCard
          icon={<BookOpen />}
          value="25"
          label="Lost"
        />

      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row gap-3">

        <div className="border rounded-xl px-4 py-3 flex items-center flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search title, author, ISBN or book ID..."
            className="outline-none w-full ml-3"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Categories</option>
          <option>Science</option>
          <option>Arts</option>
          <option>Commercial</option>
          <option>Literature</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>Physics</option>
          <option>Biology</option>
          <option>Chemistry</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Availability</option>
          <option>Available</option>
          <option>Borrowed</option>
          <option>Reserved</option>
          <option>Damaged</option>
          <option>Lost</option>
        </select>

      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">

        {[
          "All Books",
          "Available",
          "Borrowed",
          "Reserved",
          "Damaged",
          "Lost",
        ].map((item, index) => (
          <button
            key={item}
            className={`px-5 py-2 rounded-xl whitespace-nowrap ${
              index === 0
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            {item}
          </button>
        ))}

      </div>

      {/* Catalog */}
      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead className="border-b">
            <tr>
              <th className="text-left p-4">Book</th>
              <th className="text-left p-4">Author</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Copies</th>
              <th className="text-left p-4">Available</th>
              <th className="text-left p-4">Borrowed</th>
              <th className="text-left p-4">Location</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            <BookRow
              title="Mathematics for SS2"
              id="BK-000125"
              author="John Smith"
              category="Mathematics"
              copies="25"
              available="18"
              borrowed="5"
              location="Shelf A-12"
            />

            <BookRow
              title="Advanced Physics"
              id="BK-000126"
              author="A. Bello"
              category="Science"
              copies="20"
              available="12"
              borrowed="6"
              location="Shelf B-05"
            />

            <BookRow
              title="Biology Essentials"
              id="BK-000127"
              author="Mary Ali"
              category="Science"
              copies="15"
              available="10"
              borrowed="4"
              location="Shelf B-08"
            />

          </tbody>

        </table>

      </div>

    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">

      <div className="mb-3">
        {icon}
      </div>

      <h2 className="text-2xl font-bold">
        {value}
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        {label}
      </p>

    </div>
  );
}

function BookRow({
  title,
  id,
  author,
  category,
  copies,
  available,
  borrowed,
  location,
}) {
  return (
    <tr className="border-b">

      <td className="p-4">

        <div className="flex items-center gap-3">

          <div className="w-10 h-12 border rounded-lg flex items-center justify-center">
            <BookOpen size={18} />
          </div>

          <div>
            <p className="font-semibold">
              {title}
            </p>

            <p className="text-xs text-gray-500">
              {id}
            </p>
          </div>

        </div>

      </td>

      <td className="p-4">
        {author}
      </td>

      <td className="p-4">
        {category}
      </td>

      <td className="p-4">
        {copies}
      </td>

      <td className="p-4">
        <span className="text-green-600 font-medium">
          {available}
        </span>
      </td>

      <td className="p-4">
        {borrowed}
      </td>

      <td className="p-4">

        <div className="flex items-center gap-1 text-sm">
          <MapPin size={15} />
          {location}
        </div>

      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <button className="border rounded-lg p-2" title="View">
            <Eye size={16} />
          </button>

          <button className="border rounded-lg p-2" title="Edit">
            <Edit size={16} />
          </button>

          <button className="border rounded-lg p-2" title="Barcode">
            <Barcode size={16} />
          </button>

          <button className="border rounded-lg p-2" title="Delete">
            <Trash2 size={16} />
          </button>

        </div>

      </td>

    </tr>
  );
}