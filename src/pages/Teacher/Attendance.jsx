import React, { useState } from "react";
import {
  CalendarDays,
  Users,
  CheckCircle,
  XCircle,
  Save,
} from "lucide-react";

const studentsData = [
  { name: "John Doe", status: "Present" },
  { name: "Aisha Bello", status: "Absent" },
  { name: "Michael James", status: "Present" },
];

const TeacherAttendance = () => {
  const [students, setStudents] = useState(studentsData);
  const [selectedClass, setSelectedClass] = useState("SS2");
  const [date, setDate] = useState("");

  const toggleStatus = (index) => {
    const updated = [...students];
    updated[index].status =
      updated[index].status === "Present" ? "Absent" : "Present";
    setStudents(updated);
  };

  const presentCount = students.filter(s => s.status === "Present").length;
  const absentCount = students.length - presentCount;

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Attendance
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Mark and manage student attendance
        </p>
      </section>

      {/* CONTROLS */}
      <section className="grid gap-4 sm:grid-cols-2">

        {/* CLASS SELECT */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <Users className="w-4 h-4 text-gray-500 mr-2" />
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          >
            <option>SS2</option>
            <option>SS1</option>
            <option>JSS3</option>
          </select>
        </div>

        {/* DATE */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <CalendarDays className="w-4 h-4 text-gray-500 mr-2" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>

      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2">

        <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm">
            Present: {presentCount}
          </span>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-600" />
          <span className="text-sm">
            Absent: {absentCount}
          </span>
        </div>

      </section>

      {/* STUDENT LIST */}
      <section className="space-y-3">
        {students.map((student, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
          >
            <span className="text-sm font-medium">
              {student.name}
            </span>

            <button
              onClick={() => toggleStatus(idx)}
              className={`flex items-center gap-1 text-sm ${
                student.status === "Present"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {student.status === "Present" ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Present
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  Absent
                </>
              )}
            </button>
          </div>
        ))}
      </section>

      {/* SAVE BUTTON */}
      <section className="flex justify-end">
        <button className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          <Save className="w-4 h-4" />
          Save Attendance
        </button>
      </section>

    </div>
  );
};

export default TeacherAttendance;