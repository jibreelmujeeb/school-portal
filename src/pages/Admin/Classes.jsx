import React, { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, School, Search, Trash2, Users } from "lucide-react";
import { classesApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const emptyForm = {
  name: "",
  level: "",
  arm: "",
};

const AdminClasses = () => {
  const { accessToken } = useAuth();
  const [classes, setClasses] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingClass, setEditingClass] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadClasses = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await classesApi.list(accessToken, { search });
      setClasses(payload.classes);
    } catch (err) {
      setError(err.message || "Unable to load classes.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, search]);

  useEffect(() => {
    void loadClasses();
  }, [loadClasses]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingClass(null);
    setIsFormOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingClass(null);
    setIsFormOpen(true);
  };

  const openEditForm = (schoolClass) => {
    setForm({
      name: schoolClass.name,
      level: schoolClass.level || "",
      arm: schoolClass.arm || "",
    });
    setEditingClass(schoolClass);
    setIsFormOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      if (editingClass) {
        await classesApi.update(accessToken, editingClass.id, form);
      } else {
        await classesApi.create(accessToken, form);
      }

      resetForm();
      await loadClasses();
    } catch (err) {
      setError(err.message || "Unable to save class.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (schoolClass) => {
    const shouldDelete = window.confirm(`Delete ${schoolClass.name}?`);
    if (!shouldDelete) return;

    setError("");

    try {
      await classesApi.remove(accessToken, schoolClass.id);
      await loadClasses();
    } catch (err) {
      setError(err.message || "Unable to delete class.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Classes</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage school classes and structure
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="flex items-center gap-2 rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
        >
          <Plus className="h-4 w-4" />
          Add Class
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
            {editingClass ? "Edit Class" : "Create Class"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Class name, e.g. JSS1 - A"
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <input
              name="level"
              value={form.level}
              onChange={handleChange}
              placeholder="Level, e.g. Junior"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <input
              name="arm"
              value={form.arm}
              onChange={handleChange}
              placeholder="Arm, e.g. A"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />

            <div className="flex gap-3 md:col-span-3">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : editingClass ? "Save Changes" : "Create Class"}
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

      <section className="max-w-md">
        <label className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-600">
          <Search className="mr-2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search classes..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading classes...</div>
        ) : classes.length === 0 ? (
          <div className="text-sm text-gray-500">No classes found.</div>
        ) : (
          classes.map((schoolClass) => (
            <article
              key={schoolClass.id}
              className="rounded-lg border border-gray-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <School className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">{schoolClass.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Level: {schoolClass.level || "Not set"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Arm: {schoolClass.arm || "Not set"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(schoolClass)}
                    className="text-gray-600 hover:text-blue-600"
                    aria-label="Edit class"
                    title="Edit class"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(schoolClass)}
                    className="text-gray-600 hover:text-red-600"
                    aria-label="Delete class"
                    title="Delete class"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                {schoolClass.studentCount} current students
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default AdminClasses;
