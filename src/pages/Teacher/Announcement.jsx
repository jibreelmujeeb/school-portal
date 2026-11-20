import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  CalendarDays,
  Megaphone,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialAnnouncements = [
  {
    id: "announcement-assignment",
    title: "Assignment Reminder",
    message: "Submit your Mathematics assignment before Friday.",
    audience: "SS2",
    date: "2026-04-20",
    mine: true,
  },
  {
    id: "announcement-resumption",
    title: "School Resumption",
    message: "School resumes on Monday.",
    audience: "All",
    date: "2026-04-18",
    mine: false,
  },
];

const emptyForm = { title: "", message: "", audience: "All", date: "" };

const TeacherAnnouncements = () => {
  const students = useSelector((state) => state.students.items);
  const [announcements, setAnnouncements, persistenceError] = usePersistentState(
    "teacher-announcements",
    initialAnnouncements,
  );
  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const classes = [...new Set(students.map((student) => student.class).filter(Boolean))];
  const audiences = [...new Set(["All", ...classes, ...announcements.map((item) => item.audience)])];
  const filteredAnnouncements = useMemo(() => {
    const query = search.trim().toLowerCase();
    return announcements.filter((item) => {
      const matchesSearch = [item.title, item.message, item.audience]
        .some((value) => value?.toLowerCase().includes(query));
      const matchesAudience = audienceFilter === "All" || item.audience === audienceFilter;
      return matchesSearch && matchesAudience;
    });
  }, [announcements, audienceFilter, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    setError("");
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      message: item.message,
      audience: item.audience,
      date: item.date,
    });
    setError("");
    setShowForm(true);
  };

  const saveAnnouncement = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.message.trim() || !form.date) {
      setError("Enter a title, message, and publication date.");
      return;
    }

    const announcement = {
      ...form,
      title: form.title.trim(),
      message: form.message.trim(),
      id: editingId || `announcement-${Date.now()}`,
      mine: true,
    };
    setAnnouncements((current) =>
      editingId
        ? current.map((item) => item.id === editingId ? announcement : item)
        : [announcement, ...current],
    );
    setShowForm(false);
    setNotice(editingId ? "Announcement updated." : "Announcement published.");
  };

  const deleteAnnouncement = (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    setAnnouncements((current) => current.filter((entry) => entry.id !== item.id));
    setNotice("Announcement deleted.");
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Announcements</h1>
          <p className="mt-2 text-sm text-gray-600">
            Share updates with students and classes.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" /> New announcement
        </button>
      </section>

      {persistenceError && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {persistenceError}
        </p>
      )}
      {notice && (
        <div className="flex items-center justify-between rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          {notice}
          <button type="button" onClick={() => setNotice("")} aria-label="Dismiss message">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <section className="flex flex-col gap-3 sm:flex-row">
        <label className="flex flex-1 items-center rounded-xl border border-gray-300 px-4 py-3">
          <Search className="mr-3 h-4 w-4 text-gray-500" />
          <span className="sr-only">Search announcements</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title or message"
            className="w-full outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3">
          <span className="text-sm text-gray-600">Audience</span>
          <select
            value={audienceFilter}
            onChange={(event) => setAudienceFilter(event.target.value)}
            className="bg-transparent text-sm outline-none"
          >
            <option value="All">All audiences</option>
            {audiences.filter((audience) => audience !== "All").map((audience) => (
              <option key={audience}>{audience}</option>
            ))}
          </select>
        </label>
      </section>

      {filteredAnnouncements.length ? (
        <section className="space-y-4">
          {filteredAnnouncements.map((item) => (
            <article key={item.id} className="rounded-2xl border border-gray-200 bg-white p-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-blue-600" />
                    <h2 className="font-semibold">{item.title}</h2>
                    {!item.mine && (
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600">
                        School notice
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{item.message}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {item.audience}</span>
                    <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4" /> {item.date}</span>
                  </div>
                </div>
                {item.mine && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      aria-label={`Edit ${item.title}`}
                      className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteAnnouncement(item)}
                      aria-label={`Delete ${item.title}`}
                      className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-500">
          No announcements match your search and audience filter.
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <section role="dialog" aria-modal="true" aria-labelledby="announcement-title" className="w-full max-w-xl rounded-2xl bg-white">
            <div className="flex items-center justify-between border-b p-5">
              <h2 id="announcement-title" className="font-semibold">
                {editingId ? "Edit announcement" : "New announcement"}
              </h2>
              <button type="button" onClick={() => setShowForm(false)} aria-label="Close form">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={saveAnnouncement} className="space-y-4 p-5">
              {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <label className="block text-sm font-medium">
                Title
                <input
                  required
                  value={form.title}
                  onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                  className="mt-1 w-full rounded-lg border px-3 py-2.5 font-normal"
                />
              </label>
              <label className="block text-sm font-medium">
                Message
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                  className="mt-1 w-full rounded-lg border px-3 py-2.5 font-normal"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  Audience
                  <select
                    value={form.audience}
                    onChange={(event) => setForm((current) => ({ ...current, audience: event.target.value }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2.5 font-normal"
                  >
                    <option>All</option>
                    {classes.map((className) => <option key={className}>{className}</option>)}
                  </select>
                </label>
                <label className="block text-sm font-medium">
                  Date
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))}
                    className="mt-1 w-full rounded-lg border px-3 py-2.5 font-normal"
                  />
                </label>
              </div>
              <div className="flex justify-end gap-3 border-t pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border px-4 py-2.5 text-sm">
                  Cancel
                </button>
                <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white hover:bg-blue-700">
                  {editingId ? "Save changes" : "Publish"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default TeacherAnnouncements;
