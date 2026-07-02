import React from "react";
import { Bell, Lock, School, User } from "lucide-react";
import { useAuth } from "../../auth/useAuth";

const AdminSettings = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage system preferences and account settings
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <School className="h-5 w-5 text-blue-600" />
          School Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="School Name"
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
          <input
            type="text"
            placeholder="Address"
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
          <input
            type="email"
            placeholder="School Email"
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-600"
          />
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <User className="h-5 w-5 text-green-600" />
          Admin Profile
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={user ? `${user.firstName} ${user.lastName}` : ""}
            readOnly
            className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none"
          />
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none"
          />
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Lock className="h-5 w-5 text-red-600" />
          Security
        </h2>
        <p className="text-sm text-gray-600">
          Password management will be added in the security step.
        </p>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Bell className="h-5 w-5 text-orange-600" />
          Notifications
        </h2>
        <div className="space-y-3">
          <label className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
            <span className="text-sm text-gray-600">Email Notifications</span>
            <input type="checkbox" className="accent-blue-600" />
          </label>
          <label className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3">
            <span className="text-sm text-gray-600">SMS Notifications</span>
            <input type="checkbox" className="accent-blue-600" />
          </label>
        </div>
      </section>
    </div>
  );
};

export default AdminSettings;
