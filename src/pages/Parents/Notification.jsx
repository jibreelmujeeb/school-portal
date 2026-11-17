import React, { useMemo, useState } from "react";
import {
  Bell,
  CheckCheck,
  CheckCircle,
  ClipboardList,
  CreditCard,
  FileText,
  Megaphone,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialNotifications = [
  {
    id: 1,
    type: "announcement",
    message: "PTA meeting scheduled for Friday",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 2,
    type: "fees",
    message: "2nd term school fees deadline is approaching",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "result",
    message: "Your child’s results are now available",
    time: "Yesterday",
    read: true,
  },
  {
    id: 4,
    type: "assignment",
    message: "New assignment uploaded for Mathematics",
    time: "2 days ago",
    read: true,
  },
];

export default function ParentNotifications() {
  const [notifications, setNotifications, storageError] = usePersistentState(
    "parent-portal-notifications",
    initialNotifications
  );
  const [filter, setFilter] = useState("All");
  const unreadCount = notifications.filter((item) => !item.read).length;
  const visibleNotifications = useMemo(
    () =>
      notifications.filter((item) =>
        filter === "Unread" ? !item.read : true
      ),
    [notifications, filter]
  );

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, read: true }))
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <section>
          <h1 className="text-2xl font-semibold sm:text-3xl">Notifications</h1>
          <p className="mt-2 text-sm text-gray-600">
            Stay informed about your child’s school activities.
          </p>
        </section>
        <button
          type="button"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="flex items-center gap-2 self-start rounded-xl border px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck size={17} />
          Mark all as read
        </button>
      </div>

      {storageError && (
        <p role="alert" className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
          {storageError}
        </p>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {unreadCount} unread notification{unreadCount === 1 ? "" : "s"}
        </p>
        <label className="text-sm">
          <span className="sr-only">Filter notifications</span>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-lg border bg-white px-3 py-2 outline-none"
          >
            <option>All</option>
            <option>Unread</option>
          </select>
        </label>
      </div>

      <section className="space-y-4" aria-label="Notification list">
        {visibleNotifications.map((item) => (
          <article
            key={item.id}
            className={`flex items-start gap-3 rounded-2xl border p-4 transition ${
              item.read ? "border-gray-200 bg-white" : "border-blue-300 bg-blue-50"
            }`}
          >
            <div className="mt-0.5">{getIcon(item.type)}</div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.message}</p>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
            {!item.read && (
              <button
                type="button"
                onClick={() => markAsRead(item.id)}
                className="flex shrink-0 items-center gap-1 text-xs text-blue-700 hover:underline"
              >
                <CheckCircle className="h-4 w-4" />
                Mark read
              </button>
            )}
          </article>
        ))}
        {visibleNotifications.length === 0 && (
          <p className="rounded-2xl border border-dashed p-8 text-center text-sm text-gray-500">
            {filter === "Unread"
              ? "You are all caught up."
              : "No notifications available."}
          </p>
        )}
      </section>
    </div>
  );
}

function getIcon(type) {
  const iconProps = { className: "h-5 w-5" };
  switch (type) {
    case "announcement":
      return <Megaphone {...iconProps} className="h-5 w-5 text-blue-600" />;
    case "fees":
      return <CreditCard {...iconProps} className="h-5 w-5 text-orange-600" />;
    case "result":
      return <FileText {...iconProps} className="h-5 w-5 text-purple-600" />;
    case "assignment":
      return <ClipboardList {...iconProps} className="h-5 w-5 text-green-600" />;
    default:
      return <Bell {...iconProps} className="h-5 w-5 text-gray-600" />;
  }
}
