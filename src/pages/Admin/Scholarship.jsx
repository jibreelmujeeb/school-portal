import React, { useState } from "react";
import {
  GraduationCap,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  CheckCircle,
} from "lucide-react";

const initialScholarships = [
  {
    id: 1,
    title: "Academic Excellence Scholarship",
    category: "Merit",
    beneficiaries: 25,
    value: "100% Tuition",
    status: "Active",
  },
  {
    id: 2,
    title: "Sports Scholarship",
    category: "Sports",
    beneficiaries: 15,
    value: "50% Tuition",
    status: "Active",
  },
];

export default function AdminScholarshipPage() {
  const [search, setSearch] = useState("");
  const [scholarships, setScholarships] = useState(initialScholarships);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [notice, setNotice] = useState("");

  const filtered = scholarships.filter((item) =>
    [item.title, item.category].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    ) &&
    (categoryFilter === "All Categories" || item.category === categoryFilter) &&
    (statusFilter === "All Statuses" || item.status === statusFilter)
  );

  const promptForScholarship = (item) => {
    const title = window.prompt("Scholarship title:", item?.title || "");
    if (title === null || !title.trim()) return;
    const category = window.prompt("Category (Merit, Sports, Need-Based):", item?.category || "Merit");
    if (category === null || !category.trim()) return;
    const value = window.prompt("Award value:", item?.value || "100% Tuition");
    if (value === null || !value.trim()) return;
    const status = window.prompt("Status (Active or Inactive):", item?.status || "Active");
    if (status === null || !["Active", "Inactive"].includes(status)) return;

    const nextItem = { ...(item || {}), id: item?.id || Date.now(), title: title.trim(), category: category.trim(), value: value.trim(), beneficiaries: item?.beneficiaries || 0, status };
    setScholarships((current) => item
      ? current.map((scholarship) => scholarship.id === item.id ? nextItem : scholarship)
      : [nextItem, ...current]);
    setNotice("Scholarship changes are saved in this page only.");
  };

  const exportCSV = () => {
    const rows = [
      ["Scholarship", "Category", "Beneficiaries", "Value", "Status"],
      ...filtered.map((item) => [item.title, item.category, item.beneficiaries, item.value, item.status]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "scholarships.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Scholarship Management
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage scholarship programs and beneficiaries.
          </p>

        </div>

        <button onClick={() => promptForScholarship()} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Plus size={18}/>
          New Scholarship
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <GraduationCap className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">{scholarships.length}</h2>
          <p>Scholarships</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">{scholarships.reduce((total, item) => total + item.beneficiaries, 0)}</h2>
          <p>Beneficiaries</p>
        </div>

        <div className="border rounded-3xl p-5">
          <GraduationCap className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">{scholarships.filter((item) => item.status === "Active").reduce((total, item) => total + item.beneficiaries, 0)}</h2>
          <p>Active Beneficiaries</p>
        </div>

        <div className="border rounded-3xl p-5">
          <GraduationCap className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">₦18M</h2>
          <p>Budget</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">
          <Search className="mr-3"/>
          <input
            placeholder="Search scholarship..."
            className="outline-none w-full"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        <label className="border rounded-xl px-4 flex items-center gap-2">
          <Filter size={18}/>
          <span className="sr-only">Filter category</span>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="bg-transparent outline-none">
            <option>All Categories</option>
            {[...new Set(scholarships.map((item) => item.category))].map((category) => <option key={category}>{category}</option>)}
          </select>
        </label>

        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="border rounded-xl px-4 py-3">
          <option>All Statuses</option><option>Active</option><option>Inactive</option>
        </select>

        <button onClick={exportCSV} className="border rounded-xl px-5 flex items-center gap-2">
          <Download size={18}/>
          Export
        </button>

      </div>

      {notice && <p role="status" className="text-sm text-green-700">{notice}</p>}

      {/* Table */}

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1100px]">

          <thead className="bg-gray-50">

            <tr>

              <th>Scholarship</th>
              <th>Category</th>
              <th>Beneficiaries</th>
              <th>Value</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item)=>(
              <tr key={item.id} className="border-t">

                <td>{item.title}</td>

                <td>{item.category}</td>

                <td>{item.beneficiaries}</td>

                <td>{item.value}</td>

                <td>

                  <span className={`px-3 py-1 rounded-full ${item.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                    {item.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-2">

                    <button onClick={() => window.alert(`${item.title}\n${item.category} · ${item.value}\n${item.beneficiaries} beneficiaries · ${item.status}`)} aria-label={`View ${item.title}`} className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button onClick={() => promptForScholarship(item)} aria-label={`Edit ${item.title}`} className="border rounded-lg p-2">
                      <Edit size={16}/>
                    </button>

                    <button onClick={() => {
                      if (window.confirm(`Delete "${item.title}"?`)) {
                        setScholarships((current) => current.filter((scholarship) => scholarship.id !== item.id));
                      }
                    }} aria-label={`Delete ${item.title}`} className="border rounded-lg p-2">
                      <Trash2 size={16}/>
                    </button>

                  </div>

                </td>

              </tr>
            ))}

            {filtered.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-gray-500">No scholarships match your search or filters.</td></tr>}

          </tbody>

        </table>

      </div>

    </div>
  );
}