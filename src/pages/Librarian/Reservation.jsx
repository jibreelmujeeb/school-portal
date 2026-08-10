import {
  Search,
  Eye,
  Check,
  X,
  Bell,
  CalendarDays,
  BookOpen,
  PackageCheck,
  Download,
} from "lucide-react";

export default function ReservationsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Book Reservations
          </h1>

          <p className="text-gray-500 mt-1">
            Manage reserved books and borrower collection schedules.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <CalendarDays size={18} />
          New Reservation
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

        <StatCard
          icon={<BookOpen />}
          value="245"
          label="Total"
        />

        <StatCard
          icon={<CalendarDays />}
          value="32"
          label="Pending"
        />

        <StatCard
          icon={<PackageCheck />}
          value="48"
          label="Ready"
        />

        <StatCard
          icon={<Check />}
          value="142"
          label="Collected"
        />

        <StatCard
          icon={<Bell />}
          value="23"
          label="Expiring Soon"
        />

      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">

        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search borrower, book, ISBN or reservation ID..."
            className="w-full outline-none ml-3"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Ready for Collection</option>
          <option>Collected</option>
          <option>Expired</option>
          <option>Cancelled</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Priorities</option>
          <option>High</option>
          <option>Normal</option>
          <option>Low</option>
        </select>

        <button className="border rounded-xl px-4 py-3 flex items-center justify-center gap-2">
          <Download size={18} />
          Export
        </button>

      </div>

      {/* Reservation Table */}
      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1100px]">

          <thead className="border-b">
            <tr>
              <th className="text-left p-4">Borrower</th>
              <th className="text-left p-4">Book</th>
              <th className="text-left p-4">Reserved On</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Pickup Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            <ReservationRow
              borrower="John Doe"
              book="Advanced Physics"
              date="08 Aug 2026"
              priority="High"
              pickup="11 Aug 2026"
              status="Ready"
            />

            <ReservationRow
              borrower="Mary Ali"
              book="Biology Essentials"
              date="07 Aug 2026"
              priority="Normal"
              pickup="10 Aug 2026"
              status="Pending"
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

      <p className="text-gray-500">
        {label}
      </p>
    </div>
  );
}

function ReservationRow({
  borrower,
  book,
  date,
  priority,
  pickup,
  status,
}) {
  return (
    <tr className="border-b">

      <td className="p-4 font-medium">
        {borrower}
      </td>

      <td className="p-4">
        {book}
      </td>

      <td className="p-4">
        {date}
      </td>

      <td className="p-4">
        {priority}
      </td>

      <td className="p-4">
        {pickup}
      </td>

      <td className="p-4">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700">
          {status}
        </span>
      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <button
            title="View"
            className="border rounded-lg p-2"
          >
            <Eye size={16} />
          </button>

          <button
            title="Approve"
            className="border rounded-lg p-2"
          >
            <Check size={16} />
          </button>

          <button
            title="Notify"
            className="border rounded-lg p-2"
          >
            <Bell size={16} />
          </button>

          <button
            title="Cancel"
            className="border rounded-lg p-2"
          >
            <X size={16} />
          </button>

        </div>

      </td>

    </tr>
  );
}