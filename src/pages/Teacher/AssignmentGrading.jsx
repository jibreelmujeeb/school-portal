import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Download, Search, Users } from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import downloadCsv from "../../utils/downloadCsv";

const assessments = ["Weekly Assignment", "Class Exercise", "Topic Test"];
const initialGrades = {
  "SS2:Mathematics:Weekly Assignment:STD-001": { status: "Submitted", score: "", feedback: "" },
  "SS2:Mathematics:Weekly Assignment:STD-002": { status: "Late", score: "", feedback: "" },
  "SS2:Mathematics:Weekly Assignment:STD-003": { status: "Missing", score: "", feedback: "" },
};

const recordKey = (className, subject, assessment, studentId) =>
  `${className}:${subject}:${assessment}:${studentId}`;

const TeacherAssignmentGradingPage = () => {
  const allStudents = useSelector((state) => state.students.items);
  const subjects = useSelector((state) => state.subjects.items);
  const classes = [...new Set(allStudents.map((student) => student.class).filter(Boolean))];
  const [records, setRecords, persistenceError] = usePersistentState(
    "teacher-assignment-grades",
    initialGrades,
  );
  const [publication, setPublication, publicationError] = usePersistentState(
    "teacher-assignment-grade-publication",
    {},
  );
  const [drafts, setDrafts] = useState({});
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [assessment, setAssessment] = useState(assessments[0]);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const activeClass = selectedClass || classes[0] || "";
  const activeSubject = selectedSubject || subjects[0]?.name || "";
  const classStudents = useMemo(
    () => allStudents.filter((student) => student.class === activeClass),
    [allStudents, activeClass],
  );
  const filteredStudents = classStudents.filter((student) =>
    [student.name, student.id].some((value) =>
      value?.toLowerCase().includes(search.trim().toLowerCase()),
    ),
  );
  const periodKey = `${activeClass}:${activeSubject}:${assessment}`;
  const isPublished = publication[periodKey] === "Published";

  const getRecord = (student) => {
    const key = recordKey(activeClass, activeSubject, assessment, student.id);
    return drafts[key] || records[key] || { status: "Missing", score: "", feedback: "" };
  };

  const updateRecord = (student, values) => {
    const key = recordKey(activeClass, activeSubject, assessment, student.id);
    setDrafts((current) => ({ ...current, [key]: { ...getRecord(student), ...values } }));
    setError("");
    setNotice("");
  };

  const saveGrades = (publish = false) => {
    setError("");
    const submitted = classStudents.filter((student) => getRecord(student).status !== "Missing");
    if (!submitted.length) {
      setError("There are no submitted assignments to grade for this class.");
      return;
    }

    const updates = {};
    for (const student of submitted) {
      const record = getRecord(student);
      if (record.score === "" || !Number.isFinite(Number(record.score)) || Number(record.score) < 0 || Number(record.score) > 100) {
        if (publish) {
          setError(`Enter a score from 0 to 100 for ${student.name} before publishing.`);
          return;
        }
        if (record.score !== "") {
          setError(`Score for ${student.name} must be between 0 and 100.`);
          return;
        }
      }
      updates[recordKey(activeClass, activeSubject, assessment, student.id)] = record;
    }

    setRecords((current) => ({ ...current, ...updates }));
    setDrafts((current) => {
      const remaining = { ...current };
      Object.keys(updates).forEach((key) => delete remaining[key]);
      return remaining;
    });
    setPublication((current) => ({ ...current, [periodKey]: publish ? "Published" : "Draft" }));
    setNotice(publish ? "Assignment grades published." : "Assignment grade draft saved.");
  };

  const reopenGrades = () => {
    setPublication((current) => ({ ...current, [periodKey]: "Draft" }));
    setNotice("Grades reopened for editing.");
  };

  const submittedCount = classStudents.filter((student) => getRecord(student).status !== "Missing").length;
  const gradedCount = classStudents.filter((student) => getRecord(student).score !== "").length;
  const lateCount = classStudents.filter((student) => getRecord(student).status === "Late").length;
  const missingCount = classStudents.length - submittedCount;

  const exportGrades = () => {
    downloadCsv(`assignment-grades-${activeClass}-${assessment}.csv`, [
      ["Student ID", "Student", "Class", "Subject", "Assessment", "Status", "Score", "Feedback"],
      ...filteredStudents.map((student) => {
        const row = getRecord(student);
        return [student.id, student.name, activeClass, activeSubject, assessment, row.status, row.score, row.feedback];
      }),
    ]);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Assignment Grading</h1>
          <p className="mt-2 text-sm text-gray-600">Review submissions, enter scores, and publish grades.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={exportGrades} className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm hover:bg-gray-50">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button type="button" onClick={() => saveGrades(false)} className="rounded-xl border border-blue-600 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50">
            Save draft
          </button>
          <button type="button" onClick={() => saveGrades(true)} className="rounded-xl bg-blue-600 px-4 py-3 text-sm text-white hover:bg-blue-700">
            Publish grades
          </button>
          {isPublished && (
            <button type="button" onClick={reopenGrades} className="rounded-xl border border-gray-300 px-4 py-3 text-sm hover:bg-gray-50">
              Reopen for editing
            </button>
          )}
        </div>
      </section>

      {(persistenceError || publicationError) && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{persistenceError || publicationError}</p>
      )}
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">{notice}</p>}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 p-5"><Users className="mb-3 h-5 w-5 text-blue-600" /><p className="text-2xl font-semibold">{classStudents.length}</p><p className="text-sm text-gray-500">Students</p></div>
        <div className="rounded-2xl border border-gray-200 p-5"><p className="mb-3 text-xl font-semibold text-green-600">{submittedCount}</p><p className="text-sm text-gray-500">Submitted</p></div>
        <div className="rounded-2xl border border-gray-200 p-5"><p className="mb-3 text-xl font-semibold text-amber-600">{lateCount}</p><p className="text-sm text-gray-500">Late</p></div>
        <div className="rounded-2xl border border-gray-200 p-5"><p className="mb-3 text-xl font-semibold text-red-600">{missingCount}</p><p className="text-sm text-gray-500">Missing</p></div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        <label className="rounded-xl border border-gray-300 px-4 py-3 text-sm">
          <span className="sr-only">Class</span>
          <select value={activeClass} onChange={(event) => setSelectedClass(event.target.value)} className="w-full bg-transparent outline-none">
            {classes.map((className) => <option key={className}>{className}</option>)}
          </select>
        </label>
        <label className="rounded-xl border border-gray-300 px-4 py-3 text-sm">
          <span className="sr-only">Subject</span>
          <select value={activeSubject} onChange={(event) => setSelectedSubject(event.target.value)} className="w-full bg-transparent outline-none">
            {subjects.map((subject) => <option key={subject.code || subject.name} value={subject.name}>{subject.name}</option>)}
          </select>
        </label>
        <label className="rounded-xl border border-gray-300 px-4 py-3 text-sm">
          <span className="sr-only">Assessment</span>
          <select value={assessment} onChange={(event) => setAssessment(event.target.value)} className="w-full bg-transparent outline-none">
            {assessments.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </section>

      <label className="flex max-w-xl items-center rounded-xl border border-gray-300 px-4 py-3">
        <Search className="mr-3 h-4 w-4 text-gray-500" />
        <span className="sr-only">Search students</span>
        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students" className="w-full outline-none" />
      </label>

      <section className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr><th className="p-4">Student</th><th className="p-4">ID</th><th className="p-4">Status</th><th className="p-4">Score / 100</th><th className="p-4">Feedback</th></tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              const record = getRecord(student);
              return (
                <tr key={student.id} className="border-t border-gray-100">
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4">{student.id}</td>
                  <td className="p-4">
                    <label>
                      <span className="sr-only">Submission status for {student.name}</span>
                      <select
                        disabled={isPublished}
                        value={record.status}
                        onChange={(event) => updateRecord(student, { status: event.target.value })}
                        className={`rounded-full px-3 py-1 text-xs disabled:opacity-70 ${
                          record.status === "Missing" ? "bg-red-100 text-red-700" :
                          record.status === "Late" ? "bg-amber-100 text-amber-700" :
                          "bg-green-100 text-green-700"
                        }`}
                      >
                        <option>Submitted</option>
                        <option>Late</option>
                        <option>Missing</option>
                      </select>
                    </label>
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.5"
                      disabled={record.status === "Missing" || isPublished}
                      value={record.score}
                      onChange={(event) => updateRecord(student, { score: event.target.value })}
                      aria-label={`Score for ${student.name}`}
                      className="w-24 rounded-lg border border-gray-300 px-3 py-2 disabled:bg-gray-100"
                    />
                  </td>
                  <td className="p-4">
                    <textarea
                      rows="2"
                      disabled={record.status === "Missing" || isPublished}
                      value={record.feedback}
                      onChange={(event) => updateRecord(student, { feedback: event.target.value })}
                      aria-label={`Feedback for ${student.name}`}
                      className="w-full rounded-lg border border-gray-300 p-2 disabled:bg-gray-100"
                    />
                  </td>
                </tr>
              );
            })}
            {!filteredStudents.length && <tr><td colSpan="5" className="p-8 text-center text-gray-500">No students match this class and search.</td></tr>}
          </tbody>
        </table>
        <div className="border-t bg-gray-50 p-4 text-sm text-gray-600">
          {gradedCount} grades entered · {publication[periodKey] || "Draft"}
        </div>
      </section>
    </div>
  );
};

export default TeacherAssignmentGradingPage;
