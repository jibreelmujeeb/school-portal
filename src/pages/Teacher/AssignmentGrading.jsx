import React, { useState } from "react";
import {
  Search,
  Filter,
  FileText,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  Save,
  Send,
} from "lucide-react";

const submissions = [
  {
    id: 1,
    student: "John Doe",
    admissionNo: "STD001",
    class: "SS2 Science",
    submittedAt: "2026-06-22 09:45",
    score: "",
    status: "Submitted",
    late: false,
  },
  {
    id: 2,
    student: "Mary Johnson",
    admissionNo: "STD002",
    class: "SS2 Science",
    submittedAt: "2026-06-23 11:20",
    score: "",
    status: "Late",
    late: true,
  },
  {
    id: 3,
    student: "David Smith",
    admissionNo: "STD003",
    class: "SS2 Science",
    submittedAt: "-",
    score: "",
    status: "Missing",
    late: false,
  },
];

export default function TeacherAssignmentGradingPage() {
  const [search, setSearch] = useState("");

  const filtered = submissions.filter((item) =>
    item.student.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Assignment Grading
          </h1>

          <p className="text-gray-500 mt-2">
            Review submissions, grade assignments, and publish results.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="border rounded-xl px-5 py-3 flex items-center gap-2">
            <Save size={18}/>
            Save Draft
          </button>

          <button className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">
            <Send size={18}/>
            Publish Grades
          </button>
        </div>

      </div>

      {/* Assignment Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <FileText className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">42</h2>
          <p>Total Students</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">35</h2>
          <p>Submitted</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Clock className="text-yellow-600 mb-3"/>
          <h2 className="text-2xl font-bold">4</h2>
          <p>Late</p>
        </div>

        <div className="border rounded-3xl p-5">
          <AlertTriangle className="text-red-600 mb-3"/>
          <h2 className="text-2xl font-bold">3</h2>
          <p>Missing</p>
        </div>

      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4">

        <div className="flex items-center flex-1 border rounded-2xl px-4 py-3">
          <Search className="mr-3 text-gray-500" />
          <input
            className="w-full outline-none"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="border rounded-2xl px-5 flex items-center gap-2">
          <Filter size={18}/>
          Filters
        </button>

      </div>

      {/* Grading Table */}
      <div className="border rounded-3xl overflow-x-auto">

        <table className="w-full min-w-[1100px]">

          <thead className="bg-gray-50">

            <tr>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Admission No.</th>
              <th className="p-4 text-left">Submission</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">File</th>
              <th className="p-4 text-center">Score / 100</th>
              <th className="p-4 text-left">Feedback</th>
              <th className="p-4 text-center">Save</th>
            </tr>

          </thead>

          <tbody>

            {filtered.map((student) => (

              <tr key={student.id} className="border-t">

                <td className="p-4">{student.student}</td>

                <td className="p-4">{student.admissionNo}</td>

                <td className="p-4">{student.submittedAt}</td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm
                    ${
                      student.status === "Submitted"
                        ? "bg-green-100 text-green-700"
                        : student.status === "Late"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <button className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Download size={16}/>
                    </button>

                  </div>

                </td>

                <td className="p-4">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Score"
                    className="border rounded-lg px-3 py-2 w-24"
                  />

                </td>

                <td className="p-4">

                  <textarea
                    rows="2"
                    className="border rounded-lg w-full p-2"
                    placeholder="Teacher feedback..."
                  />

                </td>

                <td className="p-4 text-center">

                  <button className="bg-blue-600 text-white rounded-lg px-4 py-2">
                    Save
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}