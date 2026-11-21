import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Download,
} from "lucide-react";
import { attendanceData, getAttendanceSummary } from "../../data/studentPortal";
import downloadCsv from "../../utils/downloadCsv";

const StudentAttendance = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const summary = getAttendanceSummary(attendanceData);
  const filteredAttendance = useMemo(() => {
    const query = search.trim().toLowerCase();
    return attendanceData.filter((item) => {
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesSearch = `${item.date} ${item.status}`.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter]);
  const exportAttendance = () => downloadCsv("student-attendance.csv", [
    ["Date", "Status"],
    ...filteredAttendance.map((item) => [item.date, item.status]),
  ]);

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
            <h2 className="text-lg font-semibold">{summary.attendanceRate}%</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Present</p>
            <h2 className="text-lg font-semibold">{summary.present}</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <XCircle className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Absent</p>
            <h2 className="text-lg font-semibold">{summary.absent}</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <Clock className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Late</p>
            <h2 className="text-lg font-semibold">{summary.late}</h2>
          </div>
        </div>

      </section>

      {/* ATTENDANCE LIST */}
      <section>
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">Attendance Records</h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredAttendance.length} of {summary.total} records
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="rounded-xl border border-gray-300 px-3 py-2">
              <span className="sr-only">Search attendance records</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search date or status"
                className="w-full text-sm outline-none"
              />
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm">
              <span className="text-gray-600">Status</span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="bg-transparent outline-none"
              >
                {["All", "Present", "Absent", "Late"].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={exportAttendance}
              disabled={filteredAttendance.length === 0}
              className="flex items-center justify-center gap-2 rounded-xl border border-blue-600 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl bg-white divide-y">
          {filteredAttendance.map((item) => (
            <div
              key={item.date}
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
          {filteredAttendance.length === 0 && (
            <p className="p-6 text-center text-sm text-gray-500">
              No attendance records match your filters.
            </p>
          )}
        </div>
      </section>

    </div>
  );
};

export default StudentAttendance;