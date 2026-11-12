import React, { useMemo, useState } from "react";
import {
  Bell,
  Search,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Pin,
  Archive,
  Eye,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialNotifications = [
  {
    id: 1,
    title: "Payment Verified",
    message: "John David's tuition payment has been verified.",
    time: "5 mins ago",
    priority: "High",
    read: false,
    pinned: true,
    archived: false,
  },
  {
    id: 2,
    title: "Outstanding Fees",
    message: "Mary Johnson has an outstanding balance of ₦45,000.",
    time: "Yesterday",
    priority: "Medium",
    read: true,
    pinned: false,
    archived: false,
  },
];

export default function AccountantNotificationsPage() {
  const [notifications, setNotifications, storageError] = usePersistentState(
    "accountant-notifications",
    initialNotifications
  );
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return notifications.filter((item) => {
      const matchesSearch = `${item.title} ${item.message}`.toLowerCase().includes(query);
      const matchesFilter = filter === "Archived"
        ? item.archived
        : !item.archived && (
          filter === "All" ||
          (filter === "Unread" && !item.read) ||
          (filter === "Pinned" && item.pinned)
        );
      return matchesSearch && matchesFilter;
    });
  }, [notifications, search, filter]);

  const updateNotification = (id, changes) => {
    setNotifications((current) => current.map((item) =>
      item.id === id ? { ...item, ...changes } : item
    ));
  };

  const unreadCount = notifications.filter((item) => !item.read && !item.archived).length;
  const highPriorityCount = notifications.filter((item) => item.priority === "High" && !item.archived).length;
  const pinnedCount = notifications.filter((item) => item.pinned && !item.archived).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="mt-2 text-gray-500">Stay updated with payment, receipt, and financial activities.</p>
        </div>
        <button
          onClick={() => {
            setNotifications((current) => current.map((item) => ({ ...item, read: true })));
            setMessage("All notifications marked as read.");
          }}
          disabled={unreadCount === 0}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          Mark All as Read
        </button>
      </div>

      {storageError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Stat icon={<Bell />} label="Total" value={notifications.filter((item) => !item.archived).length} />
        <Stat icon={<CheckCircle />} label="Unread" value={unreadCount} />
        <Stat icon={<AlertTriangle />} label="High Priority" value={highPriorityCount} />
        <Stat icon={<Pin />} label="Pinned" value={pinnedCount} />
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <label className="flex flex-1 items-center rounded-xl border px-4 py-3">
          <Search className="mr-3" />
          <span className="sr-only">Search notifications</span>
          <input className="w-full outline-none" placeholder="Search notifications..." value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
        <label className="sr-only" htmlFor="notification-filter">Filter notifications</label>
        <select id="notification-filter" value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-xl border px-4 py-3">
          <option>All</option>
          <option>Unread</option>
          <option>Pinned</option>
          <option>Archived</option>
        </select>
      </div>

      {message && <p role="status" className="text-sm text-blue-700">{message}</p>}

      <div className="space-y-4">
        {filtered.map((notification) => (
          <div key={notification.id} className={`rounded-2xl border p-5 ${!notification.read ? "bg-blue-50" : ""}`}>
            <div className="flex justify-between gap-4">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  {notification.title}
                  {notification.pinned && <Pin size={14} className="text-orange-600" aria-label="Pinned" />}
                </h3>
                <p className="mt-1 text-gray-600">{notification.message}</p>
                <p className="mt-2 text-sm text-gray-400">{notification.time} · {notification.priority} priority</p>
              </div>
              <div className="flex h-fit gap-2">
                <button title={notification.read ? "Mark unread" : "Mark read"} onClick={() => updateNotification(notification.id, { read: !notification.read })} className="rounded-lg border p-2"><Eye size={16} /></button>
                <button title={notification.pinned ? "Unpin notification" : "Pin notification"} onClick={() => updateNotification(notification.id, { pinned: !notification.pinned })} className={`rounded-lg border p-2 ${notification.pinned ? "text-orange-600" : ""}`}><Pin size={16} /></button>
                <button title={notification.archived ? "Restore notification" : "Archive notification"} onClick={() => updateNotification(notification.id, { archived: !notification.archived })} className="rounded-lg border p-2"><Archive size={16} /></button>
                <button title="Delete notification" onClick={() => {
                  if (window.confirm(`Delete "${notification.title}"?`)) {
                    setNotifications((current) => current.filter((item) => item.id !== notification.id));
                    setMessage("Notification deleted.");
                  }
                }} className="rounded-lg border p-2 text-red-600"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="rounded-2xl border py-10 text-center text-sm text-gray-500">No notifications match this view.</p>}
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return <div className="rounded-3xl border p-5">{icon}<h2 className="mt-3 text-2xl font-bold">{value}</h2><p>{label}</p></div>;
}
