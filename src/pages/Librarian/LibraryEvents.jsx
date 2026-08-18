import {
  CalendarDays,
  Plus,
  Search,
  MapPin,
  Clock,
  Users,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

export default function LibrarianLibraryEventsPage() {
  const events = [
    {
      title: "National Reading Week",
      type: "Reading Week",
      date: "18 Aug 2026",
      time: "10:00 AM - 2:00 PM",
      venue: "School Library",
      participants: 250,
      status: "Upcoming",
    },
    {
      title: "Reading Competition",
      type: "Competition",
      date: "25 Aug 2026",
      time: "11:00 AM - 1:00 PM",
      venue: "School Library",
      participants: 85,
      status: "Upcoming",
    },
    {
      title: "E-Library Orientation",
      type: "Workshop",
      date: "05 Aug 2026",
      time: "9:00 AM - 11:00 AM",
      venue: "ICT Laboratory",
      participants: 120,
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Library Events
          </h1>

          <p className="text-gray-500 mt-1">
            Manage library programs, activities and events.
          </p>
        </div>

        <button
          className="bg-blue-600 text-white px-5 py-3
          rounded-xl flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Create Event
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<CalendarDays />}
          value="48"
          label="Total Events"
        />

        <StatCard
          icon={<CalendarDays />}
          value="12"
          label="Upcoming"
        />

        <StatCard
          icon={<Users />}
          value="1,280"
          label="Participants"
        />

        <StatCard
          icon={<CalendarDays />}
          value="34"
          label="Completed"
        />

      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-3">

        <div className="border rounded-xl px-4 py-3
          flex items-center flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search events..."
            className="w-full ml-3 outline-none"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Event Types</option>
          <option>Reading Week</option>
          <option>Book Fair</option>
          <option>Competition</option>
          <option>Workshop</option>
          <option>Book Club</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Upcoming</option>
          <option>Ongoing</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">

        {[
          "All",
          "Upcoming",
          "Ongoing",
          "Completed",
          "Cancelled",
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

      {/* Events */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        {events.map((event) => (
          <EventCard
            key={event.title}
            event={event}
          />
        ))}

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

      <p className="text-sm text-gray-500">
        {label}
      </p>

    </div>
  );
}

function EventCard({ event }) {
  return (
    <div className="border rounded-3xl overflow-hidden">

      {/* Image */}
      <div className="h-40 bg-gray-100
        flex items-center justify-center">

        <CalendarDays size={40} />

      </div>

      <div className="p-5">

        <div className="flex justify-between gap-3">

          <span className="text-sm">
            {event.type}
          </span>

          <span className="text-sm px-3 py-1
            rounded-full bg-green-100
            text-green-700">
            {event.status}
          </span>

        </div>

        <h3 className="text-xl font-semibold mt-3">
          {event.title}
        </h3>

        <div className="space-y-2 mt-4 text-sm
          text-gray-500">

          <p className="flex items-center gap-2">
            <CalendarDays size={16} />
            {event.date}
          </p>

          <p className="flex items-center gap-2">
            <Clock size={16} />
            {event.time}
          </p>

          <p className="flex items-center gap-2">
            <MapPin size={16} />
            {event.venue}
          </p>

          <p className="flex items-center gap-2">
            <Users size={16} />
            {event.participants} participants
          </p>

        </div>

        <div className="flex gap-2 mt-5">

          <button className="border rounded-lg p-2">
            <Eye size={17} />
          </button>

          <button className="border rounded-lg p-2">
            <Edit size={17} />
          </button>

          <button className="border rounded-lg p-2">
            <Trash2 size={17} />
          </button>

        </div>

      </div>

    </div>
  );
}