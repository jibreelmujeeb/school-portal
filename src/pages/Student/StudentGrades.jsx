import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { studentApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const StudentGrades = () => {
  const { accessToken } = useAuth();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    const average = records.length > 0
      ? Math.round(records.reduce((sum, record) => sum + Number(record.score), 0) / records.length)
      : 0;
    const passed = records.filter((record) => Number(record.score) >= Number(record.maxScore) * 0.5).length;
    return { average, passed, failed: records.length - passed };
  }, [records]);

  const loadGrades = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await studentApi.grades(accessToken);
      setRecords(payload.records);
    } catch (err) {
      setError(err.message || "Unable to load grades.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadGrades();
  }, [loadGrades]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Grades</h1>
        <p className="mt-2 text-sm text-gray-600">View your academic performance</p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-5">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Average Score</p>
            <h2 className="text-lg font-semibold">{summary.average}%</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-5">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Passed</p>
            <h2 className="text-lg font-semibold">{summary.passed}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-5">
          <XCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Failed</p>
            <h2 className="text-lg font-semibold">{summary.failed}</h2>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="hidden grid-cols-5 border-b border-gray-200 p-4 text-sm text-gray-500 sm:grid">
          <span>Subject</span>
          <span>Assessment</span>
          <span>Score</span>
          <span>Grade</span>
          <span>Status</span>
        </div>

        {isLoading ? (
          <div className="p-6 text-sm text-gray-500">Loading grades...</div>
        ) : records.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No grades found.</div>
        ) : (
          records.map((item) => {
            const passed = Number(item.score) >= Number(item.maxScore) * 0.5;

            return (
              <div key={item.id} className="grid gap-2 border-b border-gray-100 p-4 text-sm last:border-b-0 sm:grid-cols-5 sm:items-center">
                <span className="font-medium">{item.subject.name}</span>
                <span>{item.assessmentName}</span>
                <span>{item.score}/{item.maxScore}</span>
                <span>{item.grade}</span>
                <div className={`flex items-center gap-2 ${passed ? "text-green-600" : "text-red-600"}`}>
                  {passed ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {passed ? "Pass" : "Fail"}
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default StudentGrades;
