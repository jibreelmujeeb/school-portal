import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Users,
  CheckCircle,
  XCircle,
  Save,
} from "lucide-react";
import { teacherApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const today = new Date().toISOString().slice(0, 10);

const TeacherAttendance = () => {
  const { accessToken } = useAuth();
  const [classes, setClasses] = useState([]);
  const [records, setRecords] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [date, setDate] = useState(today);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedClass = useMemo(
    () => classes.find((schoolClass) => schoolClass.id === selectedClassId),
    [classes, selectedClassId],
  );

  const loadClasses = useCallback(async () => {
    if (!accessToken) return;

    try {
      const payload = await teacherApi.classes(accessToken);
      setClasses(payload.classes);
      setSelectedClassId((current) => current || payload.classes[0]?.id || "");
    } catch (err) {
      setError(err.message || "Unable to load assigned classes.");
    }
  }, [accessToken]);

  const loadAttendance = useCallback(async () => {
    if (!accessToken || !selectedClassId || !date) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const payload = await teacherApi.attendance(accessToken, {
        classId: selectedClassId,
        date,
      });
      setRecords(payload.records);
    } catch (err) {
      setError(err.message || "Unable to load attendance.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, selectedClassId, date]);

  useEffect(() => {
    void loadClasses();
  }, [loadClasses]);

  useEffect(() => {
    void loadAttendance();
  }, [loadAttendance]);

  const toggleStatus = (studentId) => {
    setRecords((current) => current.map((record) => (
      record.id === studentId
        ? { ...record, status: record.status === "PRESENT" ? "ABSENT" : "PRESENT" }
        : record
    )));
  };

  const presentCount = records.filter((record) => record.status === "PRESENT").length;
  const absentCount = records.length - presentCount;

  const handleSave = async () => {
    if (!selectedClassId || records.length === 0) return;

    setIsSaving(true);
    setError("");

    try {
      const payload = await teacherApi.saveAttendance(accessToken, {
        classId: selectedClassId,
        date,
        records: records.map((record) => ({
          studentId: record.id,
          status: record.status,
          note: record.note || "",
        })),
      });
      setRecords(payload.records);
    } catch (err) {
      setError(err.message || "Unable to save attendance.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Attendance</h1>
        <p className="mt-2 text-sm text-gray-600">
          Mark and manage student attendance
        </p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        <label className="flex items-center rounded-lg border border-gray-300 px-3 py-2">
          <Users className="mr-2 h-4 w-4 text-gray-500" />
          <select
            value={selectedClassId}
            onChange={(event) => setSelectedClassId(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          >
            {classes.length === 0 ? (
              <option value="">No assigned classes</option>
            ) : (
              classes.map((schoolClass) => (
                <option key={schoolClass.id} value={schoolClass.id}>
                  {schoolClass.name}
                </option>
              ))
            )}
          </select>
        </label>

        <label className="flex items-center rounded-lg border border-gray-300 px-3 py-2">
          <CalendarDays className="mr-2 h-4 w-4 text-gray-500" />
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-4">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <span className="text-sm">Present: {presentCount}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-4">
          <XCircle className="h-5 w-5 text-red-600" />
          <span className="text-sm">Absent: {absentCount}</span>
        </div>
      </section>

      <section className="space-y-3">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading attendance...</div>
        ) : records.length === 0 ? (
          <div className="text-sm text-gray-500">
            {selectedClass ? "No students found for this class." : "No class selected."}
          </div>
        ) : (
          records.map((record) => (
            <div
              key={record.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4"
            >
              <div>
                <p className="text-sm font-medium">
                  {record.firstName} {record.lastName}
                </p>
                <p className="text-xs text-gray-500">{record.admissionNumber}</p>
              </div>

              <button
                type="button"
                onClick={() => toggleStatus(record.id)}
                className={`flex items-center gap-1 text-sm ${
                  record.status === "PRESENT" ? "text-green-600" : "text-red-600"
                }`}
              >
                {record.status === "PRESENT" ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Present
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4" />
                    Absent
                  </>
                )}
              </button>
            </div>
          ))
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
          {isSaving ? "Saving..." : "Save Attendance"}
        </button>
      </section>
    </div>
  );
};

export default TeacherAttendance;
