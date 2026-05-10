import React from "react";
import {
  User,
  CreditCard,
  ClipboardList,
  CalendarCheck,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const ParentDashboard = () => {
  return (
    <div className="space-y-10">

      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Parent Dashboard
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          Monitor your child’s academic activities
        </p>
      </section>

      {/* STUDENT CARD */}
      <section className="border border-gray-200 rounded-2xl p-5 bg-white flex flex-col sm:flex-row items-center justify-between gap-5">

        <div className="flex items-center gap-4">
          
          {/* AVATAR */}
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <User className="w-7 h-7 text-gray-500" />
          </div>

          {/* INFO */}
          <div>
            <h2 className="font-semibold text-lg">
              John Doe
            </h2>

            <p className="text-sm text-gray-500">
              Class: SS2
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Admission No: STD1023
            </p>
          </div>
        </div>

        {/* VIEW PROFILE */}
        <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition">
          View Profile
          <ArrowRight className="w-4 h-4" />
        </button>

      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* ATTENDANCE */}
        <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3">
          <CalendarCheck className="w-5 h-5 text-green-600" />

          <div>
            <p className="text-sm text-gray-500">
              Attendance
            </p>

            <h2 className="text-lg font-semibold">
              92%
            </h2>
          </div>
        </div>

        {/* FEES */}
        <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-orange-600" />

          <div>
            <p className="text-sm text-gray-500">
              Fees Status
            </p>

            <h2 className="text-lg font-semibold">
              Pending
            </h2>
          </div>
        </div>

        {/* ASSIGNMENTS */}
        <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3">
          <ClipboardList className="w-5 h-5 text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">
              Assignments
            </p>

            <h2 className="text-lg font-semibold">
              5
            </h2>
          </div>
        </div>

        {/* ANNOUNCEMENTS */}
        <div className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3">
          <Megaphone className="w-5 h-5 text-purple-600" />

          <div>
            <p className="text-sm text-gray-500">
              Announcements
            </p>

            <h2 className="text-lg font-semibold">
              3
            </h2>
          </div>
        </div>

      </section>

      {/* MAIN GRID */}
      <section className="grid gap-6 lg:grid-cols-2">

        {/* RECENT RESULTS */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Recent Results
          </h2>

          <div className="space-y-3">

            {[
              {
                subject: "Mathematics",
                score: "75%",
              },
              {
                subject: "English",
                score: "88%",
              },
              {
                subject: "Physics",
                score: "65%",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-4 flex justify-between items-center"
              >
                <span className="text-sm font-medium">
                  {item.subject}
                </span>

                <span className="text-sm text-gray-600">
                  {item.score}
                </span>
              </div>
            ))}

          </div>
        </div>

        {/* RECENT ANNOUNCEMENTS */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Announcements
          </h2>

          <div className="space-y-3">

            {[
              "PTA meeting on Friday",
              "School resumes next Monday",
              "Examination timetable released",
            ].map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-xl p-4 flex items-start gap-2"
              >
                <Megaphone className="w-4 h-4 text-blue-600 mt-1" />

                <p className="text-sm text-gray-600">
                  {item}
                </p>
              </div>
            ))}

          </div>
        </div>

      </section>

    </div>
  );
};

export default ParentDashboard;