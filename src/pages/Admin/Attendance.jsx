import React, { useMemo, useState } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Present":
        return {
          icon: <CheckCircle className="w-4 h-4 text-green-600" />,
          style: "border-green-200 bg-green-50 text-green-600",
        };

      case "Absent":
        return {
          icon: <XCircle className="w-4 h-4 text-red-600" />,
          style: "border-red-200 bg-red-50 text-red-600",
        };

      case "Late":
        return {
          icon: <Clock3 className="w-4 h-4 text-orange-600" />,
          style: "border-orange-200 bg-orange-50 text-orange-600",
        };

      default:
        return {};
    }
  };

  const totalRecords = attendanceRecords.length;
  const presentCount = attendanceRecords.filter(
    (record) => record.status === "Present",
  ).length;
  const absentCount = attendanceRecords.filter(
    (record) => record.status === "Absent",
  ).length;
  const lateCount = attendanceRecords.filter(
    (record) => record.status === "Late",
  ).length;

  const filteredRecords = useMemo(() => {
    const searchValue = activeSearchTerm.trim().toLowerCase();

    return attendanceRecords.filter((record) => {
      const matchesStatus =
        selectedStatus === "All" || record.status === selectedStatus;
      const matchesSearch =
        searchValue.length === 0 ||
        [record.name, record.role, record.class, record.date, record.status]
          .join(" ")
          .toLowerCase()
          .includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [activeSearchTerm, selectedStatus]);

  const handleSearch = () => {
    setActiveSearchTerm(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setActiveSearchTerm("");
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

          <h2 className="text-2xl font-semibold mt-3">{totalRecords}</h2>
        </div>

        {/* PRESENT */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <CheckCircle className="w-4 h-4 text-green-600" />
            Present
          </div>

          <h2 className="text-2xl font-semibold mt-3">{presentCount}</h2>
        </div>

        {/* ABSENT */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <XCircle className="w-4 h-4 text-red-600" />
            Absent
          </div>

          <h2 className="text-2xl font-semibold mt-3">{absentCount}</h2>
        </div>

        {/* LATE */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock3 className="w-4 h-4 text-orange-600" />
            Late
          </div>

          <h2 className="text-2xl font-semibold mt-3">{lateCount}</h2>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="flex flex-col lg:flex-row gap-4">
        {/* SEARCH */}
        <div className="flex-1 flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white">
          <button
            type="button"
            onClick={handleSearch}
            className="mr-2 text-gray-500 hover:text-blue-600 transition"
          >
            <Search className="w-4 h-4" />
          </button>

          <input
            type="text"
            placeholder="Search attendance..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full outline-none text-sm bg-transparent"
          />

          {activeSearchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="ml-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* FILTER */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 rounded-2xl text-sm hover:bg-gray-50 transition"
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>

          {showFilters && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg z-10">
              <p className="text-xs font-medium text-gray-500 mb-2">Status</p>
              <div className="space-y-1">
                {["All", "Present", "Absent", "Late"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setSelectedStatus(status);
                      setShowFilters(false);
                    }}
                    className={`w-full text-left rounded-xl px-3 py-2 text-sm transition ${
                      selectedStatus === status
                        ? "bg-blue-50 text-blue-600"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* RECORDS */}
      <section className="space-y-4">
        {filteredRecords.map((item) => {
          const statusData = getStatusStyle(item.status);

          return (
            <div
              key={item.id}
              className="border border-gray-200 rounded-2xl p-5 bg-white"
            >
              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
                {/* LEFT */}
                <div className="space-y-3">
                  <h2 className="font-semibold text-lg">{item.name}</h2>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span>{item.role}</span>

                    <span>{item.class}</span>

                    <span>{item.date}</span>
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
      {filteredRecords.length === 0 && (
        <div className="text-center text-sm text-gray-500">
          No attendance records match your search or selected filters.
        </div>
      )}
    </div>
  );
};

export default AdminAttendancePage;
