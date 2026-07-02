import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  GraduationCap,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  User,
  Users,
} from "lucide-react";
import { usersApi } from "../api/client";
import { useAuth } from "../auth/useAuth";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  role: "STUDENT",
  password: "",
};

const roleLabels = {
  STUDENT: "Student",
  TEACHER: "Teacher",
  ADMIN: "Admin",
};

const roleIcons = {
  STUDENT: User,
  TEACHER: GraduationCap,
  ADMIN: ShieldCheck,
};

const AdminUsersManager = ({
  title = "Users",
  description = "Manage portal users",
  fixedRole,
}) => {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    role: fixedRole || "STUDENT",
  }));
  const [editingUser, setEditingUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const availableRoles = useMemo(
    () => (fixedRole ? [fixedRole] : ["STUDENT", "TEACHER", "ADMIN"]),
    [fixedRole],
  );

  const loadUsers = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await usersApi.list(accessToken, {
        role: fixedRole,
        search,
        status,
      });
      setUsers(payload.users);
    } catch (err) {
      setError(err.message || "Unable to load users.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, fixedRole, search, status]);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  const resetForm = () => {
    setForm({ ...emptyForm, role: fixedRole || "STUDENT" });
    setEditingUser(null);
    setIsFormOpen(false);
    setError("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const openCreateForm = () => {
    setForm({ ...emptyForm, role: fixedRole || "STUDENT" });
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      password: "",
    });
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      if (editingUser) {
        await usersApi.update(accessToken, editingUser.id, {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          role: form.role,
        });
      } else {
        await usersApi.create(accessToken, form);
      }

      resetForm();
      await loadUsers();
    } catch (err) {
      setError(err.message || "Unable to save user.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusToggle = async (user) => {
    setError("");

    try {
      if (user.isActive) {
        await usersApi.deactivate(accessToken, user.id);
      } else {
        await usersApi.reactivate(accessToken, user.id);
      }

      await loadUsers();
    } catch (err) {
      setError(err.message || "Unable to update user status.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">{description}</p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="flex items-center gap-2 rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
        >
          <Plus className="h-4 w-4" />
          Add {fixedRole ? roleLabels[fixedRole] : "User"}
        </button>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {isFormOpen && (
        <section className="rounded-lg border border-gray-200 bg-white p-5">
          <h2 className="mb-5 text-lg font-semibold">
            {editingUser ? "Edit User" : "Create User"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First name"
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email address"
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={Boolean(fixedRole)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 disabled:bg-gray-100"
            >
              {availableRoles.map((role) => (
                <option key={role} value={role}>
                  {roleLabels[role]}
                </option>
              ))}
            </select>
            {!editingUser && (
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Temporary password"
                required
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600 md:col-span-2"
              />
            )}

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : editingUser ? "Save Changes" : "Create User"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="flex flex-col gap-4 md:flex-row md:items-center">
        <label className="flex max-w-md flex-1 items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-600">
          <Search className="mr-2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
        >
          <option value="all">All statuses</option>
          <option value="active">Active only</option>
          <option value="inactive">Inactive only</option>
        </select>
      </section>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="hidden grid-cols-6 border-b border-gray-200 p-4 text-sm text-gray-500 md:grid">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Status</span>
          <span>Created</span>
          <span>Actions</span>
        </div>

        {isLoading ? (
          <div className="p-6 text-sm text-gray-500">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No users found.</div>
        ) : (
          users.map((user) => {
            const RoleIcon = roleIcons[user.role] || Users;
            return (
              <div
                key={user.id}
                className="grid gap-2 border-b border-gray-100 p-4 text-sm last:border-b-0 md:grid-cols-6 md:items-center"
              >
                <div className="flex items-center gap-2 font-medium">
                  <RoleIcon className="h-4 w-4 text-blue-600" />
                  {user.firstName} {user.lastName}
                </div>
                <span className="text-gray-700">{user.email}</span>
                <span>{roleLabels[user.role]}</span>
                <span className={user.isActive ? "text-green-600" : "text-red-600"}>
                  {user.isActive ? "Active" : "Inactive"}
                </span>
                <span className="text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openEditForm(user)}
                    className="text-gray-600 hover:text-blue-600"
                    aria-label="Edit user"
                    title="Edit user"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusToggle(user)}
                    className={user.isActive ? "text-gray-600 hover:text-red-600" : "text-gray-600 hover:text-green-600"}
                    aria-label={user.isActive ? "Deactivate user" : "Reactivate user"}
                    title={user.isActive ? "Deactivate user" : "Reactivate user"}
                  >
                    {user.isActive ? (
                      <ToggleRight className="h-5 w-5" />
                    ) : (
                      <ToggleLeft className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default AdminUsersManager;
