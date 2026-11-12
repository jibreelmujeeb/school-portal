import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  DollarSign,
  Receipt,
  Globe,
  Database,
  Save,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

export default function AccountantSettingsPage() {
  const [settings, setSettings, settingsError] = usePersistentState("accountant-settings", {
    emailNotifications: true,
    smsNotifications: false,
    autoReceipt: true,
    darkMode: false,
    twoFactor: true,
  });
  const [language, setLanguage, languageError] = usePersistentState("accountant-language", "English");
  const [message, setMessage] = useState("");

  const handleToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setMessage("Preference updated and saved in this browser.");
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Accountant Settings
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your account, security, financial, and system preferences.
        </p>
      </div>

      {(settingsError || languageError) && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {settingsError || languageError}
        </p>
      )}
      {message && <p role="status" className="text-sm text-blue-700">{message}</p>}

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Lock className="text-green-600 mb-3" />
          <h2 className="text-2xl font-bold">{settings.twoFactor ? "98%" : "75%"}</h2>
          <p>Security Score</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Bell className="text-blue-600 mb-3" />
          <h2 className="text-2xl font-bold">{Number(settings.emailNotifications) + Number(settings.smsNotifications)}</h2>
          <p>Notifications Enabled</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Receipt className="text-purple-600 mb-3" />
          <h2 className="text-2xl font-bold">3</h2>
          <p>Receipt Templates</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Database className="text-orange-600 mb-3" />
          <h2 className="text-2xl font-bold">Today</h2>
          <p>Last Backup</p>
        </div>

      </div>

      {/* Settings Sections */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Security */}
        <div className="border rounded-3xl p-6 space-y-4">

          <div className="flex items-center gap-2">
            <Lock className="text-blue-600" />
            <h2 className="text-xl font-semibold">
              Security
            </h2>
          </div>

          <label className="flex justify-between items-center">
            <span>Two-Factor Authentication</span>
            <input
              type="checkbox"
              checked={settings.twoFactor}
              onChange={() => handleToggle("twoFactor")}
            />
          </label>

          <button type="button" disabled title="Password changes require a connected authentication service." className="border rounded-xl px-4 py-2 opacity-50 cursor-not-allowed">
            Change Password (unavailable)
          </button>

        </div>

        {/* Notifications */}
        <div className="border rounded-3xl p-6 space-y-4">

          <div className="flex items-center gap-2">
            <Bell className="text-blue-600" />
            <h2 className="text-xl font-semibold">
              Notifications
            </h2>
          </div>

          <label className="flex justify-between items-center">
            <span>Email Notifications</span>
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={() => handleToggle("emailNotifications")}
            />
          </label>

          <label className="flex justify-between items-center">
            <span>SMS Notifications</span>
            <input
              type="checkbox"
              checked={settings.smsNotifications}
              onChange={() => handleToggle("smsNotifications")}
            />
          </label>

        </div>

        {/* Receipt Settings */}
        <div className="border rounded-3xl p-6 space-y-4">

          <div className="flex items-center gap-2">
            <Receipt className="text-blue-600" />
            <h2 className="text-xl font-semibold">
              Receipt Settings
            </h2>
          </div>

          <label className="flex justify-between items-center">
            <span>Auto Generate Receipt</span>
            <input
              type="checkbox"
              checked={settings.autoReceipt}
              onChange={() => handleToggle("autoReceipt")}
            />
          </label>

        </div>

        {/* System */}
        <div className="border rounded-3xl p-6 space-y-4">

          <div className="flex items-center gap-2">
            <Globe className="text-blue-600" />
            <h2 className="text-xl font-semibold">
              System Preferences
            </h2>
          </div>

          <label className="flex justify-between items-center">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={() => handleToggle("darkMode")}
            />
          </label>

          <select value={language} onChange={(event) => {
            setLanguage(event.target.value);
            setMessage("Language preference saved in this browser.");
          }} className="w-full border rounded-xl p-3">
            <option>English</option>
            <option>French</option>
            <option>Arabic</option>
          </select>

        </div>

      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={() => setMessage("Settings saved in this browser.")} className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2">
          <Save size={18} />
          Save Changes
        </button>
      </div>

    </div>
  );
}