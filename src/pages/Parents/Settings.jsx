import React, { useState } from "react";
import {
  Bell,
  Lock,
  Moon,
  Globe,
  Save,
} from "lucide-react";

const ParentSettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Settings
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Manage your account preferences and security
        </p>
      </section>

      {/* NOTIFICATION SETTINGS */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Notifications
        </h2>

        <div className="space-y-4">

          {/* APP NOTIFICATIONS */}
          <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4">

            <div className="flex items-center gap-2 text-sm">
              <Bell className="w-4 h-4 text-blue-600" />
              In-app Notifications
            </div>

            <button
              onClick={() =>
                setNotifications(!notifications)
              }
              className={`w-10 h-5 flex items-center rounded-full transition ${
                notifications
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition ${
                  notifications
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              />
            </button>

          </div>

          {/* EMAIL ALERTS */}
          <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4">

            <div className="flex items-center gap-2 text-sm">
              <Bell className="w-4 h-4 text-green-600" />
              Email Notifications
            </div>

            <button
              onClick={() =>
                setEmailAlerts(!emailAlerts)
              }
              className={`w-10 h-5 flex items-center rounded-full transition ${
                emailAlerts
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition ${
                  emailAlerts
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              />
            </button>

          </div>

        </div>
      </section>

      {/* SECURITY */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Security
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">

          {/* NEW PASSWORD */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">

            <Lock className="w-4 h-4 text-gray-500 mr-2" />

            <input
              type="password"
              placeholder="New Password"
              className="w-full outline-none text-sm bg-transparent"
            />

          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">

            <Lock className="w-4 h-4 text-gray-500 mr-2" />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full outline-none text-sm bg-transparent"
            />

          </div>

        </div>
      </section>

      {/* APPEARANCE */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Appearance
        </h2>

        <div className="space-y-4">

          {/* DARK MODE */}
          <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4">

            <div className="flex items-center gap-2 text-sm">
              <Moon className="w-4 h-4 text-purple-600" />
              Dark Mode
            </div>

            <button
              onClick={() =>
                setDarkMode(!darkMode)
              }
              className={`w-10 h-5 flex items-center rounded-full transition ${
                darkMode
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition ${
                  darkMode
                    ? "translate-x-5"
                    : "translate-x-1"
                }`}
              />
            </button>

          </div>

          {/* LANGUAGE */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">

            <Globe className="w-4 h-4 text-gray-500 mr-2" />

            <select className="w-full outline-none text-sm bg-transparent">
              <option>English</option>
              <option>French</option>
              <option>Arabic</option>
            </select>

          </div>

        </div>
      </section>

      {/* SAVE BUTTON */}
      <section className="flex justify-end">

        <button className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Save className="w-4 h-4" />
          Save Settings
        </button>

      </section>

    </div>
  );
};

export default ParentSettingsPage;