import React, { useEffect, useState } from "react";
import { Mail, Save, User } from "lucide-react";
import { usersApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const AdminProfile = () => {
  const { accessToken, user, refreshSession } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setError("");
    setIsSaving(true);

    try {
      await usersApi.update(accessToken, user.id, form);
      await refreshSession();
      setStatus("Profile updated.");
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Profile</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your admin account information
        </p>
      </section>

      <section className="flex flex-col items-center gap-6 rounded-lg border border-gray-200 bg-white p-6 sm:flex-row">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100">
          <User className="h-8 w-8 text-gray-500" />
        </div>

        <div className="text-center sm:text-left">
          <h2 className="text-lg font-semibold">
            {user?.firstName} {user?.lastName}
          </h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="mt-2 text-xs font-medium text-blue-600">{user?.role}</p>
        </div>
      </section>

      {status && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {status}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold">Edit Profile</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-600">
            <User className="mr-2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <label className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-600">
            <User className="mr-2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>

          <label className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-600 sm:col-span-2">
            <Mail className="mr-2 h-4 w-4 text-gray-500" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="w-full bg-transparent text-sm outline-none"
            />
          </label>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg border border-blue-600 px-6 py-3 text-sm text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProfile;
