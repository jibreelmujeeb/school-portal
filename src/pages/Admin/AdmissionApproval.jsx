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

const applications = [
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

  const filtered = applications.filter(
    (app) =>
      app.applicant.toLowerCase().includes(search.toLowerCase()) ||
      app.applicationNo.toLowerCase().includes(search.toLowerCase())
  );

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

        <button className="bg-blue-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center">

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

        <button className="border rounded-xl px-5 flex items-center gap-2">

          <Filter size={18}/>

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

                  <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                    {app.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-2">

                    <button className="border rounded-lg p-2">

                      <Eye size={16}/>

                    </button>

                    <button className="border rounded-lg p-2 text-green-600">

                      <CheckCircle size={16}/>

                    </button>

                    <button className="border rounded-lg p-2 text-blue-600">

                      <FileText size={16}/>

                    </button>

                    <button className="border rounded-lg p-2 text-red-600">

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