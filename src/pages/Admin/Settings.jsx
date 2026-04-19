import React from "react";
import {
  User,
  School,
  Lock,
  Bell,
  Save,
} from "lucide-react";

const AdminSettings = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Settings
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Manage system preferences and account settings
        </p>
      </section>

      {/* SCHOOL INFO */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <School className="w-5 h-5 text-blue-600" />
          School Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          
          <input
            type="text"
            placeholder="School Name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-600"
          />

          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-600"
          />

          <input
            type="email"
            placeholder="School Email"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-600"
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-600"
          />

        </div>
      </section>

      {/* ADMIN PROFILE */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-green-600" />
          Admin Profile
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-600"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-600"
          />

        </div>
      </section>

      {/* SECURITY */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5 text-red-600" />
          Security
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          
          <input
            type="password"
            placeholder="New Password"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-red-600"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-red-600"
          />

        </div>
      </section>

      {/* NOTIFICATIONS */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-600" />
          Notifications
        </h2>

        <div className="space-y-3">
          
          <label className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-600">
              Email Notifications
            </span>
            <input type="checkbox" className="accent-blue-600" />
          </label>

          <label className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-600">
              SMS Notifications
            </span>
            <input type="checkbox" className="accent-blue-600" />
          </label>

        </div>
      </section>

      {/* SAVE BUTTON */}
      <section className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </section>

    </div>
  );
};

export default AdminSettings;