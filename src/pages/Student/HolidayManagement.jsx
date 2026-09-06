import { useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Search,
  ChevronRight,
  Download,
  Bell,
} from "lucide-react";

const holidays = [
  {
    id: "HOL-001",
    name: "Independence Day",
    type: "Public Holiday",
    startDate: "2026-10-01",
    endDate: "2026-10-01",
    session: "2026/2027",
    term: "First Term",
    description:
      "Public holiday. The school will remain closed for the day.",
  },
  {
    id: "HOL-002",
    name: "Mid-Term Break",
    type: "Mid-Term Break",
    startDate: "2026-11-12",
    endDate: "2026-11-16",
    session: "2026/2027",
    term: "First Term",
    description:
      "Students will be on mid-term break during this period.",
  },
  {
    id: "HOL-003",
    name: "Christmas Holiday",
    type: "Christmas Break",
    startDate: "2026-12-20",
    endDate: "2027-01-05",
    session: "2026/2027",
    term: "First Term",
    description:
      "Christmas and New Year school holiday.",
  },
];

function AdminStudentHolidays() {
  const [search, setSearch] = useState("");
  const [term, setTerm] = useState("All Terms");
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const filteredHolidays = useMemo(() => {
    return holidays.filter((holiday) => {
      const matchesSearch = holiday.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesTerm =
        term === "All Terms" || holiday.term === term;

      return matchesSearch && matchesTerm;
    });
  }, [search, term]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="text-blue-600" size={27} />

            <h1 className="text-2xl font-bold text-gray-900">
              School Holidays
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            View your school's official holiday calendar
          </p>
        </div>

        <button
          className="flex items-center justify-center gap-2 rounded-xl
          border border-gray-200 bg-white px-4 py-2.5 text-sm
          font-medium hover:bg-gray-50"
        >
          <Download size={17} />
          Download Calendar
        </button>

      </div>

      {/* Session */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">

        <select className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <option>2026/2027</option>
          <option>2025/2026</option>
        </select>

        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-3"
        >
          <option>All Terms</option>
          <option>First Term</option>
          <option>Second Term</option>
          <option>Third Term</option>
        </select>

      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          icon={<CalendarDays />}
          title="Next Holiday"
          value="Christmas Break"
        />

        <StatCard
          icon={<Clock3 />}
          title="Days Remaining"
          value="106"
        />

        <StatCard
          icon={<CalendarDays />}
          title="This Term"
          value="3"
        />

        <StatCard
          icon={<Bell />}
          title="Total Holidays"
          value="18"
        />

      </div>

      {/* Search */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2
            -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search holiday..."
            className="w-full rounded-xl border border-gray-200
            py-3 pl-10 pr-4 outline-none
            focus:border-blue-500"
          />

        </div>
      </div>

      {/* Upcoming */}
      <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5">

        <div className="mb-5">
          <h2 className="font-bold text-gray-900">
            Upcoming Holidays
          </h2>

          <p className="text-sm text-gray-500">
            Your upcoming school closure dates
          </p>
        </div>

        <div className="space-y-3">

          {filteredHolidays.map((holiday) => (

            <HolidayCard
              key={holiday.id}
              holiday={holiday}
              onClick={() => setSelectedHoliday(holiday)}
            />

          ))}

        </div>

        {filteredHolidays.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No holidays found.
          </div>
        )}

      </div>

      {/* Details */}
      {selectedHoliday && (
        <HolidayDetails
          holiday={selectedHoliday}
          onClose={() => setSelectedHoliday(null)}
        />
      )}

    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">

      <div className="mb-4 flex h-10 w-10 items-center justify-center
        rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-1 text-lg font-bold text-gray-900">
        {value}
      </h2>

    </div>
  );
}

function HolidayCard({ holiday, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-xl
      border border-gray-200 p-4 text-left
      transition hover:border-blue-300 hover:bg-blue-50/30"
    >

      <div className="flex h-12 w-12 shrink-0 items-center
        justify-center rounded-xl bg-blue-50 text-blue-600">
        <CalendarDays size={22} />
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex flex-wrap items-center gap-2">

          <h3 className="font-semibold text-gray-900">
            {holiday.name}
          </h3>

          <span className="rounded-full bg-gray-100 px-2.5 py-1
            text-xs text-gray-600">
            {holiday.type}
          </span>

        </div>

        <div className="mt-1 flex flex-wrap gap-3 text-sm text-gray-500">

          <span>
            {formatDate(holiday.startDate)}
          </span>

          {holiday.startDate !== holiday.endDate && (
            <>
              <span>—</span>
              <span>{formatDate(holiday.endDate)}</span>
            </>
          )}

        </div>

      </div>

      <ChevronRight
        size={20}
        className="shrink-0 text-gray-400"
      />

    </button>
  );
}

function HolidayDetails({ holiday, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center
      bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto
        rounded-2xl bg-white">

        <div className="border-b border-gray-200 p-5">

          <div className="flex h-12 w-12 items-center justify-center
            rounded-xl bg-blue-50 text-blue-600">
            <CalendarDays size={24} />
          </div>

          <h2 className="mt-4 text-xl font-bold">
            {holiday.name}
          </h2>

          <p className="text-sm text-gray-500">
            {holiday.type}
          </p>

        </div>

        <div className="space-y-4 p-5">

          <Info
            label="Start Date"
            value={formatDate(holiday.startDate)}
          />

          <Info
            label="End Date"
            value={formatDate(holiday.endDate)}
          />

          <Info
            label="Academic Session"
            value={holiday.session}
          />

          <Info
            label="Term"
            value={holiday.term}
          />

          <div className="rounded-xl border border-gray-200 p-4">

            <p className="mb-2 text-xs text-gray-500">
              Description
            </p>

            <p className="text-sm leading-6 text-gray-700">
              {holiday.description}
            </p>

          </div>

          <div className="rounded-xl border border-green-200
            bg-green-50 p-4">

            <p className="font-medium text-green-700">
              School Closed
            </p>

            <p className="mt-1 text-sm text-green-600">
              No regular classes or attendance will be
              scheduled during this holiday.
            </p>

          </div>

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-blue-600 px-4
            py-3 font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">

      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-medium text-gray-900">
        {value}
      </p>

    </div>
  );
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default AdminStudentHolidays;