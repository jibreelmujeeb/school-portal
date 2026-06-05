import React, { useState } from "react";
import {
  Bell,
  UserPlus,
  Wallet,
  BookOpen,
  Megaphone,
  AlertTriangle,
  Check,
  Filter,
} from "lucide-react";

const notificationsData = [
  {
    id: 1,
    title: "New Student Registration",
    message: "A new student has completed registration.",
    type: "student",
    time: "5 mins ago",
    read: false,
  },
  {
    id: 2,
    title: "School Fee Payment",
    message: "Payment of ₦120,000 received successfully.",
    type: "finance",
    time: "20 mins ago",
    read: false,
  },
  {
    id: 3,
    title: "New Announcement Created",
    message: "A teacher published an announcement.",
    type: "announcement",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "System Alert",
    message: "Database backup completed successfully.",
    type: "alert",
    time: "2 hours ago",
    read: true,
  },
];

const AdminNotificationPage = () => {
  const [notifications, setNotifications] =
    useState(notificationsData);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, read: true }
          : item
      )
    );
  };

  const getIcon = (type) => {
    switch (type) {
      case "student":
        return (
          <UserPlus className="w-5 h-5 text-blue-600" />
        );

      case "finance":
        return (
          <Wallet className="w-5 h-5 text-green-600" />
        );

      case "announcement":
        return (
          <Megaphone className="w-5 h-5 text-purple-600" />
        );

      case "academic":
        return (
          <BookOpen className="w-5 h-5 text-orange-600" />
        );

      default:
        return (
          <AlertTriangle className="w-5 h-5 text-red-600" />
        );
    }
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-500 mt-2">
            Monitor activities and updates across the school
          </p>
        </div>

        <button className="flex items-center gap-2 px-5 py-3 border border-gray-200 rounded-2xl">
          <Filter className="w-4 h-4" />
          Filter Notifications
        </button>

      </section>

      {/* SUMMARY CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <div className="flex items-center gap-2 text-blue-600">
            <Bell className="w-5 h-5" />
            <span>Total</span>
          </div>

          <h2 className="text-3xl font-bold mt-3">
            124
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <div className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="w-5 h-5" />
            <span>Unread</span>
          </div>

          <h2 className="text-3xl font-bold mt-3">
            18
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <div className="flex items-center gap-2 text-green-600">
            <Wallet className="w-5 h-5" />
            <span>Finance</span>
          </div>

          <h2 className="text-3xl font-bold mt-3">
            36
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <div className="flex items-center gap-2 text-purple-600">
            <Megaphone className="w-5 h-5" />
            <span>Announcements</span>
          </div>

          <h2 className="text-3xl font-bold mt-3">
            24
          </h2>
        </div>

      </section>

      {/* NOTIFICATION LIST */}
      <section className="space-y-4">

        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`border rounded-3xl p-5 transition ${
              notification.read
                ? "border-gray-200"
                : "border-blue-200 bg-blue-50/40"
            }`}
          >

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

              {/* LEFT */}
              <div className="flex gap-4">

                <div className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center">
                  {getIcon(notification.type)}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {notification.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {notification.message}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    {notification.time}
                  </p>
                </div>

              </div>

              {/* ACTION */}
              {!notification.read && (
                <button
                  onClick={() =>
                    markAsRead(notification.id)
                  }
                  className="flex items-center gap-2 px-4 py-2 border border-green-200 rounded-full text-green-600 bg-green-50"
                >
                  <Check className="w-4 h-4" />
                  Mark Read
                </button>
              )}

            </div>

          </div>
        ))}

      </section>

    </div>
  );
};

export default AdminNotificationPage;