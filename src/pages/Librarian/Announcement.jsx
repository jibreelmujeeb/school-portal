import {
  Search,
  Plus,
  Megaphone,
  Eye,
  Edit,
  Trash2,
  Pin,
  CalendarDays,
  Send,
} from "lucide-react";

export default function LibrarianAnnouncementPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Library Announcements
          </h1>

          <p className="text-gray-500 mt-1">
            Create and manage announcements for library users.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <Plus size={18} />
          Create Announcement
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">

        <StatCard
          icon={<Megaphone />}
          value="86"
          label="Total"
        />

        <StatCard
          icon={<Send />}
          value="62"
          label="Published"
        />

        <StatCard
          icon={<Edit />}
          value="12"
          label="Drafts"
        />

        <StatCard
          icon={<Pin />}
          value="8"
          label="Pinned"
        />

        <StatCard
          icon={<CalendarDays />}
          value="4"
          label="Scheduled"
        />

      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">

        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search announcements..."
            className="w-full ml-3 outline-none"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Types</option>
          <option>Library Event</option>
          <option>Library Rules</option>
          <option>Book Return</option>
          <option>New Books</option>
          <option>Library Closure</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Scheduled</option>
          <option>Archived</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Audiences</option>
          <option>Students</option>
          <option>Teachers</option>
          <option>Parents</option>
          <option>Staff</option>
        </select>

      </div>

      {/* Announcement Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        <AnnouncementCard
          title="Library Week 2026"
          type="Library Event"
          audience="Students + Teachers"
          date="10 Aug 2026"
          status="Published"
          views="428"
          pinned
        />

        <AnnouncementCard
          title="Book Return Reminder"
          type="Book Return"
          audience="Students"
          date="08 Aug 2026"
          status="Published"
          views="315"
        />

        <AnnouncementCard
          title="New E-Books Available"
          type="New Resources"
          audience="SS Students"
          date="06 Aug 2026"
          status="Draft"
          views="0"
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

function AnnouncementCard({
  title,
  type,
  audience,
  date,
  status,
  views,
  pinned = false,
}) {
  return (
    <div className="border rounded-3xl p-5">

      <div className="flex justify-between items-start">

        <div className="w-11 h-11 rounded-xl border flex items-center justify-center">
          <Megaphone size={20} />
        </div>

        {pinned && (
          <span className="flex items-center gap-1 text-sm">
            <Pin size={15} />
            Pinned
          </span>
        )}

      </div>

      <h3 className="text-lg font-semibold mt-5">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {type}
      </p>

      <div className="space-y-2 mt-4 text-sm">

        <p>
          <span className="font-medium">
            Audience:
          </span>{" "}
          {audience}
        </p>

        <p>
          <span className="font-medium">
            Date:
          </span>{" "}
          {date}
        </p>

        <p>
          <span className="font-medium">
            Views:
          </span>{" "}
          {views}
        </p>

      </div>

      <div className="flex items-center justify-between mt-5">

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
          {status}
        </span>

        <div className="flex gap-2">

          <button className="border rounded-lg p-2">
            <Eye size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <Edit size={16} />
          </button>

          <button className="border rounded-lg p-2">
            <Trash2 size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}