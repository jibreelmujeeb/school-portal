import React, { useState } from "react";
import {
  Bell,
  Search,
  CheckCircle,
  AlertTriangle,
  FileText,
  DollarSign,
  Trash2,
  Pin,
  Archive,
  Eye,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Payment Verified",
    message: "John David's tuition payment has been verified.",
    time: "5 mins ago",
    priority: "High",
    read: false,
  },
  {
    id: 2,
    title: "Outstanding Fees",
    message: "Mary Johnson has an outstanding balance of ₦45,000.",
    time: "Yesterday",
    priority: "Medium",
    read: true,
  },
];

export default function AccountantNotificationsPage() {
  const [search, setSearch] = useState("");

  const filtered = notifications.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>
          <p className="text-gray-500 mt-2">
            Stay updated with payment, receipt, and financial activities.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl">
          Mark All as Read
        </button>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Bell className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">148</h2>
          <p>Total</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">26</h2>
          <p>Unread</p>
        </div>

        <div className="border rounded-3xl p-5">
          <AlertTriangle className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">12</h2>
          <p>High Priority</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Pin className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">8</h2>
          <p>Pinned</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex items-center border rounded-xl px-4 py-3">
        <Search className="mr-3"/>
        <input
          className="outline-none w-full"
          placeholder="Search notifications..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>

      {/* Notifications */}

      <div className="space-y-4">

        {filtered.map((notification) => (

          <div
            key={notification.id}
            className={`border rounded-2xl p-5 ${
              !notification.read ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex justify-between gap-4">

              <div>

                <h3 className="font-semibold text-lg">
                  {notification.title}
                </h3>

                <p className="text-gray-600 mt-1">
                  {notification.message}
                </p>

                <p className="text-sm text-gray-400 mt-2">
                  {notification.time}
                </p>

              </div>

              <div className="flex gap-2">

                <button className="border rounded-lg p-2">
                  <Eye size={16}/>
                </button>

                <button className="border rounded-lg p-2">
                  <Pin size={16}/>
                </button>

                <button className="border rounded-lg p-2">
                  <Archive size={16}/>
                </button>

                <button className="border rounded-lg p-2">
                  <Trash2 size={16}/>
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}