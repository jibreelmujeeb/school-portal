import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Search,
  Clock3,
  School,
  Bell,
  ChevronRight,
  X,
  Download,
} from "lucide-react";

const holidays = [
  {
    id: 1,
    name: "Mid-Term Break",
    type: "Mid-Term Break",
    startDate: "2026-09-15",
    endDate: "2026-09-19",
    resumptionDate: "2026-09-21",
    term: "First Term",
    session: "2026/2027",
    description:
      "Students and teachers are expected to observe the official mid-term break.",
  },
  {
    id: 2,
    name: "Independence Day",
    type: "Public Holiday",
    startDate: "2026-10-01",
    endDate: "2026-10-01",
    resumptionDate: "2026-10-02",
    term: "First Term",
    session: "2026/2027",
    description: "Public holiday. School activities will not hold.",
  },
  {
    id: 3,
    name: "Christmas Break",
    type: "Term Break",
    startDate: "2026-12-18",
    endDate: "2027-01-08",
    resumptionDate: "2027-01-11",
    term: "First Term",
    session: "2026/2027",
    description:
      "School will be closed for the Christmas and New Year holiday.",
  },
];

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="mt-2 text-xl font-bold text-gray-900">{value}</h3>
        </div>

        <div className="rounded-xl bg-gray-100 p-3">
          <Icon size={21} className="text-gray-700" />
        </div>
      </div>
    </div>
  );
}

export default function TeacherHolidayManagement() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const filteredHolidays = useMemo(() => {
    return holidays.filter((holiday) => {
      const matchesSearch = holiday.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        type === "All" || holiday.type === type;

      return matchesSearch && matchesType;
    });
  }, [search, type]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays size={25} />
              <h1 className="text-2xl font-bold text-gray-900">
                Holiday Management
              </h1>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              View official school holidays and closure dates.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50">
            <Download size={17} />
            Download Calendar
          </button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={CalendarDays}
            label="Next Holiday"
            value="15 Sept"
          />

          <StatCard
            icon={Clock3}
            label="Days Remaining"
            value="8 Days"
          />

          <StatCard
            icon={School}
            label="Current Term"
            value="First Term"
          />

          <StatCard
            icon={CalendarDays}
            label="Total Holidays"
            value="8"
          />
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search holiday..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 outline-none focus:border-gray-400"
              />
            </div>

            <select className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
              <option>2026/2027</option>
              <option>2025/2026</option>
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none"
            >
              <option value="All">All Holiday Types</option>
              <option value="Mid-Term Break">Mid-Term Break</option>
              <option value="Public Holiday">Public Holiday</option>
              <option value="Term Break">Term Break</option>
            </select>

          </div>
        </div>

        {/* Notification */}
        <div className="mb-6 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <Bell className="mt-0.5 text-blue-600" size={20} />

          <div>
            <h3 className="font-semibold text-blue-900">
              Holiday Update
            </h3>

            <p className="mt-1 text-sm text-blue-800">
              Christmas holiday resumption has been updated to
              11 January 2027.
            </p>
          </div>
        </div>

        {/* Holidays */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">
              Upcoming Holidays
            </h2>

            <span className="text-sm text-gray-500">
              {filteredHolidays.length} holidays
            </span>
          </div>

          <div className="space-y-3">
            {filteredHolidays.map((holiday) => (
              <div
                key={holiday.id}
                className="rounded-2xl border border-gray-200 bg-white p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <CalendarDays size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900">
                        {holiday.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {formatDate(holiday.startDate)} -{" "}
                        {formatDate(holiday.endDate)}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                          {holiday.type}
                        </span>

                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                          {holiday.term}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedHoliday(holiday)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
                  >
                    View Details
                    <ChevronRight size={17} />
                  </button>

                </div>
              </div>
            ))}

            {filteredHolidays.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                <CalendarDays
                  size={35}
                  className="mx-auto mb-3 text-gray-400"
                />
                <p className="font-medium text-gray-700">
                  No holidays found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedHoliday && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white">
            
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h2 className="text-lg font-bold">
                Holiday Details
              </h2>

              <button
                onClick={() => setSelectedHoliday(null)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <h3 className="text-xl font-bold">
                  {selectedHoliday.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedHoliday.type}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="mt-1 font-medium">
                    {formatDate(selectedHoliday.startDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">End Date</p>
                  <p className="mt-1 font-medium">
                    {formatDate(selectedHoliday.endDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Resumption</p>
                  <p className="mt-1 font-medium">
                    {formatDate(selectedHoliday.resumptionDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Academic Session</p>
                  <p className="mt-1 font-medium">
                    {selectedHoliday.session}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm leading-6 text-gray-600">
                  {selectedHoliday.description}
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                <School size={18} />
                School Closed
              </div>
            </div>

            <div className="border-t border-gray-200 p-5">
              <button
                onClick={() => setSelectedHoliday(null)}
                className="w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}