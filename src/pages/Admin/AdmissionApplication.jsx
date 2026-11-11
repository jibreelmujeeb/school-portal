import React, { useState } from "react";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  FileText,
  X,
} from "lucide-react";

const initialApplications = [
  {
    id: 1,
    applicationNo: "ADM2026001",
    name: "John David",
    class: "JSS 1",
    session: "2026/2027",
    submitted: "2026-06-20",
    status: "Pending",
  },
  {
    id: 2,
    applicationNo: "ADM2026002",
    name: "Mary Johnson",
    class: "SS 1",
    session: "2026/2027",
    submitted: "2026-06-21",
    status: "Approved",
  },
];

export default function AdminAdmissionApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [notice, setNotice] = useState("");

  const filtered = applications.filter(
    (item) =>
      (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.applicationNo.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "All" || item.status === statusFilter)
  );

  const counts = {
    Total: applications.length,
    Approved: applications.filter((item) => item.status === "Approved").length,
    Pending: applications.filter((item) => item.status === "Pending").length,
    Rejected: applications.filter((item) => item.status === "Rejected").length,
  };

  const updateStatus = (application, status) => {
    setApplications((current) =>
      current.map((item) =>
        item.id === application.id ? { ...item, status } : item
      )
    );
    setSelectedApplication((current) =>
      current?.id === application.id ? { ...current, status } : current
    );
    setNotice(`${application.name}'s application was marked ${status.toLowerCase()} in this view.`);
  };

  const exportApplications = () => {
    const headers = [
      "Application Number",
      "Applicant",
      "Class",
      "Session",
      "Submitted",
      "Status",
    ];
    const rows = filtered.map((item) => [
      item.applicationNo,
      item.name,
      item.class,
      item.session,
      item.submitted,
      item.status,
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "admission-applications.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Admission Applications
          </h1>

          <p className="text-gray-500 mt-2">
            Review, verify, and process student admission applications.
          </p>
        </div>

        <button
          type="button"
          onClick={exportApplications}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2"
        >
          <Download size={18}/>
          Export
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <FileText className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">{counts.Total}</h2>
          <p>Total Applications</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">{counts.Approved}</h2>
          <p>Approved</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Clock className="text-yellow-600 mb-3"/>
          <h2 className="text-2xl font-bold">{counts.Pending}</h2>
          <p>Pending</p>
        </div>

        <div className="border rounded-3xl p-5">
          <XCircle className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">{counts.Rejected}</h2>
          <p>Rejected</p>
        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex items-center border rounded-xl px-4 py-3 flex-1">
          <Search className="mr-3"/>
          <input
            placeholder="Search application..."
            className="outline-none w-full"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        <label className="border rounded-xl px-4 flex items-center gap-2">
          <Filter size={18}/>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="bg-transparent py-3 outline-none"
            aria-label="Filter applications by status"
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>

      </div>

      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice("")} aria-label="Dismiss notice">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Applications Table */}

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1100px]">

          <thead className="bg-gray-50">
            <tr>
              <th>Application No.</th>
              <th>Applicant</th>
              <th>Class</th>
              <th>Session</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {filtered.map((application)=>(

              <tr key={application.id} className="border-t">

                <td>{application.applicationNo}</td>
                <td>{application.name}</td>
                <td>{application.class}</td>
                <td>{application.session}</td>
                <td>{application.submitted}</td>

                <td>
                  <span className={`px-3 py-1 rounded-full ${
                    application.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : application.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {application.status}
                  </span>
                </td>

                <td>

                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={() => setSelectedApplication(application)}
                      title={`View ${application.name}'s application`}
                      aria-label={`View ${application.name}'s application`}
                      className="border rounded-lg p-2"
                    >
                      <Eye size={16}/>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateStatus(application, "Approved")}
                      title="Approve application"
                      aria-label={`Approve ${application.name}'s application`}
                      disabled={application.status === "Approved"}
                      className="border rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <CheckCircle size={16}/>
                    </button>

                    <button
                      type="button"
                      onClick={() => updateStatus(application, "Rejected")}
                      title="Reject application"
                      aria-label={`Reject ${application.name}'s application`}
                      disabled={application.status === "Rejected"}
                      className="border rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <XCircle size={16}/>
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-gray-500">
          No applications match your search and status filter.
        </p>
      )}

      {selectedApplication && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedApplication(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="application-details-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="application-details-title" className="text-xl font-semibold">
                  Application details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedApplication.applicationNo}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                aria-label="Close application details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div><dt className="text-gray-500">Applicant</dt><dd className="mt-1 font-medium">{selectedApplication.name}</dd></div>
              <div><dt className="text-gray-500">Requested class</dt><dd className="mt-1 font-medium">{selectedApplication.class}</dd></div>
              <div><dt className="text-gray-500">Session</dt><dd className="mt-1 font-medium">{selectedApplication.session}</dd></div>
              <div><dt className="text-gray-500">Submitted</dt><dd className="mt-1 font-medium">{selectedApplication.submitted}</dd></div>
              <div className="col-span-2"><dt className="text-gray-500">Status</dt><dd className="mt-1 font-medium">{selectedApplication.status}</dd></div>
            </dl>
          </section>
        </div>
      )}

    </div>
  );
}