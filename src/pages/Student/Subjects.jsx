import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  User,
  Calendar,
  FileText,
  TrendingUp,
  Search,
  X,
} from "lucide-react";
import { getAverageGrade, subjectsData } from "../../data/studentPortal";

const StudentSubjectsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const initialSubject = location.state?.selectedSubject?.toLowerCase();
  const [selectedSubject, setSelectedSubject] = useState(
    () => initialSubject
      ? subjectsData.find((subject) => subject.name.toLowerCase().startsWith(initialSubject)) || null
      : null,
  );
  const subjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return subjectsData.filter((subject) =>
      [subject.name, subject.teacher, subject.grade]
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [search]);
  const totalAssignments = subjectsData.reduce((total, subject) => total + subject.assignments, 0);
  const averageProgress = Math.round(
    subjectsData.reduce((total, subject) => total + subject.progress, 0) / subjectsData.length,
  );

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
            aria-label="Search subjects"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
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
            {subjectsData.length}
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-sm text-gray-500">
            Average Grade
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {getAverageGrade(subjectsData)}
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-sm text-gray-500">
            Assignments
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {totalAssignments}
          </h2>
        </div>

        <div className="border border-gray-200 rounded-3xl p-5">
          <p className="text-sm text-gray-500">
            Overall Progress
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {averageProgress}%
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
            <button
              type="button"
              onClick={() => setSelectedSubject(subject)}
              className="w-full mt-6 py-3 rounded-2xl border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
            >
              View Subject
            </button>

          </div>
        ))}

      </section>

      {subjects.length === 0 && (
        <p className="rounded-2xl border border-gray-200 p-8 text-center text-sm text-gray-500">
          No subjects match your search.
        </p>
      )}

      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="subject-details-title"
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="subject-details-title" className="text-xl font-semibold">
                  {selectedSubject.name}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedSubject.teacher} · Grade {selectedSubject.grade}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                aria-label="Close subject details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <p className="rounded-xl bg-gray-50 p-4">{selectedSubject.assignments} assignments</p>
              <p className="rounded-xl bg-gray-50 p-4">{selectedSubject.progress}% progress</p>
              <p className="col-span-2 rounded-xl bg-gray-50 p-4">Next class: {selectedSubject.nextClass}</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/student/assignments")}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
              >
                View assignments
              </button>
              <button
                type="button"
                onClick={() => navigate("/student/timetable")}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
              >
                Open timetable
              </button>
            </div>
          </section>
        </div>
      )}

    </div>
  );
};

export default StudentSubjectsPage;