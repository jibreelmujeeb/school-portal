import { useMemo, useState } from "react";
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

const initialPolicies = [
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

export default function LibrarianLibraryPoliciesPage() {
  const [policies, setPolicies] = useState(initialPolicies);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredPolicies = useMemo(() => {
    return policies.filter((policy) => {
      const matchesSearch = [policy.title, policy.category].join(" ").toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = category === "All Categories" || policy.category === category;
      const matchesStatus = statusFilter === "All Status" || policy.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [policies, search, category, statusFilter]);

  const handleAddPolicy = () => {
    const title = window.prompt("Policy title:", "");
    if (!title || !title.trim()) return;
    const categoryValue = window.prompt("Category:", "Borrowing Rules");
    if (!categoryValue || !categoryValue.trim()) return;
    const versionValue = window.prompt("Version:", "1.0");
    if (!versionValue || !versionValue.trim()) return;
    const effectiveValue = window.prompt("Effective date:", "01 Sep 2026");
    if (!effectiveValue || !effectiveValue.trim()) return;

    setPolicies((current) => [{
      title: title.trim(),
      category: categoryValue.trim(),
      version: versionValue.trim(),
      effective: effectiveValue.trim(),
      status: "Draft",
    }, ...current]);
  };

  const handleEditPolicy = (policy) => {
    const title = window.prompt("Policy title:", policy.title);
    if (!title || !title.trim()) return;
    const categoryValue = window.prompt("Category:", policy.category);
    if (!categoryValue || !categoryValue.trim()) return;
    const versionValue = window.prompt("Version:", policy.version);
    if (!versionValue || !versionValue.trim()) return;
    const effectiveValue = window.prompt("Effective date:", policy.effective);
    if (!effectiveValue || !effectiveValue.trim()) return;

    setPolicies((current) => current.map((item) => item.title === policy.title ? {
      ...item,
      title: title.trim(),
      category: categoryValue.trim(),
      version: versionValue.trim(),
      effective: effectiveValue.trim(),
    } : item));
  };

  const handleArchivePolicy = (policy) => {
    if (window.confirm(`Archive "${policy.title}"?`)) {
      setPolicies((current) => current.map((item) => item.title === policy.title ? { ...item, status: "Archived" } : item));
    }
  };

  const viewPolicy = (policy) => {
    window.alert(`${policy.title}\nCategory: ${policy.category}\nVersion: ${policy.version}\nEffective: ${policy.effective}\nStatus: ${policy.status}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Library Policies</h1>
          <p className="text-gray-500 mt-1">Manage library rules, policies and regulations.</p>
        </div>

        <button onClick={handleAddPolicy} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center justify-center gap-2">
          <Plus size={18} />
          Create Policy
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<FileText />} value={policies.length.toLocaleString()} label="Total Policies" />
        <StatCard icon={<FileText />} value={policies.filter((policy) => policy.status === "Published").length.toLocaleString()} label="Published" />
        <StatCard icon={<Edit />} value={policies.filter((policy) => policy.status === "Draft").length.toLocaleString()} label="Drafts" />
        <StatCard icon={<Archive />} value={policies.filter((policy) => policy.status === "Archived").length.toLocaleString()} label="Archived" />
      </div>

      <div className="flex flex-col lg:flex-row gap-3">
        <div className="border rounded-xl px-4 py-3 flex items-center flex-1">
          <Search size={18} />
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search policies..."
            className="w-full ml-3 outline-none"
          />
        </div>

        <select value={category} onChange={(event) => setCategory(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Categories</option>
          <option>Borrowing Rules</option>
          <option>Fines</option>
          <option>Reservations</option>
          <option>E-Library</option>
          <option>Conduct</option>
        </select>

        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Status</option>
          <option>Published</option>
          <option>Draft</option>
          <option>Archived</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredPolicies.length === 0 ? (
          <div className="col-span-full border rounded-2xl p-8 text-center text-gray-500">
            No policies match your filters.
          </div>
        ) : (
          filteredPolicies.map((policy) => (
            <PolicyCard
              key={policy.title}
              policy={policy}
              onView={viewPolicy}
              onEdit={handleEditPolicy}
              onArchive={handleArchivePolicy}
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

function PolicyCard({ policy, onView, onEdit, onArchive }) {
  return (
    <div className="border rounded-3xl p-5">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 border rounded-xl flex items-center justify-center">
          <FileText size={20} />
        </div>

        <span className={`px-3 py-1 rounded-full text-sm ${
          policy.status === "Published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
        }`}>
          {policy.status}
        </span>
      </div>

      <h3 className="text-lg font-semibold mt-5">{policy.title}</h3>
      <p className="text-sm text-gray-500 mt-1">{policy.category}</p>

      <div className="space-y-2 mt-5 text-sm">
        <p><span className="font-medium">Version:</span> {policy.version}</p>
        <p><span className="font-medium">Effective:</span> {policy.effective}</p>
      </div>

      <div className="flex gap-2 mt-5">
        <button onClick={() => onView(policy)} className="border rounded-lg p-2" aria-label={`View ${policy.title}`}>
          <Eye size={17} />
        </button>

        <button onClick={() => onEdit(policy)} className="border rounded-lg p-2" aria-label={`Edit ${policy.title}`}>
          <Edit size={17} />
        </button>

        <button className="border rounded-lg p-2" aria-label={`History ${policy.title}`}>
          <History size={17} />
        </button>

        <button className="border rounded-lg p-2" aria-label={`Users ${policy.title}`}>
          <Users size={17} />
        </button>

        <button onClick={() => onArchive(policy)} className="border rounded-lg p-2" aria-label={`Archive ${policy.title}`}>
          <Archive size={17} />
        </button>
      </div>
    </div>
  );
}