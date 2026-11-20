import React, { useState } from "react";
import { Bell, Lock, Moon, Save } from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialSettings = {
  notifications: true,
  emailAlerts: false,
  darkMode: false,
};

const PreferenceToggle = ({ label, description, icon: Icon, checked, onChange, color }) => (
  <div className="flex items-center justify-between gap-4 rounded-xl border border-inherit p-4">
    <div className="flex items-start gap-3">
      {React.createElement(Icon, { className: `mt-0.5 h-4 w-4 ${color}` })}
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="mt-1 text-xs opacity-70">{description}</p>
      </div>
    </div>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`flex h-6 w-11 shrink-0 items-center rounded-full transition ${checked ? "bg-blue-600" : "bg-gray-300"}`}
    >
      <span className={`h-4 w-4 rounded-full bg-white transition ${checked ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  </div>
);

const TeacherSettings = () => {
  const [settings, setSettings, persistenceError] = usePersistentState(
    "teacher-settings",
    initialSettings,
  );
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
    setNotice("");
  };

  const handleSave = () => {
    setNotice("Preferences saved in this browser.");
    setError("");
  };

  const handlePasswordChange = (event) => {
    event.preventDefault();
    if (newPassword.length < 8) {
      setError("Choose a password with at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("The password confirmation does not match.");
      return;
    }
    setNewPassword("");
    setConfirmPassword("");
    setError("Password updates require a connected authentication service. No password was saved.");
  };

  const surfaceClass = settings.darkMode
    ? "border-slate-700 bg-slate-800 text-white"
    : "border-gray-200 bg-white text-gray-900";

  return (
    <div className={`space-y-8 rounded-2xl p-4 transition-colors ${settings.darkMode ? "bg-slate-900 text-white" : ""}`}>
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Settings</h1>
        <p className={`mt-2 text-sm ${settings.darkMode ? "text-slate-300" : "text-gray-600"}`}>
          Manage your teacher portal preferences.
        </p>
      </section>

      {persistenceError && <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{persistenceError}</p>}
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">{notice}</p>}

      <section>
        <h2 className="mb-4 text-lg font-semibold">Notifications</h2>
        <div className="space-y-3">
          <PreferenceToggle
            label="In-app notifications"
            description="Show updates in the teacher portal."
            icon={Bell}
            color="text-blue-600"
            checked={settings.notifications}
            onChange={() => updateSetting("notifications")}
          />
          <PreferenceToggle
            label="Email alerts"
            description="Preference only; sending email requires a connected mail service."
            icon={Bell}
            color="text-green-600"
            checked={settings.emailAlerts}
            onChange={() => updateSetting("emailAlerts")}
          />
          <PreferenceToggle
            label="Dark mode"
            description="Apply a dark appearance to this settings page."
            icon={Moon}
            color="text-purple-600"
            checked={settings.darkMode}
            onChange={() => updateSetting("darkMode")}
          />
        </div>
      </section>

      <section className={`rounded-2xl border p-5 ${surfaceClass}`}>
        <h2 className="text-lg font-semibold">Security</h2>
        <p className={`mt-2 text-sm ${settings.darkMode ? "text-slate-300" : "text-gray-500"}`}>
          Password updates are unavailable until an authentication service is connected.
        </p>
        <form onSubmit={handlePasswordChange} className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900">
            <Lock className="h-4 w-4 text-gray-500" />
            <span className="sr-only">New password</span>
            <input type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="New password" className="w-full outline-none" />
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900">
            <Lock className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Confirm password</span>
            <input type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" className="w-full outline-none" />
          </label>
          <button type="submit" className="justify-self-start rounded-lg border border-gray-300 px-4 py-2.5 text-sm hover:bg-gray-50">
            Check password change
          </button>
        </form>
      </section>

      <section className="flex justify-end">
        <button type="button" onClick={handleSave} className="flex items-center gap-2 rounded-xl border border-blue-600 px-6 py-3 text-sm text-blue-600 hover:bg-blue-50">
          <Save className="h-4 w-4" /> Save Settings
        </button>
      </section>
    </div>
  );
};

export default TeacherSettings;
