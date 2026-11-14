import { useMemo, useState } from "react";
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

const initialRequests = [
  { id: "RQ-3001", requester: "John Doe", book: "Advanced Physics", type: "New Book", date: "08 Aug 2026", priority: "High", status: "Pending" },
  { id: "RQ-3002", requester: "Mary Ali", book: "Biology Essentials", type: "Reservation", date: "07 Aug 2026", priority: "Normal", status: "Approved" },
  { id: "RQ-3003", requester: "Tunde Ade", book: "Literature Notes", type: "Unavailable Book", date: "05 Aug 2026", priority: "High", status: "Under Review" },
];

export default function BookRequestsPage() {
  const [requests, setRequests] = useState(initialRequests);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Request Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  const filteredRequests = useMemo(() => {
    return requests.filter((item) => {
      const matchesSearch = [item.requester, item.book, item.id, item.type].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesType = typeFilter === "All Request Types" || item.type === typeFilter;
      const matchesStatus = statusFilter === "All Statuses" || item.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [requests, search, typeFilter, statusFilter]);

  const handleAddRequest = () => {
    const requester = window.prompt("Requester name:", "");
    if (!requester || !requester.trim()) return;
    const book = window.prompt("Book title:", "");
    if (!book || !book.trim()) return;
    const type = window.prompt("Request type:", "New Book");
    if (!type || !type.trim()) return;
    const priority = window.prompt("Priority (High/Normal/Low):", "Normal");
    if (!priority || !priority.trim()) return;

    setRequests((current) => [{
      id: `RQ-${Date.now().toString().slice(-4)}`,
      requester: requester.trim(),
      book: book.trim(),
      type: type.trim(),
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      priority: priority.trim(),
      status: "Pending",
    }, ...current]);
  };

  const updateStatus = (id, status) => {
    setRequests((current) => current.map((entry) => entry.id === id ? { ...entry, status } : entry));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Book Requests</h1>
          <p className="text-gray-500 mt-1">Manage book reservations and requests from students and staff.</p>
        </div>

        <button onClick={handleAddRequest} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <Plus size={18} />
          Add Request
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<BookOpen />} value={requests.length.toLocaleString()} label="Total Requests" />
        <StatCard icon={<Clock />} value={requests.filter((item) => item.status === "Pending").length.toLocaleString()} label="Pending" />
        <StatCard icon={<Check />} value={requests.filter((item) => item.status === "Approved").length.toLocaleString()} label="Approved" />
        <StatCard icon={<FileText />} value={requests.filter((item) => item.status === "Fulfilled").length.toLocaleString()} label="Fulfilled" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search book, requester, ISBN or request ID..."
            className="w-full outline-none ml-3"
          />
        </div>

        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Request Types</option>
          <option>Book Reservation</option>
          <option>New Book</option>
          <option>Unavailable Book</option>
          <option>Renewal Request</option>
        </select>

        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="border rounded-xl px-4 py-3">
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
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">No requests match your current filters.</td>
              </tr>
            ) : (
              filteredRequests.map((item) => (
                <RequestRow key={item.id} item={item} onUpdate={updateStatus} />
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

function RequestRow({ item, onUpdate }) {
  return (
    <tr className="border-b">
      <td className="p-4 font-medium">{item.requester}</td>
      <td className="p-4">{item.book}</td>
      <td className="p-4">{item.type}</td>
      <td className="p-4">{item.date}</td>
      <td className="p-4">{item.priority}</td>
      <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Pending" ? "bg-yellow-100 text-yellow-700" : item.status === "Approved" ? "bg-green-100 text-green-700" : item.status === "Fulfilled" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>{item.status}</span></td>
      <td className="p-4">
        <div className="flex gap-2">
          <button className="border rounded-lg p-2" title="View"><Eye size={16} /></button>
          <button onClick={() => onUpdate(item.id, "Approved")} className="border rounded-lg p-2" title="Approve"><Check size={16} /></button>
          <button onClick={() => onUpdate(item.id, "Rejected")} className="border rounded-lg p-2" title="Reject"><X size={16} /></button>
        </div>
      </td>
    </tr>
  );
}