import {
  Search,
  Plus,
  Eye,
  Check,
  X,
  Clock,
  BookOpen,
  FileText,
  Download,
} from "lucide-react";

export default function BookRequestsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Book Requests
          </h1>

          <p className="text-gray-500 mt-1">
            Manage book reservations and requests from students and staff.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <Plus size={18} />
          Add Request
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          icon={<BookOpen />}
          value="245"
          label="Total Requests"
        />

        <StatCard
          icon={<Clock />}
          value="42"
          label="Pending"
        />

        <StatCard
          icon={<Check />}
          value="86"
          label="Approved"
        />

        <StatCard
          icon={<FileText />}
          value="103"
          label="Fulfilled"
        />

      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">

        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search book, requester, ISBN or request ID..."
            className="w-full outline-none ml-3"
          />
        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Request Types</option>
          <option>Book Reservation</option>
          <option>New Book Request</option>
          <option>Unavailable Book</option>
          <option>Renewal Request</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Under Review</option>
          <option>Approved</option>
          <option>Fulfilled</option>
          <option>Rejected</option>
        </select>

        <button className="border rounded-xl px-4 py-3 flex items-center justify-center gap-2">
          <Download size={18} />
          Export
        </button>

      </div>

      {/* Requests Table */}
      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="border-b">
            <tr>
              <th className="text-left p-4">Requester</th>
              <th className="text-left p-4">Book</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Priority</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            <RequestRow
              requester="John Doe"
              book="Advanced Physics"
              type="New Book"
              date="08 Aug 2026"
              priority="High"
              status="Pending"
            />

            <RequestRow
              requester="Mary Ali"
              book="Biology Essentials"
              type="Reservation"
              date="07 Aug 2026"
              priority="Normal"
              status="Approved"
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

function RequestRow({
  requester,
  book,
  type,
  date,
  priority,
  status,
}) {
  return (
    <tr className="border-b">

      <td className="p-4 font-medium">
        
        {requester}
      </td>

      <td className="p-4">
        {book}
      </td>

      <td className="p-4">
        {type}
      </td>

      <td className="p-4">
        {date}
      </td>

      <td className="p-4">
        {priority}
      </td>

      <td className="p-4">
        <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
          {status}
        </span>
      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <button className="border rounded-lg p-2">
            <Eye size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <Check size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <X size={16} />
          </button>

        </div>

      </td>

    </tr>
  );
}