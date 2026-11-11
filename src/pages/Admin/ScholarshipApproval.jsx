import React, { useMemo, useState } from "react";
import {
  GraduationCap,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Eye,
  Download,
  MoreVertical,
} from "lucide-react";

const initialApplications = [
  {
    id: "SCH-2026-001",
    student: "Ahmed Musa",
    className: "SS 2",
    type: "Merit",
    amount: "₦250,000",
    status: "Pending",
    date: "Sep 01, 2026",
    session: "2026/2027",
  },
  {
    id: "SCH-2026-002",
    student: "Fatima Bello",
    className: "JSS 3",
    type: "Need-Based",
    amount: "₦180,000",
    status: "Pending",
    date: "Sep 01, 2026",
    session: "2026/2027",
  },
  {
    id: "SCH-2026-003",
    student: "John Peter",
    className: "SS 1",
    type: "Sports",
    amount: "₦150,000",
    status: "Approved",
    date: "Aug 30, 2026",
    session: "2026/2027",
  },
];

export default function AdminScholarshipApprovalPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Scholarships");
  const [sessionFilter, setSessionFilter] = useState("2026/2027");
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredApplications = useMemo(() => applications.filter((application) => {
    const query = search.trim().toLowerCase();
    return (
      [application.id, application.student, application.className]
        .some((value) => value.toLowerCase().includes(query)) &&
      (statusFilter === "All Status" || application.status === statusFilter) &&
      (typeFilter === "All Scholarships" || application.type === typeFilter) &&
      application.session === sessionFilter
    );
  }), [applications, search, statusFilter, typeFilter, sessionFilter]);

  const updateApplication = (id, status) => {
    setApplications((current) => current.map((application) =>
      application.id === id ? { ...application, status } : application
    ));
    setSelected(null);
    setNotice(`Application ${id} marked ${status.toLowerCase()} locally.`);
  };

  const exportCSV = () => {
    const rows = [
      ["Application", "Student", "Class", "Scholarship", "Requested", "Status"],
      ...filteredApplications.map((application) => [
        application.id, application.student, application.className,
        application.type, application.amount, application.status,
      ]),
    ];
    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "scholarship-applications.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row
        lg:items-center lg:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Scholarship Approval
          </h1>

          <p className="mt-1 text-gray-500">
            Review and approve student scholarship
            applications.
          </p>
        </div>

        <button onClick={exportCSV} className="flex items-center gap-2
          rounded-xl border px-5 py-3">

          <Download size={18} />

          Export

        </button>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

        <StatCard
          icon={<GraduationCap />}
          value={applications.length}
          label="Total Applications"
        />

        <StatCard
          icon={<Clock />}
          value={applications.filter((application) => application.status === "Pending" || application.status === "Under Review").length}
          label="Pending"
        />

        <StatCard
          icon={<CheckCircle />}
          value={applications.filter((application) => application.status === "Approved").length}
          label="Approved"
        />

        <StatCard
          icon={<XCircle />}
          value={applications.filter((application) => application.status === "Rejected").length}
          label="Rejected"
        />

      </div>

      {/* Filters */}
      <div className="rounded-2xl border p-4">

        <div className="grid gap-3 md:grid-cols-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3"
            />

            <input
              placeholder="Search student..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full rounded-xl border
                py-3 pl-10 pr-4 outline-none"
            />

          </div>

          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="rounded-xl border px-4 py-3">
            <option>All Status</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>

          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} className="rounded-xl border px-4 py-3">
            <option>All Scholarships</option>
            <option>Merit</option>
            <option>Need-Based</option>
            <option>Sports</option>
          </select>

          <select value={sessionFilter} onChange={(event) => setSessionFilter(event.target.value)} className="rounded-xl border px-4 py-3">
            <option>2026/2027</option>
            <option>2025/2026</option>
          </select>

        </div>

        {notice && <p role="status" className="text-sm text-green-700">{notice}</p>}

      </div>

      {/* Applications */}
      <div className="overflow-hidden rounded-3xl border">

        <div className="border-b p-5">
          <h2 className="text-xl font-bold">
            Scholarship Applications
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="border-b">

              <tr>
                <th className="p-4 text-left">
                  Application
                </th>

                <th className="p-4 text-left">
                  Student
                </th>

                <th className="p-4 text-left">
                  Class
                </th>

                <th className="p-4 text-left">
                  Scholarship
                </th>

                <th className="p-4 text-left">
                  Requested
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Action
                </th>
              </tr>

            </thead>

            <tbody>

              {filteredApplications.map((application) => (

                <tr
                  key={application.id}
                  className="border-b last:border-0"
                >

                  <td className="p-4 font-medium">
                    {application.id}
                  </td>

                  <td className="p-4">
                    {application.student}
                  </td>

                  <td className="p-4">
                    {application.className}
                  </td>

                  <td className="p-4">
                    {application.type}
                  </td>

                  <td className="p-4 font-medium">
                    {application.amount}
                  </td>

                  <td className="p-4">
                    <StatusBadge
                      status={application.status}
                    />
                  </td>

                  <td className="p-4">

                    <div className="flex gap-2">

                      <button
                        onClick={() => setSelected(application)}
                        className="rounded-lg border p-2"
                        title="Review"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => setSelected(application)}
                        className="rounded-lg border p-2"
                        title="More"
                      >
                        <MoreVertical size={16} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

              {filteredApplications.length === 0 && <tr><td colSpan={7} className="p-8 text-center text-gray-500">No applications match your search or filters.</td></tr>}

            </tbody>

          </table>

        </div>

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6">
              <div className="flex items-start justify-between">
                <div><h2 className="text-xl font-bold">{selected.student}</h2><p className="text-sm text-gray-500">{selected.id} · {selected.className}</p></div>
                <button onClick={() => setSelected(null)} aria-label="Close review">×</button>
              </div>
              <p><strong>Scholarship:</strong> {selected.type}</p>
              <p><strong>Requested:</strong> {selected.amount}</p>
              <p><strong>Current status:</strong> {selected.status}</p>
              <p className="text-xs text-gray-500">Review changes are stored in this page only; no notification is sent.</p>
              <div className="flex flex-wrap justify-end gap-2">
                <button onClick={() => updateApplication(selected.id, "Under Review")} className="rounded-lg border px-3 py-2">Under Review</button>
                <button onClick={() => updateApplication(selected.id, "Rejected")} className="rounded-lg border border-red-200 px-3 py-2 text-red-700">Reject</button>
                <button onClick={() => updateApplication(selected.id, "Approved")} className="rounded-lg bg-green-600 px-3 py-2 text-white">Approve</button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="rounded-2xl border p-5">

      {icon}

      <h2 className="mt-3 text-2xl font-bold">
        {value}
      </h2>

      <p className="text-sm text-gray-500">
        {label}
      </p>

    </div>
  );
}

function StatusBadge({ status }) {

  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    "Under Review": "bg-blue-100 text-blue-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm
        ${styles[status] || "bg-gray-100 text-gray-700"}`}
    >
      {status}
    </span>
  );
}