import React, { useState } from "react";
import {
  UserPlus,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  FileText,
} from "lucide-react";

const applications = [
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

  const filtered = applications.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.applicationNo.toLowerCase().includes(search.toLowerCase())
  );

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

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
          <Download size={18}/>
          Export
        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <FileText className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">320</h2>
          <p>Total Applications</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">180</h2>
          <p>Approved</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Clock className="text-yellow-600 mb-3"/>
          <h2 className="text-2xl font-bold">95</h2>
          <p>Pending</p>
        </div>

        <div className="border rounded-3xl p-5">
          <XCircle className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">45</h2>
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

        <button className="border rounded-xl px-5 flex items-center gap-2">
          <Filter size={18}/>
          Filter
        </button>

      </div>

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
                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    {application.status}
                  </span>
                </td>

                <td>

                  <div className="flex gap-2">

                    <button className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <CheckCircle size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <XCircle size={16}/>
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