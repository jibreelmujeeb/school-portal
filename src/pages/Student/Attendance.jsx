import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react";
import { studentApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const StudentAttendance = () => {
  const { accessToken } = useAuth();
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const summary = useMemo(() => {
    const present = records.filter((record) => record.status === "PRESENT").length;
    const absent = records.filter((record) => record.status === "ABSENT").length;
    const rate = records.length > 0 ? Math.round((present / records.length) * 100) : 0;
    return { present, absent, rate };
  }, [records]);

  const loadAttendance = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await studentApi.attendance(accessToken);
      setRecords(payload.records);
    } catch (err) {
      setError(err.message || "Unable to load attendance.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadAttendance();
  }, [loadAttendance]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Attendance</h1>
        <p className="mt-2 text-sm text-gray-600">Track your attendance records</p>
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
            <p className="text-sm text-gray-500">Attendance</p>
            <h2 className="text-lg font-semibold">{summary.rate}%</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-5">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Present</p>
            <h2 className="text-lg font-semibold">{summary.present}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-5">
          <XCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Absent</p>
            <h2 className="text-lg font-semibold">{summary.absent}</h2>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {isLoading ? (
          <div className="p-6 text-sm text-gray-500">Loading attendance...</div>
        ) : records.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No attendance records found.</div>
        ) : (
          records.map((record) => (
            <div key={record.id} className="flex items-center justify-between border-b border-gray-100 p-4 text-sm last:border-b-0">
              <div>
                <div className="flex items-center gap-2 text-gray-600">
                  <CalendarDays className="h-4 w-4" />
                  {record.date}
                </div>
                <p className="mt-1 text-xs text-gray-500">{record.class.name}</p>
              </div>
              <div className={`flex items-center gap-2 ${record.status === "PRESENT" ? "text-green-600" : "text-red-600"}`}>
                {record.status === "PRESENT" ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                {record.status === "PRESENT" ? "Present" : "Absent"}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default StudentAttendance;
