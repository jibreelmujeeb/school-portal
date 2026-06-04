import React from "react";
import {
  BookOpen,
  User,
  Calendar,
  FileText,
  TrendingUp,
  Search,
} from "lucide-react";

const subjects = [
  {
    id: 1,
    name: "Mathematics",
    teacher: "Mr. Johnson",
    grade: "A",
    assignments: 12,
    nextClass: "Monday, 9:00 AM",
    progress: 92,
  },
  {
    id: 2,
    name: "English Language",
    teacher: "Mrs. Grace",
    grade: "B+",
    assignments: 8,
    nextClass: "Tuesday, 10:00 AM",
    progress: 85,
  },
  {
    id: 3,
    name: "Physics",
    teacher: "Mr. David",
    grade: "A-",
    assignments: 10,
    nextClass: "Wednesday, 8:00 AM",
    progress: 88,
  },
  {
    id: 4,
    name: "Chemistry",
    teacher: "Mrs. Sarah",
    grade: "B",
    assignments: 7,
    nextClass: "Thursday, 11:00 AM",
    progress: 76,
  },
];

const StudentSubjectsPage = () => {
  return (
    <div className="space-y-8">

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            My Subjects
          </h1>

          <p className="text-gray-500 mt-2">
            View all enrolled subjects and academic progress
          </p>
        </div>

        <div className="flex items-center gap-3 border border-gray-200 rounded-2xl px-4 py-3 w-full lg:w-[320px]">
          <Search className="w-4 h-4 text-gray-500" />

          <input
            type="text"
            placeholder="Search subjects..."
            className="w-full outline-none text-sm"
          />
        </div>

      </section>

      {/* STATS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-sm text-gray-500">
            Total Subjects
          </p>

          <h2 className="text-3xl font-bold mt-2">
            12
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-sm text-gray-500">
            Average Grade
          </p>

          <h2 className="text-3xl font-bold mt-2">
            B+
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-sm text-gray-500">
            Assignments
          </p>

          <h2 className="text-3xl font-bold mt-2">
            37
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-sm text-gray-500">
            Overall Progress
          </p>

          <h2 className="text-3xl font-bold mt-2">
            85%
          </h2>
        </div>

      </section>

      {/* SUBJECTS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

        {subjects.map((subject) => (
          <div
            key={subject.id}
            className="border border-gray-200 rounded-3xl p-6 bg-white"
          >
            {/* SUBJECT HEADER */}
            <div className="flex items-start justify-between">

              <div>
                <div className="w-12 h-12 rounded-2xl border border-gray-200 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>

                <h2 className="text-lg font-semibold">
                  {subject.name}
                </h2>
              </div>

              <span className="px-3 py-1 rounded-full text-sm border border-green-200 bg-green-50 text-green-600">
                {subject.grade}
              </span>

            </div>

            {/* DETAILS */}
            <div className="space-y-4 mt-6">

              <div className="flex items-center gap-3 text-gray-600">
                <User className="w-4 h-4" />
                <span className="text-sm">
                  {subject.teacher}
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {subject.nextClass}
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FileText className="w-4 h-4" />
                <span className="text-sm">
                  {subject.assignments} Assignments
                </span>
              </div>

            </div>

            {/* PROGRESS */}
            <div className="mt-6">

              <div className="flex items-center justify-between mb-2">

                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-500" />

                  <span className="text-sm text-gray-600">
                    Progress
                  </span>
                </div>

                <span className="text-sm font-medium">
                  {subject.progress}%
                </span>

              </div>

              <div className="h-2 rounded-full bg-gray-100 overflow-hidden">

                <div
                  className="h-full bg-blue-600 rounded-full"
                  style={{
                    width: `${subject.progress}%`,
                  }}
                />

              </div>

            </div>

            {/* ACTION BUTTON */}
            <button className="w-full mt-6 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition">
              View Subject
            </button>

          </div>
        ))}

      </section>

    </div>
  );
};

export default StudentSubjectsPage;