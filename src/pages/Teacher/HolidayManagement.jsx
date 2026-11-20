import React, { useMemo, useState } from "react";
import {
  Bell,
  CalendarDays,
  ChevronRight,
  Clock3,
  Download,
  School,
  Search,
  X,
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
    description: "Students and teachers are expected to observe the official mid-term break.",
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
    description: "School will be closed for the Christmas and New Year holiday.",
  },
];

const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const toCalendarDate = (date) => date.replaceAll("-", "");

const escapeCalendarText = (value) =>
  value.replaceAll("\\", "\\\\").replaceAll(";", "\\;").replaceAll(",", "\\,").replaceAll("\n", "\\n");

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="mt-2 text-xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="rounded-xl bg-gray-100 p-3 text-gray-700">
          {React.createElement(Icon, { size: 21 })}
        </div>
      </div>
    </div>
  );
}

export default function TeacherHolidayManagement() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [session, setSession] = useState("2026/2027");
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const sessions = [...new Set(holidays.map((holiday) => holiday.session))];
  const types = [...new Set(holidays.map((holiday) => holiday.type))];
  const sessionHolidays = useMemo(
    () => holidays.filter((holiday) =>
      holiday.session === session && (type === "All" || holiday.type === type),
    ),
    [session, type],
  );
  const filteredHolidays = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sessionHolidays.filter((holiday) =>
      [holiday.name, holiday.description, holiday.type]
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [search, sessionHolidays]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextHoliday = sessionHolidays
    .filter((holiday) => new Date(`${holiday.endDate}T00:00:00`) >= today)
    .sort((first, second) => first.startDate.localeCompare(second.startDate))[0];
  const daysUntilNextHoliday = nextHoliday
    ? Math.max(0, Math.ceil((new Date(`${nextHoliday.startDate}T00:00:00`) - today) / 86400000))
    : null;

  const downloadCalendar = () => {
    const events = filteredHolidays.flatMap((holiday) => {
      const endDate = new Date(`${holiday.endDate}T00:00:00`);
      endDate.setDate(endDate.getDate() + 1);
      const exclusiveEndDate = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, "0")}${String(endDate.getDate()).padStart(2, "0")}`;
      return [
        "BEGIN:VEVENT",
        `UID:school-holiday-${holiday.id}@school-portal`,
        `DTSTART;VALUE=DATE:${toCalendarDate(holiday.startDate)}`,
        `DTEND;VALUE=DATE:${exclusiveEndDate}`,
        `SUMMARY:${escapeCalendarText(holiday.name)}`,
        `DESCRIPTION:${escapeCalendarText(holiday.description)}`,
        "END:VEVENT",
      ];
    });
    const content = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//School Portal//Teacher Calendar//EN", ...events, "END:VCALENDAR"].join("\r\n");
    const url = URL.createObjectURL(new Blob([content], { type: "text/calendar;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `school-holidays-${session.replace("/", "-")}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-6 w-6" />
              <h1 className="text-2xl font-bold text-gray-900">Holiday Management</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">View school holidays, closure dates, and resumption details.</p>
          </div>
          <button
            type="button"
            onClick={downloadCalendar}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
          >
            <Download className="h-4 w-4" /> Download Calendar
          </button>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={CalendarDays} label="Next Holiday" value={nextHoliday ? formatDate(nextHoliday.startDate) : "None scheduled"} />
          <StatCard icon={Clock3} label="Days Remaining" value={daysUntilNextHoliday === null ? "-" : `${daysUntilNextHoliday} days`} />
          <StatCard icon={School} label="Upcoming Term" value={nextHoliday?.term || "Not set"} />
          <StatCard icon={CalendarDays} label="Holidays in Session" value={sessionHolidays.length} />
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-3">
            <label className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <span className="sr-only">Search holidays</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search holiday..."
                className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 outline-none focus:border-gray-400"
              />
            </label>
            <label>
              <span className="sr-only">Academic session</span>
              <select value={session} onChange={(event) => setSession(event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
                {sessions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span className="sr-only">Holiday type</span>
              <select value={type} onChange={(event) => setType(event.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
                <option value="All">All Holiday Types</option>
                {types.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
        </section>

        {nextHoliday && (
          <section className="flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <Bell className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
            <div>
              <h2 className="font-semibold text-blue-900">Next holiday: {nextHoliday.name}</h2>
              <p className="mt-1 text-sm text-blue-800">
                Starts {formatDate(nextHoliday.startDate)}. Students resume {formatDate(nextHoliday.resumptionDate)}.
              </p>
            </div>
          </section>
        )}

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">School Holidays</h2>
            <span className="text-sm text-gray-500">{filteredHolidays.length} holidays</span>
          </div>
          <div className="space-y-3">
            {filteredHolidays.map((holiday) => (
              <article key={holiday.id} className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{holiday.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{formatDate(holiday.startDate)} - {formatDate(holiday.endDate)}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">{holiday.type}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">{holiday.term}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedHoliday(holiday)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium hover:bg-gray-50"
                  >
                    View Details <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
            {!filteredHolidays.length && (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-600">
                No holidays match this search and filter.
              </div>
            )}
          </div>
        </section>
      </div>

      {selectedHoliday && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <section role="dialog" aria-modal="true" aria-labelledby="holiday-details" className="w-full max-w-lg rounded-2xl bg-white">
            <div className="flex items-center justify-between border-b p-5">
              <h2 id="holiday-details" className="text-lg font-bold">Holiday Details</h2>
              <button type="button" onClick={() => setSelectedHoliday(null)} aria-label="Close details" className="rounded-lg p-2 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-5 p-5">
              <div>
                <h3 className="text-xl font-bold">{selectedHoliday.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{selectedHoliday.type}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Start Date</p><p className="mt-1 font-medium">{formatDate(selectedHoliday.startDate)}</p></div>
                <div><p className="text-xs text-gray-500">End Date</p><p className="mt-1 font-medium">{formatDate(selectedHoliday.endDate)}</p></div>
                <div><p className="text-xs text-gray-500">Resumption</p><p className="mt-1 font-medium">{formatDate(selectedHoliday.resumptionDate)}</p></div>
                <div><p className="text-xs text-gray-500">Academic Session</p><p className="mt-1 font-medium">{selectedHoliday.session}</p></div>
              </div>
              <p className="rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">{selectedHoliday.description}</p>
              <div className="flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                <School className="h-4 w-4" /> School Closed
              </div>
            </div>
            <div className="border-t p-5">
              <button type="button" onClick={() => setSelectedHoliday(null)} className="w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white">Close</button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
