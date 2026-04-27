import React from "react";
import {
  User,
  FileText,
  Printer,
} from "lucide-react";

const subjects = [
  { name: "Mathematics", score: 75, grade: "B" },
  { name: "English", score: 88, grade: "A" },
  { name: "Physics", score: 65, grade: "C" },
  { name: "Chemistry", score: 70, grade: "B" },
];

const StudentResult = () => {
  const total = subjects.reduce((acc, sub) => acc + sub.score, 0);
  const average = (total / subjects.length).toFixed(1);

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Result Sheet
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            View your academic performance
          </p>
        </div>

        {/* PRINT */}
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Printer className="w-4 h-4" />
          Print
        </button>
      </section>

      {/* STUDENT INFO */}
      <section className="border border-gray-200 rounded-2xl p-5 bg-white grid gap-4 sm:grid-cols-2">
        
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <span className="text-sm">John Doe</span>
        </div>

        <div className="text-sm">Class: SS2</div>
        <div className="text-sm">Term: 2nd Term</div>
        <div className="text-sm">Session: 2025/2026</div>

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
        {subjects.map((sub, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 p-4 border-b border-gray-100 text-sm"
          >
            <span className="font-medium">{sub.name}</span>
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
          <h2 className="text-lg font-semibold">2nd</h2>
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