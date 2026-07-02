import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle,
  ClipboardList,
  CreditCard,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import PublicLayout from "../../components/PublicLayout";

const Home = () => {
  const features = [
    {
      title: "Academic Records",
      desc: "Results, grades, attendance, profiles, and reports stay organized in one place.",
      icon: GraduationCap,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Classroom Tools",
      desc: "Teachers can manage classes, assignments, subjects, and student progress faster.",
      icon: ClipboardList,
      color: "text-green-600 bg-green-50",
    },
    {
      title: "School Operations",
      desc: "Admins can monitor fees, announcements, users, subjects, and performance reports.",
      icon: ShieldCheck,
      color: "text-indigo-600 bg-indigo-50",
    },
  ];

  const roleLinks = [
    { title: "Student Portal", path: "/student/dashboard", icon: BookOpen },
    { title: "Teacher Portal", path: "/teacher/dashboard", icon: Users },
    { title: "Admin Portal", path: "/admin/dashboard", icon: ShieldCheck },
  ];

  const highlights = [
    { label: "Students", value: "1,200+" },
    { label: "Courses", value: "45+" },
    { label: "Success Rate", value: "98%" },
  ];

  return (
    <PublicLayout>
      <section
        className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-gray-950"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(3,7,18,0.88), rgba(15,23,42,0.62), rgba(15,23,42,0.2)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=80')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center px-6 py-16">
          <div className="max-w-2xl text-white">
            <p className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-blue-100 ring-1 ring-white/20">
              <GraduationCap className="h-4 w-4" />
              School Portal
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              A complete digital workspace for modern school management
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-gray-200">
              Bring students, teachers, administrators, records, payments, and
              communication into a clear portal built for daily school work.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                View Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-200 bg-white px-6 py-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p>
                <span className="font-semibold text-gray-950">{item.value}</span>
                <span className="ml-2 text-sm text-gray-600">{item.label}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold">Everything the school day needs</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              The portal keeps the most important workflows close: learning,
              attendance, fees, results, communication, and administration.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-lg border border-gray-200 bg-white p-6">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${item.color}`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-semibold text-gray-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold">Role-based portals</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Each user gets a focused workspace with the pages and tools that
              match their responsibilities.
            </p>
            <div className="mt-8 grid gap-3">
              {roleLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.path}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-4 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    <span className="flex items-center gap-3 font-medium">
                      <Icon className="h-5 w-5 text-blue-600" />
                      {item.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-500" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-950 p-4 shadow-sm">
            <div className="rounded-lg bg-white p-5">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <p className="text-sm font-semibold">Today at a glance</p>
                  <p className="text-xs text-gray-500">Live school dashboard</p>
                </div>
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-4">
                  <Users className="h-5 w-5 text-blue-600" />
                  <p className="mt-3 text-2xl font-semibold">326</p>
                  <p className="text-xs text-gray-600">Present students</p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <CalendarDays className="h-5 w-5 text-green-600" />
                  <p className="mt-3 text-2xl font-semibold">18</p>
                  <p className="text-xs text-gray-600">Classes today</p>
                </div>
                <div className="rounded-lg bg-indigo-50 p-4">
                  <ClipboardList className="h-5 w-5 text-indigo-600" />
                  <p className="mt-3 text-2xl font-semibold">42</p>
                  <p className="text-xs text-gray-600">Assignments</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-4">
                  <CreditCard className="h-5 w-5 text-amber-600" />
                  <p className="mt-3 text-2xl font-semibold">76%</p>
                  <p className="text-xs text-gray-600">Fees collected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-lg bg-blue-700 px-6 py-10 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Ready to manage your school smarter?</h2>
            <p className="mt-2 text-sm text-blue-100">
              Start from the login page or review admissions information first.
            </p>
          </div>
          <Link
            to="/login"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-blue-700 transition hover:bg-blue-50"
          >
            Go to Login <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
};

export default Home;
