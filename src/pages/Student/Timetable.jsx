import React from "react";
import { CalendarDays } from "lucide-react";

const timetableData = [
  {
    time: "08:00 - 09:00",
    monday: "Mathematics",
    tuesday: "English",
    wednesday: "Physics",
    thursday: "Chemistry",
    friday: "Biology",
  },
  {
    time: "09:00 - 10:00",
    monday: "Physics",
    tuesday: "Mathematics",
    wednesday: "English",
    thursday: "Biology",
    friday: "Chemistry",
  },
  {
    time: "10:00 - 11:00",
    monday: "Break",
    tuesday: "Break",
    wednesday: "Break",
    thursday: "Break",
    friday: "Break",
  },
  {
    time: "11:00 - 12:00",
    monday: "Chemistry",
    tuesday: "Biology",
    wednesday: "Mathematics",
    thursday: "English",
    friday: "Physics",
  },
];

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
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Timetable
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Your weekly class schedule
        </p>
      </section>

      {/* TABLE */}
      <section className="border border-gray-200 rounded-2xl bg-white overflow-x-auto">
        
        {/* HEADER ROW */}
        <div className="min-w-[700px] grid grid-cols-6 border-b border-gray-200 text-sm text-gray-500">
          <div className="p-4 flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            Time
          </div>
          <div className="p-4">Mon</div>
          <div className="p-4">Tue</div>
          <div className="p-4">Wed</div>
          <div className="p-4">Thu</div>
          <div className="p-4">Fri</div>
        </div>

        {/* BODY */}
        {timetableData.map((row, idx) => (
          <div
            key={idx}
            className="min-w-[700px] grid grid-cols-6 border-b border-gray-100 text-sm"
          >
            {/* TIME */}
            <div className="p-4 text-gray-600">
              {row.time}
            </div>

            {/* DAYS */}
            {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
              (day, i) => (
                <div key={i} className="p-4">
                  <div
                    className={`px-3 py-1 rounded-full text-xs text-center ${getColor(
                      row[day]
                    )}`}
                  >
                    {row[day]}
                  </div>
                </div>
              )
            )}
          </div>
        ))}

      </section>

    </div>
  );
};

export default StudentTimetable;