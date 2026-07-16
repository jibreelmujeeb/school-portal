import React from "react";
import {
  GraduationCap,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  Download,
} from "lucide-react";

const grades = [
  {
    id: 1,
    grade: "A",
    min: 75,
    max: 100,
    gpa: 5.0,
    remark: "Excellent",
    status: "Pass",
  },
  {
    id: 2,
    grade: "B+",
    min: 70,
    max: 74,
    gpa: 4.5,
    remark: "Very Good",
    status: "Pass",
  },
  {
    id: 3,
    grade: "F",
    min: 0,
    max: 39,
    gpa: 0,
    remark: "Fail",
    status: "Fail",
  },
];

export default function AdminGradingSystemPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Grading System
          </h1>

          <p className="text-gray-500 mt-2">
            Configure grading scales, GPA, remarks, and promotion rules.
          </p>

        </div>

        <button className="bg-blue-600 text-white rounded-xl px-5 py-3 flex items-center gap-2">

          <Plus size={18}/>

          Add Grade

        </button>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">

          <GraduationCap className="text-blue-600 mb-3"/>

          <h2 className="text-2xl font-bold">3</h2>

          <p>Grading Systems</p>

        </div>

        <div className="border rounded-3xl p-5">

          <Settings className="text-green-600 mb-3"/>

          <h2 className="text-2xl font-bold">8</h2>

          <p>Grade Levels</p>

        </div>

        <div className="border rounded-3xl p-5">

          <GraduationCap className="text-purple-600 mb-3"/>

          <h2 className="text-2xl font-bold">5.0</h2>

          <p>Maximum GPA</p>

        </div>

        <div className="border rounded-3xl p-5">

          <GraduationCap className="text-orange-600 mb-3"/>

          <h2 className="text-2xl font-bold">Secondary</h2>

          <p>Active System</p>

        </div>

      </div>

      {/* Table */}

      <div className="border rounded-3xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[1000px]">

          <thead className="bg-gray-50">

            <tr>

              <th>Grade</th>
              <th>Score Range</th>
              <th>GPA</th>
              <th>Remark</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {grades.map((grade)=>(

              <tr key={grade.id} className="border-t">

                <td>{grade.grade}</td>

                <td>{grade.min} - {grade.max}</td>

                <td>{grade.gpa}</td>

                <td>{grade.remark}</td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full ${
                      grade.status==="Pass"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                    }`}
                  >
                    {grade.status}
                  </span>

                </td>

                <td>

                  <div className="flex gap-2">

                    <button className="border rounded-lg p-2">
                      <Eye size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Edit size={16}/>
                    </button>

                    <button className="border rounded-lg p-2">
                      <Trash2 size={16}/>
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