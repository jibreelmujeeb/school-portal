import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  CreditCard,
  ClipboardList,
  CalendarCheck,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const ParentDashboard = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const child = state?.child;
  const childName = child?.name || "John Doe";
  const childClass = child?.class || "SS2 Science";
  const admissionNo = child?.admissionNo || "STD001";
  const attendance = child?.attendance ?? 96;
  const feeStatus = child?.fees || "Paid";
  const assignmentCount = child?.assignments ?? 12;

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
              {childName}
            </h2>

            <p className="text-sm text-gray-500">
              Class: {childClass}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Admission No: {admissionNo}
            </p>
          </div>
        </div>

        {/* VIEW PROFILE */}
        <button
          onClick={() => navigate("/parent/child-profile", { state: { child } })}
          className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-full text-sm hover:bg-blue-50 transition"
        >
          View Profile
          <ArrowRight className="w-4 h-4" />
        </button>

      </section>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* ATTENDANCE */}
        <button
          onClick={() => navigate("/parent/attendance")}
          className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3 text-left hover:border-blue-300"
        >
          <CalendarCheck className="w-5 h-5 text-green-600" />

          <div>
            <p className="text-sm text-gray-500">
              Attendance
            </p>

            <h2 className="text-lg font-semibold">
              {attendance}%
            </h2>
          </div>
        </button>

        {/* FEES */}
        <button
          onClick={() => navigate("/parent/fees")}
          className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3 text-left hover:border-blue-300"
        >
          <CreditCard className="w-5 h-5 text-orange-600" />

          <div>
            <p className="text-sm text-gray-500">
              Fees Status
            </p>

            <h2 className="text-lg font-semibold">
              {feeStatus}
            </h2>
          </div>
        </button>

        {/* ASSIGNMENTS */}
        <button
          onClick={() => navigate("/parent/assignments")}
          className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3 text-left hover:border-blue-300"
        >
          <ClipboardList className="w-5 h-5 text-blue-600" />

          <div>
            <p className="text-sm text-gray-500">
              Assignments
            </p>

            <h2 className="text-lg font-semibold">
              {assignmentCount}
            </h2>
          </div>
        </button>

        {/* ANNOUNCEMENTS */}
        <button
          onClick={() => navigate("/parent/announcements")}
          className="border border-gray-200 rounded-2xl p-5 flex items-center gap-3 text-left hover:border-blue-300"
        >
          <Megaphone className="w-5 h-5 text-purple-600" />

          <div>
            <p className="text-sm text-gray-500">
              Announcements
            </p>

            <h2 className="text-lg font-semibold">
              3
            </h2>
          </div>
        </button>

      </section>

      {/* MAIN GRID */}
      <section className="grid gap-6 lg:grid-cols-2">

        {/* RECENT RESULTS */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Results</h2>
            <button
              onClick={() => navigate("/parent/results")}
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </button>
          </div>

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
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Announcements</h2>
            <button
              onClick={() => navigate("/parent/announcements")}
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </button>
          </div>

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