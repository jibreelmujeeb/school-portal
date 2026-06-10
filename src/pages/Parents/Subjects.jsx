import React from "react";
import {
  BookOpen,
  User,
  Award,
  ClipboardCheck,
  TrendingUp,
  Calendar,
} from "lucide-react";

const subjects = [
  {
    id: 1,
    subject: "Mathematics",
    teacher: "Mr. Johnson",
    grade: "A",
    attendance: "96%",
    assignments: 12,
    progress: 92,
  },
  {
    id: 2,
    subject: "English Language",
    teacher: "Mrs. Grace",
    grade: "B+",
    attendance: "94%",
    assignments: 10,
    progress: 85,
  },
  {
    id: 3,
    subject: "Physics",
    teacher: "Mr. David",
    grade: "A-",
    attendance: "98%",
    assignments: 8,
    progress: 89,
  },
];

const ParentSubjectsPage = () => {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Child's Subjects
        </h1>

        <p className="text-gray-500 mt-2">
          Monitor academic performance, attendance,
          and subject progress.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <BookOpen className="w-6 h-6 text-blue-600 mb-3" />

          <h2 className="text-3xl font-bold">12</h2>

          <p className="text-sm text-gray-500">
            Total Subjects
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Award className="w-6 h-6 text-green-600 mb-3" />

          <h2 className="text-3xl font-bold">A-</h2>

          <p className="text-sm text-gray-500">
            Average Grade
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <ClipboardCheck className="w-6 h-6 text-orange-600 mb-3" />

          <h2 className="text-3xl font-bold">30</h2>

          <p className="text-sm text-gray-500">
            Assignments
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <TrendingUp className="w-6 h-6 text-purple-600 mb-3" />

          <h2 className="text-3xl font-bold">89%</h2>

          <p className="text-sm text-gray-500">
            Academic Progress
          </p>
        </div>

      </div>

      {/* SUBJECT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {subjects.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-3xl p-6"
          >

            {/* TOP */}
            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>

              <span className="px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-600 text-xs">
                {item.grade}
              </span>

            </div>

            {/* SUBJECT INFO */}
            <div className="mt-5">

              <h2 className="text-lg font-semibold">
                {item.subject}
              </h2>

            </div>

            {/* DETAILS */}
            <div className="space-y-4 mt-5">

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <User className="w-4 h-4" />
                {item.teacher}
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <ClipboardCheck className="w-4 h-4" />
                {item.assignments} Assignments
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Attendance: {item.attendance}
              </div>

            </div>

            {/* PROGRESS */}
            <div className="mt-6">

              <div className="flex items-center justify-between mb-2">

                <span className="text-sm text-gray-500">
                  Progress
                </span>

                <span className="text-sm font-medium">
                  {item.progress}%
                </span>

              </div>

              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{
                    width: `${item.progress}%`,
                  }}
                />

              </div>

            </div>

            {/* ACTION */}
            <button className="w-full mt-6 py-3 border border-blue-600 text-blue-600 rounded-2xl hover:bg-blue-50">
              View Details
            </button>

          </div>
        ))}

      </div>

      {/* PERFORMANCE TABLE */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <h2 className="text-lg font-semibold mb-5">
          Subject Performance Overview
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3">
                  Subject
                </th>
                <th className="text-left py-3">
                  Teacher
                </th>
                <th className="text-left py-3">
                  Grade
                </th>
                <th className="text-left py-3">
                  Attendance
                </th>
                <th className="text-left py-3">
                  Progress
                </th>
              </tr>
            </thead>

            <tbody>

              {subjects.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100"
                >
                  <td className="py-4">
                    {item.subject}
                  </td>

                  <td>{item.teacher}</td>

                  <td>{item.grade}</td>

                  <td>{item.attendance}</td>

                  <td>{item.progress}%</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default ParentSubjectsPage;