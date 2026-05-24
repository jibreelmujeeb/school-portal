import React from "react";

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
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const performanceData = [
  { month: "Jan", students: 400 },
  { month: "Feb", students: 600 },
  { month: "Mar", students: 800 },
  { month: "Apr", students: 700 },
  { month: "May", students: 950 },
];

const revenueData = [
  { month: "Jan", revenue: 200000 },
  { month: "Feb", revenue: 400000 },
  { month: "Mar", revenue: 300000 },
  { month: "Apr", revenue: 500000 },
  { month: "May", revenue: 700000 },
];

const AdminAnalyticsDashboard = () => {
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

          <h2 className="text-2xl font-semibold mt-3">
            2,540
          </h2>

        </div>

        {/* TEACHERS */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <GraduationCap className="w-4 h-4 text-green-600" />
            Teachers
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            120
          </h2>

        </div>

        {/* REVENUE */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Wallet className="w-4 h-4 text-purple-600" />
            Revenue
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            ₦25.4M
          </h2>

        </div>

        {/* ATTENDANCE */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarCheck className="w-4 h-4 text-orange-600" />
            Attendance
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            94%
          </h2>

        </div>

        {/* GROWTH */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <TrendingUp className="w-4 h-4 text-pink-600" />
            Growth
          </div>

          <h2 className="text-2xl font-semibold mt-3">
            +18%
          </h2>

        </div>

      </section>

      {/* CHARTS */}
      <section className="grid gap-6 xl:grid-cols-2">

        {/* STUDENT PERFORMANCE */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-white">

          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Student Growth
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Monthly student registration growth
            </p>
          </div>

          <div className="w-full h-[300px]">

            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <XAxis dataKey="month" />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="students"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

        </div>

        {/* REVENUE CHART */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-white">

          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Revenue Analytics
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Monthly financial performance
            </p>
          </div>

          <div className="w-full h-[300px]">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <Tooltip />

                <Bar
                  dataKey="revenue"
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>

      </section>

      {/* QUICK REPORTS */}
      <section className="grid gap-4 lg:grid-cols-3">

        {/* TOP CLASS */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <h2 className="text-sm text-gray-500">
            Best Performing Class
          </h2>

          <h3 className="text-xl font-semibold mt-3">
            SS3 Science
          </h3>

          <p className="text-sm text-green-600 mt-2">
            +12% performance increase
          </p>

        </div>

        {/* LOW ATTENDANCE */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <h2 className="text-sm text-gray-500">
            Lowest Attendance
          </h2>

          <h3 className="text-xl font-semibold mt-3">
            JSS1 Gold
          </h3>

          <p className="text-sm text-red-600 mt-2">
            68% attendance rate
          </p>

        </div>

        {/* TOTAL STAFF */}
        <div className="border border-gray-200 rounded-2xl p-5">

          <h2 className="text-sm text-gray-500">
            Active Staff
          </h2>

          <h3 className="text-xl font-semibold mt-3">
            148 Staff
          </h3>

          <p className="text-sm text-blue-600 mt-2">
            Across all departments
          </p>

        </div>

      </section>

    </div>
  );
};

export default AdminAnalyticsDashboard;