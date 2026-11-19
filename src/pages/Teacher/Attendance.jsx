import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CalendarDays, CheckCircle, Download, Users, XCircle } from "lucide-react";
import usePersistentState from "../../hooks/usePersistentState";
import downloadCsv from "../../utils/downloadCsv";

const getToday = () => {
  const date = new Date();
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

const attendanceKey = (date, className, studentId) =>
  `${date}:${className}:${studentId}`;

const TeacherAttendance = () => {
  const allStudents = useSelector((state) => state.students.items);
  const classes = [...new Set(allStudents.map((student) => student.class).filter(Boolean))];
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState(getToday);
  const [savedAttendance, setSavedAttendance, persistenceError] = usePersistentState(
    "teacher-attendance-records",
    {},
  );
  const [draftAttendance, setDraftAttendance] = useState({});
  const [notice, setNotice] = useState("");

  const activeClass = selectedClass || classes[0] || "";
  const students = useMemo(
    () => allStudents.filter((student) => student.class === activeClass),
    [allStudents, activeClass],
  );
  const getStatus = (student) => {
    const key = attendanceKey(date, activeClass, student.id);
    return draftAttendance[key] ?? savedAttendance[key] ?? "Unmarked";
  };
  const counts = students.reduce((summary, student) => {
    summary[getStatus(student)] += 1;
    return summary;
  }, { Present: 0, Absent: 0, Late: 0, Excused: 0, Unmarked: 0 });

  const setStatus = (student, status) => {
    const key = attendanceKey(date, activeClass, student.id);
    setDraftAttendance((current) => ({ ...current, [key]: status }));
    setNotice("");
  };

  const markAllPresent = () => {
    setDraftAttendance((current) => {
      const next = { ...current };
      students.forEach((student) => {
        next[attendanceKey(date, activeClass, student.id)] = "Present";
      });
      return next;
    });
    setNotice("");
  };

  const saveAttendance = () => {
    const updates = {};
    const currentKeys = new Set(students.map((student) =>
      attendanceKey(date, activeClass, student.id),
    ));
    Object.entries(draftAttendance).forEach(([key, status]) => {
      if (currentKeys.has(key)) updates[key] = status;
    });

    if (!Object.keys(updates).length) {
      setNotice("Mark attendance for at least one student before saving.");
      return;
    }

    setSavedAttendance((current) => ({ ...current, ...updates }));
    setDraftAttendance((current) => {
      const remaining = { ...current };
      currentKeys.forEach((key) => delete remaining[key]);
      return remaining;
    });
    setNotice(`Attendance saved for ${activeClass} on ${date}.`);
  };

  const exportAttendance = () => {
    downloadCsv(`attendance-${activeClass}-${date}.csv`, [
      ["Student ID", "Student", "Class", "Date", "Attendance"],
      ...students.map((student) => [
        student.id,
        student.name,
        activeClass,
        date,
        getStatus(student),
      ]),
    ]);
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Attendance</h1>
        <p className="mt-2 text-sm text-gray-600">
          Take and save attendance by class and date.
        </p>
      </section>

      {persistenceError && (
        <p role="alert" className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          {persistenceError}
        </p>
      )}
      {notice && (
        <p role="status" className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
          {notice}
        </p>
      )}

      <section className="grid gap-4 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Class</span>
          <select
            value={activeClass}
            onChange={(event) => setSelectedClass(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          >
            {classes.length ? classes.map((className) => <option key={className}>{className}</option>) : (
              <option value="">No classes available</option>
            )}
          </select>
        </label>
        <label className="flex items-center gap-3 rounded-xl border border-gray-300 px-4 py-3">
          <CalendarDays className="h-4 w-4 text-gray-500" />
          <span className="sr-only">Attendance date</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Present", counts.Present, "text-green-700"],
          ["Absent", counts.Absent, "text-red-700"],
          ["Late", counts.Late, "text-amber-700"],
          ["Excused", counts.Excused, "text-blue-700"],
          ["Unmarked", counts.Unmarked, "text-gray-600"],
        ].map(([label, count, color]) => (
          <div key={label} className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <span className={`text-sm ${color}`}>{label}</span>
            <span className="font-semibold">{count}</span>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-2xl border border-gray-200">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold">{activeClass || "Class roster"}</h2>
            <p className="text-sm text-gray-500">{students.length} students</p>
          </div>
          <button
            type="button"
            onClick={markAllPresent}
            disabled={!students.length}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            Mark all present
          </button>
        </div>
        {students.length ? (
          <div className="divide-y divide-gray-100">
            {students.map((student) => (
              <div key={student.id} className="flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-xs text-gray-500">{student.id}</p>
                </div>
                <label className="flex items-center gap-2">
                  <span className="sr-only">Attendance status for {student.name}</span>
                  <select
                    value={getStatus(student)}
                    onChange={(event) => setStatus(student, event.target.value)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option>Unmarked</option>
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                    <option>Excused</option>
                  </select>
                  {getStatus(student) === "Present" ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : getStatus(student) === "Absent" ? (
                    <XCircle className="h-4 w-4 text-red-600" />
                  ) : null}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="p-8 text-center text-sm text-gray-500">
            No students are assigned to this class.
          </p>
        )}
      </section>

      <section className="flex flex-col justify-end gap-3 sm:flex-row">
        <button
          type="button"
          onClick={exportAttendance}
          disabled={!students.length}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          <Download className="h-4 w-4" /> Export CSV
        </button>
        <button
          type="button"
          onClick={saveAttendance}
          disabled={!students.length}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Save Attendance
        </button>
      </section>
    </div>
  );
};

export default TeacherAttendance;
