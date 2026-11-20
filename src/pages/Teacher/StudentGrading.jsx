import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Award, Download, Search, Users } from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import downloadCsv from "../../utils/downloadCsv";

const components = [
  { key: "assignment", label: "Assignment", max: 10 },
  { key: "quiz", label: "Quiz", max: 10 },
  { key: "ca", label: "CA", max: 20 },
  { key: "practical", label: "Practical", max: 10 },
  { key: "exam", label: "Exam", max: 50 },
];

const recordKey = (studentId, subject, term) => `${studentId}:${subject}:${term}`;

const getGrade = (score) => {
  if (score >= 70) return "A";
  if (score >= 60) return "B";
  if (score >= 50) return "C";
  if (score >= 45) return "D";
  if (score >= 40) return "E";
  return "F";
};

const initialScores = {
  "STD-001:Mathematics:First Term": { assignment: 9, quiz: 8, ca: 18, practical: 9, exam: 45 },
  "STD-002:Mathematics:First Term": { assignment: 10, quiz: 10, ca: 19, practical: 10, exam: 47 },
  "STD-003:Mathematics:First Term": { assignment: 6, quiz: 7, ca: 14, practical: 7, exam: 34 },
};

const TeacherStudentsGradingPage = () => {
  const allStudents = useSelector((state) => state.students.items);
  const subjects = useSelector((state) => state.subjects.items);
  const classes = [...new Set(allStudents.map((student) => student.class).filter(Boolean))];
  const [scores, setScores, persistenceError] = usePersistentState(
    "teacher-student-grades",
    initialScores,
  );
  const [publication, setPublication, publicationError] = usePersistentState(
    "teacher-student-grade-publication",
    {},
  );
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [term, setTerm] = useState("First Term");
  const [search, setSearch] = useState("");
  const [drafts, setDrafts] = useState({});
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const activeClass = selectedClass || classes[0] || "";
  const activeSubject = selectedSubject || subjects[0]?.name || "";
  const classStudents = useMemo(
    () => allStudents.filter((student) => student.class === activeClass),
    [allStudents, activeClass],
  );
  const visibleStudents = classStudents.filter((student) =>
    [student.name, student.id].some((value) =>
      value?.toLowerCase().includes(search.trim().toLowerCase()),
    ),
  );
  const periodKey = `${activeClass}:${activeSubject}:${term}`;
  const getScoreRecord = (student) =>
    drafts[recordKey(student.id, activeSubject, term)] ||
    scores[recordKey(student.id, activeSubject, term)] ||
    {};

  const updateScore = (student, component, value) => {
    const key = recordKey(student.id, activeSubject, term);
    setDrafts((current) => ({
      ...current,
      [key]: { ...(current[key] || scores[key] || {}), [component]: value },
    }));
    setError("");
    setNotice("");
  };

  const getTotal = (student) => {
    const record = getScoreRecord(student);
    if (components.some(({ key }) => record[key] === undefined || record[key] === "")) return null;
    return components.reduce((total, { key }) => total + Number(record[key]), 0);
  };

  const saveGrades = (publish = false) => {
    setError("");
    const updates = {};
    for (const student of classStudents) {
      const record = getScoreRecord(student);
      const next = { ...record };
      for (const { key, label, max } of components) {
        const value = next[key];
        if (value === undefined || value === "") {
          if (publish) {
            setError(`Enter ${label.toLowerCase()} marks for ${student.name} before publishing.`);
            return;
          }
          continue;
        }
        if (!Number.isFinite(Number(value)) || Number(value) < 0 || Number(value) > max) {
          setError(`${label} marks must be between 0 and ${max} for ${student.name}.`);
          return;
        }
        next[key] = Number(value);
      }
      if (Object.keys(next).length) updates[recordKey(student.id, activeSubject, term)] = next;
    }

    if (!Object.keys(updates).length) {
      setError("Enter at least one mark before saving.");
      return;
    }
    setScores((current) => ({ ...current, ...updates }));
    setDrafts((current) => {
      const remaining = { ...current };
      Object.keys(updates).forEach((key) => delete remaining[key]);
      return remaining;
    });
    setPublication((current) => ({ ...current, [periodKey]: publish ? "Published" : "Draft" }));
    setNotice(publish ? "Grades published." : "Grade draft saved.");
  };

  const completedCount = classStudents.filter((student) => getTotal(student) !== null).length;
  const publishStatus = publication[periodKey] || "Draft";

  const exportGrades = () => {
    downloadCsv(`student-grades-${activeClass}-${activeSubject}-${term}.csv`, [
      ["Student ID", "Student", "Class", "Subject", "Term", ...components.map(({ label }) => label), "Total", "Grade", "Status"],
      ...visibleStudents.map((student) => {
        const record = getScoreRecord(student);
        const total = getTotal(student);
        return [
          student.id,
          student.name,
          activeClass,
          activeSubject,
          term,
          ...components.map(({ key }) => record[key] ?? ""),
          total ?? "",
          total === null ? "" : getGrade(total),
          publishStatus,
        ];
      }),
    ]);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Student Grading</h1>
          <p className="mt-2 text-sm text-gray-600">Enter and publish assessment marks by student and subject.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={exportGrades} className="flex items-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm hover:bg-gray-50">
            <Download className="h-4 w-4" /> Export CSV
          </button>
          <button type="button" onClick={() => saveGrades(false)} className="rounded-xl border border-blue-600 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50">
            Save draft
          </button>
          <button type="button" onClick={() => saveGrades(true)} className="rounded-xl bg-blue-600 px-4 py-3 text-sm text-white hover:bg-blue-700">
            Publish
          </button>
        </div>
      </section>

      {(persistenceError || publicationError) && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">{persistenceError || publicationError}</p>
      )}
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">{notice}</p>}

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 p-5"><Users className="mb-3 h-5 w-5 text-blue-600" /><p className="text-2xl font-semibold">{classStudents.length}</p><p className="text-sm text-gray-500">Students in class</p></div>
        <div className="rounded-2xl border border-gray-200 p-5"><Award className="mb-3 h-5 w-5 text-green-600" /><p className="text-2xl font-semibold">{completedCount}</p><p className="text-sm text-gray-500">Complete score sheets</p></div>
        <div className="rounded-2xl border border-gray-200 p-5"><Award className="mb-3 h-5 w-5 text-purple-600" /><p className="text-2xl font-semibold">{publishStatus}</p><p className="text-sm text-gray-500">Grade status</p></div>
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
          <span className="sr-only">Term</span>
          <select value={term} onChange={(event) => setTerm(event.target.value)} className="w-full bg-transparent outline-none">
            <option>First Term</option>
            <option>Second Term</option>
            <option>Third Term</option>
          </select>
        </label>
      </section>

      <label className="flex max-w-xl items-center rounded-xl border border-gray-300 px-4 py-3">
        <Search className="mr-3 h-4 w-4 text-gray-500" />
        <span className="sr-only">Search students</span>
        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students" className="w-full outline-none" />
      </label>

      <section className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full min-w-[1050px] text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-3">Student</th>
              {components.map(({ key, label, max }) => <th key={key} className="p-3">{label} / {max}</th>)}
              <th className="p-3">Total / 100</th>
              <th className="p-3">Grade</th>
            </tr>
          </thead>
          <tbody>
            {visibleStudents.map((student) => {
              const record = getScoreRecord(student);
              const total = getTotal(student);
              return (
                <tr key={student.id} className="border-t border-gray-100">
                  <td className="p-3"><p className="font-medium">{student.name}</p><p className="text-xs text-gray-500">{student.id}</p></td>
                  {components.map(({ key, label, max }) => (
                    <td key={key} className="p-3">
                      <input
                        type="number"
                        min="0"
                        max={max}
                        step="0.5"
                        value={record[key] ?? ""}
                        onChange={(event) => updateScore(student, key, event.target.value)}
                        aria-label={`${label} score for ${student.name}`}
                        className="w-20 rounded-lg border border-gray-300 px-2 py-1.5"
                      />
                    </td>
                  ))}
                  <td className="p-3 font-semibold">{total === null ? "-" : total}</td>
                  <td className="p-3 font-semibold">{total === null ? "-" : getGrade(total)}</td>
                </tr>
              );
            })}
            {!visibleStudents.length && <tr><td colSpan="8" className="p-8 text-center text-gray-500">No students match this class and search.</td></tr>}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TeacherStudentsGradingPage;
