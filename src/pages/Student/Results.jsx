import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  User,
  Printer,
} from "lucide-react";
import { studentApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const StudentResult = () => {
  const { accessToken } = useAuth();
  const [records, setRecords] = useState([]);
  const [overview, setOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    const total = records.reduce((sum, record) => sum + Number(record.score), 0);
    const average = records.length > 0 ? (total / records.length).toFixed(1) : "0.0";
    return { total, average };
  }, [records]);

  const loadResults = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const [gradesPayload, overviewPayload] = await Promise.all([
        studentApi.grades(accessToken),
        studentApi.overview(accessToken),
      ]);
      setRecords(gradesPayload.records);
      setOverview(overviewPayload.overview);
    } catch (err) {
      setError(err.message || "Unable to load results.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadResults();
  }, [loadResults]);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold sm:text-3xl">Result Sheet</h1>
          <p className="mt-2 text-sm text-gray-600">View your academic performance</p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-2 rounded-lg border border-blue-600 px-5 py-2 text-sm text-blue-600 transition hover:bg-blue-50"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 rounded-lg border border-gray-200 bg-white p-5 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-blue-600" />
          <span className="text-sm">
            {overview?.student.firstName || "Student"} {overview?.student.lastName || ""}
          </span>
        </div>
        <div className="text-sm">Class: {overview?.student.class?.name || "Not assigned"}</div>
        <div className="text-sm">Admission No: {overview?.student.admissionNumber || "Not set"}</div>
        <div className="text-sm">Records: {records.length}</div>
      </section>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-4 border-b border-gray-200 p-4 text-sm text-gray-500">
          <span>Subject</span>
          <span>Assessment</span>
          <span>Score</span>
          <span>Grade</span>
        </div>

        {isLoading ? (
          <div className="p-6 text-sm text-gray-500">Loading results...</div>
        ) : records.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No results found.</div>
        ) : (
          records.map((record) => (
            <div key={record.id} className="grid grid-cols-4 border-b border-gray-100 p-4 text-sm last:border-b-0">
              <span className="font-medium">{record.subject.name}</span>
              <span>{record.assessmentName}</span>
              <span>{record.score}/{record.maxScore}</span>
              <span>{record.grade}</span>
            </div>
          ))
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">Total</p>
          <h2 className="text-lg font-semibold">{summary.total}</h2>
        </div>
        <div className="rounded-lg border border-gray-200 p-4 text-center">
          <p className="text-xs text-gray-500">Average</p>
          <h2 className="text-lg font-semibold">{summary.average}%</h2>
        </div>
      </section>
    </div>
  );
};

export default StudentResult;
