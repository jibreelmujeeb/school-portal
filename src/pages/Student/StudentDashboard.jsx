import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  CalendarDays,
  CreditCard,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import {
  attendanceData,
  coursesData,
  getAverageGrade,
  getGradeForScore,
  getAttendanceSummary,
  studentResultsData,
  subjectsData,
} from "../../data/studentPortal";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const attendance = getAttendanceSummary(attendanceData);
  const assignmentCount = subjectsData.reduce(
    (total, subject) => total + subject.assignments,
    0,
  );
  const averageGrade = getAverageGrade(
    studentResultsData.map((item) => ({ ...item, grade: getGradeForScore(item.score) })),
  );

  const stats = [
    {
      title: "Courses",
      value: coursesData.length,
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
    },
    {
      title: "Assignments",
      value: assignmentCount,
      icon: <ClipboardList className="w-5 h-5 text-green-600" />,
    },
    {
      title: "Average Grade",
      value: averageGrade,
      icon: <GraduationCap className="w-5 h-5 text-purple-600" />,
    },
    {
      title: "Attendance",
      value: `${attendance.attendanceRate}%`,
      icon: <CalendarDays className="w-5 h-5 text-orange-600" />,
    },
  ];

  const actions = [
    {
      title: "View Courses",
      icon: <BookOpen className="w-5 h-5 text-blue-600" />,
      path: "/student/courses",
    },
    {
      title: "Submit Assignment",
      icon: <ClipboardList className="w-5 h-5 text-green-600" />,
      path: "/student/assignments",
    },
    {
      title: "Check Results",
      icon: <GraduationCap className="w-5 h-5 text-purple-600" />,
      path: "/student/results",
    },
    {
      title: "View Grades",
      icon: <GraduationCap className="w-5 h-5 text-indigo-600" />,
      path: "/student/grades",
    },
    {
      title: "Pay Fees",
      icon: <CreditCard className="w-5 h-5 text-pink-600" />,
      path: "/student/fees",
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* HEADER */}
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Student Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Overview of your academic activities
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
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-lg font-semibold">{item.value}</h2>
            </div>
          </div>
        ))}
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5">
          {actions.map((action) => (
            <button
              key={action.title}
              type="button"
              onClick={() => navigate(action.path)}
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

      {/* ANNOUNCEMENTS */}
      <section>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-indigo-600" />
          Announcements
        </h2>

        <div className="border border-gray-200 rounded-2xl bg-white divide-y">
          <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="text-sm text-gray-700">
              Mid-term exams start next week.
            </p>
            <span className="text-xs text-gray-500">
              2 days ago
            </span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="text-sm text-gray-700">
              Submit assignments before Friday.
            </p>
            <span className="text-xs text-gray-500">
              5 days ago
            </span>
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <p className="text-sm text-gray-700">
              Fee payment deadline approaching.
            </p>
            <span className="text-xs text-gray-500">
              1 week ago
            </span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default StudentDashboard;