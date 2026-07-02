import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Megaphone,
  Plus,
  Pencil,
  Trash2,
  CalendarDays,
  Users,
  Save,
} from "lucide-react";
import { teacherApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const emptyForm = {
  title: "",
  message: "",
  classId: "",
};

const TeacherAnnouncements = () => {
  const { accessToken } = useAuth();
  const [classes, setClasses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const classOptions = useMemo(() => classes.map((schoolClass) => ({
    id: schoolClass.id,
    name: schoolClass.name,
  })), [classes]);

  const loadClasses = useCallback(async () => {
    if (!accessToken) return;

    const payload = await teacherApi.classes(accessToken);
    setClasses(payload.classes);
  }, [accessToken]);

  const loadAnnouncements = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await teacherApi.announcements(accessToken);
      setAnnouncements(payload.announcements);
    } catch (err) {
      setError(err.message || "Unable to load announcements.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadClasses().catch((err) => setError(err.message || "Unable to load classes."));
  }, [loadClasses]);

  useEffect(() => {
    void loadAnnouncements();
  }, [loadAnnouncements]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingAnnouncement(null);
    setIsFormOpen(false);
  };

  const openCreateForm = () => {
    setForm(emptyForm);
    setEditingAnnouncement(null);
    setIsFormOpen(true);
  };

  const openEditForm = (announcement) => {
    setForm({
      title: announcement.title,
      message: announcement.message,
      classId: announcement.classId || "",
    });
    setEditingAnnouncement(announcement);
    setIsFormOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      if (editingAnnouncement) {
        await teacherApi.updateAnnouncement(accessToken, editingAnnouncement.id, form);
      } else {
        await teacherApi.createAnnouncement(accessToken, form);
      }

      resetForm();
      await loadAnnouncements();
    } catch (err) {
      setError(err.message || "Unable to save announcement.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (announcement) => {
    if (!window.confirm(`Delete ${announcement.title}?`)) return;

    setError("");

    try {
      await teacherApi.deleteAnnouncement(accessToken, announcement.id);
      await loadAnnouncements();
    } catch (err) {
      setError(err.message || "Unable to delete announcement.");
    }
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Announcements</h1>
          <p className="mt-2 text-sm text-gray-600">
            Share updates with students and classes
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="flex items-center gap-2 rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
        >
          <Plus className="h-4 w-4" />
          New Announcement
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
            {editingAnnouncement ? "Edit Announcement" : "Create Announcement"}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />
            <select
              name="classId"
              value={form.classId}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            >
              <option value="">All assigned classes</option>
              {classOptions.map((schoolClass) => (
                <option key={schoolClass.id} value={schoolClass.id}>
                  {schoolClass.name}
                </option>
              ))}
            </select>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Message"
              rows="5"
              required
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save"}
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

      <section className="space-y-4">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading announcements...</div>
        ) : announcements.length === 0 ? (
          <div className="text-sm text-gray-500">No announcements available.</div>
        ) : (
          announcements.map((item) => (
            <article key={item.id} className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{item.message}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {item.audience}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openEditForm(item)}
                    className="text-gray-600 hover:text-blue-600"
                    aria-label="Edit announcement"
                    title="Edit announcement"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item)}
                    className="text-gray-600 hover:text-red-600"
                    aria-label="Delete announcement"
                    title="Delete announcement"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default TeacherAnnouncements;
