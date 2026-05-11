import React from "react";
import {
  User,
  FileText,
  Printer,
  Download,
} from "lucide-react";

const results = [
  {
    subject: "Mathematics",
    score: 78,
    grade: "B",
  },
  {
    subject: "English",
    score: 85,
    grade: "A",
  },
  {
    subject: "Physics",
    score: 69,
    grade: "C",
  },
  {
    subject: "Chemistry",
    score: 74,
    grade: "B",
  },
];

const ParentResultPage = () => {
  const total = results.reduce(
    (acc, item) => acc + item.score,
    0
  );

  const average = (
    total / results.length
  ).toFixed(1);

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Academic Result
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            Monitor your child’s academic performance
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">

          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-50 transition">
            <Printer className="w-4 h-4" />
            Print
          </button>

          <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
            <Download className="w-4 h-4" />
            Download
          </button>

        </div>

      </section>

      {/* STUDENT INFO */}
      <section className="border border-gray-200 rounded-2xl p-5 bg-white grid gap-4 sm:grid-cols-2">

        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-blue-600" />
          <span className="text-sm">
            John Doe
          </span>
        </div>

        <div className="text-sm">
          Class: SS2
        </div>

        <div className="text-sm">
          Term: 2nd Term
        </div>

        <div className="text-sm">
          Session: 2025/2026
        </div>

      </section>

      {/* RESULT TABLE */}
      <section className="border border-gray-200 rounded-2xl overflow-hidden bg-white">

        {/* HEADER */}
        <div className="grid grid-cols-3 p-4 border-b border-gray-200 text-sm text-gray-500">
          <span>Subject</span>
          <span>Score</span>
          <span>Grade</span>
        </div>

        {/* BODY */}
        {results.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-3 p-4 border-b border-gray-100 text-sm"
          >
            <div className="flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4 text-blue-600" />
              {item.subject}
            </div>

            <span>{item.score}%</span>

            <span>{item.grade}</span>
          </div>
        ))}

      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-3">

        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">
            Total
          </p>

          <h2 className="text-lg font-semibold">
            {total}
          </h2>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">
            Average
          </p>

          <h2 className="text-lg font-semibold">
            {average}%
          </h2>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500">
            Position
          </p>

          <h2 className="text-lg font-semibold">
            2nd
          </h2>
        </div>

      </section>

      {/* TEACHER REMARK */}
      <section className="border border-gray-200 rounded-2xl p-5 bg-white">

        <h2 className="text-lg font-semibold mb-3">
          Teacher’s Remark
        </h2>

        <p className="text-sm text-gray-600">
          Good academic performance. Encourage more focus on science subjects.
        </p>

      </section>

    </div>
  );
};

export default ParentResultPage;