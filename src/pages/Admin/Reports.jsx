import React from "react";
import {
  BarChart3,
  Users,
  CreditCard,
  CalendarDays,
  ArrowDownToLine,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const monthlyRevenueData = [
  { label: "Jan", revenue: 180000 },
  { label: "Feb", revenue: 210000 },
  { label: "Mar", revenue: 240000 },
  { label: "Apr", revenue: 260000 },
  { label: "May", revenue: 310000 },
  { label: "Jun", revenue: 360000 },
];

const termRevenueData = [
  { label: "Term 1", revenue: 320000 },
  { label: "Term 2", revenue: 410000 },
  { label: "Term 3", revenue: 470000 },
];

const attendanceData = [
  { day: "Mon", present: 92, absent: 8 },
  { day: "Tue", present: 90, absent: 10 },
  { day: "Wed", present: 94, absent: 6 },
  { day: "Thu", present: 91, absent: 9 },
  { day: "Fri", present: 96, absent: 4 },
];

const formatPercent = (value) => `${value}%`;

const reportRows = [
  {
    name: "Monthly Revenue",
    date: "2026-04-01",
    type: "Finance",
    summary: "Overview of total income received during the month.",
  },
  {
    name: "Term Revenue",
    date: "2026-04-04",
    type: "Finance",
    summary: "Comparison of revenue collected across academic terms.",
  },
  {
    name: "Student Performance",
    date: "2026-04-02",
    type: "Academic",
    summary: "Academic results and progress analysis for enrolled students.",
  },
  {
    name: "Attendance Report",
    date: "2026-04-03",
    type: "Attendance",
    summary: "Daily attendance trends and participation rates.",
  },
];

const formatCsvValue = (value) => {
  const stringValue = String(value ?? "");

  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
};

const AdminReports = () => {
  const [revenueRange, setRevenueRange] = React.useState("Monthly");
  const [selectedReport, setSelectedReport] = React.useState(null);

  const revenueData =
    revenueRange === "Term" ? termRevenueData : monthlyRevenueData;

  const openReportDetails = (report) => {
    setSelectedReport(report);
  };

  const closeReportDetails = () => {
    setSelectedReport(null);
  };

  const handleExportReport = () => {
    const summaryRows = [
      ["Metric", "Value"],
      ["Total Students", "1,250"],
      ["Total Revenue", "₦2.4M"],
      ["Attendance Rate", "92%"],
      ["Avg Performance", "74%"],
    ];

    const csvContent = [
      ...summaryRows.map((row) => row.map(formatCsvValue).join(",")),
      "",
      ["Report", "Date", "Type"].join(","),
      ...reportRows.map((item) =>
        [item.name, item.date, item.type].map(formatCsvValue).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `admin-reports-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Reports & Analytics
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Overview of system performance and statistics
          </p>
        </div>

        {/* EXPORT */}
        <button
          type="button"
          onClick={handleExportReport}
          className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
          <ArrowDownToLine className="w-4 h-4" />
          Export Report
        </button>
      </section>

      {/* SUMMARY CARDS */}
      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <Users className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Students</p>
            <h2 className="text-lg font-semibold">1,250</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h2 className="text-lg font-semibold">₦2.4M</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <CalendarDays className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Attendance Rate</p>
            <h2 className="text-lg font-semibold">92%</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Avg Performance</p>
            <h2 className="text-lg font-semibold">74%</h2>
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* REVENUE OVERVIEW */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>

            <div className="flex rounded-full border border-gray-200 bg-gray-50 p-1">
              {["Monthly", "Term"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRevenueRange(option)}
                  className={`px-3 py-1.5 text-sm rounded-full transition ${
                    revenueRange === option
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#2563eb"
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="95%"
                        stopColor="#2563eb"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                  <XAxis dataKey="label" stroke="#6b7280" />
                  <YAxis
                    stroke="#6b7280"
                    tickFormatter={(value) => `₦${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `₦${Number(value).toLocaleString()}`,
                      "Revenue",
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    fill="url(#revenueGradient)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ATTENDANCE OVERVIEW */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white">
            <div className="flex justify-end gap-3 mb-3 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                Present
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                Absent
              </span>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData}>
                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="4 4" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis
                    stroke="#6b7280"
                    tickFormatter={formatPercent}
                    domain={[0, 100]}
                  />
                  <Tooltip
                    formatter={(value) => [
                      formatPercent(Number(value)),
                      "Attendance",
                    ]}
                  />
                  <Bar
                    dataKey="present"
                    name="Present"
                    fill="#16a34a"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="absent"
                    name="Absent"
                    fill="#ef4444"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* REPORT TABLE */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>

        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
          {/* HEADER */}
          <div className="hidden md:grid grid-cols-4 text-sm text-gray-500 border-b border-gray-200 p-4">
            <span>Report</span>
            <span>Date</span>
            <span>Type</span>
            <span>Action</span>
          </div>

          {/* ROWS */}
          {reportRows.map((item, idx) => (
            <div
              key={idx}
              className="grid md:grid-cols-4 gap-2 p-4 border-b border-gray-100 text-sm items-center"
            >
              <span className="font-medium">{item.name}</span>
              <span>{item.date}</span>
              <span className="text-gray-600">{item.type}</span>

              <button
                type="button"
                onClick={() => openReportDetails(item)}
                className="text-blue-600 text-sm hover:underline text-left"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedReport && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeReportDetails}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">Report Details</p>
                <h3 className="text-xl font-semibold">{selectedReport.name}</h3>
              </div>
              <button
                type="button"
                onClick={closeReportDetails}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close report details"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3 text-sm text-gray-700">
              <div>
                <span className="font-medium text-gray-500">Date:</span>{" "}
                {selectedReport.date}
              </div>
              <div>
                <span className="font-medium text-gray-500">Type:</span>{" "}
                {selectedReport.type}
              </div>
              <div>
                <span className="font-medium text-gray-500">Summary:</span>{" "}
                {selectedReport.summary}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={closeReportDetails}
                className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
