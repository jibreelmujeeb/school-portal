import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Search,
  Filter,
  Download,
  UserCheck,
  FileText,
} from "lucide-react";

const initialApplications = [
  {
    id: 1,
    applicationNo: "ADM2026001",
    applicant: "John David",
    classApplied: "JSS 1",
    examScore: 82,
    interviewScore: 85,
    overallScore: 84,
    status: "Pending",
  },
  {
    id: 2,
    applicationNo: "ADM2026002",
    applicant: "Mary Johnson",
    classApplied: "SS 1",
    examScore: 91,
    interviewScore: 89,
    overallScore: 90,
    status: "Pending",
  },
];

export default function AdmissionApprovalPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rows, setRows] = useState(initialApplications);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");

  const filtered = rows.filter(
    (app) =>
      (app.applicant.toLowerCase().includes(search.toLowerCase()) ||
        app.applicationNo.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === "All" || app.status === statusFilter)
  );

  const updateStatus = (app, status) => {
    setRows((current) =>
      current.map((item) => item.id === app.id ? { ...item, status } : item)
    );
    setNotice(`${app.applicant}'s application marked ${status.toLowerCase()}.`);
  };

  const exportApplications = () => {
    const header = ["Application No.", "Applicant", "Class", "Exam", "Interview", "Total", "Status"];
    const csv = [header, ...filtered.map((app) => [
      app.applicationNo, app.applicant, app.classApplied, app.examScore,
      app.interviewScore, app.overallScore, app.status,
    ])].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "admission-approvals.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Admission Approval
          </h1>

          <p className="text-gray-500 mt-2">
            Review verified applications and approve admissions.
          </p>

        </div>

        <button onClick={exportApplications} className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center">

          <Download size={18}/>

          Export

        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">

          <Clock className="text-yellow-600 mb-3"/>

          <h2 className="text-2xl font-bold">35</h2>

          <p>Pending</p>

        </div>

        <div className="border rounded-3xl p-5">

          <CheckCircle className="text-green-600 mb-3"/>

          <h2 className="text-2xl font-bold">180</h2>

          <p>Approved</p>

        </div>

        <div className="border rounded-3xl p-5">

          <UserCheck className="text-blue-600 mb-3"/>

          <h2 className="text-2xl font-bold">20</h2>

          <p>Waitlisted</p>

        </div>

        <div className="border rounded-3xl p-5">

          <XCircle className="text-red-600 mb-3"/>

          <h2 className="text-2xl font-bold">15</h2>

          <p>Rejected</p>

        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex-1 flex items-center border rounded-xl px-4 py-3">

          <Search className="mr-3"/>

          <input
            className="outline-none w-full"
            placeholder="Search application..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />

        </div>

        <label className="border rounded-xl px-4 flex items-center gap-2">

          <Filter size={18}/>
          <span className="sr-only">Filter applications by status</span>
          <select aria-label="Filter applications by status" className="bg-transparent outline-none py-3" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option><option>Pending</option><option>Approved</option><option>Waitlisted</option><option>Rejected</option>
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
              <th>Exam</th>
              <th>Interview</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((app)=>(

              <tr key={app.id} className="border-t">

                <td>{app.applicationNo}</td>

                <td>{app.applicant}</td>

                <td>{app.classApplied}</td>

                <td>{app.examScore}%</td>

                <td>{app.interviewScore}%</td>

                <td>{app.overallScore}%</td>

                <td>

                  <span className={`px-3 py-1 rounded-full ${app.status === "Pending" ? "bg-yellow-100 text-yellow-700" : app.status === "Approved" ? "bg-green-100 text-green-700" : app.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>
                    {app.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-2">

                    <button aria-label={`View ${app.applicant}'s application`} title="View application" onClick={() => setSelected(app)} className="border rounded-lg p-2">

                      <Eye size={16}/>

                    </button>

                    <button aria-label={`Approve ${app.applicant}`} title="Approve" disabled={app.status !== "Pending"} onClick={() => updateStatus(app, "Approved")} className="border rounded-lg p-2 text-green-600 disabled:opacity-40">

                      <CheckCircle size={16}/>

                    </button>

                    <button aria-label={`Waitlist ${app.applicant}`} title="Waitlist" disabled={app.status !== "Pending"} onClick={() => updateStatus(app, "Waitlisted")} className="border rounded-lg p-2 text-blue-600 disabled:opacity-40">

                      <FileText size={16}/>

                    </button>

                    <button aria-label={`Reject ${app.applicant}`} title="Reject" disabled={app.status !== "Pending"} onClick={() => updateStatus(app, "Rejected")} className="border rounded-lg p-2 text-red-600 disabled:opacity-40">

                      <XCircle size={16}/>

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
        <div role="dialog" aria-modal="true" aria-labelledby="application-details-title" className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 id="application-details-title" className="text-xl font-bold">Application details</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div><dt className="font-semibold">Applicant</dt><dd>{selected.applicant}</dd></div>
              <div><dt className="font-semibold">Application</dt><dd>{selected.applicationNo}</dd></div>
              <div><dt className="font-semibold">Class</dt><dd>{selected.classApplied}</dd></div>
              <div><dt className="font-semibold">Scores</dt><dd>Exam {selected.examScore}% · Interview {selected.interviewScore}% · Overall {selected.overallScore}%</dd></div>
              <div><dt className="font-semibold">Status</dt><dd>{selected.status}</dd></div>
            </dl>
            <button autoFocus onClick={() => setSelected(null)} className="mt-5 rounded-lg border px-4 py-2">Close</button>
          </div>
        </div>
      )}

    </div>
  );
}