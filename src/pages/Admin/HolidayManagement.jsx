import { useState } from "react";
import {
  CalendarDays,
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const initialHolidays = [
  {
    id: "HOL-001",
    name: "Independence Day",
    type: "Public Holiday",
    session: "2026/2027",
    start: "2026-10-01",
    end: "2026-10-01",
    status: "Published",
  },
  {
    id: "HOL-002",
    name: "Mid-Term Break",
    type: "Mid-Term Break",
    session: "2026/2027",
    start: "2026-11-12",
    end: "2026-11-16",
    status: "Published",
  },
  {
    id: "HOL-003",
    name: "Christmas Holiday",
    type: "Christmas Break",
    session: "2026/2027",
    start: "2026-12-20",
    end: "2027-01-05",
    status: "Draft",
  },
];

function AdminHolidayManagement() {
  const [holidays, setHolidays] = useState(initialHolidays);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [sessionFilter, setSessionFilter] = useState("2026/2027");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showForm, setShowForm] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [calendarView, setCalendarView] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredHolidays = holidays.filter((holiday) =>
    [holiday.name, holiday.type, holiday.id].some((value) =>
      value.toLowerCase().includes(search.trim().toLowerCase())
    ) &&
    (typeFilter === "All Types" || holiday.type === typeFilter) &&
    (sessionFilter === "All Sessions" || holiday.session === sessionFilter) &&
    (statusFilter === "All Status" || holiday.status === statusFilter)
  );

  const saveHoliday = (details) => {
    const holiday = {
      ...details,
      id: editingHoliday?.id || `HOL-${String(Date.now()).slice(-6)}`,
      status: details.status || "Draft",
    };
    setHolidays((current) => editingHoliday
      ? current.map((item) => item.id === editingHoliday.id ? holiday : item)
      : [holiday, ...current]);
    setShowForm(false);
    setEditingHoliday(null);
    setNotice("Holiday details saved in this page only. No notifications were sent.");
  };

  const deleteHoliday = (holiday) => {
    if (!window.confirm(`Delete "${holiday.name}"?`)) return;
    setHolidays((current) => current.filter((item) => item.id !== holiday.id));
    setSelectedHoliday(null);
  };

  const openEdit = (holiday) => {
    setSelectedHoliday(null);
    setEditingHoliday(holiday);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="text-blue-600" size={26} />

            <h1 className="text-2xl font-bold text-gray-900">
              Holiday Management
            </h1>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Manage school holidays and closure dates
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Holiday
        </button>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <StatCard
          icon={<CalendarDays />}
          title="Total Holidays"
          value={holidays.length}
        />

        <StatCard
          icon={<Clock />}
          title="Upcoming"
          value={holidays.filter((holiday) => holiday.start >= new Date().toISOString().slice(0, 10) && holiday.status !== "Cancelled").length}
        />

        <StatCard
          icon={<CheckCircle2 />}
          title="Active"
          value={holidays.filter((holiday) => holiday.start <= new Date().toISOString().slice(0, 10) && holiday.end >= new Date().toISOString().slice(0, 10) && holiday.status === "Published").length}
        />

        <StatCard
          icon={<CalendarDays />}
          title="This Session"
          value={holidays.filter((holiday) => holiday.session === "2026/2027").length}
        />

      </div>

      {/* Filters */}
      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4">

        <div className="flex flex-col gap-3 lg:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search holidays..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 outline-none focus:border-blue-500"
            />

          </div>

          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
            <option>All Types</option>
            <option>Public Holiday</option>
            <option>School Holiday</option>
            <option>Mid-Term Break</option>
            <option>Term Break</option>
            <option>Christmas Break</option>
          </select>

          <select value={sessionFilter} onChange={(event) => setSessionFilter(event.target.value)} className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
            <option>All Sessions</option>
            <option>2026/2027</option>
            <option>2025/2026</option>
          </select>

          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border border-gray-200 px-4 py-2.5 outline-none">
            <option>All Status</option>
            <option>Published</option>
            <option>Draft</option>
            <option>Cancelled</option>
          </select>

        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">

        <div className="flex items-center justify-between border-b border-gray-200 p-4">

          <h2 className="font-semibold text-gray-900">
            Holiday Calendar
          </h2>

          <button onClick={() => setCalendarView((current) => !current)} className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
            {calendarView ? "List View" : "Calendar View"}
          </button>

        </div>

        {calendarView ? (
          <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredHolidays.slice().sort((a, b) => a.start.localeCompare(b.start)).map((holiday) => (
              <button key={holiday.id} onClick={() => setSelectedHoliday(holiday)} className="rounded-xl border p-4 text-left hover:bg-gray-50">
                <p className="font-semibold">{holiday.start} – {holiday.end}</p>
                <p className="mt-1">{holiday.name}</p>
                <p className="mt-1 text-sm text-gray-500">{holiday.type} · {holiday.status}</p>
              </button>
            ))}
            {filteredHolidays.length === 0 && <p className="col-span-full py-8 text-center text-sm text-gray-500">No holidays match your filters.</p>}
          </div>
        ) : <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] text-left">

            <thead className="bg-gray-50 text-sm text-gray-500">
              <tr>
                <th className="px-5 py-4">Holiday</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Session</th>
                <th className="px-5 py-4">Start</th>
                <th className="px-5 py-4">End</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredHolidays.map((holiday) => (

                <tr key={holiday.id} className="hover:bg-gray-50">

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <CalendarDays size={19} />
                      </div>

                      <div>
                        <p className="font-medium text-gray-900">
                          {holiday.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {holiday.id}
                        </p>
                      </div>

                    </div>

                  </td>

                  <td className="px-5 py-4 text-sm">
                    {holiday.type}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {holiday.session}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {holiday.start}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {holiday.end}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={holiday.status} />
                  </td>

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-1">

                      <button
                        onClick={() => setSelectedHoliday(holiday)}
                        className="rounded-lg p-2 hover:bg-gray-100"
                        title="View"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        onClick={() => openEdit(holiday)}
                        className="rounded-lg p-2 hover:bg-gray-100"
                        title="Edit"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => deleteHoliday(holiday)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}
              {filteredHolidays.length === 0 && <tr><td colSpan={7} className="px-5 py-8 text-center text-gray-500">No holidays match your filters.</td></tr>}

            </tbody>

          </table>

        </div>}
      </div>

      {/* Add Holiday Modal */}
      {showForm && (
        <HolidayForm
          holiday={editingHoliday}
          onClose={() => { setShowForm(false); setEditingHoliday(null); }}
          onSave={saveHoliday}
        />
      )}

      {/* Details Modal */}
      {selectedHoliday && (
        <HolidayDetails
          holiday={selectedHoliday}
          onClose={() => setSelectedHoliday(null)}
          onEdit={() => openEdit(selectedHoliday)}
          onCancel={() => {
            setHolidays((current) => current.map((item) => item.id === selectedHoliday.id ? { ...item, status: "Cancelled" } : item));
            setSelectedHoliday(null);
            setNotice("Holiday marked cancelled in this page only.");
          }}
        />
      )}
      {notice && <p role="status" className="mt-4 text-sm text-blue-700">{notice}</p>}

    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">

      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
        {icon}
      </div>

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-1 text-2xl font-bold text-gray-900">
        {value}
      </h2>

    </div>
  );
}

