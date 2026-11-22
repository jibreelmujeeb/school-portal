import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  Printer,
  Download,
} from "lucide-react";
import {
  studentAcademicProfile,
  studentResultsData,
  getGradeForScore,
} from "../../data/studentPortal";
import downloadCsv from "../../utils/downloadCsv";
import usePersistentState from "../../hooks/usePersistentState";

const StudentResult = () => {
  const [term, setTerm] = usePersistentState("student-result-term", "2nd Term");
  const [session, setSession] = usePersistentState("student-result-session", "2025/2026");
  const subjects = studentResultsData.map((subject) => ({
    ...subject,
    grade: getGradeForScore(subject.score),
  }));
  const total = subjects.reduce((acc, sub) => acc + sub.score, 0);
  const average = subjects.length ? (total / subjects.length).toFixed(1) : "0.0";
  const passedCount = subjects.filter((subject) => subject.score >= 50).length;
  const exportResults = () => downloadCsv("student-result-sheet.csv", [
    ["Subject", "Score", "Grade", "Status"],
    ...subjects.map((subject) => [
      subject.subject,
      `${subject.score}%`,
      subject.grade,
      subject.score >= 50 ? "Pass" : "Fail",
    ]),
    ["Total", total, "", ""],
    ["Average", `${average}%`, "", ""],
  ]);

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Result Sheet
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            View your academic performance for {session} - {term}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/student/grades"
            className="rounded-full border border-gray-300 px-5 py-2 text-sm hover:bg-gray-50"
          >
            View grades
          </Link>
          <button
            type="button"
            onClick={exportResults}
            className="flex items-center gap-2 rounded-full border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-full border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </section>

      {/* STUDENT INFO */}
      <section className="border border-gray-200 rounded-2xl p-5 bg-white grid gap-4 sm:grid-cols-2">
        
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <span className="text-sm">{studentAcademicProfile.name}</span>
        </div>

        <div className="text-sm">Class: {studentAcademicProfile.className}</div>
        <label className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-500">Term</span>
          <select value={term} onChange={(event) => setTerm(event.target.value)} className="rounded-lg border border-gray-200 px-3 py-2 outline-none">
            <option>1st Term</option>
            <option>2nd Term</option>
            <option>3rd Term</option>
          </select>
        </label>
        <label className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-500">Session</span>
          <select value={session} onChange={(event) => setSession(event.target.value)} className="rounded-lg border border-gray-200 px-3 py-2 outline-none">
            <option>2025/2026</option>
            <option>2026/2027</option>
          </select>
        </label>

      </section>

      {/* SUBJECT TABLE */}
      <section className="border border-gray-200 rounded-2xl bg-white overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-3 text-sm text-gray-500 border-b border-gray-200 p-4">
          <span>Subject</span>
          <span>Score</span>
          <span>Grade</span>
        </div>

        {/* BODY */}
        {subjects.map((sub) => (
          <div
            key={sub.subject}
            className="grid grid-cols-3 p-4 border-b border-gray-100 text-sm"
          >
            <span className="font-medium">{sub.subject}</span>
            <span>{sub.score}%</span>
            <span>{sub.grade}</span>
          </div>
        ))}

      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-3">
        
        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">Total</p>
          <h2 className="text-lg font-semibold">{total}</h2>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">Average</p>
          <h2 className="text-lg font-semibold">{average}%</h2>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">Position</p>
          <h2 className="text-lg font-semibold">{passedCount}/{subjects.length}</h2>
        </div>

      </section>

      {/* REMARK */}
      <section className="border border-gray-200 rounded-2xl p-5 bg-white">
        <h3 className="text-sm font-medium mb-2">
          Teacher's Remark
        </h3>
        <p className="text-sm text-gray-600">
          Good performance. Keep improving.
        </p>
      </section>

    </div>
  );
};

export default StudentResult;