import React, { useState, useMemo } from "react";

import {
  Users,
  GraduationCap,
  Wallet,
  TrendingUp,
  CalendarCheck,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

const termChartData = [
  { term: "Term 1", students: 1800 },
  { term: "Term 2", students: 2200 },
  { term: "Term 3", students: 2600 },
];

const revenueData = [
  { month: "Jan", revenue: 200000 },
  { month: "Feb", revenue: 400000 },
  { month: "Mar", revenue: 300000 },
  { month: "Apr", revenue: 500000 },
  { month: "May", revenue: 700000 },
];

const AdminAnalyticsDashboard = () => {
  const [timeframe, setTimeframe] = useState("Term");

  const yearlyData = useMemo(() => {
    return [
      { year: "2023", students: 5400 },
      { year: "2024", students: 6600 },
      { year: "2025", students: 7800 },
      { year: "2026", students: 9000 },
    ];
  }, []);

  const chartData = useMemo(() => {
    return timeframe === "Yearly" ? yearlyData : termChartData;
  }, [timeframe, yearlyData]);

  const xKey = timeframe === "Yearly" ? "year" : "term";
  return (
    <div className="space-y-10">
      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Analytics Dashboard
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Monitor school performance and analytics
        </p>
      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {/* STUDENTS */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="w-4 h-4 text-blue-600" />
            Students
          </div>

          <h2 className="text-2xl font-semibold mt-3">2,540</h2>
        </div>

        {/* TEACHERS */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <GraduationCap className="w-4 h-4 text-green-600" />
            Teachers
          </div>

          <h2 className="text-2xl font-semibold mt-3">120</h2>
        </div>

        {/* REVENUE */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Wallet className="w-4 h-4 text-purple-600" />
            Revenue
          </div>

          <h2 className="text-2xl font-semibold mt-3">₦25.4M</h2>
        </div>

        {/* ATTENDANCE */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarCheck className="w-4 h-4 text-orange-600" />
            Attendance
          </div>

          <h2 className="text-2xl font-semibold mt-3">94%</h2>
        </div>

        {/* GROWTH */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4 text-pink-600" />
            Growth
          </div>

          <h2 className="text-2xl font-semibold mt-3">+18%</h2>
        </div>
      </section>

      {/* CHARTS */}
      <section className="grid gap-6 xl:grid-cols-2">
        {/* STUDENT PERFORMANCE */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-white">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Student Growth</h2>

              <p className="text-sm text-gray-500 mt-1">
                {timeframe === "Term"
                  ? "Student registration by term"
                  : "Student registration by year"}
              </p>
            </div>

            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-transparent text-sm outline-none"
                aria-label="Select timeframe"
              >
                <option value="Term">Term</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="w-full h-[340px] rounded-3xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey={xKey}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748B", fontSize: 12 }}
                  width={35}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#4F46E5"
                  strokeWidth={4}
                  dot={{ r: 4, fill: "#4F46E5" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* REVENUE CHART */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-white">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">Revenue Analytics</h2>

            <p className="text-sm text-gray-500 mt-1">
              Monthly financial performance
            </p>
          </div>

          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <Tooltip />

                <Bar dataKey="revenue" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* QUICK REPORTS */}
      <section className="grid gap-4 lg:grid-cols-3">
        {/* TOP CLASS */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <h2 className="text-sm text-gray-500">Best Performing Class</h2>

          <h3 className="text-xl font-semibold mt-3">SS3 Science</h3>

          <p className="text-sm text-green-600 mt-2">
            +12% performance increase
          </p>
        </div>

        {/* LOW ATTENDANCE */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <h2 className="text-sm text-gray-500">Lowest Attendance</h2>

          <h3 className="text-xl font-semibold mt-3">JSS1 Gold</h3>

          <p className="text-sm text-red-600 mt-2">68% attendance rate</p>
        </div>

        {/* TOTAL STAFF */}
        <div className="border border-gray-200 rounded-2xl p-5">
          <h2 className="text-sm text-gray-500">Active Staff</h2>

          <h3 className="text-xl font-semibold mt-3">148 Staff</h3>

          <p className="text-sm text-blue-600 mt-2">Across all departments</p>
        </div>
      </section>
    </div>
  );
};

export default AdminAnalyticsDashboard;
