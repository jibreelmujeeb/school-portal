import React, { useState } from "react";
import {
  Bell,
  Lock,
  Moon,
  Save,
  Globe,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const StudentSettings = () => {
  const [settings, setSettings, settingsError] = usePersistentState(
    "student-settings",
    { notifications: true, emailAlerts: false, darkMode: false, language: "English" },
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");

  const updateSetting = (field, value) => {
    setSettings((current) => ({ ...current, [field]: value }));
  };

  const saveSettings = (event) => {
    event.preventDefault();
    if (newPassword || confirmPassword) {
      if (newPassword.length < 8) {
        setNotice("Password must be at least 8 characters.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setNotice("Passwords do not match.");
        return;
      }
    }
    setNotice("Settings saved successfully.");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <form className="space-y-10" onSubmit={saveSettings}>
      {(notice || settingsError) && (
        <p role={settingsError ? "alert" : "status"} className={`rounded-xl border px-4 py-3 text-sm ${
          settingsError
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-green-200 bg-green-50 text-green-700"
        }`}>
          {settingsError || notice}
        </p>
      )}

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Settings
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Manage your account preferences
        </p>
      </section>

      {/* NOTIFICATIONS */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Notifications
        </h2>

        <div className="space-y-4">

          {/* IN-APP */}
          <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm">
              <Bell className="w-4 h-4 text-blue-600" />
              In-app Notifications
            </div>

            <button
              type="button"
              onClick={() => updateSetting("notifications", !settings.notifications)}
              aria-pressed={settings.notifications}
              aria-label="Toggle in-app notifications"
              className={`w-10 h-5 flex items-center rounded-full transition ${
                settings.notifications ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition ${
                  settings.notifications ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* EMAIL */}
          <div className="flex justify-between items-center border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 text-sm">
              <Bell className="w-4 h-4 text-green-600" />
              Email Notifications
            </div>

            <button
              type="button"
              onClick={() => updateSetting("emailAlerts", !settings.emailAlerts)}
              aria-pressed={settings.emailAlerts}
              aria-label="Toggle email notifications"
              className={`w-10 h-5 flex items-center rounded-full transition ${
                settings.emailAlerts ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition ${
                  settings.emailAlerts ? "translate-x-5" : "translate-x-1"
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

          {/* PASSWORD */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>

          {/* CONFIRM */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Lock className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
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
              type="button"
              onClick={() => updateSetting("darkMode", !settings.darkMode)}
              aria-pressed={settings.darkMode}
              aria-label="Toggle dark mode"
              className={`w-10 h-5 flex items-center rounded-full transition ${
                settings.darkMode ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition ${
                  settings.darkMode ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* LANGUAGE */}
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
            <Globe className="w-4 h-4 text-gray-500 mr-2" />

            <select value={settings.language} onChange={(event) => updateSetting("language", event.target.value)} className="w-full outline-none text-sm bg-transparent">
              <option>English</option>
              <option>French</option>
              <option>Arabic</option>
            </select>
          </div>

        </div>
      </section>

      {/* SAVE */}
      <section className="flex justify-end">
        <button type="submit" className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </section>

    </form>
  );
};

export default StudentSettings;