function StatusBadge({ status }) {

  const styles = {
    Draft: "bg-gray-100 text-gray-700",
    Published: "bg-blue-50 text-blue-700",
    Active: "bg-green-50 text-green-700",
    Completed: "bg-purple-50 text-purple-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || styles.Draft
      }`}
    >
      {status}
    </span>
  );
}

function HolidayForm({ holiday, onClose, onSave }) {
  const submitForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSave({
      name: data.get("name").trim(),
      type: data.get("type"),
      session: data.get("session"),
      start: data.get("start"),
      end: data.get("end"),
      description: data.get("description").trim(),
      status: holiday?.status || "Draft",
      notifyStudents: data.has("notifyStudents"),
      notifyParents: data.has("notifyParents"),
      notifyTeachers: data.has("notifyTeachers"),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">

        <div className="border-b border-gray-200 p-5">
          <h2 className="text-lg font-bold">
            {holiday ? "Edit Holiday" : "Create New Holiday"}
          </h2>

          <p className="text-sm text-gray-500">
            Add a holiday to the school calendar
          </p>
        </div>

        <form onSubmit={submitForm} className="space-y-5 p-5">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Holiday Name *
            </label>

            <input
              name="name"
              required
              type="text"
              placeholder="e.g. Christmas Holiday"
              defaultValue={holiday?.name || ""}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Holiday Type *
              </label>

              <select name="type" required defaultValue={holiday?.type || ""} className="w-full rounded-xl border border-gray-200 px-4 py-3">
                <option value="">Select type</option>
                <option>Public Holiday</option>
                <option>School Holiday</option>
                <option>Mid-Term Break</option>
                <option>Term Break</option>
                <option>Staff Training</option>
                <option>Emergency Closure</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Academic Session *
              </label>

              <select name="session" defaultValue={holiday?.session || "2026/2027"} className="w-full rounded-xl border border-gray-200 px-4 py-3">
                <option>2026/2027</option>
                <option>2025/2026</option>
              </select>
            </div>

          </div>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Start Date *
              </label>

              <input
                name="start"
                required
                type="date"
                defaultValue={holiday?.start || ""}
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                End Date *
              </label>

              <input
                name="end"
                required
                type="date"
                defaultValue={holiday?.end || ""}
                className="w-full rounded-xl border border-gray-200 px-4 py-3"
              />
            </div>

          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows="4"
              placeholder="Describe this holiday..."
              defaultValue={holiday?.description || ""}
              className="w-full resize-none rounded-xl border border-gray-200 p-4 outline-none focus:border-blue-500"
            />
          </div>

          <div className="rounded-xl border border-gray-200 p-4">

            <p className="mb-3 font-medium">
              Notifications
            </p>

            <label className="mb-3 flex gap-3 text-sm">
              <input name="notifyStudents" type="checkbox" defaultChecked={holiday?.notifyStudents ?? true} />
              Notify students
            </label>

            <label className="mb-3 flex gap-3 text-sm">
              <input name="notifyParents" type="checkbox" defaultChecked={holiday?.notifyParents ?? true} />
              Notify parents
            </label>

            <label className="flex gap-3 text-sm">
              <input name="notifyTeachers" type="checkbox" defaultChecked={holiday?.notifyTeachers ?? true} />
              Notify teachers
            </label>

          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-200 px-5 py-2.5 font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white"
            >
              Save Holiday
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

function HolidayDetails({ holiday, onClose, onEdit, onCancel }) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white">

        <div className="flex items-center justify-between border-b border-gray-200 p-5">

          <div>
            <h2 className="font-bold">
              {holiday.name}
            </h2>

            <p className="text-sm text-gray-500">
              {holiday.id}
            </p>
          </div>

          <button onClick={onClose}>
            <XCircle size={20} />
          </button>

        </div>

        <div className="space-y-4 p-5">

          <StatusBadge status={holiday.status} />

          <Info label="Holiday Type" value={holiday.type} />
          <Info label="Academic Session" value={holiday.session} />
          <Info label="Start Date" value={holiday.start} />
          <Info label="End Date" value={holiday.end} />

          <div className="flex gap-2 border-t border-gray-200 pt-4">

            <button onClick={onEdit} className="flex-1 rounded-xl border border-gray-200 py-2.5">
              Edit
            </button>

            <button onClick={onCancel} disabled={holiday.status === "Cancelled"} className="flex-1 rounded-xl bg-red-600 py-2.5 text-white disabled:opacity-50">
              {holiday.status === "Cancelled" ? "Cancelled" : "Cancel Holiday"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

export default AdminHolidayManagement;