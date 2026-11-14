import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Search,
  Clock3,
  Library,
  Bell,
  ChevronRight,
  X,
  Download,
  BookOpen,
  Plus,
} from "lucide-react";

const initialHolidays = [
  {
    id: 1,
    name: "Mid-Term Break",
    type: "Mid-Term Break",
    startDate: "2026-09-15",
    endDate: "2026-09-19",
    resumptionDate: "2026-09-21",
    term: "First Term",
    session: "2026/2027",
    libraryStatus: "Closed",
    description: "The school and library will be closed during the mid-term break.",
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
    libraryStatus: "Closed",
    description: "Public holiday. The school library will not operate.",
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
    libraryStatus: "Closed",
    description: "The school and library will be closed for the Christmas and New Year break.",
  },
];

const formatDate = (date) => new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="mt-2 text-xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className="rounded-xl bg-gray-100 p-3"><Icon size={21} /></div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Closed: "bg-gray-100 text-gray-700",
    Open: "bg-green-100 text-green-700",
    "Partial Closure": "bg-yellow-100 text-yellow-700",
    "Staff Activity": "bg-blue-100 text-blue-700",
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || "bg-gray-100 text-gray-700"}`}>{status}</span>;
}

export default function LibrarianHolidayManagement() {
  const [holidays, setHolidays] = useState(initialHolidays);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [libraryStatus, setLibraryStatus] = useState("All");
  const [selectedHoliday, setSelectedHoliday] = useState(null);

  const filteredHolidays = useMemo(() => {
    return holidays.filter((holiday) => {
      const matchesSearch = holiday.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = type === "All" || holiday.type === type;
      const matchesLibraryStatus = libraryStatus === "All" || holiday.libraryStatus === libraryStatus;
      return matchesSearch && matchesType && matchesLibraryStatus;
    });
  }, [holidays, search, type, libraryStatus]);

  const handleAddHoliday = () => {
    const name = window.prompt("Holiday name:", "Term Break");
    if (!name || !name.trim()) return;
    const typeName = window.prompt("Holiday type:", "Term Break");
    if (!typeName || !typeName.trim()) return;
    const startDate = window.prompt("Start date (YYYY-MM-DD):", "2027-01-12");
    if (!startDate || !startDate.trim()) return;
    const endDate = window.prompt("End date (YYYY-MM-DD):", "2027-01-20");
    if (!endDate || !endDate.trim()) return;
    const resumptionDate = window.prompt("Resumption date (YYYY-MM-DD):", "2027-01-21");
    if (!resumptionDate || !resumptionDate.trim()) return;

    setHolidays((current) => [{
      id: Date.now(),
      name: name.trim(),
      type: typeName.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
      resumptionDate: resumptionDate.trim(),
      term: "Second Term",
      session: "2026/2027",
      libraryStatus: "Closed",
      description: `${name.trim()} affects the library calendar and operations.`,
    }, ...current]);
  };

  const nextHoliday = useMemo(() => {
    const future = [...holidays].filter((item) => new Date(item.startDate) >= new Date()).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    return future[0] || holidays[0];
  }, [holidays]);

  const daysRemaining = nextHoliday ? Math.max(0, Math.ceil((new Date(nextHoliday.startDate) - new Date()) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays size={25} />
              <h1 className="text-2xl font-bold text-gray-900">Holiday Management</h1>
            </div>
            <p className="mt-1 text-sm text-gray-500">View school holidays and library closure dates.</p>
          </div>

          <div className="flex gap-2">
            <button onClick={handleAddHoliday} className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
              <Plus size={17} />
              Add Holiday
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-gray-50">
              <Download size={17} />
              Download Calendar
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={CalendarDays} label="Next Closure" value={nextHoliday ? new Date(nextHoliday.startDate).toLocaleDateString("en-NG", { day: "numeric", month: "short" }) : "N/A"} />
          <StatCard icon={Clock3} label="Days Remaining" value={`${daysRemaining} Day${daysRemaining === 1 ? "" : "s"}`} />
          <StatCard icon={Library} label="Library Status" value={nextHoliday ? nextHoliday.libraryStatus : "Open"} />
          <StatCard icon={BookOpen} label="Total Holidays" value={holidays.length.toString()} />
        </div>

        <div className="mb-6 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4">
          <Bell size={20} className="mt-0.5 shrink-0 text-blue-600" />
          <div>
            <h3 className="font-semibold text-blue-900">Library Holiday Notice</h3>
            <p className="mt-1 text-sm text-blue-800">
              {nextHoliday ? `The library will be ${nextHoliday.libraryStatus.toLowerCase()} during ${nextHoliday.name} from ${formatDate(nextHoliday.startDate)} to ${formatDate(nextHoliday.endDate)}.` : "No upcoming holiday is scheduled."}
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search holiday..." className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 outline-none focus:border-gray-400" />
            </div>

            <select className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
              <option>2026/2027</option>
              <option>2025/2026</option>
            </select>

            <select value={type} onChange={(e) => setType(e.target.value)} className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
              <option value="All">All Holiday Types</option>
              <option value="Mid-Term Break">Mid-Term Break</option>
              <option value="Public Holiday">Public Holiday</option>
              <option value="Term Break">Term Break</option>
            </select>

            <select value={libraryStatus} onChange={(e) => setLibraryStatus(e.target.value)} className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
              <option value="All">All Library Status</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="Partial Closure">Partial Closure</option>
              <option value="Staff Activity">Staff Activity</option>
            </select>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Upcoming Holidays</h2>
              <p className="text-sm text-gray-500">Official school and library closure dates</p>
            </div>
            <span className="text-sm text-gray-500">{filteredHolidays.length} holidays</span>
          </div>

          <div className="space-y-3">
            {filteredHolidays.map((holiday) => (
              <div key={holiday.id} className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100"><Library size={22} /></div>
                    <div>
                      <h3 className="font-bold text-gray-900">{holiday.name}</h3>
                      <p className="mt-1 text-sm text-gray-500">{formatDate(holiday.startDate)} - {formatDate(holiday.endDate)}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">{holiday.type}</span>
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">{holiday.term}</span>
                        <StatusBadge status={holiday.libraryStatus} />
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setSelectedHoliday(holiday)} className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium hover:bg-gray-50">
                    View Details
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            ))}

            {filteredHolidays.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
                <CalendarDays size={35} className="mx-auto mb-3 text-gray-400" />
                <p className="font-medium text-gray-700">No holidays found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedHoliday && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 p-5">
              <h2 className="text-lg font-bold">Holiday Details</h2>
              <button onClick={() => setSelectedHoliday(null)} className="rounded-lg p-2 hover:bg-gray-100"><X size={20} /></button>
            </div>

            <div className="space-y-5 p-5">
              <div>
                <div className="flex items-center gap-2">
                  <Library size={22} />
                  <h3 className="text-xl font-bold">{selectedHoliday.name}</h3>
                </div>
                <p className="mt-1 text-sm text-gray-500">{selectedHoliday.type}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="mt-1 font-medium">{formatDate(selectedHoliday.startDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">End Date</p>
                  <p className="mt-1 font-medium">{formatDate(selectedHoliday.endDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Resumption</p>
                  <p className="mt-1 font-medium">{formatDate(selectedHoliday.resumptionDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Academic Session</p>
                  <p className="mt-1 font-medium">{selectedHoliday.session}</p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Library size={18} />
                    <span className="font-semibold">Library Status</span>
                  </div>
                  <StatusBadge status={selectedHoliday.libraryStatus} />
                </div>
                <p className="text-sm text-gray-500">The library will be {selectedHoliday.libraryStatus.toLowerCase()} during this period.</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-sm leading-6 text-gray-600">{selectedHoliday.description}</p>
              </div>
            </div>

            <div className="border-t border-gray-200 p-5">
              <button onClick={() => setSelectedHoliday(null)} className="w-full rounded-xl bg-gray-900 py-3 text-sm font-medium text-white">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}