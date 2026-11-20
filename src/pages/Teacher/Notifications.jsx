import React from "react";
import {
  Bell,
  CheckCircle,
  ClipboardList,
  Megaphone,
  Trash2,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialNotifications = [
  {
    id: "notification-1",
    type: "announcement",
    message: "Staff meeting scheduled for Friday",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "notification-2",
    type: "assignment",
    message: "10 students submitted assignments",
    time: "5 hours ago",
    read: false,
  },
  {
    id: "notification-3",
    type: "system",
    message: "Your profile was updated successfully",
    time: "1 day ago",
    read: true,
  },
];

const icons = {
  announcement: Megaphone,
  assignment: ClipboardList,
  system: Bell,
};

const TeacherNotifications = () => {
  const [notifications, setNotifications, persistenceError] = usePersistentState(
    "teacher-notifications",
    initialNotifications,
  );
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const markAsRead = (id) => {
    setNotifications((current) => current.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification,
    ));
  };

  const markAllAsRead = () => {
    setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Notifications</h1>
          <p className="mt-2 text-sm text-gray-600">
            {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
          </p>
        </div>
        <button
          type="button"
          onClick={markAllAsRead}
          disabled={!unreadCount}
          className="rounded-xl border border-gray-300 px-4 py-3 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Mark all as read
        </button>
      </section>

      {persistenceError && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {persistenceError}
        </p>
      )}

      {notifications.length ? (
        <section className="space-y-3">
          {notifications.map((item) => {
            const Icon = icons[item.type] || Bell;
            return (
              <article
                key={item.id}
                className={`flex items-start gap-3 rounded-2xl border p-4 ${
                  item.read ? "border-gray-200 bg-white" : "border-blue-200 bg-blue-50"
                }`}
              >
                {React.createElement(Icon, {
                  className: `h-5 w-5 shrink-0 ${item.type === "assignment" ? "text-green-600" : "text-blue-600"}`,
                })}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.message}</p>
                  <p className="mt-1 text-xs text-gray-500">{item.time}</p>
                </div>
                {!item.read && (
                  <button
                    type="button"
                    onClick={() => markAsRead(item.id)}
                    className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
                  >
                    <CheckCircle className="h-4 w-4" /> Mark read
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setNotifications((current) => current.filter((entry) => entry.id !== item.id))}
                  aria-label={`Dismiss ${item.message}`}
                  className="rounded p-1 text-gray-500 hover:bg-white"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-500">
          No notifications available.
        </div>
      )}
    </div>
  );
};

export default TeacherNotifications;
