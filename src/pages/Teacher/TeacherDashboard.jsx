import React from "react";
import {
  Users,
  BookOpen,
  ClipboardList,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const TeacherDashboard = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Welcome back, manage your classes and activities
        </p>
      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3">
          <Users className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">My Classes</p>
            <h2 className="text-lg font-semibold">3</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Subjects</p>
            <h2 className="text-lg font-semibold">5</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Assignments</p>
            <h2 className="text-lg font-semibold">12</h2>
          </div>
        </div>

        <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3">
          <Megaphone className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Announcements</p>
            <h2 className="text-lg font-semibold">4</h2>
          </div>
        </div>

      </section>

      {/* MAIN GRID */}
      <section className="grid gap-6 lg:grid-cols-2">

        {/* MY CLASSES */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            My Classes
          </h2>

          <div className="space-y-3">
            {["SS2", "JSS3", "SS1"].map((cls, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">{cls}</span>
                </div>

                <button className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                  View <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ANNOUNCEMENTS */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Recent Announcements
          </h2>

          <div className="space-y-3">
            {[
              "Submit assignment before Friday",
              "Staff meeting tomorrow",
              "Exam schedule released",
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-4 flex items-start gap-2"
              >
                <Megaphone className="w-4 h-4 text-blue-600 mt-1" />
                <p className="text-sm text-gray-600">{item}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <button className="border border-gray-200 rounded-xl p-4 text-sm flex items-center gap-2 hover:bg-gray-50">
            <ClipboardList className="w-4 h-4" />
            Create Assignment
          </button>

          <button className="border border-gray-200 rounded-xl p-4 text-sm flex items-center gap-2 hover:bg-gray-50">
            <BookOpen className="w-4 h-4" />
            Manage Subjects
          </button>

          <button className="border border-gray-200 rounded-xl p-4 text-sm flex items-center gap-2 hover:bg-gray-50">
            <Users className="w-4 h-4" />
            View Students
          </button>

          <button className="border border-gray-200 rounded-xl p-4 text-sm flex items-center gap-2 hover:bg-gray-50">
            <Megaphone className="w-4 h-4" />
            Post Announcement
          </button>

        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;