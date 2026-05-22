import React from "react";
import {
  CalendarCheck,
  Search,
  CheckCircle,
  XCircle,
  Clock3,
  Filter,
} from "lucide-react";

const attendanceRecords = [
  {
    id: 1,
    name: "John Doe",
    role: "Student",
    class: "SS2",
    date: "2026-05-20",
    status: "Present",
  },
  {
    id: 2,
    name: "Mrs. Grace",
    role: "Teacher",
    class: "Physics Dept.",
    date: "2026-05-20",
    status: "Absent",
  },
  {
    id: 3,
    name: "Sarah James",
    role: "Student",
    class: "JSS3",
    date: "2026-05-20",
    status: "Late",
  },
];

const AdminAttendancePage = () => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Present":
        return {
          icon: (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ),
          style:
            "border-green-200 bg-green-50 text-green-600",
        };

      case "Absent":
        return {
          icon: (
            <XCircle className="w-4 h-4 text-red-600" />
          ),
          style:
            "border-red-200 bg-red-50 text-red-600",
        };

      case "Late":
        return {
          icon: (
            <Clock3 className="w-4 h-4 text-orange-600" />
          ),
          style:
            "border-orange-200 bg-orange-50 text-orange-600",
        };

      default:
        return {};
    }
  };

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Attendance Management
          </h1>

          <p className="text-sm text-gray-600 mt-2">
            Monitor attendance records for students and teachers
          </p>
        </div>

      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* TOTAL */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CalendarCheck className="w-4 h-4 text-blue-600" />
            Total Records
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            1,250
          </h2>

        </div>

        {/* PRESENT */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Present
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            1,100
          </h2>

        </div>

        {/* ABSENT */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <XCircle className="w-4 h-4 text-red-600" />
            Absent
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            90
          </h2>

        </div>

        {/* LATE */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock3 className="w-4 h-4 text-orange-600" />
            Late
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            60
          </h2>

        </div>

      </section>

      {/* SEARCH + FILTER */}
      <section className="flex flex-col lg:flex-row gap-4">

        {/* SEARCH */}
        <div className="flex-1 flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white">

          <Search className="w-4 h-4 text-gray-500 mr-2" />

          <input
            type="text"
            placeholder="Search attendance..."
            className="w-full outline-none text-sm bg-transparent"
          />

        </div>

        {/* FILTER */}
        <button className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded-2xl text-sm hover:bg-gray-50 transition">
          <Filter className="w-4 h-4" />
          Filter
        </button>

      </section>

      {/* RECORDS */}
      <section className="space-y-4">

        {attendanceRecords.map((item) => {
          const statusData = getStatusStyle(item.status);

          return (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl p-5 bg-white"
            >
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                {/* LEFT */}
                <div className="space-y-3">

                  <h2 className="font-semibold text-lg">
                    {item.name}
                  </h2>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">

                    <span>
                      {item.role}
                    </span>

                    <span>
                      {item.class}
                    </span>

                    <span>
                      {item.date}
                    </span>

                  </div>

                </div>

                {/* STATUS */}
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm w-fit ${statusData.style}`}
                >
                  {statusData.icon}
                  {item.status}
                </div>

              </div>
            </div>
          );
        })}

      </section>

      {/* EMPTY STATE */}
      {attendanceRecords.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No attendance records available.
        </div>
      )}

    </div>
  );
};

export default AdminAttendancePage;