import React, { useState } from "react";
import {
  Bell,
  CheckCircle,
  ClipboardList,
  Megaphone,
  CreditCard,
  FileText,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    type: "announcement",
    message: "School resumes next Monday",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 2,
    type: "assignment",
    message: "New Mathematics assignment uploaded",
    time: "3 hours ago",
    read: false,
  },
  {
    id: 3,
    type: "result",
    message: "Your 2nd term results are available",
    time: "Yesterday",
    read: true,
  },
  {
    id: 4,
    type: "fees",
    message: "School fees deadline is approaching",
    time: "2 days ago",
    read: true,
  },
];

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    const updated = notifications.map((item) =>
      item.id === id
        ? { ...item, read: true }
        : item
    );

    setNotifications(updated);
  };

  const getIcon = (type) => {
    switch (type) {
      case "announcement":
        return (
          <Megaphone className="w-5 h-5 text-blue-600" />
        );

      case "assignment":
        return (
          <ClipboardList className="w-5 h-5 text-green-600" />
        );

      case "result":
        return (
          <FileText className="w-5 h-5 text-purple-600" />
        );

      case "fees":
        return (
          <CreditCard className="w-5 h-5 text-orange-600" />
        );

      default:
        return (
          <Bell className="w-5 h-5 text-gray-600" />
        );
    }
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Notifications
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Stay updated with school activities
        </p>
      </section>

      {/* NOTIFICATIONS */}
      <section className="space-y-4">

        {notifications.map((item) => (
          <div
            key={item.id}
            className={`border rounded-2xl p-4 flex items-start gap-3 transition ${
              item.read
                ? "border-gray-200 bg-white"
                : "border-blue-600 bg-blue-50"
            }`}
          >
            {/* ICON */}
            <div>
              {getIcon(item.type)}
            </div>

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
                className="flex items-center gap-1 text-xs text-blue-600 hover:underline"
              >
                <CheckCircle className="w-4 h-4" />
                Mark Read
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

export default StudentNotifications;