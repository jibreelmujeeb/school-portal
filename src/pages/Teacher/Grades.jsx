import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, Save, Users } from "lucide-react";
import { teacherApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const defaultAcademicSession = `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;

const gradeColor = (grade) => {
  if (grade === "A") return "text-green-600";
  if (grade === "B") return "text-blue-600";
  if (grade === "C") return "text-orange-600";
  return "text-red-600";
};

const TeacherGrades = () => {
  const { accessToken } = useAuth();
  const [classes, setClasses] = useState([]);
  const [records, setRecords] = useState([]);
  const [teacherAssignmentId, setTeacherAssignmentId] = useState("");
  const [assessmentName, setAssessmentName] = useState("Continuous Assessment");
  const [term, setTerm] = useState("First Term");
  const [academicSession, setAcademicSession] = useState(defaultAcademicSession);
  const [maxScore, setMaxScore] = useState(100);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const assignmentOptions = useMemo(() => (
    classes.flatMap((schoolClass) => schoolClass.subjects.map((subject) => ({
      id: subject.assignmentId,
      label: `${schoolClass.name} - ${subject.name}`,
    })))
  ), [classes]);

  const loadClasses = useCallback(async () => {
    if (!accessToken) return;

    try {
      const payload = await teacherApi.classes(accessToken);
      setClasses(payload.classes);
      setTeacherAssignmentId((current) => current || payload.classes[0]?.subjects[0]?.assignmentId || "");
    } catch (err) {
      setError(err.message || "Unable to load assigned subjects.");
    }
  }, [accessToken]);

  const loadGrades = useCallback(async () => {
    if (!accessToken || !teacherAssignmentId || !assessmentName || !term || !academicSession) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const payload = await teacherApi.grades(accessToken, {
        teacherAssignmentId,
        assessmentName,
        term,
        academicSession,
      });
      setRecords(payload.records);
      setMaxScore(payload.records[0]?.maxScore || 100);
    } catch (err) {
      setError(err.message || "Unable to load grades.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, teacherAssignmentId, assessmentName, term, academicSession]);

  useEffect(() => {
    void loadClasses();
  }, [loadClasses]);

  useEffect(() => {
    void loadGrades();
  }, [loadGrades]);

  const handleScoreChange = (studentId, value) => {
    setRecords((current) => current.map((record) => (
      record.id === studentId ? { ...record, score: value } : record
    )));
  };

  const getGrade = (score) => {
    const numericScore = Number(score);
    const numericMax = Number(maxScore) || 100;
    const percentage = numericMax > 0 ? (numericScore / numericMax) * 100 : 0;

    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 60) return "C";
    if (percentage >= 50) return "D";
    return "F";
  };

  const handleSave = async () => {
    if (!teacherAssignmentId || records.length === 0) return;

    setIsSaving(true);
    setError("");

    try {
      const payload = await teacherApi.saveGrades(accessToken, {
        teacherAssignmentId,
        assessmentName,
        term,
        academicSession,
        maxScore: Number(maxScore),
        records: records.map((record) => ({
          studentId: record.id,
          score: Number(record.score || 0),
          remarks: record.remarks || "",
        })),
      });
      setRecords(payload.records);
    } catch (err) {
      setError(err.message || "Unable to save grades.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Enter Grades</h1>
        <p className="mt-2 text-sm text-gray-600">
          Record and manage student scores
        </p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        <label className="flex items-center rounded-lg border border-gray-300 px-3 py-2">
          <BookOpen className="mr-2 h-4 w-4 text-gray-500" />
          <select
            value={teacherAssignmentId}
            onChange={(event) => setTeacherAssignmentId(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          >
            {assignmentOptions.length === 0 ? (
              <option value="">No assigned subjects</option>
            ) : (
              assignmentOptions.map((option) => (
                <option key={option.id} value={option.id}>{option.label}</option>
              ))
            )}
          </select>
        </label>
        <input
          value={assessmentName}
          onChange={(event) => setAssessmentName(event.target.value)}
          placeholder="Assessment"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <select
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
        >
          <option>First Term</option>
          <option>Second Term</option>
          <option>Third Term</option>
        </select>
        <input
          value={academicSession}
          onChange={(event) => setAcademicSession(event.target.value)}
          placeholder="Academic session"
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <input
          type="number"
          min="1"
          value={maxScore}
          onChange={(event) => setMaxScore(event.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
      </section>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-3 border-b border-gray-200 p-4 text-sm text-gray-500">
          <span>Student</span>
          <span>Score</span>
          <span>Grade</span>
        </div>

        {isLoading ? (
          <div className="p-6 text-sm text-gray-500">Loading grades...</div>
        ) : records.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No students found for this subject.</div>
        ) : (
          records.map((record) => {
            const grade = getGrade(record.score);

            return (
              <div
                key={record.id}
                className="grid grid-cols-3 items-center border-b border-gray-100 p-4 text-sm last:border-b-0"
              >
                <div>
                  <p className="font-medium">{record.firstName} {record.lastName}</p>
                  <p className="text-xs text-gray-500">{record.admissionNumber}</p>
                </div>
                <input
                  type="number"
                  min="0"
                  max={maxScore}
                  value={record.score}
                  onChange={(event) => handleScoreChange(record.id, event.target.value)}
                  className="w-24 rounded-lg border border-gray-300 px-2 py-1 text-sm outline-none"
                />
                <span className={gradeColor(grade)}>{grade}</span>
              </div>
            );
          })
        )}
      </section>

      <section className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || records.length === 0}
          className="flex items-center gap-2 rounded-lg border border-blue-600 px-6 py-3 text-sm text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {isSaving ? "Saving..." : "Save Grades"}
        </button>
      </section>
    </div>
  );
};

export default TeacherGrades;
