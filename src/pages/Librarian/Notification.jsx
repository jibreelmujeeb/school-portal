import { useMemo, useState } from "react";
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

const initialNotifications = [
  { id: 1, type: "Overdue", title: "Overdue Book", message: "John Doe has an overdue Physics book.", time: "10 minutes ago", priority: "High", status: "Unread" },
  { id: 2, type: "Reservation", title: "Reservation Ready", message: "Advanced Physics is ready for collection.", time: "35 minutes ago", priority: "Normal", status: "Unread" },
  { id: 3, type: "Book Returned", title: "Book Returned", message: "Mary Ali returned Biology Essentials.", time: "1 hour ago", priority: "Normal", status: "Read" },
  { id: 4, type: "Fine Payment", title: "Fine Payment", message: "A fine payment of ₦2,000 was recorded.", time: "2 hours ago", priority: "Normal", status: "Read" },
  { id: 5, type: "Book Request", title: "New Book Request", message: "A student submitted a new book request.", time: "3 hours ago", priority: "Low", status: "Archived" },
];

export default function LibrarianNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [tab, setTab] = useState("All");

  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      const matchesSearch = [item.title, item.message, item.type].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesType = typeFilter === "All Types" || item.type === typeFilter;
      const matchesStatus = statusFilter === "All Status" || item.status === statusFilter;
      const matchesTab = tab === "All" || (tab === "Unread" && item.status === "Unread") || (tab === "Important" && item.priority === "High") || (tab === "Archived" && item.status === "Archived");
      return matchesSearch && matchesType && matchesStatus && matchesTab;
    });
  }, [notifications, search, typeFilter, statusFilter, tab]);

  const handleMarkAllRead = () => setNotifications((current) => current.map((item) => ({ ...item, status: "Read" })));
  const handleRead = (id) => setNotifications((current) => current.map((item) => item.id === id ? { ...item, status: "Read" } : item));
  const handleArchive = (id) => setNotifications((current) => current.map((item) => item.id === id ? { ...item, status: "Archived" } : item));
  const handleDelete = (id) => setNotifications((current) => current.filter((item) => item.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated with library activities and alerts.</p>
        </div>

        <button onClick={handleMarkAllRead} className="border px-5 py-3 rounded-xl flex items-center gap-2">
          <CheckCheck size={18} />
          Mark All as Read
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard icon={<Bell />} value={notifications.length.toLocaleString()} label="Total Notifications" />
        <StatCard icon={<Bell />} value={notifications.filter((item) => item.status === "Unread").length.toLocaleString()} label="Unread" />
        <StatCard icon={<AlertTriangle />} value={notifications.filter((item) => item.priority === "High").length.toLocaleString()} label="Important" />
        <StatCard icon={<CalendarDays />} value={notifications.filter((item) => item.status === "Read").length.toLocaleString()} label="Today" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notifications..."
            className="w-full outline-none ml-3"
          />
        </div>

        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Types</option>
          <option>Overdue</option>
          <option>Reservation</option>
          <option>Book Request</option>
          <option>Fine Payment</option>
          <option>Book Returned</option>
          <option>Damaged Book</option>
          <option>Announcement</option>
        </select>

        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Unread</option>
          <option>Read</option>
          <option>Archived</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {['All', 'Unread', 'Important', 'Archived'].map((item) => (
          <button key={item} onClick={() => setTab(item)} className={`px-5 py-2 rounded-xl whitespace-nowrap ${tab === item ? 'bg-blue-600 text-white' : 'border'}`}>
            {item}
          </button>
        ))}
      </div>

      <div className="border rounded-3xl overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No notifications match your current selection.</div>
        ) : (
          filteredNotifications.map((item) => (
            <NotificationItem
              key={item.id}
              icon={item.type === "Overdue" ? <AlertTriangle /> : item.type === "Reservation" ? <CalendarDays /> : item.type === "Fine Payment" ? <DollarSign /> : item.type === "Book Request" ? <User /> : item.type === "Book Returned" ? <BookOpen /> : <Bell />}
              title={item.title}
              message={item.message}
              time={item.time}
              priority={item.priority}
              unread={item.status === "Unread"}
              onRead={() => handleRead(item.id)}
              onArchive={() => handleArchive(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          ))
        )}
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

function NotificationItem({ icon, title, message, time, priority, unread = false, onRead, onArchive, onDelete }) {
  return (
    <div className={`flex flex-col md:flex-row md:items-center gap-4 p-5 border-b ${unread ? "bg-blue-50" : ""}`}>
      <div className="w-11 h-11 rounded-xl border flex items-center justify-center shrink-0">{icon}</div>

      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold">{title}</h3>
          {unread && <span className="w-2 h-2 rounded-full bg-blue-600" />}
          <span className="text-xs border rounded-full px-2 py-1">{priority}</span>
        </div>

        <p className="text-gray-500 text-sm mt-1">{message}</p>
        <p className="text-xs text-gray-400 mt-2">{time}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={onRead} title="View" className="border rounded-lg p-2"><Eye size={16} /></button>
        <button onClick={onArchive} title="Archive" className="border rounded-lg p-2"><Archive size={16} /></button>
        <button onClick={onDelete} title="Delete" className="border rounded-lg p-2"><Trash2 size={16} /></button>
      </div>
    </div>
  );
}