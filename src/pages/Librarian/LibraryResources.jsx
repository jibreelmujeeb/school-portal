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

export default function LibrarianLibraryResourcesPage() {
  const resources = [
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

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Library Resources
          </h1>

          <p className="text-gray-500 mt-1">
            Manage physical and digital library resources.
          </p>
        </div>

        <button className="bg-blue-600 text-white
          px-5 py-3 rounded-xl flex items-center gap-2">

          <Plus size={18} />
          Add Resource

        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<BookOpen />}
          value="5,820"
          label="Total Resources"
        />

        <StatCard
          icon={<BookOpen />}
          value="3,450"
          label="Physical"
        />

        <StatCard
          icon={<Monitor />}
          value="2,370"
          label="Digital"
        />

        <StatCard
          icon={<FileText />}
          value="4,980"
          label="Available"
        />

      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row gap-3">

        <div className="border rounded-xl px-4 py-3
          flex items-center flex-1">

          <Search size={18} />

          <input
            placeholder="Search resources..."
            className="w-full ml-3 outline-none"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Types</option>
          <option>Textbook</option>
          <option>Past Questions</option>
          <option>Journal</option>
          <option>PDF</option>
          <option>Video</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>English</option>
          <option>Physics</option>
          <option>Biology</option>
        </select>

      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto">

        {[
          "All",
          "Physical",
          "Digital",
          "Textbooks",
          "Journals",
          "Past Questions",
          "Research",
        ].map((tab, index) => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-xl
              whitespace-nowrap ${
                index === 0
                  ? "bg-blue-600 text-white"
                  : "border"
              }`}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* Resources */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        {resources.map((resource) => (
          <ResourceCard
            key={resource.title}
            resource={resource}
          />
        ))}

      </div>

    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="border rounded-2xl p-5">

      <div className="mb-3">
        {icon}
      </div>

      <h2 className="text-2xl font-bold">
        {value}
      </h2>

      <p className="text-sm text-gray-500">
        {label}
      </p>

    </div>
  );
}

function ResourceCard({ resource }) {
  return (
    <div className="border rounded-3xl overflow-hidden">

      <div className="h-40 bg-gray-100
        flex items-center justify-center">

        {resource.format === "Physical" ? (
          <BookOpen size={42} />
        ) : (
          <FileText size={42} />
        )}

      </div>

      <div className="p-5">

        <div className="flex justify-between gap-2">

          <span className="text-sm">
            {resource.type}
          </span>

          <span className="text-sm
            text-green-600">
            {resource.status}
          </span>

        </div>

        <h3 className="text-lg font-semibold mt-3">
          {resource.title}
        </h3>

        <div className="space-y-2 mt-4
          text-sm text-gray-500">

          <p>
            Subject: {resource.subject}
          </p>

          <p>
            Class: {resource.className}
          </p>

          <p>
            Format: {resource.format}
          </p>

        </div>

        <div className="flex gap-2 mt-5">

          <button className="border rounded-lg p-2">
            <Eye size={17} />
          </button>

          <button className="border rounded-lg p-2">
            <Edit size={17} />
          </button>

          <button className="border rounded-lg p-2">
            <Download size={17} />
          </button>

          <button className="border rounded-lg p-2">
            <Archive size={17} />
          </button>

        </div>

      </div>

    </div>
  );
}