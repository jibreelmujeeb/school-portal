import React, { useState } from "react";
import {
  XCircle,
  Search,
  Filter,
  Eye,
  FileText,
  Download,
  AlertTriangle,
} from "lucide-react";

const initialRejectedApplications = [
  {
    id: 1,
    applicationNo: "ADM2026005",
    applicant: "David Samuel",
    classApplied: "JSS 1",
    reason: "Failed Entrance Examination",

    
    date: "2026-07-15",
    status: "Rejected",
  },
  {
    id: 2,
    applicationNo: "ADM2026010",
    applicant: "Grace Peter",
    classApplied: "SS 1",
    reason: "Incomplete Documents",
    date: "2026-07-16",
    status: "Rejected",
  },
];

export default function AdminAdmissionRejectionPage() {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [applications, setApplications] = useState(initialRejectedApplications);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");

  const filtered = applications.filter(
    (app) =>
      (app.applicant.toLowerCase().includes(search.toLowerCase()) ||
        app.applicationNo.toLowerCase().includes(search.toLowerCase())) &&
      (classFilter === "All" || app.classApplied === classFilter)
  );

  const exportApplications = () => {
    const header = ["Application No.", "Applicant", "Class", "Reason", "Date", "Status"];
    const csv = [header, ...filtered.map((app) => [
      app.applicationNo, app.applicant, app.classApplied, app.reason, app.date, app.status,
    ])].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "admission-rejections.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Admission Rejections
          </h1>

          <p className="text-gray-500 mt-2">
            Manage rejected admission applications and notify applicants.
          </p>
        </div>

        <button onClick={exportApplications} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <XCircle className="text-red-600 mb-3" />
          <h2 className="text-2xl font-bold">52</h2>
          <p>Rejected</p>
        </div>

        <div className="border rounded-3xl p-5">
          <AlertTriangle className="text-yellow-600 mb-3" />
          <h2 className="text-2xl font-bold">18</h2>
          <p>Pending Review</p>
        </div>

        <div className="border rounded-3xl p-5">
          <FileText className="text-blue-600 mb-3" />
          <h2 className="text-2xl font-bold">7</h2>
          <p>Appeals</p>
        </div>

        <div className="border rounded-3xl p-5">
          <XCircle className="text-purple-600 mb-3" />
          <h2 className="text-2xl font-bold">16%</h2>
          <p>Rejection Rate</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">
          <Search className="mr-3" />
          <input
            placeholder="Search applications..."
            className="outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <label className="border rounded-xl px-4 flex items-center gap-2">
          <Filter size={18} />
          <span className="sr-only">Filter applications by class</span>
          <select aria-label="Filter applications by class" className="bg-transparent outline-none py-3" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
            <option>All</option><option>JSS 1</option><option>SS 1</option>
          </select>
        </label>

      </div>
      {notice && <p role="status" className="text-sm text-blue-700">{notice}</p>}

      {/* Table */}

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1200px]">

          <thead className="bg-gray-50">
            <tr>
              <th>Application No.</th>
              <th>Applicant</th>
              <th>Class</th>
              <th>Reason</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((app) => (
              <tr key={app.id} className="border-t">
                <td>{app.applicationNo}</td>
                <td>{app.applicant}</td>
                <td>{app.classApplied}</td>
                <td>{app.reason}</td>
                <td>{app.date}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full ${app.status === "Reviewed" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                    {app.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button aria-label={`View ${app.applicant}'s rejection`} title="View rejection" onClick={() => setSelected(app)} className="border rounded-lg p-2">
                      <Eye size={16} />
                    </button>

                    <button aria-label={`Review ${app.applicant}'s appeal`} title="Mark appeal reviewed" onClick={() => {
                      setApplications((current) => current.map((item) =>
                        item.id === app.id ? { ...item, status: item.status === "Reviewed" ? "Rejected" : "Reviewed" } : item
                      ));
                      setNotice(`${app.applicant}'s appeal marked ${app.status === "Reviewed" ? "not reviewed" : "reviewed"} locally.`);
                    }} className="border rounded-lg p-2">
                      <FileText size={16} />
                    </button>

                    <button aria-label={`Remove ${app.applicant} from this local list`} title="Remove from local list" onClick={() => {
                      if (window.confirm(`Remove ${app.applicant}'s rejection from this local list?`)) {
                        setApplications((current) => current.filter((item) => item.id !== app.id));
                        setNotice("Application removed from this local mock list.");
                      }
                    }} className="border rounded-lg p-2 text-red-600">
                      <XCircle size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {filtered.length === 0 && <p className="p-5 text-center text-gray-500">No applications match your search and filter.</p>}

      {selected && (
        <div role="dialog" aria-modal="true" aria-labelledby="rejection-details-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 id="rejection-details-title" className="text-xl font-bold">Rejection details</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div><dt className="font-semibold">Applicant</dt><dd>{selected.applicant}</dd></div>
              <div><dt className="font-semibold">Application</dt><dd>{selected.applicationNo}</dd></div>
              <div><dt className="font-semibold">Class</dt><dd>{selected.classApplied}</dd></div>
              <div><dt className="font-semibold">Reason</dt><dd>{selected.reason}</dd></div>
              <div><dt className="font-semibold">Date</dt><dd>{selected.date}</dd></div>
            </dl>
            <button autoFocus onClick={() => setSelected(null)} className="mt-5 rounded-lg border px-4 py-2">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}