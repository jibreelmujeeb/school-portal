import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  Megaphone,
  ClipboardList,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "announcement",
    message: "Staff meeting scheduled for Friday",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    type: "assignment",
    message: "10 students submitted assignments",
    time: "5 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "system",
    message: "Your profile was updated successfully",
    time: "1 day ago",
    read: true,
  },
];

const TeacherNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
  };

  const getIcon = (type) => {
    if (type === "announcement")
      return <Megaphone className="w-5 h-5 text-blue-600" />;
    if (type === "assignment")
      return <ClipboardList className="w-5 h-5 text-green-600" />;
    return <Bell className="w-5 h-5 text-gray-600" />;
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Notifications
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Stay updated with important activities
        </p>
      </section>

      {/* LIST */}
      <section className="space-y-3">

        {notifications.map((item) => (
          <div
            key={item.id}
            className={`border rounded-2xl p-4 flex items-start gap-3 ${
              item.read
                ? "border-gray-200 bg-white"
                : "border-blue-600 bg-blue-50"
            }`}
          >
            {/* ICON */}
            <div>{getIcon(item.type)}</div>

            {/* CONTENT */}
            <div className="flex-1">
              <p className="text-sm font-medium">
                {item.message}
              </p>
              <span className="text-xs text-gray-500">
                {item.time}
              </span>
            </div>

            {/* ACTION */}
            {!item.read && (
              <button
                onClick={() => markAsRead(item.id)}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                <CheckCircle className="w-4 h-4" />
                Mark read
              </button>
            )}
          </div>
        ))}

      </section>

      {/* EMPTY */}
      {notifications.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No notifications available.
        </div>
      )}

    </div>
  );
};

export default TeacherNotifications;