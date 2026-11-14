import { useMemo, useState } from "react";
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

const initialReservations = [
  { id: "RS-4010", borrower: "John Doe", book: "Advanced Physics", date: "08 Aug 2026", priority: "High", pickup: "11 Aug 2026", status: "Ready" },
  { id: "RS-4011", borrower: "Mary Ali", book: "Biology Essentials", date: "07 Aug 2026", priority: "Normal", pickup: "10 Aug 2026", status: "Pending" },
  { id: "RS-4012", borrower: "David James", book: "English Literature", date: "06 Aug 2026", priority: "Low", pickup: "09 Aug 2026", status: "Collected" },
];

export default function ReservationsPage() {
  const [reservations, setReservations] = useState(initialReservations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [priorityFilter, setPriorityFilter] = useState("All Priorities");

  const filteredReservations = useMemo(() => {
    return reservations.filter((item) => {
      const matchesSearch = [item.borrower, item.book, item.id].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesStatus = statusFilter === "All Statuses" || item.status === statusFilter;
      const matchesPriority = priorityFilter === "All Priorities" || item.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [reservations, search, statusFilter, priorityFilter]);

  const handleNewReservation = () => {
    const borrower = window.prompt("Borrower name:", "");
    if (!borrower || !borrower.trim()) return;
    const book = window.prompt("Book title:", "");
    if (!book || !book.trim()) return;
    const pickup = window.prompt("Pickup date:", "15 Aug 2026");
    if (!pickup || !pickup.trim()) return;

    setReservations((current) => [{
      id: `RS-${Date.now().toString().slice(-4)}`,
      borrower: borrower.trim(),
      book: book.trim(),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      priority: "Normal",
      pickup: pickup.trim(),
      status: "Pending",
    }, ...current]);
  };

  const updateReservation = (id, status) => {
    setReservations((current) => current.map((entry) => (entry.id === id ? { ...entry, status } : entry)));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Book Reservations</h1>
          <p className="text-gray-500 mt-1">Manage reserved books and borrower collection schedules.</p>
        </div>

        <button onClick={handleNewReservation} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <CalendarDays size={18} />
          New Reservation
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={<BookOpen />} value={reservations.length.toLocaleString()} label="Total" />
        <StatCard icon={<CalendarDays />} value={reservations.filter((item) => item.status === "Pending").length.toLocaleString()} label="Pending" />
        <StatCard icon={<PackageCheck />} value={reservations.filter((item) => item.status === "Ready").length.toLocaleString()} label="Ready" />
        <StatCard icon={<Check />} value={reservations.filter((item) => item.status === "Collected").length.toLocaleString()} label="Collected" />
        <StatCard icon={<Bell />} value={reservations.filter((item) => item.priority === "High").length.toLocaleString()} label="Expiring Soon" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search borrower, book, ISBN or reservation ID..."
            className="w-full outline-none ml-3"
          />
        </div>

        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Ready</option>
          <option>Collected</option>
          <option>Expired</option>
          <option>Cancelled</option>
        </select>

        <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)} className="border rounded-xl px-4 py-3">
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
            {filteredReservations.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">No reservations match your current filters.</td>
              </tr>
            ) : (
              filteredReservations.map((item) => (
                <ReservationRow key={item.id} item={item} onUpdate={updateReservation} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">
      <div className="mb-3">{icon}</div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}

function ReservationRow({ item, onUpdate }) {
  return (
    <tr className="border-b">
      <td className="p-4 font-medium">{item.borrower}</td>
      <td className="p-4">{item.book}</td>
      <td className="p-4">{item.date}</td>
      <td className="p-4">{item.priority}</td>
      <td className="p-4">{item.pickup}</td>
      <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Ready" ? "bg-blue-100 text-blue-700" : item.status === "Collected" ? "bg-green-100 text-green-700" : item.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{item.status}</span></td>
      <td className="p-4">
        <div className="flex gap-2">
          <button title="View" className="border rounded-lg p-2"><Eye size={16} /></button>
          <button onClick={() => onUpdate(item.id, "Ready")} title="Approve" className="border rounded-lg p-2"><Check size={16} /></button>
          <button title="Notify" className="border rounded-lg p-2"><Bell size={16} /></button>
          <button onClick={() => onUpdate(item.id, "Cancelled")} title="Cancel" className="border rounded-lg p-2"><X size={16} /></button>
        </div>
      </td>
    </tr>
  );
}