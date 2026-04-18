import React from "react";
import {
  BarChart3,
  Users,
  CreditCard,
  CalendarDays,
  ArrowDownToLine,
} from "lucide-react";
const AdminReports = () => {
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
        <button className="flex items-center gap-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
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
        
        {/* CHART PLACEHOLDER */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Revenue Overview
          </h2>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white text-sm text-gray-500 text-center">
            Chart goes here (Recharts)
          </div>
        </div>

        {/* ATTENDANCE OVERVIEW */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Attendance Overview
          </h2>

          <div className="border border-gray-200 rounded-2xl p-6 bg-white text-sm text-gray-500 text-center">
            Chart goes here (Recharts)
          </div>
        </div>

      </section>

      {/* REPORT TABLE */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Recent Reports
        </h2>

        <div className="border border-gray-200 rounded-2xl bg-white overflow-hidden">
          
          {/* HEADER */}
          <div className="hidden md:grid grid-cols-4 text-sm text-gray-500 border-b border-gray-200 p-4">
            <span>Report</span>
            <span>Date</span>
            <span>Type</span>
            <span>Action</span>
          </div>

          {/* ROWS */}
          {[
            { name: "Monthly Revenue", date: "2026-04-01", type: "Finance" },
            { name: "Student Performance", date: "2026-04-02", type: "Academic" },
            { name: "Attendance Report", date: "2026-04-03", type: "Attendance" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="grid md:grid-cols-4 gap-2 p-4 border-b border-gray-100 text-sm items-center"
            >
              <span className="font-medium">{item.name}</span>
              <span>{item.date}</span>
              <span className="text-gray-600">{item.type}</span>

              <button className="text-blue-600 text-sm hover:underline">
                View
              </button>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
};

export default AdminReports;