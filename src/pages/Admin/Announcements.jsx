import React, { useState } from "react";
import {
  Megaphone,
  Plus,
  Trash2,
  Pencil,
  CalendarDays,
  Users,
} from "lucide-react";

const announcementsData = [
  {
    title: "School Resumption",
    message: "School resumes on Monday, April 25.",
    audience: "All",
    date: "2026-04-20",
  },
  {
    title: "Staff Meeting",
    message: "Meeting scheduled for Friday at 10 AM.",
    audience: "Teachers",
    date: "2026-04-18",
  },
];

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState(announcementsData);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({ title: "", message: "", audience: "All" });

  const openForm = (announcement = null, index = null) => {
    setEditingIndex(index);
    setShowForm(true);
    setForm(announcement
      ? { title: announcement.title, message: announcement.message, audience: announcement.audience }
      : { title: "", message: "", audience: "All" });
  };

  const saveAnnouncement = (event) => {
    event.preventDefault();
    const announcement = {
      ...form,
      date: new Date().toISOString().slice(0, 10),
    };

    setAnnouncements((current) => editingIndex === null
      ? [announcement, ...current]
      : current.map((item, index) => index === editingIndex ? announcement : item));
    setShowForm(false);
    setEditingIndex(null);
  };

  const deleteAnnouncement = (index) => {
    if (window.confirm("Delete this announcement?")) {
      setAnnouncements((current) => current.filter((_, itemIndex) => itemIndex !== index));
    }
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Announcements
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Manage school-wide communications
          </p>
        </div>

        {/* ADD BUTTON */}
        <button onClick={() => openForm()} className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </section>

      {/* ANNOUNCEMENT LIST */}
      <section className="space-y-4">
        {announcements.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            {/* TOP */}
            <div className="flex justify-between items-start gap-4">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium">{item.title}</h3>
                </div>

                <p className="text-sm text-gray-600">
                  {item.message}
                </p>

                {/* META */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {item.audience}
                  </div>

                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {item.date}
                  </div>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-3">
                <button onClick={() => openForm(item, idx)} aria-label={`Edit ${item.title}`} className="text-gray-600 hover:text-blue-600">
                  <Pencil className="w-4 h-4" />
                </button>

                <button onClick={() => deleteAnnouncement(idx)} aria-label={`Delete ${item.title}`} className="text-gray-600 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </section>

      {/* EMPTY STATE */}
      {announcements.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No announcements available.
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={saveAnnouncement} className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6">
            <h2 className="text-lg font-semibold">{editingIndex === null ? "New Announcement" : "Edit Announcement"}</h2>
            <input autoFocus required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Title" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <textarea required value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} placeholder="Message" rows={4} className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <select value={form.audience} onChange={(event) => setForm({ ...form, audience: event.target.value })} className="w-full rounded-xl border border-gray-200 px-4 py-3">
              <option>All</option><option>Students</option><option>Teachers</option><option>Parents</option>
            </select>
            <p className="text-xs text-gray-500">Changes are kept in this page only and are not sent to users.</p>
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowForm(false)} className="rounded-xl border px-4 py-2">Cancel</button>
              <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-white">Save</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminAnnouncements;