import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Megaphone,
  Eye,
  Edit,
  Trash2,
  Pin,
  CalendarDays,
  Send,
} from "lucide-react";

const initialAnnouncements = [
  { id: "ANN-101", title: "Library Week 2026", type: "Library Event", audience: "Students + Teachers", date: "10 Aug 2026", status: "Published", views: 428, pinned: true },
  { id: "ANN-102", title: "Book Return Reminder", type: "Book Return", audience: "Students", date: "08 Aug 2026", status: "Published", views: 315, pinned: false },
  { id: "ANN-103", title: "New E-Books Available", type: "New Resources", audience: "SS Students", date: "06 Aug 2026", status: "Draft", views: 0, pinned: false },
];

export default function LibrarianAnnouncementPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [audienceFilter, setAudienceFilter] = useState("All Audiences");

  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      const matchesSearch = [item.title, item.type, item.audience].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesType = typeFilter === "All Types" || item.type === typeFilter;
      const matchesStatus = statusFilter === "All Status" || item.status === statusFilter;
      const matchesAudience = audienceFilter === "All Audiences" || item.audience.includes(audienceFilter);
      return matchesSearch && matchesType && matchesStatus && matchesAudience;
    });
  }, [announcements, search, typeFilter, statusFilter, audienceFilter]);

  const handleCreateAnnouncement = () => {
    const title = window.prompt("Announcement title:", "New Library Notice");
    if (!title || !title.trim()) return;
    const type = window.prompt("Type:", "Library Event");
    if (!type || !type.trim()) return;
    const audience = window.prompt("Audience:", "Students");
    if (!audience || !audience.trim()) return;
    const date = window.prompt("Date:", "15 Aug 2026");
    if (!date || !date.trim()) return;

    setAnnouncements((current) => [{
      id: `ANN-${Date.now().toString().slice(-3)}`,
      title: title.trim(),
      type: type.trim(),
      audience: audience.trim(),
      date: date.trim(),
      status: "Draft",
      views: 0,
      pinned: false,
    }, ...current]);
  };

  const handleDelete = (id) => {
    setAnnouncements((current) => current.filter((item) => item.id !== id));
  };

  const handleTogglePin = (id) => {
    setAnnouncements((current) => current.map((item) => item.id === id ? { ...item, pinned: !item.pinned } : item));
  };

  const handleStatusChange = (id, status) => {
    setAnnouncements((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Library Announcements</h1>
          <p className="text-gray-500 mt-1">Create and manage announcements for library users.</p>
        </div>

        <button onClick={handleCreateAnnouncement} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <Plus size={18} />
          Create Announcement
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={<Megaphone />} value={announcements.length.toLocaleString()} label="Total" />
        <StatCard icon={<Send />} value={announcements.filter((item) => item.status === "Published").length.toLocaleString()} label="Published" />
        <StatCard icon={<Edit />} value={announcements.filter((item) => item.status === "Draft").length.toLocaleString()} label="Drafts" />
        <StatCard icon={<Pin />} value={announcements.filter((item) => item.pinned).length.toLocaleString()} label="Pinned" />
        <StatCard icon={<CalendarDays />} value={announcements.filter((item) => item.status === "Scheduled").length.toLocaleString()} label="Scheduled" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search announcements..."
            className="w-full ml-3 outline-none"
          />
        </div>

        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Types</option>
          <option>Library Event</option>
          <option>Library Rules</option>
          <option>Book Return</option>
          <option>New Resources</option>
          <option>Library Closure</option>
        </select>

        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Scheduled</option>
          <option>Archived</option>
        </select>

        <select value={audienceFilter} onChange={(event) => setAudienceFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Audiences</option>
          <option>Students</option>
          <option>Teachers</option>
          <option>Parents</option>
          <option>Staff</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredAnnouncements.length === 0 ? (
          <div className="col-span-full rounded-3xl border p-8 text-center text-gray-500">No announcements match your current filters.</div>
        ) : (
          filteredAnnouncements.map((item) => (
            <AnnouncementCard
              key={item.id}
              title={item.title}
              type={item.type}
              audience={item.audience}
              date={item.date}
              status={item.status}
              views={item.views}
              pinned={item.pinned}
              onDelete={() => handleDelete(item.id)}
              onPinToggle={() => handleTogglePin(item.id)}
              onPublish={() => handleStatusChange(item.id, "Published")}
            />
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">
      <div className="mb-3">{icon}</div>
      <h2 className="text-2xl font-bold">{value}</h2>
      <p className="text-gray-500">{label}</p>
    </div>
  );
}

function AnnouncementCard({ title, type, audience, date, status, views, pinned = false, onDelete, onPinToggle, onPublish }) {
  return (
    <div className="border rounded-3xl p-5">
      <div className="flex justify-between items-start">
        <div className="w-11 h-11 rounded-xl border flex items-center justify-center">
          <Megaphone size={20} />
        </div>

        {pinned && (
          <button onClick={onPinToggle} className="flex items-center gap-1 text-sm text-blue-600">
            <Pin size={15} />
            Pinned
          </button>
        )}
      </div>

      <h3 className="text-lg font-semibold mt-5">{title}</h3>
      <p className="text-sm text-gray-500 mt-1">{type}</p>

      <div className="space-y-2 mt-4 text-sm">
        <p><span className="font-medium">Audience:</span> {audience}</p>
        <p><span className="font-medium">Date:</span> {date}</p>
        <p><span className="font-medium">Views:</span> {views}</p>
      </div>

      <div className="flex items-center justify-between mt-5">
        <span className={`px-3 py-1 rounded-full text-sm ${status === "Published" ? "bg-green-100 text-green-700" : status === "Draft" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}>
          {status}
        </span>

        <div className="flex gap-2">
          <button className="border rounded-lg p-2" title="View"><Eye size={16} /></button>
          <button onClick={onPublish} className="border rounded-lg p-2" title="Publish"><Send size={16} /></button>
          <button onClick={onPinToggle} className="border rounded-lg p-2" title="Pin"><Pin size={16} /></button>
          <button onClick={onDelete} className="border rounded-lg p-2" title="Delete"><Trash2 size={16} /></button>
        </div>
      </div>
    </div>
  );
}