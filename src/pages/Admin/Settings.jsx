import React, { useState } from "react";
import {
  User,
  School,
  Lock,
  Bell,
  Save,
} from "lucide-react";

const AdminSettings = () => {
  const [notice, setNotice] = useState("");

  const saveSettings = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newPassword = data.get("newPassword");
    if (newPassword && newPassword !== data.get("confirmPassword")) {
      setNotice("The new password and confirmation do not match.");
      return;
    }
    if (newPassword && newPassword.length < 8) {
      setNotice("Choose a password with at least 8 characters.");
      return;
    }
    setNotice("Settings saved in this page session only; no account or school service is connected.");
  };

  return (
    <form onSubmit={saveSettings} className="space-y-10">

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
            name="schoolName"
            defaultValue="Bright Future International School"
            aria-label="School Name"
            required
            placeholder="School Name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-600"
          />

          <input
            type="text"
            name="address"
            aria-label="Address"
            required
            placeholder="Address"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-600"
          />

          <input
            type="email"
            name="schoolEmail"
            aria-label="School Email"
            required
            placeholder="School Email"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-600"
          />

          <input
            type="text"
            name="schoolPhone"
            aria-label="Phone Number"
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
            name="adminName"
            aria-label="Full Name"
            required
            placeholder="Full Name"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-green-600"
          />

          <input
            type="email"
            name="adminEmail"
            aria-label="Email Address"
            required
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
            name="newPassword"
            autoComplete="new-password"
            placeholder="New Password"
            className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-red-600"
          />

          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
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
            <input name="emailNotifications" type="checkbox" defaultChecked className="accent-blue-600" />
          </label>

          <label className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
            <span className="text-sm text-gray-600">
              SMS Notifications
            </span>
            <input name="smsNotifications" type="checkbox" className="accent-blue-600" />
          </label>

        </div>
      </section>

      {/* SAVE BUTTON */}
      {notice && <p role="status" className="text-sm text-blue-700">{notice}</p>}
      <section className="flex justify-end">
        <button type="submit" className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </section>

    </form>
  );
};

export default AdminSettings;