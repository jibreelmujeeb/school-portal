import React from "react";
import {
  BookOpen,
  Users,
  FileText,
  TrendingUp,
  Upload,
  Eye,
} from "lucide-react";

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    class: "SS2A",
    students: 45,
    assignments: 12,
    averageScore: 82,
  },
  {
    id: 2,
    name: "Further Mathematics",
    class: "SS3B",
    students: 32,
    assignments: 8,
    averageScore: 78,
  },
  {
    id: 3,
    name: "Physics",
    class: "SS1A",
    students: 40,
    assignments: 10,
    averageScore: 85,
  },
];

const TeacherSubjectsPage = () => {
  return (
    <div className="space-y-8">

      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          My Subjects
        </h1>

        <p className="text-gray-500 mt-2">
          Manage subjects, assignments, learning materials,
          and monitor student performance.
        </p>
      </div>

      {/* STATISTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <BookOpen className="w-6 h-6 text-blue-600 mb-3" />
          <h2 className="text-3xl font-bold">8</h2>
          <p className="text-sm text-gray-500">
            Assigned Subjects
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <Users className="w-6 h-6 text-green-600 mb-3" />
          <h2 className="text-3xl font-bold">320</h2>
          <p className="text-sm text-gray-500">
            Total Students
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <FileText className="w-6 h-6 text-orange-600 mb-3" />
          <h2 className="text-3xl font-bold">45</h2>
          <p className="text-sm text-gray-500">
            Assignments
          </p>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <TrendingUp className="w-6 h-6 text-purple-600 mb-3" />
          <h2 className="text-3xl font-bold">81%</h2>
          <p className="text-sm text-gray-500">
            Average Performance
          </p>
        </div>

      </div>

      {/* SUBJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="border border-gray-200 rounded-3xl p-6"
          >

            {/* HEADER */}
            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>

              <span className="px-3 py-1 rounded-full text-xs border border-blue-200 bg-blue-50 text-blue-600">
                {subject.class}
              </span>

            </div>

            {/* SUBJECT INFO */}
            <div className="mt-5">

              <h2 className="text-lg font-semibold">
                {subject.name}
              </h2>

            </div>

            {/* DETAILS */}
            <div className="space-y-3 mt-5">

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Students
                </span>

                <span className="font-medium">
                  {subject.students}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Assignments
                </span>

                <span className="font-medium">
                  {subject.assignments}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">
                  Average Score
                </span>

                <span className="font-medium">
                  {subject.averageScore}%
                </span>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-2 gap-3 mt-6">

              <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50">

                <Eye className="w-4 h-4" />

                View

              </button>

              <button className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-green-600 text-green-600 hover:bg-green-50">

                <Upload className="w-4 h-4" />

                Upload

              </button>

            </div>

          </div>
        ))}

      </div>

      {/* SUBJECT PERFORMANCE TABLE */}
      <div className="border border-gray-200 rounded-3xl p-6">

        <h2 className="text-lg font-semibold mb-5">
          Subject Performance Overview
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3">Subject</th>
                <th className="text-left py-3">Class</th>
                <th className="text-left py-3">Students</th>
                <th className="text-left py-3">Assignments</th>
                <th className="text-left py-3">Average Score</th>
              </tr>
            </thead>

            <tbody>

              {subjects.map((subject) => (
                <tr
                  key={subject.id}
                  className="border-b border-gray-100"
                >
                  <td className="py-4">
                    {subject.name}
                  </td>

                  <td>{subject.class}</td>

                  <td>{subject.students}</td>

                  <td>{subject.assignments}</td>

                  <td>{subject.averageScore}%</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default TeacherSubjectsPage;