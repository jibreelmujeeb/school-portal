import {
  Bell,
  Search,
  CheckCheck,
  Trash2,
  Archive,
  Eye,
  AlertTriangle,
  BookOpen,
  CalendarDays,
  DollarSign,
  User,
} from "lucide-react";

export default function LibrarianNotificationsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-500 mt-1">
            Stay updated with library activities and alerts.
          </p>
        </div>

        <button className="border px-5 py-3 rounded-xl flex items-center gap-2">
          <CheckCheck size={18} />
          Mark All as Read
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <StatCard
          icon={<Bell />}
          value="248"
          label="Total Notifications"
        />

        <StatCard
          icon={<Bell />}
          value="32"
          label="Unread"
        />

        <StatCard
          icon={<AlertTriangle />}
          value="8"
          label="Important"
        />

        <StatCard
          icon={<CalendarDays />}
          value="46"
          label="Today"
        />

      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">

        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search notifications..."
            className="w-full outline-none ml-3"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Types</option>
          <option>Overdue</option>
          <option>Reservation</option>
          <option>Book Request</option>
          <option>Fine Payment</option>
          <option>Book Returned</option>
          <option>Damaged Book</option>
          <option>Announcement</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Unread</option>
          <option>Read</option>
          <option>Archived</option>
        </select>

      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">

        <button className="px-5 py-2 rounded-xl bg-blue-600 text-white whitespace-nowrap">
          All
        </button>

        <button className="px-5 py-2 rounded-xl border whitespace-nowrap">
          Unread
        </button>

        <button className="px-5 py-2 rounded-xl border whitespace-nowrap">
          Important
        </button>

        <button className="px-5 py-2 rounded-xl border whitespace-nowrap">
          Archived
        </button>

      </div>

      {/* Notification List */}
      <div className="border rounded-3xl overflow-hidden">

        <NotificationItem
          icon={<AlertTriangle />}
          title="Overdue Book"
          message="John Doe has an overdue Physics book."
          time="10 minutes ago"
          priority="High"
          unread
        />

        <NotificationItem
          icon={<CalendarDays />}
          title="Reservation Ready"
          message="Advanced Physics is ready for collection."
          time="35 minutes ago"
          priority="Normal"
          unread
        />

        <NotificationItem
          icon={<BookOpen />}
          title="Book Returned"
          message="Mary Ali returned Biology Essentials."
          time="1 hour ago"
          priority="Normal"
        />

        <NotificationItem
          icon={<DollarSign />}
          title="Fine Payment"
          message="A fine payment of ₦2,000 was recorded."
          time="2 hours ago"
          priority="Normal"
        />

        <NotificationItem
          icon={<User />}
          title="New Book Request"
          message="A student submitted a new book request."
          time="3 hours ago"
          priority="Low"
        />

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

function NotificationItem({
  icon,
  title,
  message,
  time,
  priority,
  unread = false,
}) {
  return (
    <div
      className={`flex flex-col md:flex-row md:items-center gap-4 p-5 border-b ${
        unread ? "bg-blue-50" : ""
      }`}
    >

      <div className="w-11 h-11 rounded-xl border flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div className="flex-1">

        <div className="flex flex-wrap items-center gap-2">

          <h3 className="font-semibold">
            {title}
          </h3>

          {unread && (
            <span className="w-2 h-2 rounded-full bg-blue-600" />
          )}

          <span className="text-xs border rounded-full px-2 py-1">
            {priority}
          </span>

        </div>

        <p className="text-gray-500 text-sm mt-1">
          {message}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          {time}
        </p>

      </div>

      <div className="flex items-center gap-2">

        <button
          title="View"
          className="border rounded-lg p-2"
        >
          <Eye size={16} />
        </button>

        <button
          title="Archive"
          className="border rounded-lg p-2"
        >
          <Archive size={16} />
        </button>

        <button
          title="Delete"
          className="border rounded-lg p-2"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}