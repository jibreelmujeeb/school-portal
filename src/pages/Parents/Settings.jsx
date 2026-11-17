import React, { useState } from "react";
import { Bell, Globe, Lock, Moon, Save } from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialSettings = {
  notifications: true,
  emailAlerts: true,
  darkMode: false,
  language: "English",
};

export default function ParentSettingsPage() {
  const [settings, setSettings, storageError] = usePersistentState(
    "parent-portal-settings",
    initialSettings
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setMessage("The new password and confirmation do not match.");
      return;
    }

    if (newPassword) {
      setMessage(
        "Preferences were saved. Password changes need an account service and were not applied."
      );
      setNewPassword("");
      setConfirmPassword("");
      return;
    }
    setMessage("Settings saved in this browser.");
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your account preferences and security.
        </p>
      </section>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section>
          <h2 className="mb-4 text-lg font-semibold">Notifications</h2>
          <div className="space-y-4">
            <PreferenceToggle
              icon={Bell}
              label="In-app Notifications"
              description="Show school alerts in the parent portal."
              checked={settings.notifications}
              onChange={(value) => updateSetting("notifications", value)}
            />
            <PreferenceToggle
              icon={Bell}
              label="Email Notifications"
              description="Receive school updates by email."
              checked={settings.emailAlerts}
              onChange={(value) => updateSetting("emailAlerts", value)}
            />
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Security</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <PasswordField
              id="parent-new-password"
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
            />
            <PasswordField
              id="parent-confirm-password"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Password changes are unavailable until account services are
            connected. Passwords are not stored in this browser.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold">Appearance</h2>
          <div className="space-y-4">
            <PreferenceToggle
              icon={Moon}
              label="Dark Mode"
              description="Save your preferred appearance."
              checked={settings.darkMode}
              onChange={(value) => updateSetting("darkMode", value)}
            />
            <label
              htmlFor="parent-language"
              className="flex items-center gap-3 rounded-xl border border-gray-200 p-4"
            >
              <Globe className="h-4 w-4 text-gray-500" />
              <span className="text-sm">Language</span>
              <select
                id="parent-language"
                value={settings.language}
                onChange={(event) => updateSetting("language", event.target.value)}
                className="ml-auto rounded-lg border px-3 py-2 text-sm outline-none"
              >
                <option>English</option>
                <option>French</option>
                <option>Arabic</option>
              </select>
            </label>
          </div>
        </section>

        {(storageError || message) && (
          <p
            role={storageError || message.includes("match") ? "alert" : "status"}
            className={`text-sm ${
              storageError || message.includes("match")
                ? "text-red-600"
                : "text-green-700"
            }`}
          >
            {storageError || message}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm text-white transition hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}

function PreferenceToggle({ icon: Icon, label, description, checked, onChange }) {
  const id = `parent-setting-${label.toLowerCase().replaceAll(" ", "-")}`;
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-gray-200 p-4"
    >
      <span className="flex items-start gap-3">
        {React.createElement(Icon, {
          className: "mt-0.5 h-4 w-4 text-blue-600",
        })}
        <span>
          <span className="block text-sm font-medium">{label}</span>
          <span className="mt-1 block text-xs text-gray-500">{description}</span>
        </span>
      </span>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-blue-600"
      />
    </label>
  );
}

function PasswordField({ id, label, value, onChange }) {
  return (
    <label
      htmlFor={id}
      className="flex items-center rounded-lg border border-gray-300 px-3 py-2"
    >
      <Lock className="mr-2 h-4 w-4 text-gray-500" />
      <span className="sr-only">{label}</span>
      <input
        id={id}
        type="password"
        autoComplete="new-password"
        placeholder={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full bg-transparent text-sm outline-none"
      />
    </label>
  );
}
