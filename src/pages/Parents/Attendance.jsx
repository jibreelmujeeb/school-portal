import React from "react";
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock3,
} from "lucide-react";

const attendanceData = [
  {
    date: "2026-05-01",
    status: "Present",
  },
  {
    date: "2026-05-02",
    status: "Absent",
  },
  {
    date: "2026-05-03",
    status: "Late",
  },
  {
    date: "2026-05-04",
    status: "Present",
  },
];

const ParentAttendancePage = () => {
  const totalDays = attendanceData.length;

  const presentDays = attendanceData.filter(
    (item) => item.status === "Present"
  ).length;

  const attendanceRate = (
    (presentDays / totalDays) * 100
  ).toFixed(0);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return (
          <CheckCircle className="w-4 h-4 text-green-600" />
        );

      case "Absent":
        return (
          <XCircle className="w-4 h-4 text-red-600" />
        );

      case "Late":
        return (
          <Clock3 className="w-4 h-4 text-orange-600" />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Attendance
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Track your child’s school attendance
        </p>
      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-3">

        {/* TOTAL DAYS */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            School Days
          </p>

          <h2 className="text-2xl font-semibold mt-2">
            {totalDays}
          </h2>
        </div>

        {/* PRESENT */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Days Present
          </p>

          <h2 className="text-2xl font-semibold mt-2 text-green-600">
            {presentDays}
          </h2>
        </div>

        {/* RATE */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <p className="text-sm text-gray-500">
            Attendance Rate
          </p>

          <h2 className="text-2xl font-semibold mt-2 text-blue-600">
            {attendanceRate}%
          </h2>
        </div>

      </section>

      {/* ATTENDANCE LIST */}
      <section className="border border-gray-200 rounded-2xl overflow-hidden bg-white">

        {/* TABLE HEADER */}
        <div className="hidden md:grid grid-cols-3 p-4 border-b border-gray-200 text-sm text-gray-500">
          <span>Date</span>
          <span>Status</span>
          <span>Remark</span>
        </div>

        {/* TABLE BODY */}
        {attendanceData.map((item, idx) => (
          <div
            key={idx}
            className="grid md:grid-cols-3 gap-2 p-4 border-b border-gray-100 text-sm items-center"
          >
            {/* DATE */}
            <div className="flex items-center gap-2 font-medium">
              <CalendarCheck className="w-4 h-4 text-blue-600" />
              {item.date}
            </div>

            {/* STATUS */}
            <div className="flex items-center gap-2">
              {getStatusIcon(item.status)}

              <span>{item.status}</span>
            </div>

            {/* REMARK */}
            <span className="text-gray-500">
              {item.status === "Present" &&
                "Attended classes"}

              {item.status === "Absent" &&
                "Absent from school"}

              {item.status === "Late" &&
                "Arrived late"}
            </span>
          </div>
        ))}

      </section>

      {/* NOTICE */}
      <section className="border border-blue-200 bg-blue-50 rounded-2xl p-4">
        <p className="text-sm text-blue-700">
          Regular attendance improves academic performance and class participation.
        </p>
      </section>

    </div>
    
  );
};

export default ParentAttendancePage;