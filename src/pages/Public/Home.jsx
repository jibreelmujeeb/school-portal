import React from "react";
// import PublicLayout from "../../components/PublicLayout";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import About from "./About";

const Home = () => {
  const features = [
    {
      title: "Manage Courses",
      desc: "Organize subjects and learning materials easily.",
      icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Track Assignments",
      desc: "Submit and monitor assignments in one place.",
      icon: <ClipboardList className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Student Records",
      desc: "Access grades, attendance, and performance.",
      icon: <GraduationCap className="w-6 h-6 text-purple-600" />,
    },
  ];

  const roles = [
    {
      title: "Students",
      desc: "View courses, results, and schedules.",
      icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
    },
    {
      title: "Teachers",
      desc: "Manage classes, assignments, and grading.",
      icon: <Users className="w-6 h-6 text-green-600" />,
    },
    {
      title: "Administrators",
      desc: "Control users, reports, and school data.",
      icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    },
  ];

  return (
    // <PublicLayout>
    <>
          {/* HERO */}
      <section className="px-6 py-20 max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-blue-50">
            <GraduationCap className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
          A Smart School Management System
        </h1>

        <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Simplify academic management with a clean and modern platform for
          students, teachers, and administrators.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            to="/login"
            className="flex items-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/about"
            className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-16 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-10">
            Core Features
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl p-6 bg-white flex flex-col gap-3"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  {item.icon}
                </div>
                <h3 className="font-medium text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-10">
            Who Can Use This Platform
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {roles.map((role, idx) => (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl p-6 bg-white text-center"
              >
                <div className="flex justify-center mb-3">
                  {role.icon}
                </div>
                <h3 className="font-medium">{role.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 border-t border-gray-200 text-center bg-white">
        <h2 className="text-2xl font-semibold">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mt-3">
          Login now and experience a smarter way to manage your school.
        </p>

        <div className="mt-6">
          <Link
            to="/login"
            className="px-6 py-3 border border-gray-800 rounded-full hover:bg-gray-100 transition"
          >
            Go to Login
          </Link>
        </div>
      </section>
      <section>
        <About />
      </section>
    </>

    // </PublicLayout>
  );
};

export default Home;