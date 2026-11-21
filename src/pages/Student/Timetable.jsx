import React, { useMemo, useState } from "react";
import { CalendarDays, Download } from "lucide-react";
import downloadCsv from "../../utils/downloadCsv";
import { timetableData, weekdays } from "../../data/studentPortal";

const getColor = (subject) => {
  if (subject === "Break") return "bg-gray-100 text-gray-500";
  if (subject === "Mathematics") return "bg-blue-50 text-blue-600";
  if (subject === "Physics") return "bg-green-50 text-green-600";
  if (subject === "Chemistry") return "bg-purple-50 text-purple-600";
  if (subject === "Biology") return "bg-pink-50 text-pink-600";
  if (subject === "English") return "bg-orange-50 text-orange-600";
  return "bg-gray-50 text-gray-600";
};

const StudentTimetable = () => {
  const todayKey = weekdays[new Date().getDay() - 1]?.key;
  const [selectedDay, setSelectedDay] = useState("all");
  const visibleDays = useMemo(
    () => selectedDay === "all" ? weekdays : weekdays.filter((day) => day.key === selectedDay),
    [selectedDay],
  );
  const exportTimetable = () => {
    downloadCsv("student-timetable.csv", [
      ["Time", ...visibleDays.map((day) => day.label)],
      ...timetableData.map((row) => [row.time, ...visibleDays.map((day) => row[day.key])]),
    ]);
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">Timetable</h1>
          <p className="text-sm text-gray-600 mt-2">Your weekly class schedule</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm">
            <span className="text-gray-600">View</span>
            <select
              value={selectedDay}
              onChange={(event) => setSelectedDay(event.target.value)}
              className="bg-transparent outline-none"
            >
              <option value="all">Full week</option>
              {weekdays.map((day) => <option key={day.key} value={day.key}>{day.label}</option>)}
            </select>
          </label>
          <button
            type="button"
            onClick={exportTimetable}
            className="flex items-center gap-2 rounded-xl border border-blue-600 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50"
          >
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </section>

      {/* TABLE */}
      <section className="border border-gray-200 rounded-2xl bg-white overflow-x-auto">
        
        {/* HEADER ROW */}
        <div
          className="grid border-b border-gray-200 text-sm text-gray-500"
          style={{ minWidth: selectedDay === "all" ? "700px" : "320px", gridTemplateColumns: `repeat(${visibleDays.length + 1}, minmax(0, 1fr))` }}
        >
          <div className="p-4 flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Time
          </div>
          {visibleDays.map((day) => (
            <div key={day.key} className={`p-4 ${day.key === todayKey ? "font-semibold text-blue-600" : ""}`}>
              {day.shortLabel}
              {day.key === todayKey && <span className="sr-only">, today</span>}
            </div>
          ))}
        </div>

        {/* BODY */}
        {timetableData.map((row, idx) => (
          <div
            key={idx}
            className="grid border-b border-gray-100 text-sm"
            style={{ minWidth: selectedDay === "all" ? "700px" : "320px", gridTemplateColumns: `repeat(${visibleDays.length + 1}, minmax(0, 1fr))` }}
          >
            {/* TIME */}
            <div className="p-4 text-gray-600">
              {row.time}
            </div>

            {/* DAYS */}
            {visibleDays.map((day) => (
                <div key={day.key} className="p-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs text-center ${getColor(row[day.key])}`}
                  >
                    {row[day.key]}
                  </div>
                </div>
            ))}
          </div>
        ))}

      </section>

    </div>
  );
};

export default StudentTimetable;