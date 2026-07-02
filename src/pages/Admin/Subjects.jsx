import React, { useCallback, useEffect, useState } from "react";
import { BookOpen, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { subjectsApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const emptyForm = {
  name: "",
  code: "",
};

const AdminSubjects = () => {
  const { accessToken } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingSubject, setEditingSubject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const loadSubjects = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await subjectsApi.list(accessToken, { search });
      setSubjects(payload.subjects);
    } catch (err) {
      setError(err.message || "Unable to load subjects.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, search]);

  useEffect(() => {
    void loadSubjects();
  }, [loadSubjects]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingSubject(null);
    setIsFormOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingSubject(null);
    setIsFormOpen(true);
  };

  const openEditForm = (subject) => {
    setForm({
      name: subject.name,
      code: subject.code,
    });
    setEditingSubject(subject);
    setIsFormOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      if (editingSubject) {
        await subjectsApi.update(accessToken, editingSubject.id, form);
      } else {
        await subjectsApi.create(accessToken, form);
      }

      resetForm();
      await loadSubjects();
    } catch (err) {
      setError(err.message || "Unable to save subject.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (subject) => {
    const shouldDelete = window.confirm(`Delete ${subject.name}?`);
    if (!shouldDelete) return;

    setError("");

    try {
      await subjectsApi.remove(accessToken, subject.id);
      await loadSubjects();
    } catch (err) {
      setError(err.message || "Unable to delete subject.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Subjects</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage subjects used across classes
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="flex items-center gap-2 rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
        >
          <Plus className="h-4 w-4" />
          Add Subject
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
            {editingSubject ? "Edit Subject" : "Create Subject"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Subject name"
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Code, e.g. MTH101"
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm uppercase outline-none focus:border-blue-600"
            />

            <div className="flex gap-3 md:col-span-2">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? "Saving..." : editingSubject ? "Save Changes" : "Create Subject"}
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
            placeholder="Search subjects..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </section>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="hidden grid-cols-5 border-b border-gray-200 p-4 text-sm text-gray-500 md:grid">
          <span>Subject</span>
          <span>Code</span>
          <span>Assignments</span>
          <span>Created</span>
          <span>Actions</span>
        </div>

        {isLoading ? (
          <div className="p-6 text-sm text-gray-500">Loading subjects...</div>
        ) : subjects.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No subjects found.</div>
        ) : (
          subjects.map((subject) => (
            <div
              key={subject.id}
              className="grid gap-2 border-b border-gray-100 p-4 text-sm last:border-b-0 md:grid-cols-5 md:items-center"
            >
              <div className="flex items-center gap-2 font-medium">
                <BookOpen className="h-4 w-4 text-blue-600" />
                {subject.name}
              </div>
              <span>{subject.code}</span>
              <span>{subject.assignmentCount}</span>
              <span className="text-gray-500">
                {new Date(subject.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openEditForm(subject)}
                  className="text-gray-600 hover:text-blue-600"
                  aria-label="Edit subject"
                  title="Edit subject"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(subject)}
                  className="text-gray-600 hover:text-red-600"
                  aria-label="Delete subject"
                  title="Delete subject"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default AdminSubjects;
