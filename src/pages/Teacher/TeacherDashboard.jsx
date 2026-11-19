import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  ClipboardList,
  GraduationCap,
  Users,
} from "lucide-react";

const TeacherDashboard = () => {
  const students = useSelector((state) => state.students.items);
  const subjects = useSelector((state) => state.subjects.items);
  const classes = [...new Set(students.map((student) => student.class).filter(Boolean))];
  const activeStudents = students.filter((student) => student.status === "Active").length;

  const stats = [
    { label: "My Classes", value: classes.length, icon: Users, color: "text-blue-600" },
    { label: "Subjects", value: subjects.length, icon: BookOpen, color: "text-green-600" },
    { label: "Students", value: students.length, icon: GraduationCap, color: "text-purple-600" },
    { label: "Active Students", value: activeStudents, icon: ClipboardList, color: "text-orange-600" },
  ];

  const shortcuts = [
    { label: "View my classes", path: "/teacher/classes", icon: Users },
    { label: "Browse students", path: "/teacher/students-list", icon: GraduationCap },
    { label: "Manage subjects", path: "/teacher/subjects", icon: BookOpen },
    { label: "Review results", path: "/teacher/results", icon: ClipboardList },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Your teaching overview and quick access to classroom tools.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-gray-200 p-5">
            {React.createElement(Icon, { className: `h-5 w-5 ${color}` })}
            <div>
              <p className="text-sm text-gray-500">{label}</p>
              <p className="text-lg font-semibold">{value}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">My Classes</h2>
            <Link to="/teacher/classes" className="text-sm text-blue-600 hover:underline">
              All classes
            </Link>
          </div>
          {classes.length ? (
            <div className="space-y-3">
              {classes.map((className) => {
                const count = students.filter((student) => student.class === className).length;
                return (
                  <Link
                    key={className}
                    to={`/teacher/students-list?class=${encodeURIComponent(className)}`}
                    className="flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:bg-gray-50"
                  >
                    <span className="text-sm font-medium">{className}</span>
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      {count} {count === 1 ? "student" : "students"}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No classes have students assigned yet.</p>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 p-5">
          <h2 className="mb-4 text-lg font-semibold">Quick access</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {shortcuts.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-3 rounded-xl border border-gray-200 p-4 text-sm hover:bg-gray-50"
              >
                {React.createElement(Icon, { className: "h-4 w-4 text-blue-600" })}
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherDashboard;
