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

const rejectedApplications = [
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

  const filtered = rejectedApplications.filter(
    (app) =>
      app.applicant.toLowerCase().includes(search.toLowerCase()) ||
      app.applicationNo.toLowerCase().includes(search.toLowerCase())
  );

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

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
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

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18} />
          Filter
        </button>

      </div>

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
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700">
                    {app.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="border rounded-lg p-2">
                      <Eye size={16} />
                    </button>

                    <button className="border rounded-lg p-2">
                      <FileText size={16} />
                    </button>

                    <button className="border rounded-lg p-2 text-red-600">
                      <XCircle size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}