import React from "react";
import {
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
} from "lucide-react";

const attendanceData = [
  { date: "2026-04-01", status: "Present" },
  { date: "2026-04-02", status: "Absent" },
  { date: "2026-04-03", status: "Late" },
  { date: "2026-04-04", status: "Present" },
  { date: "2026-04-05", status: "Present" },
];

const StudentAttendance = () => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Present":
        return "text-green-600";
      case "Absent":
        return "text-red-600";
      case "Late":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Absent":
        return <XCircle className="w-4 h-4 text-red-600" />;
      case "Late":
        return <Clock className="w-4 h-4 text-orange-600" />;
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
          Track your attendance records
        </p>
      </section>

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        
        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Attendance</p>
            <h2 className="text-lg font-semibold">92%</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Present</p>
            <h2 className="text-lg font-semibold">18</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Absent</p>
            <h2 className="text-lg font-semibold">2</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <Clock className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Late</p>
            <h2 className="text-lg font-semibold">1</h2>
          </div>
        </div>

      </section>

      {/* ATTENDANCE LIST */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Attendance Records
        </h2>

        <div className="border border-gray-200 rounded-2xl bg-white divide-y">
          {attendanceData.map((item, idx) => (
            <div
              key={idx}
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              {/* DATE */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CalendarDays className="w-4 h-4" />
                {item.date}
              </div>

              {/* STATUS */}
              <div
                className={`flex items-center gap-2 text-sm ${getStatusStyle(
                  item.status
                )}`}
              >
                {getStatusIcon(item.status)}
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default StudentAttendance;