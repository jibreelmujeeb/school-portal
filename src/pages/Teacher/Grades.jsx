import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { BookOpen, Download, Search, Users } from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import downloadCsv from "../../utils/downloadCsv";

const gradeKey = (studentId, subject) => `${studentId}:${subject}`;

const getGrade = (score) => {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  return "F";
};

const TeacherGrades = () => {
  const allStudents = useSelector((state) => state.students.items);
  const subjects = useSelector((state) => state.subjects.items);
  const classes = [...new Set(allStudents.map((student) => student.class).filter(Boolean))];
  const [scores, setScores, persistenceError] = usePersistentState("teacher-grade-scores", {
    "STD-001:Mathematics": 75,
    "STD-002:Mathematics": 88,
    "STD-003:Mathematics": 60,
  });
  const [gradeStates, setGradeStates, statusPersistenceError] = usePersistentState(
    "teacher-grade-publication",
    {},
  );
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [search, setSearch] = useState("");
  const [draftScores, setDraftScores] = useState({});
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const activeClass = selectedClass || classes[0] || "";
  const activeSubject = selectedSubject || subjects[0]?.name || "";
  const classStudents = useMemo(
    () => allStudents.filter((student) => student.class === activeClass),
    [allStudents, activeClass],
  );
  const students = useMemo(() => classStudents.filter((student) =>
    [student.name, student.id].some((value) => value?.toLowerCase().includes(search.trim().toLowerCase())),
  ), [classStudents, search]);
  const periodKey = `${activeClass}:${activeSubject}`;
  const published = gradeStates[periodKey] === "Published";

  const getScore = (student) => {
    const key = gradeKey(student.id, activeSubject);
    return draftScores[key] ?? scores[key] ?? "";
  };

  const updateScore = (student, value) => {
    const key = gradeKey(student.id, activeSubject);
    setDraftScores((current) => ({ ...current, [key]: value }));
    setError("");
    setNotice("");
  };

  const saveGrades = (publish = false) => {
    setError("");
    const updates = {};
    for (const student of classStudents) {
      const rawScore = getScore(student);
      if (rawScore === "") {
        if (publish) {
          setError(`Enter a score for ${student.name} before publishing.`);
          return;
        }
        continue;
      }
      const score = Number(rawScore);
      if (!Number.isFinite(score) || score < 0 || score > 100) {
        setError(`Scores must be between 0 and 100. Check ${student.name}'s score.`);
        return;
      }
      updates[gradeKey(student.id, activeSubject)] = score;
    }

    if (!Object.keys(updates).length) {
      setError("Enter at least one score before saving.");
      return;
    }

    setScores((current) => ({ ...current, ...updates }));
    setDraftScores((current) => {
      const remaining = { ...current };
      Object.keys(updates).forEach((key) => delete remaining[key]);
      return remaining;
    });
    setGradeStates((current) => ({ ...current, [periodKey]: publish ? "Published" : "Draft" }));
    setNotice(publish ? "Grades published." : "Grade draft saved.");
  };

  const gradedCount = classStudents.filter((student) => getScore(student) !== "").length;
  const numericScores = classStudents
    .map(getScore)
    .filter((score) => score !== "")
    .map(Number)
    .filter(Number.isFinite);
  const average = numericScores.length
    ? Math.round(numericScores.reduce((sum, score) => sum + score, 0) / numericScores.length)
    : 0;

  const exportGrades = () => {
    downloadCsv(`grades-${activeClass}-${activeSubject}.csv`, [
      ["Student ID", "Student", "Class", "Subject", "Score", "Grade", "Status"],
      ...students.map((student) => {
        const score = getScore(student);
        return [
          student.id,
          student.name,
          activeClass,
          activeSubject,
          score,
          score === "" ? "" : getGrade(Number(score)),
          published ? "Published" : gradeStates[periodKey] || "Draft",
        ];
      }),
    ]);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Enter Grades</h1>
          <p className="mt-2 text-sm text-gray-600">
            Record, save, and publish scores for your students.
          </p>
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
        </div>
      </section>

      {(persistenceError || statusPersistenceError) && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {persistenceError || statusPersistenceError}
        </p>
      )}
      {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {notice && <p role="status" className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">{notice}</p>}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 p-5"><Users className="mb-3 h-5 w-5 text-blue-600" /><p className="text-2xl font-semibold">{students.length}</p><p className="text-sm text-gray-500">Students in view</p></div>
        <div className="rounded-2xl border border-gray-200 p-5"><BookOpen className="mb-3 h-5 w-5 text-green-600" /><p className="text-2xl font-semibold">{activeSubject || "-"}</p><p className="text-sm text-gray-500">Selected subject</p></div>
        <div className="rounded-2xl border border-gray-200 p-5"><Users className="mb-3 h-5 w-5 text-purple-600" /><p className="text-2xl font-semibold">{gradedCount}</p><p className="text-sm text-gray-500">Scores entered</p></div>
        <div className="rounded-2xl border border-gray-200 p-5"><BookOpen className="mb-3 h-5 w-5 text-orange-600" /><p className="text-2xl font-semibold">{average}%</p><p className="text-sm text-gray-500">Current average</p></div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Class</span>
          <select value={activeClass} onChange={(event) => setSelectedClass(event.target.value)} className="w-full bg-transparent text-sm outline-none">
            {classes.map((className) => <option key={className}>{className}</option>)}
          </select>
        </label>
        <label className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3">
          <BookOpen className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Subject</span>
          <select value={activeSubject} onChange={(event) => setSelectedSubject(event.target.value)} className="w-full bg-transparent text-sm outline-none">
            {subjects.map((subject) => <option key={subject.code || subject.name} value={subject.name}>{subject.name}</option>)}
          </select>
        </label>
      </section>

      <label className="flex max-w-xl items-center rounded-xl border border-gray-300 px-4 py-3">
        <Search className="mr-3 h-4 w-4 text-gray-500" />
        <span className="sr-only">Search students</span>
        <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search students" className="w-full outline-none" />
      </label>

      <section className="overflow-hidden rounded-2xl border border-gray-200">
        <div className="flex items-center justify-between bg-gray-50 p-4 text-sm text-gray-600">
          <span>{activeClass || "No class"} / {activeSubject || "No subject"}</span>
          <span className={published ? "text-green-700" : "text-amber-700"}>{gradeStates[periodKey] || "Draft"}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="text-gray-500"><tr><th className="p-4">Student</th><th className="p-4">ID</th><th className="p-4">Score / 100</th><th className="p-4">Grade</th></tr></thead>
            <tbody>
              {students.map((student) => {
                const score = getScore(student);
                return (
                  <tr key={student.id} className="border-t border-gray-100">
                    <td className="p-4 font-medium">{student.name}</td>
                    <td className="p-4">{student.id}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.5"
                        value={score}
                        onChange={(event) => updateScore(student, event.target.value)}
                        aria-label={`Score for ${student.name}`}
                        className="w-24 rounded-lg border border-gray-300 px-3 py-2"
                      />
                    </td>
                    <td className="p-4 font-semibold">
                      {score === "" ? "-" : getGrade(Number(score))}
                    </td>
                  </tr>
                );
              })}
              {!students.length && <tr><td colSpan="4" className="p-8 text-center text-gray-500">No students are assigned to this class.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default TeacherGrades;
