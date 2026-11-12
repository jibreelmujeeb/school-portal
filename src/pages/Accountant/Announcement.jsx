import React, { useMemo, useState } from "react";
import {
  Megaphone,
  Plus,
  Search,
  Eye,
  Edit,
  Pin,
  Send,
  Copy,
  Trash2,
  X,
} from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";

const initialAnnouncements = [
  {
    id: "ANN001",
    title: "School Fee Payment Reminder",
    audience: "Parents",
    category: "Fee Payment",
    status: "Published",
    date: "2026-07-31",
  },
  {
    id: "ANN002",
    title: "Scholarship Registration Opens",
    audience: "Students",
    category: "Scholarship",
    status: "Scheduled",
    date: "2026-08-10",
  },
];

const blankAnnouncement = {
  title: "",
  audience: "Parents",
  category: "Fee Payment",
  status: "Draft",
  date: new Date().toISOString().slice(0, 10),
};

export default function AccountantAnnouncementsPage() {
  const [announcements, setAnnouncements, storageError] = usePersistentState(
    "accountant-announcements",
    initialAnnouncements
  );
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [form, setForm] = useState(blankAnnouncement);
  const [formError, setFormError] = useState("");
  const [formOpen, setFormOpen] = useState(false);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return announcements.filter((item) =>
      `${item.title} ${item.audience} ${item.category}`.toLowerCase().includes(query) &&
      (statusFilter === "All" || item.status === statusFilter)
    );
  }, [announcements, search, statusFilter]);

  const openNew = () => {
    setEditing(null);
    setForm({ ...blankAnnouncement, date: new Date().toISOString().slice(0, 10) });
    setFormError("");
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ ...item });
    setFormError("");
    setFormOpen(true);
  };

  const saveAnnouncement = (event) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setFormError("Enter an announcement title.");
      return;
    }

    if (editing) {
      setAnnouncements((current) => current.map((item) =>
        item.id === editing.id ? { ...form, title: form.title.trim(), id: item.id } : item
      ));
    } else {
      setAnnouncements((current) => [
        { ...form, title: form.title.trim(), id: `ANN-${Date.now()}` },
        ...current,
      ]);
    }
    setFormOpen(false);
  };

  const updateStatus = (item, status) => {
    setAnnouncements((current) => current.map((announcement) =>
      announcement.id === item.id ? { ...announcement, status } : announcement
    ));
  };

  const duplicate = (item) => {
    setAnnouncements((current) => [
      { ...item, id: `ANN-${Date.now()}`, title: `${item.title} (Copy)`, status: "Draft" },
      ...current,
    ]);
  };

  const remove = (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    setAnnouncements((current) => current.filter((announcement) => announcement.id !== item.id));
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="mt-2 text-gray-500">Create and manage financial announcements for the school community.</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white">
          <Plus size={18} />
          New Announcement
        </button>
      </div>

      {storageError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <Stat icon={<Megaphone />} label="Total" value={announcements.length} />
        <Stat icon={<Send />} label="Published" value={announcements.filter((item) => item.status === "Published").length} />
        <Stat icon={<Edit />} label="Drafts" value={announcements.filter((item) => item.status === "Draft").length} />
        <Stat icon={<Pin />} label="Scheduled" value={announcements.filter((item) => item.status === "Scheduled").length} />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <label className="flex flex-1 items-center rounded-xl border px-4 py-3">
          <Search className="mr-3" />
          <span className="sr-only">Search announcements</span>
          <input placeholder="Search title, audience, or category..." className="w-full outline-none" value={search} onChange={(event) => setSearch(event.target.value)} />
        </label>
        <label className="sr-only" htmlFor="announcement-status">Filter announcements by status</label>
        <select id="announcement-status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border px-5">
          <option value="All">All statuses</option>
          <option>Published</option>
          <option>Scheduled</option>
          <option>Draft</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-3xl border">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50">
            <tr>{["Title", "Audience", "Category", "Status", "Date", "Actions"].map((item) => <th key={item} className="p-3 text-left">{item}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3 font-medium">{item.title}</td>
                <td className="p-3">{item.audience}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3"><span className={`rounded-full px-3 py-1 ${item.status === "Published" ? "bg-green-100 text-green-700" : item.status === "Scheduled" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"}`}>{item.status}</span></td>
                <td className="p-3">{item.date}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button title="View announcement" onClick={() => setViewing(item)} className="rounded-lg border p-2"><Eye size={16} /></button>
                    <button title="Edit announcement" onClick={() => openEdit(item)} className="rounded-lg border p-2"><Edit size={16} /></button>
                    <button title={item.status === "Published" ? "Unpublish announcement" : "Publish announcement"} onClick={() => updateStatus(item, item.status === "Published" ? "Draft" : "Published")} className="rounded-lg border p-2"><Send size={16} /></button>
                    <button title="Duplicate announcement" onClick={() => duplicate(item)} className="rounded-lg border p-2"><Copy size={16} /></button>
                    <button title="Delete announcement" onClick={() => remove(item)} className="rounded-lg border p-2 text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-gray-500">No announcements match these filters.</td></tr>}
          </tbody>
        </table>
      </div>

      {formOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="announcement-form-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={saveAnnouncement} className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 id="announcement-form-title" className="text-xl font-bold">{editing ? "Edit Announcement" : "New Announcement"}</h2>
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border p-2"><X size={16} /></button>
            </div>
            <label className="block">Title<input required value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} className="mt-1 w-full rounded-xl border p-3" /></label>
            <label className="block">Audience<select value={form.audience} onChange={(event) => setForm((current) => ({ ...current, audience: event.target.value }))} className="mt-1 w-full rounded-xl border p-3"><option>Parents</option><option>Students</option><option>Staff</option><option>Everyone</option></select></label>
            <label className="block">Category<input required value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="mt-1 w-full rounded-xl border p-3" /></label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label>Date<input type="date" required value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} className="mt-1 w-full rounded-xl border p-3" /></label>
              <label>Status<select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))} className="mt-1 w-full rounded-xl border p-3"><option>Draft</option><option>Scheduled</option><option>Published</option></select></label>
            </div>
            {formError && <p role="alert" className="text-sm text-red-700">{formError}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-xl border px-4 py-2">Cancel</button>
              <button type="submit" className="rounded-xl bg-blue-600 px-4 py-2 text-white">Save Announcement</button>
            </div>
          </form>
        </div>
      )}

      {viewing && (
        <div role="dialog" aria-modal="true" aria-labelledby="announcement-detail-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md space-y-3 rounded-2xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 id="announcement-detail-title" className="text-xl font-bold">{viewing.title}</h2>
              <button onClick={() => setViewing(null)} className="rounded-lg border p-2"><X size={16} /></button>
            </div>
            <p>Audience: {viewing.audience}</p>
            <p>Category: {viewing.category}</p>
            <p>Status: {viewing.status} · {viewing.date}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ icon, label, value }) {
  return <div className="rounded-3xl border p-5">{icon}<h2 className="mt-3 text-2xl font-bold">{value}</h2><p>{label}</p></div>;
}
