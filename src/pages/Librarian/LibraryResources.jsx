import { useMemo, useState } from "react";
import {
  BookOpen,
  FileText,
  Monitor,
  Plus,
  Search,
  Eye,
  Edit,
  Download,
  Archive,
} from "lucide-react";

const initialResources = [
  {
    title: "Mathematics for SS2",
    type: "Textbook",
    subject: "Mathematics",
    className: "SS2",
    format: "Physical",
    status: "Available",
  },
  {
    title: "WAEC Mathematics Past Questions 2025",
    type: "Past Questions",
    subject: "Mathematics",
    className: "SS3",
    format: "PDF",
    status: "Available",
  },
  {
    title: "Physics Practical Guide",
    type: "Study Guide",
    subject: "Physics",
    className: "SS2",
    format: "PDF",
    status: "Available",
  },
];

export default function LibrarianLibraryResourcesPage() {
  const [resources, setResources] = useState(initialResources);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [subject, setSubject] = useState("All Subjects");
  const [activeTab, setActiveTab] = useState("All");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch = [resource.title, resource.type, resource.subject].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesType = type === "All Types" || resource.type === type || resource.format === type;
      const matchesSubject = subject === "All Subjects" || resource.subject === subject;
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Physical" && resource.format === "Physical") ||
        (activeTab === "Digital" && resource.format !== "Physical") ||
        (activeTab === "Textbooks" && resource.type === "Textbook") ||
        (activeTab === "Journals" && resource.type === "Journal") ||
        (activeTab === "Past Questions" && resource.type === "Past Questions") ||
        (activeTab === "Research" && resource.type === "Research");

      return matchesSearch && matchesType && matchesSubject && matchesTab;
    });
  }, [resources, search, type, subject, activeTab]);

  const handleAddResource = () => {
    const title = window.prompt("Resource title:", "");
    if (!title || !title.trim()) return;
    const typeValue = window.prompt("Resource type:", "Textbook");
    if (!typeValue || !typeValue.trim()) return;
    const subjectValue = window.prompt("Subject:", "Mathematics");
    if (!subjectValue || !subjectValue.trim()) return;
    const classValue = window.prompt("Class:", "SS2");
    if (!classValue || !classValue.trim()) return;
    const formatValue = window.prompt("Format (Physical/PDF):", "Physical");
    if (!formatValue || !formatValue.trim()) return;

    setResources((current) => [
      { title: title.trim(), type: typeValue.trim(), subject: subjectValue.trim(), className: classValue.trim(), format: formatValue.trim(), status: "Available" },
      ...current,
    ]);
  };

  const handleEditResource = (resource) => {
    const title = window.prompt("Resource title:", resource.title);
    if (!title || !title.trim()) return;
    const typeValue = window.prompt("Resource type:", resource.type);
    if (!typeValue || !typeValue.trim()) return;
    const subjectValue = window.prompt("Subject:", resource.subject);
    if (!subjectValue || !subjectValue.trim()) return;
    const classValue = window.prompt("Class:", resource.className);
    if (!classValue || !classValue.trim()) return;
    const formatValue = window.prompt("Format:", resource.format);
    if (!formatValue || !formatValue.trim()) return;

    setResources((current) =>
      current.map((item) => {
        if (item.title !== resource.title) return item;
        return { ...item, title: title.trim(), type: typeValue.trim(), subject: subjectValue.trim(), className: classValue.trim(), format: formatValue.trim() };
      })
    );
  };

  const handleDeleteResource = (resource) => {
    if (window.confirm(`Delete "${resource.title}"?`)) {
      setResources((current) => current.filter((item) => item.title !== resource.title));
    }
  };

  const viewResource = (resource) => {
    window.alert(`${resource.title}\nType: ${resource.type}\nSubject: ${resource.subject}\nClass: ${resource.className}\nFormat: ${resource.format}\nStatus: ${resource.status}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Library Resources</h1>
          <p className="text-gray-500 mt-1">Manage physical and digital library resources.</p>
        </div>

        <button onClick={handleAddResource} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18} />
          Add Resource
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<BookOpen />} value={resources.length.toLocaleString()} label="Total Resources" />
        <StatCard icon={<BookOpen />} value={resources.filter((item) => item.format === "Physical").length.toLocaleString()} label="Physical" />
        <StatCard icon={<Monitor />} value={resources.filter((item) => item.format !== "Physical").length.toLocaleString()} label="Digital" />
        <StatCard icon={<FileText />} value={resources.filter((item) => item.status === "Available").length.toLocaleString()} label="Available" />
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <div className="border rounded-xl px-4 py-3 flex items-center flex-1">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search resources..."
            className="w-full ml-3 outline-none"
          />
        </div>

        <select value={type} onChange={(event) => setType(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Types</option>
          <option>Textbook</option>
          <option>Past Questions</option>
          <option>Study Guide</option>
          <option>Journal</option>
          <option>Video</option>
          <option>PDF</option>
        </select>

        <select value={subject} onChange={(event) => setSubject(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>English</option>
          <option>Physics</option>
          <option>Biology</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {[
          "All",
          "Physical",
          "Digital",
          "Textbooks",
          "Journals",
          "Past Questions",
          "Research",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl whitespace-nowrap ${
              activeTab === tab ? "bg-blue-600 text-white" : "border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredResources.length === 0 ? (
          <div className="col-span-full border rounded-2xl p-8 text-center text-gray-500">
            No resources match your filters.
          </div>
        ) : (
          filteredResources.map((resource) => (
            <ResourceCard
              key={`${resource.title}-${resource.format}`}
              resource={resource}
              onView={viewResource}
              onEdit={handleEditResource}
              onDelete={handleDeleteResource}
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
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}

function ResourceCard({ resource, onView, onEdit, onDelete }) {
  return (
    <div className="border rounded-3xl overflow-hidden">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        {resource.format === "Physical" ? <BookOpen size={42} /> : <FileText size={42} />}
      </div>

      <div className="p-5">
        <div className="flex justify-between gap-2">
          <span className="text-sm">{resource.type}</span>
          <span className="text-sm text-green-600">{resource.status}</span>
        </div>

        <h3 className="text-lg font-semibold mt-3">{resource.title}</h3>

        <div className="space-y-2 mt-4 text-sm text-gray-500">
          <p>Subject: {resource.subject}</p>
          <p>Class: {resource.className}</p>
          <p>Format: {resource.format}</p>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={() => onView(resource)} className="border rounded-lg p-2" aria-label={`View ${resource.title}`}>
            <Eye size={17} />
          </button>

          <button onClick={() => onEdit(resource)} className="border rounded-lg p-2" aria-label={`Edit ${resource.title}`}>
            <Edit size={17} />
          </button>

          <button className="border rounded-lg p-2" aria-label={`Download ${resource.title}`}>
            <Download size={17} />
          </button>

          <button onClick={() => onDelete(resource)} className="border rounded-lg p-2" aria-label={`Archive ${resource.title}`}>
            <Archive size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}