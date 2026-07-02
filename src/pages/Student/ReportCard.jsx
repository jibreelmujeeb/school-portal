import React from "react";
import {
  User,
  Calendar,
  Printer,
  Download,
  Award,
  BookOpen,
  CheckCircle,
  Users,
} from "lucide-react";

const results = [
  {
    subject: "Mathematics",
    ca: 28,
    exam: 65,
    total: 93,
    grade: "A",
    remark: "Excellent",
  },
  {
    subject: "English Language",
    ca: 24,
    exam: 60,
    total: 84,
    grade: "A",
    remark: "Very Good",
  },
  {
    subject: "Physics",
    ca: 22,
    exam: 58,
    total: 80,
    grade: "A",
    remark: "Very Good",
  },
  {
    subject: "Chemistry",
    ca: 25,
    exam: 56,
    total: 81,
    grade: "A",
    remark: "Excellent",
  },
  {
    subject: "Biology",
    ca: 23,
    exam: 55,
    total: 78,
    grade: "B+",
    remark: "Good",
  },
];

export default function StudentReportCardPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Report Card
          </h1>

          <p className="text-gray-500 mt-2">
            View your academic performance for the selected term.
          </p>
        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 border rounded-xl px-5 py-3">
            <Printer size={18} />
            Print
          </button>

          <button className="flex items-center gap-2 bg-blue-600 text-white rounded-xl px-5 py-3">
            <Download size={18} />
            Download PDF
          </button>

        </div>

      </div>

      {/* Student Information */}
      <div className="border rounded-3xl p-6">

        <div className="flex flex-col md:flex-row md:items-center gap-6">

          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="text-blue-600" size={40} />
          </div>

          <div className="grid md:grid-cols-2 gap-6 flex-1">

            <div>
              <p><strong>Name:</strong> John Doe</p>
              <p><strong>Admission No:</strong> STD2026001</p>
              <p><strong>Class:</strong> SS2 Science</p>
            </div>

            <div>
              <p><strong>Session:</strong> 2025/2026</p>
              <p><strong>Term:</strong> First Term</p>
              <p><strong>Class Teacher:</strong> Mrs. Grace</p>
            </div>

          </div>

        </div>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Award className="text-blue-600 mb-3"/>
          <h2 className="text-2xl font-bold">83.2%</h2>
          <p>Average Score</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Users className="text-green-600 mb-3"/>
          <h2 className="text-2xl font-bold">3rd</h2>
          <p>Class Position</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Calendar className="text-purple-600 mb-3"/>
          <h2 className="text-2xl font-bold">95%</h2>
          <p>Attendance</p>
        </div>

        <div className="border rounded-3xl p-5">
          <CheckCircle className="text-orange-600 mb-3"/>
          <h2 className="text-2xl font-bold">Excellent</h2>
          <p>Overall Grade</p>
        </div>

      </div>

      {/* Results Table */}
      <div className="border rounded-3xl p-6">

        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="text-blue-600"/>
          <h2 className="text-xl font-semibold">
            Subject Results
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">Subject</th>
                <th className="text-center py-3">CA (30)</th>
                <th className="text-center py-3">Exam (70)</th>
                <th className="text-center py-3">Total</th>
                <th className="text-center py-3">Grade</th>
                <th className="text-left py-3">Remark</th>

              </tr>

            </thead>

            <tbody>

              {results.map((subject, index) => (

                <tr key={index} className="border-b">

                  <td className="py-4">
                    {subject.subject}
                  </td>

                  <td className="text-center">
                    {subject.ca}
                  </td>

                  <td className="text-center">
                    {subject.exam}
                  </td>

                  <td className="text-center font-semibold">
                    {subject.total}
                  </td>

                  <td className="text-center">
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                      {subject.grade}
                    </span>
                  </td>

                  <td>
                    {subject.remark}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Remarks */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="border rounded-3xl p-6">

          <h2 className="font-bold text-lg mb-3">
            Class Teacher's Remark
          </h2>

          <p className="text-gray-600">
            John has demonstrated excellent academic performance and
            consistently participates in classroom activities.
            Keep up the great work.
          </p>

        </div>

        <div className="border rounded-3xl p-6">

          <h2 className="font-bold text-lg mb-3">
            Principal's Remark
          </h2>

          <p className="text-gray-600">
            Outstanding performance. Continue striving for excellence
            and maintain your positive attitude toward learning.
          </p>

        </div>

      </div>

    </div>
  );
}