import React from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  UserPlus,
  PlusCircle,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Students",
      value: 1250,
      icon: <Users className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Teachers",
      value: 75,
      icon: <GraduationCap className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Courses",
      value: 48,
      icon: <BookOpen className="w-5 h-5 text-purple-600" />,
    },
    {
      title: "Revenue",
      value: "₦2.4M",
      icon: <CreditCard className="w-5 h-5 text-orange-600" />,
    },
  ];

  const actions = [
    {
      title: "Add Student",
      icon: <UserPlus className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Add Teacher",
      icon: <UserPlus className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Create Course",
      icon: <PlusCircle className="w-5 h-5 text-purple-600" />,
    },
    {
      title: "Post Announcement",
      icon: <Megaphone className="w-5 h-5 text-orange-600" />,
    },
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Overview of system activities
        </p>
      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center gap-4"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full">
              {item.icon}
            </div>

            <div>
              <p className="text-sm text-gray-500">
                {item.title}
              </p>
              <h2 className="text-lg font-semibold">
                {item.value}
              </h2>
            </div>
          </div>
        ))}
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className="border border-gray-200 rounded-2xl p-5 bg-white flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                {action.icon}
                <span className="text-sm font-medium">
                  {action.title}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>
          ))}
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="grid gap-6 lg:grid-cols-2">
        
        {/* RECENT ACTIVITY */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Recent Activity
          </h2>

          <div className="border border-gray-200 rounded-2xl bg-white divide-y">
            <div className="p-4 text-sm text-gray-700">
              New student registered
              <span className="block text-xs text-gray-500">
                2 minutes ago
              </span>
            </div>

            <div className="p-4 text-sm text-gray-700">
              Course “Mathematics” updated
              <span className="block text-xs text-gray-500">
                1 hour ago
              </span>
            </div>

            <div className="p-4 text-sm text-gray-700">
              Payment received (₦50,000)
              <span className="block text-xs text-gray-500">
                Today
              </span>
            </div>
          </div>
        </div>

        {/* ANNOUNCEMENTS */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Announcements
          </h2>

          <div className="border border-gray-200 rounded-2xl bg-white divide-y">
            <div className="p-4 text-sm text-gray-700">
              School resumes next Monday
            </div>

            <div className="p-4 text-sm text-gray-700">
              Staff meeting scheduled for Friday
            </div>

            <div className="p-4 text-sm text-gray-700">
              Exams timetable released
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};

export default AdminDashboard;