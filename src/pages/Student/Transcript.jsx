import React, { useMemo, useState } from "react";
import {
  User,
  GraduationCap,
  Download,
  Printer,
  Calendar,
  Award,
  BookOpen,
  Search,
} from "lucide-react";
import jsPDF from "jspdf";
import usePersistentState from "../../hooks/usePersistentState";
import downloadCsv from "../../utils/downloadCsv";

const transcript = [
  {
    session: "2025/2026",
    term: "First Term",
    subjects: [
      { subject: "Mathematics", score: 88, grade: "A" },
      { subject: "English", score: 81, grade: "A" },
      { subject: "Physics", score: 76, grade: "B+" },
      { subject: "Chemistry", score: 84, grade: "A" },
      { subject: "Biology", score: 79, grade: "B+" },
    ],
    average: 81.6,
  },
  {
    session: "2025/2026",
    term: "Second Term",
    subjects: [
      { subject: "Mathematics", score: 91, grade: "A+" },
      { subject: "English", score: 85, grade: "A" },
      { subject: "Physics", score: 82, grade: "A" },
      { subject: "Chemistry", score: 86, grade: "A" },
      { subject: "Biology", score: 83, grade: "A" },
    ],
    average: 85.4,
  },
];

export default function StudentTranscriptPage() {
  const [sessionFilter, setSessionFilter] = usePersistentState(
    "student-transcript-session",
    "All Sessions",
  );
  const [termFilter, setTermFilter] = usePersistentState(
    "student-transcript-term",
    "All Terms",
  );
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const visibleTranscript = useMemo(() => transcript.filter((record) => (
    (sessionFilter === "All Sessions" || record.session === sessionFilter) &&
    (termFilter === "All Terms" || record.term === termFilter) &&
    (!search.trim() || record.subjects.some((item) =>
      item.subject.toLowerCase().includes(search.trim().toLowerCase()),
    ))
  )), [sessionFilter, termFilter, search]);

  const overallAverage = visibleTranscript.length
    ? visibleTranscript.reduce((total, record) => total + record.average, 0) / visibleTranscript.length
    : 0;

  const downloadTranscriptPdf = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Greenwood International School", 20, 20);
    doc.setFontSize(13);
    doc.text("Academic Transcript", 20, 30);
    doc.setFontSize(11);
    doc.text("Student: John Doe", 20, 42);
    doc.text("Student ID: STD2026001", 20, 49);
    doc.text("Class: SS2 Science", 20, 56);

    let y = 70;
    visibleTranscript.forEach((record) => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
      doc.setFont(undefined, "bold");
      doc.text(`${record.session} - ${record.term}`, 20, y);
      doc.setFont(undefined, "normal");
      y += 8;
      record.subjects.forEach((item) => {
        doc.text(`${item.subject}: ${item.score}% (${item.grade})`, 20, y);
        y += 7;
      });
      doc.text(`Average Score: ${record.average}%`, 20, y);
      y += 12;
    });
    if (visibleTranscript.length === 0) {
      doc.text("No transcript records match the selected filters.", 20, y);
    }
    doc.save("john-doe-academic-transcript.pdf");
    setNotice("Transcript PDF downloaded.");
  };

  const exportTranscriptCsv = () => {
    downloadCsv("student-transcript.csv", [
      ["Session", "Term", "Subject", "Score", "Grade", "Term Average"],
      ...visibleTranscript.flatMap((record) =>
        record.subjects.map((item) => [
          record.session,
          record.term,
          item.subject,
          `${item.score}%`,
          item.grade,
          `${record.average}%`,
        ]),
      ),
    ]);
    setNotice("Transcript CSV exported.");
  };

  const clearFilters = () => {
    setSessionFilter("All Sessions");
    setTermFilter("All Terms");
    setSearch("");
  };

  return (
    <div className="space-y-8">
      {notice && (
        <p role="status" className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {notice}
        </p>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold">
            Academic Transcript
          </h1>

          <p className="text-gray-500 mt-2">
            Complete academic record and performance history.
          </p>
        </div>

        <div className="flex gap-3">

          <button type="button" onClick={() => window.print()} className="flex items-center gap-2 px-5 py-3 border rounded-2xl">
            <Printer size={18}/>
            Print
          </button>

          <button type="button" onClick={downloadTranscriptPdf} className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-2xl">
            <Download size={18}/>
            Download PDF
          </button>
          <button type="button" onClick={exportTranscriptCsv} disabled={visibleTranscript.length === 0} className="rounded-2xl border border-blue-600 px-5 py-3 text-blue-600 disabled:cursor-not-allowed disabled:opacity-40">
            Export CSV
          </button>

        </div>

      </div>

      {/* Student Info */}
      <div className="border rounded-3xl p-6">

        <div className="flex items-center gap-4">

          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={35}/>
          </div>

          <div>

            <h2 className="text-xl font-bold">
              John Doe
            </h2>

            <p className="text-gray-500">
              Student ID: STD2026001
            </p>

            <p className="text-gray-500">
              Class: SS2 Science
            </p>

          </div>

        </div>

      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 rounded-3xl border p-4 sm:flex-row sm:flex-wrap sm:items-center">
        <label className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
          <span className="text-gray-500">Session</span>
          <select value={sessionFilter} onChange={(event) => setSessionFilter(event.target.value)} className="outline-none">
            <option>All Sessions</option>
            {[...new Set(transcript.map((record) => record.session))].map((session) => (
              <option key={session}>{session}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
          <span className="text-gray-500">Term</span>
          <select value={termFilter} onChange={(event) => setTermFilter(event.target.value)} className="outline-none">
            <option>All Terms</option>
            {[...new Set(transcript.map((record) => record.term))].map((term) => (
              <option key={term}>{term}</option>
            ))}
          </select>
        </label>
        <label className="flex min-w-52 flex-1 items-center gap-2 rounded-xl border px-3 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Search subjects</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search subjects..."
            className="w-full text-sm outline-none"
          />
        </label>
        {(sessionFilter !== "All Sessions" || termFilter !== "All Terms" || search) && (
          <button type="button" onClick={clearFilters} className="rounded-xl border px-4 py-2 text-sm text-gray-600">
            Clear
          </button>
        )}
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="border rounded-3xl p-5">
          <Award className="text-blue-600 mb-3"/>
          <h2 className="text-3xl font-bold">{overallAverage.toFixed(1)}%</h2>
          <p>Filtered Average</p>
        </div>

        <div className="border rounded-3xl p-5">
          <GraduationCap className="text-green-600 mb-3"/>
          <h2 className="text-3xl font-bold">3.76</h2>
          <p>CGPA</p>
        </div>

        <div className="border rounded-3xl p-5">
          <BookOpen className="text-purple-600 mb-3"/>
          <h2 className="text-3xl font-bold">24</h2>
          <p>Subjects Completed</p>
        </div>

        <div className="border rounded-3xl p-5">
          <Calendar className="text-orange-600 mb-3"/>
          <h2 className="text-3xl font-bold">95%</h2>
          <p>Attendance</p>
        </div>

      </div>

      {/* Transcript */}
      {visibleTranscript.map((term, index) => (

        <div key={index} className="border rounded-3xl p-6">

          <h2 className="text-xl font-bold mb-1">
            {term.session}
          </h2>

          <p className="text-gray-500 mb-6">
            {term.term}
          </p>

          <div className="overflow-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="text-left py-3">
                    Subject
                  </th>

                  <th className="text-left py-3">
                    Score
                  </th>

                  <th className="text-left py-3">
                    Grade
                  </th>

                </tr>

              </thead>

              <tbody>

                {term.subjects.map((subject, i) => (

                  <tr key={i} className="border-b">

                    <td className="py-3">
                      {subject.subject}
                    </td>

                    <td>
                      {subject.score}
                    </td>

                    <td>

                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">

                        {subject.grade}

                      </span>

                    </td>

                  </tr>

                ))}

                {visibleTranscript.length === 0 && (
                  <div className="rounded-3xl border p-10 text-center text-sm text-gray-500">
                    No transcript records match your filters.
                  </div>
                )}

              </tbody>

            </table>

          </div>

          <div className="mt-5 flex justify-end">

            <div className="text-lg font-semibold">

              Average Score: {term.average}%

            </div>

          </div>

        </div>

      ))}

      {/* Academic Standing */}
      <div className="border rounded-3xl p-6 bg-green-50">

        <h2 className="text-xl font-bold text-green-700">
          Academic Standing
        </h2>

        <p className="mt-3 text-gray-700">
          Excellent academic performance. The student is eligible
          for promotion to the next class and qualifies for the
          Academic Excellence Award.
        </p>

      </div>

    </div>
  );
}