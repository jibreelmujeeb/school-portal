import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, GraduationCap } from "lucide-react";
import { teacherApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const defaultAcademicSession = `${new Date().getFullYear()}/${new Date().getFullYear() + 1}`;

const TeacherResults = () => {
  const { accessToken } = useAuth();
  const [classes, setClasses] = useState([]);
  const [records, setRecords] = useState([]);
  const [teacherAssignmentId, setTeacherAssignmentId] = useState("");
  const [assessmentName, setAssessmentName] = useState("Continuous Assessment");
  const [term, setTerm] = useState("First Term");
  const [academicSession, setAcademicSession] = useState(defaultAcademicSession);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const assignmentOptions = useMemo(() => (
    classes.flatMap((schoolClass) => schoolClass.subjects.map((subject) => ({
      id: subject.assignmentId,
      label: `${schoolClass.name} - ${subject.name}`,
    })))
  ), [classes]);

  const averageScore = useMemo(() => {
    if (records.length === 0) return 0;
    const total = records.reduce((sum, record) => sum + Number(record.score || 0), 0);
    return Math.round(total / records.length);
  }, [records]);

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

  const loadResults = useCallback(async () => {
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
    } catch (err) {
      setError(err.message || "Unable to load results.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, teacherAssignmentId, assessmentName, term, academicSession]);

  useEffect(() => {
    void loadClasses();
  }, [loadClasses]);

  useEffect(() => {
    void loadResults();
  }, [loadResults]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Results</h1>
        <p className="mt-2 text-sm text-gray-600">
          Review saved scores and grades by class and subject
        </p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-4">
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
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-4">
          <GraduationCap className="h-5 w-5 text-blue-600" />
          <span className="text-sm">Students: {records.length}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-4">
          <GraduationCap className="h-5 w-5 text-green-600" />
          <span className="text-sm">Average Score: {averageScore}</span>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-4 border-b border-gray-200 p-4 text-sm text-gray-500">
          <span>Student</span>
          <span>Score</span>
          <span>Max</span>
          <span>Grade</span>
        </div>

        {isLoading ? (
          <div className="p-6 text-sm text-gray-500">Loading results...</div>
        ) : records.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No results found.</div>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className="grid grid-cols-4 items-center border-b border-gray-100 p-4 text-sm last:border-b-0"
            >
              <span className="font-medium">{record.firstName} {record.lastName}</span>
              <span>{record.score}</span>
              <span>{record.maxScore}</span>
              <span>{record.grade}</span>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default TeacherResults;
