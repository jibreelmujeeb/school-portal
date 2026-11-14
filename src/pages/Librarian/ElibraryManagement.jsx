import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  BookOpen,
  FileText,
  Video,
  Download,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const initialResources = [
  { id: "RES-201", title: "Advanced Physics for SS2", type: "E-Book", subject: "Physics", className: "SS2", views: 245, downloads: 89, status: "Published" },
  { id: "RES-202", title: "Mathematics Revision Notes", type: "PDF", subject: "Mathematics", className: "SS1", views: 180, downloads: 64, status: "Published" },
  { id: "RES-203", title: "Biology Practical Guide", type: "Video", subject: "Biology", className: "SS3", views: 320, downloads: 0, status: "Draft" },
];

export default function ELibraryManagementPage() {
  const [resources, setResources] = useState(initialResources);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [subjectFilter, setSubjectFilter] = useState("All Subjects");
  const [classFilter, setClassFilter] = useState("All Classes");

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchesSearch = [item.title, item.type, item.subject, item.id].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesType = typeFilter === "All Types" || item.type === typeFilter;
      const matchesSubject = subjectFilter === "All Subjects" || item.subject === subjectFilter;
      const matchesClass = classFilter === "All Classes" || item.className === classFilter;
      return matchesSearch && matchesType && matchesSubject && matchesClass;
    });
  }, [resources, search, typeFilter, subjectFilter, classFilter]);

  const handleAddResource = () => {
    const title = window.prompt("Resource title:", "New Digital Guide");
    if (!title || !title.trim()) return;

    const type = window.prompt("Resource type:", "E-Book");
    if (!type || !type.trim()) return;

    const subject = window.prompt("Subject:", "Mathematics");
    if (!subject || !subject.trim()) return;

    const className = window.prompt("Class:", "SS2");
    if (!className || !className.trim()) return;

    setResources((current) => [{
      id: `RES-${Date.now().toString().slice(-3)}`,
      title: title.trim(),
      type: type.trim(),
      subject: subject.trim(),
      className: className.trim(),
      views: 0,
      downloads: 0,
      status: "Draft",
    }, ...current]);
  };

  const handleDelete = (id) => {
    setResources((current) => current.filter((item) => item.id !== id));
  };

  const handleStatusChange = (id, status) => {
    setResources((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">E-Library Management</h1>
          <p className="text-gray-500 mt-1">Manage digital books, notes, videos and learning materials.</p>
        </div>

        <button onClick={handleAddResource} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <Plus size={18} />
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard icon={<BookOpen />} value={resources.length.toLocaleString()} label="Resources" />
        <StatCard icon={<BookOpen />} value={resources.filter((item) => item.type === "E-Book").length.toLocaleString()} label="E-Books" />
        <StatCard icon={<FileText />} value={resources.filter((item) => item.type === "PDF").length.toLocaleString()} label="Documents" />
        <StatCard icon={<Video />} value={resources.filter((item) => item.type === "Video").length.toLocaleString()} label="Videos" />
        <StatCard icon={<Eye />} value={resources.reduce((sum, item) => sum + item.views, 0).toLocaleString()} label="Views" />
        <StatCard icon={<Download />} value={resources.reduce((sum, item) => sum + item.downloads, 0).toLocaleString()} label="Downloads" />
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search resources..."
            className="w-full ml-3 outline-none"
          />
        </div>

        <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Types</option>
          <option>E-Book</option>
          <option>PDF</option>
          <option>Lecture Note</option>
          <option>Past Question</option>
          <option>Video</option>
          <option>Audio</option>
        </select>

        <select value={subjectFilter} onChange={(event) => setSubjectFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>Physics</option>
          <option>Biology</option>
          <option>Chemistry</option>
        </select>

        <select value={classFilter} onChange={(event) => setClassFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Classes</option>
          <option>JSS1</option>
          <option>JSS2</option>
          <option>JSS3</option>
          <option>SS1</option>
          <option>SS2</option>
          <option>SS3</option>
        </select>
      </div>

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="border-b">
            <tr>
              <th className="text-left p-4">Resource</th>
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Subject</th>
              <th className="text-left p-4">Class</th>
              <th className="text-left p-4">Views</th>
              <th className="text-left p-4">Downloads</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredResources.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-gray-500">No resources match your current filters.</td>
              </tr>
            ) : (
              filteredResources.map((item) => (
                <ResourceRow
                  key={item.id}
                  title={item.title}
                  type={item.type}
                  subject={item.subject}
                  className={item.className}
                  views={item.views}
                  downloads={item.downloads}
                  status={item.status}
                  onDelete={() => handleDelete(item.id)}
                  onPublish={() => handleStatusChange(item.id, "Published")}
                />
              ))
            )}
          </tbody>
        </table>
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

function ResourceRow({ title, type, subject, className, views, downloads, status, onDelete, onPublish }) {
  return (
    <tr className="border-b">
      <td className="p-4 font-medium">{title}</td>
      <td className="p-4">{type}</td>
      <td className="p-4">{subject}</td>
      <td className="p-4">{className}</td>
      <td className="p-4">{views}</td>
      <td className="p-4">{downloads}</td>
      <td className="p-4">
        <span className={`px-3 py-1 rounded-full ${status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
          {status}
        </span>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <button className="border rounded-lg p-2" title="View"><Eye size={16} /></button>
          <button onClick={onPublish} className="border rounded-lg p-2" title="Publish"><Edit size={16} /></button>
          <button onClick={onDelete} className="border rounded-lg p-2" title="Delete"><Trash2 size={16} /></button>
        </div>
      </td>
    </tr>
  );
}