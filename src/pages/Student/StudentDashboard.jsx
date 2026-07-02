import React, { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  CalendarDays,
  CreditCard,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { studentApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const StudentDashboard = () => {
  const { accessToken } = useAuth();
  const [overview, setOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOverview = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await studentApi.overview(accessToken);
      setOverview(payload.overview);
    } catch (err) {
      setError(err.message || "Unable to load dashboard.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadOverview();
  }, [loadOverview]);

  const stats = [
    {
      title: "Courses",
      value: overview?.stats.courses ?? 0,
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "Assignments",
      value: overview?.stats.assignments ?? 0,
      icon: <ClipboardList className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Average Score",
      value: `${overview?.stats.averageScore ?? 0}%`,
      icon: <GraduationCap className="h-5 w-5 text-purple-600" />,
    },
    {
      title: "Attendance",
      value: `${overview?.stats.attendanceRate ?? 0}%`,
      icon: <CalendarDays className="h-5 w-5 text-orange-600" />,
    },
  ];

  const actions = [
    {
      title: "View Courses",
      path: "/student/courses",
      icon: <BookOpen className="h-5 w-5 text-blue-600" />,
    },
    {
      title: "View Assignments",
      path: "/student/assignments",
      icon: <ClipboardList className="h-5 w-5 text-green-600" />,
    },
    {
      title: "Check Results",
      path: "/student/results",
      icon: <GraduationCap className="h-5 w-5 text-purple-600" />,
    },
    {
      title: "View Fees",
      path: "/student/fees",
      icon: <CreditCard className="h-5 w-5 text-pink-600" />,
    },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Student Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Overview of your academic activities
        </p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.title} className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-lg font-semibold">{isLoading ? "..." : item.value}</h2>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {actions.map((action) => (
            <Link
              key={action.title}
              to={action.path}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-5 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                {action.icon}
                <span className="text-sm font-medium">{action.title}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Megaphone className="h-5 w-5 text-indigo-600" />
          Announcements
        </h2>

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          {isLoading ? (
            <div className="p-4 text-sm text-gray-500">Loading announcements...</div>
          ) : overview?.announcements.length === 0 ? (
            <div className="p-4 text-sm text-gray-500">No announcements available.</div>
          ) : (
            overview?.announcements.map((announcement) => (
              <div key={announcement.id} className="border-b border-gray-100 p-4 last:border-b-0">
                <p className="text-sm font-medium text-gray-700">{announcement.title}</p>
                <p className="mt-1 text-sm text-gray-600">{announcement.message}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
