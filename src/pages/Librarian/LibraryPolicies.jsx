import {
  FileText,
  Plus,
  Search,
  Eye,
  Edit,
  Archive,
  History,
  Users,
} from "lucide-react";

export default function LibrarianLibraryPoliciesPage() {
  const policies = [
    {
      title: "Library Borrowing Policy",
      category: "Borrowing Rules",
      version: "2.1",
      effective: "01 Aug 2026",
      status: "Published",
    },
    {
      title: "Overdue & Fine Policy",
      category: "Fines",
      version: "1.4",
      effective: "01 Aug 2026",
      status: "Published",
    },
    {
      title: "E-Library Usage Policy",
      category: "E-Library",
      version: "1.2",
      effective: "15 Jul 2026",
      status: "Published",
    },
    {
      title: "Library Conduct Rules",
      category: "Conduct",
      version: "1.0",
      effective: "01 Sep 2026",
      status: "Draft",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row
        lg:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Library Policies
          </h1>

          <p className="text-gray-500 mt-1">
            Manage library rules, policies and regulations.
          </p>
        </div>

        <button
          className="bg-blue-600 text-white px-5 py-3
          rounded-xl flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Create Policy
        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          icon={<FileText />}
          value="28"
          label="Total Policies"
        />

        <StatCard
          icon={<FileText />}
          value="21"
          label="Published"
        />

        <StatCard
          icon={<Edit />}
          value="4"
          label="Drafts"
        />

        <StatCard
          icon={<Archive />}
          value="3"
          label="Archived"
        />

      </div>

      {/* Search */}
      <div className="flex flex-col lg:flex-row gap-3">

        <div className="border rounded-xl px-4 py-3
          flex items-center flex-1">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search policies..."
            className="w-full ml-3 outline-none"
          />

        </div>

        <select className="border rounded-xl px-4 py-3">
          <option>All Categories</option>
          <option>Borrowing Rules</option>
          <option>Fines</option>
          <option>Reservations</option>
          <option>E-Library</option>
          <option>Conduct</option>
        </select>

        <select className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>

      </div>

      {/* Policy Cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">

        {policies.map((policy) => (
          <PolicyCard
            key={policy.title}
            policy={policy}
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

function PolicyCard({ policy }) {
  return (
    <div className="border rounded-3xl p-5">

      <div className="flex items-start justify-between">

        <div className="w-11 h-11 border rounded-xl
          flex items-center justify-center">

          <FileText size={20} />

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            policy.status === "Published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {policy.status}
        </span>

      </div>

      <h3 className="text-lg font-semibold mt-5">
        {policy.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {policy.category}
      </p>

      <div className="space-y-2 mt-5 text-sm">

        <p>
          <span className="font-medium">
            Version:
          </span>{" "}
          {policy.version}
        </p>

        <p>
          <span className="font-medium">
            Effective:
          </span>{" "}
          {policy.effective}
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
          <History size={17} />
        </button>

        <button className="border rounded-lg p-2">
          <Users size={17} />
        </button>

        <button className="border rounded-lg p-2">
          <Archive size={17} />
        </button>

      </div>

    </div>
  );
}