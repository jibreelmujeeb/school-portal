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
  Upload,
  BarChart3,
} from "lucide-react";

export default function ELibraryManagementPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            E-Library Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage digital books, notes, videos and learning materials.
          </p>
        </div>

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <Plus size={18} />
          Add Resource
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">

        <StatCard
          icon={<BookOpen />}
          value="1,245"
          label="Resources"
        />

        <StatCard
          icon={<BookOpen />}
          value="420"
          label="E-Books"
        />

        <StatCard
          icon={<FileText />}
          value="530"
          label="Documents"
        />

        <StatCard
          icon={<Video />}
          value="180"
          label="Videos"
        />

        <StatCard
          icon={<Eye />}
          value="12,450"
          label="Views"
        />

        <StatCard
          icon={<Download />}
          value="8,450"
          label="Downloads"
        />

      </div>

      {/* Search / Filters */}
      <div className="flex flex-col lg:flex-row gap-4">

        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search resources..."
            className="w-full ml-3 outline-none"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Types</option>
          <option>E-Book</option>
          <option>PDF</option>
          <option>Lecture Note</option>
          <option>Past Question</option>
          <option>Video</option>
          <option>Audio</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Subjects</option>
          <option>Mathematics</option>
          <option>Physics</option>
          <option>Biology</option>
          <option>Chemistry</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Classes</option>
          <option>JSS1</option>
          <option>JSS2</option>
          <option>JSS3</option>
          <option>SS1</option>
          <option>SS2</option>
          <option>SS3</option>
        </select>

      </div>

      {/* Resource Table */}
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

            <ResourceRow
              title="Advanced Physics for SS2"
              type="E-Book"
              subject="Physics"
              className="SS2"
              views="245"
              downloads="89"
              status="Published"
            />

            <ResourceRow
              title="Mathematics Revision Notes"
              type="PDF"
              subject="Mathematics"
              className="SS1"
              views="180"
              downloads="64"
              status="Published"
            />

            <ResourceRow
              title="Biology Practical Guide"
              type="Video"
              subject="Biology"
              className="SS3"
              views="320"
              downloads="0"
              status="Draft"
            />

          </tbody>

        </table>

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

      <p className="text-gray-500">
        {label}
      </p>
    </div>
  );
}

function ResourceRow({
  title,
  type,
  subject,
  className,
  views,
  downloads,
  status,
}) {
  return (
    <tr className="border-b">

      <td className="p-4 font-medium">
        {title}
      </td>

      <td className="p-4">
        {type}
      </td>

      <td className="p-4">
        {subject}
      </td>

      <td className="p-4">
        {className}
      </td>

      <td className="p-4">
        {views}
      </td>

      <td className="p-4">
        {downloads}
      </td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full ${
            status === "Published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {status}
        </span>
      </td>

      <td className="p-4">

        <div className="flex gap-2">

          <button className="border rounded-lg p-2" title="View">
            <Eye size={16} />
          </button>

          <button className="border rounded-lg p-2" title="Edit">
            <Edit size={16} />
          </button>

          <button className="border rounded-lg p-2" title="Analytics">
            <BarChart3 size={16} />
          </button>

          <button className="border rounded-lg p-2" title="Delete">
            <Trash2 size={16} />
          </button>

        </div>

      </td>

    </tr>
  );
}